import React, { useState } from "react";
import axios from "axios";

export const FileUpload = () => {
  const [file, setFile] = useState("");
  const [uploadedfile, setUploadedFile] = useState({});
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
        const { fileName, filePath, products } = res.data;
        setUploadedFile({ fileName, filePath, products });
        if (res && res.status === 200) {
          alert("File uploaded successfully");
          setFile("");
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    sendFile();
  };

  console.log(uploadedfile);
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <form action="" onSubmit={handleUpload} className="my-4">
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
    </div>
  );
};
