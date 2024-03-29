const POI = require("../models/poiModel");

// Create a new Point of Interest (POI)
exports.createPOI = async (req, res) => {
  try {
    const poi = await POI.create(req.body);
    res.status(200).json(poi);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Get all POIs or a specific POI based on query parameters
exports.getPOIs = async (req, res) => {
  var filter = {};
  for (var k in req.query) {
    filter[k] = req.query[k];
  }
  if (Object.keys(filter).length === 0) {
    try {
      const POIs = await POI.find();
      res.status(200).json(POIs);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  } else {
    try {
      const poi = await POI.findOne(filter);
      res.status(200).json(poi);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
};

// Update a specific POI
exports.updatePOI = async (req, res) => {
  try {
    const poi = await POI.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      {
        returnOriginal: false,
      }
    );
    if (poi) {
      res.status(200).json({ message: "POI updated successfully!" });
    } else {
      res
        .status(404)
        .json({ message: "POI not found or no changes were made." });
    }
  } catch (error) {
    console.error("Error updating POI:", error);
    res.status(500).json({ error: error.message });
  }
};

// Delete a specific POI
exports.deletePOI = async (req, res) => {
  try {
    const poi = await POI.findOneAndDelete({ _id: req.params.id });
    if (!poi) {
      return res
        .status(404)
        .json({ message: "POI not found or no changes were made." });
    }
    res.status(200).json({ message: "POI has been removed successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Store image path for a specific POI
exports.uploadImage = async (req, res) => {
  try {
    const poi = await POI.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { image: req.file.path } },
      {
        returnOriginal: false,
      }
    );
    if (poi) {
      res.status(200).json({ message: "Image upload is successful!" });
    } else {
      res
        .status(404)
        .json({ message: "POI not found or no changes were made." });
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: error.message });
  }
};
