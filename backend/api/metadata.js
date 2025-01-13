const fs = require("fs");
const path = require("path");

const loadJSON = (fileName) => {
  try {
    const filePath = path.join(process.cwd(), "data", fileName);
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error loading JSON file: ${fileName}`, error.message);
    return null;
  }
};

export default function handler(req, res) {
  if (req.method === "GET") {
    const data = loadJSON("metadta.json");
    if (!data) {
      return res.status(500).json({ message: "Failed to load metadata data." });
    }
    return res.status(200).json(data);
  } else if (req.method === "POST") {
    const newData = req.body;
    const filePath = path.join(process.cwd(), "data", "metadata.json");
    try {
      const existingData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

      if (!existingData.hits || !existingData.hits.hits) {
        existingData.hits = { hits: [] };
      }
      existingData.hits.hits.push({ _id: newData.id, _source: newData });

      fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2), "utf-8");

      res.status(201).json({ message: "Data added successfully." });
    } catch (error) {
      console.error("Error writing to JSON file:", error.message);
      res.status(500).json({ message: "Failed to add data." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
