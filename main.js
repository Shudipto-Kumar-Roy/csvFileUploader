const csvParser = require("csv-parser");
const fs = require("fs");
const result = [];

fs.createReadStream("sample_products.csv")
  .pipe(csvParser({}))
  .on("data", (data) => result.push(data))
  .on("end", () => {
    console.log(result.length);
    // console.log(result);
  });
