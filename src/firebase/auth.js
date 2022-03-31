import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendEmailVerification,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

export default class Auth {
  constructor(app) {
    this.auth = getAuth(app);
  }

  async signUp(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      await sendEmailVerification(userCredential.user);
      return { user: userCredential.user };
    } catch (error) {
      console.log(error);
      return { error: error.message };
    }
  }

  async signInWithPassword(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      if (!userCredential.user.emailVerified) {
        throw new Error("Your email not verified");
      }
      return { user: userCredential.user };
    } catch (error) {
      return { error: error.message };
    }
  }

  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(this.auth, provider);
      return { user: result.user };
    } catch (error) {
      return { error: error.message };
    }
  }

  onAuthStateChangedPromise(auth) {
    return new Promise(function (resolve, reject) {
      onAuthStateChanged(auth, (user) => {
        return resolve(user);
      });
    });
  }

  async getUser() {
    const user = await this.onAuthStateChangedPromise(this.auth);
    if (!user?.emailVerified) {
      return null;
    }
    return user;
  }

  async logOut() {
    try {
      await signOut(this.auth);
      return { result: true };
    } catch (error) {
      return { error: error.message };
    }
  }
}
