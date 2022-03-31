import {
  getFirestore,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  collection,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  doc,
  limitToLast,
  startAt,
  endAt
} from "firebase/firestore";

export default class Cloud {
  constructor(app) {
    this.db = getFirestore(app);
    this.where = where;
    this.query = query;
    this.orderBy = orderBy;
    this.limit = limit;
    this.Timestamp = Timestamp;
    this.collection = collection;
    this.doc = doc;
    this.limitToLast = limitToLast;
    this.startAt = startAt;
    this.endAt = endAt;
  }

  async getDocsFromCollection(query) {
    const result = [];
    try {
      const querySnapshot = await getDocs(query);
      querySnapshot.forEach((doc) => {
        result.push({ id: doc.id, data: doc.data() });
      });
      return { result: result };
    } catch (error) {
      return { error: error.message };
    }
  }

  async addDocToCollection(collection, data) {
    try {
      await addDoc(collection, data);
      return { result: true };
    } catch (error) {
      return { error: error.message };
    }
  }

  async uppdateDocToCollection(doc, newDoc) {
    try {
      await updateDoc(doc, newDoc);
      return { result: true };
    } catch (error) {
      return { error: error.message };
    }
  }

  async setDocToCollection(doc, newDoc) {
    try {
      await setDoc(doc, newDoc);
      return { result: true };
    } catch (error) {
      return { error: error.message };
    }
  }

  async deleteDocFromCollection(doc) {
    try {
      await deleteDoc(doc);
      return { result: true };
    } catch (error) {
      return { error: error.message };
    }
  }
}
