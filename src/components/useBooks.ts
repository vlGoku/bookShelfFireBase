import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebaseInit";

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
    console.log(book);
  };

  return [books, addBook];
}
