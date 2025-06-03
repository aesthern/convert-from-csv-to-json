/**
 * CSV to JSON conversion script
 * This script reads a CSV file and converts it to a JSON array, then writes the result to a file named "mapped.json".
 * Ensure you have the 'csvtojson' package installed: npm install csvtojson
 *
 */
const csvFilePath = "version2.csv"; // File path to the CSV file to be converted
const outputFilePath = "mapped.json"; // Output file path for the JSON array
const csv = require("csvtojson");
const fs = require("fs");

async function convertToJsonArray() {
  const jsonArray = await csv().fromFile(csvFilePath);
  return jsonArray;
}

convertToJsonArray()
  .then((jsonArray) => {
    console.log("Conversion completed.");

    fs.writeFileSync(outputFilePath, JSON.stringify(jsonArray, null, 2));
    // return jsonArray;
  })
  .catch((error) => {
    console.error("Error during conversion:", error);
  });
