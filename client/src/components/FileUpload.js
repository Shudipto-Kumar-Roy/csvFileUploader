import React, { useState } from "react";
import axios from "axios";

export const FileUpload = () => {
  const [file, setFile] = useState("");
  const [viewallproducts, setViewAllProducts] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const fileHandle = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const sendFile = async () => {
      const formdata = new FormData();
      formdata.append("file", file);
      try {
        const res = await axios.post("/api/v1/uploadfile", formdata, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const { products } = res.data;
        setProductsData([...productsData, products]);
        if (res && res.status === 200) {
          alert("File uploaded successfully");
          setFile("");
        }
      } catch (error) {
        alert(error.response.data.message);
      }
    };
    sendFile();
  };

  const handleView = async (e) => {
    try {
      const res = await axios.get("/api/v1/getallproducts");
      setViewAllProducts([...viewallproducts, res.data.products]);
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  console.log(viewallproducts);
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <form
        action=""
        onSubmit={handleUpload}
        className="my-4 flex justify-center items-center"
      >
        <input
          type="file"
          name="csvfile"
          required
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          onChange={fileHandle}
        />
        <input
          className="text-white p-2 rounded-md bg-slate-600"
          type="submit"
          value="Upload"
        />
      </form>
      <button
        className="text-white p-2 rounded-md bg-slate-600"
        type="button"
        onClick={handleView}
      >
        View Products
      </button>
    </div>
  );
};
