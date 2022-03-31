import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
} from "firebase/storage";

export default class Storge {
  constructor(app) {
    this.storage = getStorage(app);
    this.ref = ref;
    this.uploadBytesResumable = uploadBytesResumable;
    this.getDownloadURL = getDownloadURL;
  }

  // async uploadFile(child, file) {
  //   const storageRef = ref(this.storge, child);
  //   try {
  //     await uploadBytes(storageRef, file);
  //     return { result: true };
  //   } catch (error) {
  //     return { error: error.message };
  //   }
  // }

  async getListAll(child) {
    const listRef = this.ref(this.storage, child);
    try {
      const res = await listAll(listRef);
      return { result: res.items };
    } catch (error) {
      return { error: error.message };
    }
  }
}
