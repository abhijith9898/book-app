import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAx9paSZ7Wh5wA4eDTQfi1rGWWlDLmw6QQ",
  authDomain: "book-app-74e4f.firebaseapp.com",
  projectId: "book-app-74e4f",
  storageBucket: "book-app-74e4f.firebasestorage.app",
  messagingSenderId: "564544575874",
  appId: "1:564544575874:web:f4b1da545a192d5f6d579b",
  measurementId: "G-5T8XJBFJP3"
};


const app = initializeApp(firebaseConfig);


const db = getFirestore(app);


export { db };


export const getBooks = async () => {
  const booksCollection = collection(db, "Books");
  const booksSnapshot = await getDocs(booksCollection);
  const booksList = booksSnapshot.docs.map(doc => doc.data());

  return booksList;
};
