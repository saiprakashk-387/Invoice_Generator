import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../utils/firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { getUser } from "../features/userSlice";
import { showLoading } from "../features/commonSlice";
import { toast } from "react-toastify";

export const SigninWithGoogle = () => async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userDocRef = doc(db, "users", user.uid);
    await setDoc(userDocRef, {
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      bio: "",
      bannerImage: "",
      createdAt: new Date(),
    });
  } catch (err) {
    console.error(err);
  }
};

export const CreateAccountService = (data) => async (dispatch) => {
  dispatch(showLoading(true));
  await createUserWithEmailAndPassword(auth, data.email, data.password)
    .then((userData) => {
      const user = auth.currentUser;
      const userDocRef = doc(db, "users", user?.uid);
      setDoc(userDocRef, {
        name: data.username,
        email: userData?.user?.email,
        photoURL:
          "https://cdn.pixabay.com/photo/2012/04/26/19/43/profile-42914_640.png",
        bio: "",
        bannerImage: "",
        createdAt: new Date(),
      });
      dispatch(showLoading(false));
    })
    .catch((error) => {
      toast.error(error.message);
    });
};

export const GetUserService = () => async (dispatch) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.error("User is not authenticated.");
      return;
    }
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    dispatch(getUser(userDoc?.data()));
  } catch (err) {
    alert(err.message);
  }
};
