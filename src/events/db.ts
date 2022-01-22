import { firebaseConfigApp } from "../configs/firebase.config";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  query,
  doc,
  onSnapshot,
} from "firebase/firestore";

export const db = getFirestore(firebaseConfigApp);

export const getInitialBoard = (gameID: string) => {
  const docRef = doc(db, "games", gameID);
  return getDoc(docRef).then((data) => {
    return JSON.parse((<any>data.data()).initialBoard);
  });
};
