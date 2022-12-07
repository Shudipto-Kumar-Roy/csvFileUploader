import axios from "axios";
import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";

const CreateOrderAndUpdateStatus = () => {
  let csvdataArrays = [];
  const [getAllFileStatus, setGetAllFileStatus] = useState(false);
  const [file, setFile] = useState("");
  const [ordersstatus, setOrdersStatus] = useState([]);
  const handleCreateOrders = async () => {
    const res = await axios.get("/api/v1/createorders");
    if (res && res.status === 201) {
      alert("Orders Created Successfully");
    }
  };

  const fileHandle = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("statusfile", file);
    try {
      const res = await axios.post("/api/v1/uploadStatusfile", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res && res.status === 200) {
        alert("Status Updated Successfully");
        setGetAllFileStatus(true);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    const getAllData = async () => {
      try {
        const res = await axios.get("/api/v1/getcsvfile");
        if (res && res.status === 200) {
          setOrdersStatus([...res.data.ordersstatus]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllData();
  }, [getAllFileStatus]);

  ordersstatus.map((order) => {
    const values = [order.orderId, order.orderStatus];
    csvdataArrays.push(values);
  });
  csvdataArrays.unshift(["orderId", "orderStatus"]);

  const generatePdf = () => {
    // new document is jspdf
    let xAxis = 20;
    let yAxis = 20;
    const doc = new jsPDF();
    doc.setFont("Times New Roman");
    doc.setFontSize(12);

    // add some text to pdf document
    csvdataArrays.forEach((value) => {
      doc.text(`${value}`, xAxis, (yAxis += 10));
    });
    doc.save("orderstatus.pdf");
  };

  return (
    <div className="w-screen h-auto flex flex-col justify-center items-center">
      <button
        className="text-white p-2 rounded-md bg-slate-600"
        type="button"
        onClick={handleCreateOrders}
      >
        Create Orders
      </button>
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
          value="Upload CSV To Change Order Status"
        />
      </form>
      {csvdataArrays.length > 1 && (
        <CSVLink
          className="text-white p-2 rounded-md bg-slate-600"
          filename="orderstatus.csv"
          data={csvdataArrays}
          target="_blank"
        >
          Download CSV
        </CSVLink>
      )}

      <button
        className="text-white p-2 rounded-md bg-slate-600"
        onClick={generatePdf}
      >
        Download PDF
      </button>
    </div>
  );
};

export default CreateOrderAndUpdateStatus;
