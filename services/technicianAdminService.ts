import { db } from "@/FirebaseConfig";
import { collection, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

const techRef = collection(db, "technicians");

// CREATE
export const addTechnician = async (data: any) => {
  return await addDoc(techRef, data);
};

// UPDATE
export const updateTechnician = async (id: string, data: any) => {
  const docRef = doc(db, "technicians", id);
  return await updateDoc(docRef, data);
};

// DELETE
export const deleteTechnician = async (id: string) => {
  const docRef = doc(db, "technicians", id);
  return await deleteDoc(docRef);
};
