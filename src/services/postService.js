import { auth, db } from "../utils/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

import { CreateInvoice, GetInvoice } from "../features/postSlice";
import { showLoading } from "../features/commonSlice";

export const CreateInvoiceService = (data) => async (dispatch) => {
  const user = auth.currentUser;
  if (!user) {
    alert("User is not authenticated.");
    return;
  }
  try {
    dispatch(showLoading(true));
    const invoiceDocRef = collection(db, "invoices");
    await addDoc(invoiceDocRef, {
      userName: data?.userName,
      vehicle: data?.vehicleModel,
      createdAt: new Date(),
      invoiceDetails: data?.items,
      totalPrice: data?.total,
    });
    dispatch(CreateInvoice(data));
    dispatch(showLoading(false));
  } catch (err) {
    console.error(err);
  } finally {
    // setLoading(false);
    dispatch(showLoading(false));
  }
};

export const GetInvoiceService = () => async (dispatch) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.error("User is not authenticated.");
      return;
    }
    dispatch(showLoading(true));
    const invoiceCollectionRef = collection(db, "invoices");
    const querySnapshot = await getDocs(invoiceCollectionRef);

    const fetchedInvoices = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    dispatch(GetInvoice(fetchedInvoices));
    dispatch(showLoading(false));
  } catch (err) {
    console.error(err.message);
    dispatch(showLoading(false));
  }
};
