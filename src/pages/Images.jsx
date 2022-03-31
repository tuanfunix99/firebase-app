import React, { Fragment, useEffect } from "react";
import Header from "../components/Header";
import app from "../firebase/config";
import Storage from "../firebase/storge";

const Images = () => {
  useEffect(() => {
    const fetchData = async () => {
      const storage = new Storage(app);
      const { error, result } = await storage.getListAll("images");
      if (!error) {
        result.forEach((itemRef) => {
          storage
            .getDownloadURL(storage.ref(storage.storage, itemRef.fullPath))
            .then((url) => {
              console.log(url);
            });
        });
      } else {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <Fragment>
      <Header />
    </Fragment>
  );
};

export default Images;
