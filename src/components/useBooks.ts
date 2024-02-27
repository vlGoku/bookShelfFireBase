import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  addDoc,
} from "firebase/firestore";
import { db, auth } from "../firebase/firebaseInit";

export type TBook = {
  id: string;
  title: string;
  author: string;
  pages: number;
  read: boolean;
  createdAt: Date;
  imageURL: string;
  uid: string;
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

  return [books, addBook];
}
