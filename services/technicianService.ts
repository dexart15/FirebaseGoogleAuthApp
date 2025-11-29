import { db } from "@/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export const getTechnicians = async () => {
  const snapshot = await getDocs(collection(db, "technicians"));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
