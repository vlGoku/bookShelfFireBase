import { useState, useEffect, ChangeEvent } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  addDoc,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db, auth, storage } from "../firebase/firebaseInit";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

export type TBook = {
  id: string;
  title: string;
  author: string;
  pages: number;
  read: boolean;
  createdAt: Date;
  imageURL?: string;
  uid?: string;
  storageUri?: string;
};

export default function useBooks() {
  const [books, setBooks] = useState<TBook[]>([]);
  useEffect(() => {
    const q = query(collection(db, "books"), orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      setBooks(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as TBook))
      );
    });
  }, []);

  const addBook = async (book: TBook) => {
    const { uid } = auth.currentUser!;
    const docRef = await collection(db, "books");
    await addDoc(docRef, {
      ...book,
      uid,
      createdAt: new Date(),
      imageURL: "",
    });
  };

  const deleteBook = async (book: TBook) => {
    await deleteDoc(doc(db, "books", book.id));
    if (book.imageURL) {
      const imageRef = ref(storage, book.storageUri);
      await deleteObject(imageRef);
    }
  };

  const addImage = async (
    event: ChangeEvent<HTMLInputElement>,
    book: TBook
  ) => {
    event.preventDefault();
    const LOADING_IMAGE_URL = "https://www.google.com/images/sping-32.gif?a";
    const file = (event.target as HTMLInputElement).files![0];
    const { uid } = auth.currentUser!;
    try {
      const filepath = `${uid}/${book.id}/${file.name}`;
      const newImageRef = ref(storage, filepath);
      const uploadTask = await uploadBytesResumable(newImageRef, file);
      const publicImgUrl = await getDownloadURL(uploadTask.ref);
      const docRef = doc(db, "books", book.id);
      await setDoc(docRef, {
        ...book,
        imageURL: LOADING_IMAGE_URL,
        storageUri: uploadTask.metadata.fullPath,
      });
      await updateDoc(docRef, {
        imageURL: publicImgUrl,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return [books, addBook, deleteBook, addImage];
}
