import { firebaseConfigApp } from "../configs/firebase.config";
import { doc, getDoc, getFirestore } from "firebase/firestore";

export const db = getFirestore(firebaseConfigApp);

export const getInitialBoard = (gameID: string) => {
  const docRef = doc(db, "game", gameID);
  return getDoc(docRef).then((data) => {
    const _data = <any>data.data();
    return [JSON.parse(_data.chessboard), _data.type];
  });
};
