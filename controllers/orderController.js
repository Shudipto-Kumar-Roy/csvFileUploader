const { Order } = require("../models/orderModel");

const csv = require("csvtojson");

exports.newOrder = async (req, res, next) => {
  try {
    const orders = await Order.insertMany([
      { orderId: "10001" },
      { orderId: "10002" },
      { orderId: "10003" },
      { orderId: "10004" },
      { orderId: "10005" },
      { orderId: "10006" },
      { orderId: "10007" },
      { orderId: "10008" },
      { orderId: "10009" },
      { orderId: "100010" },
    ]);
    res.status(201).json({
      success: true,
      message: "Orders Created Successfully",
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.uploadStatusFile = async (req, res, next) => {
  try {
    if (req.files === null) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }
    const file = req.files.statusfile;
    const replacedfilename = file.name.replace(
      file.name.split(".")[0],
      "orderstatus"
    );
    file.mv(`${__dirname}/../uploads/${replacedfilename}`, (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }
      // converting csv to json
      csv()
        .fromFile(`./uploads/orderstatus.csv`)
        .then(async (jsonObj) => {
          // finding the matched object in database
          jsonObj.forEach(async (obj) => {
            const matchedOrders = await Order.findOne({ orderId: obj.orderId });
            matchedOrders.orderStatus = obj.orderStatus;
            await matchedOrders.save();
          });
          res.status(200).json({
            success: true,
            message: "Status Updated Successfully",
          });
        });
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getcsvfile = async (req, res, next) => {
  try {
    const ordersstatus = await Order.find();
    res.status(200).json({
      success: true,
      ordersstatus,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
