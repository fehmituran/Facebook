const cloudinary = require("cloudinary").v2;
const path = require("path");
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

exports.uploadImages = async (req, res) => {
  try {
    const { path } = req.body;
    let files = Object.values(req.files).flat();
    let images = [];
    for (const file of files) {
      const url = await uploadCloudinary(file, path);
      images.push(url);
      removeTmp(file.tempFilePath);
    }
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.listImages = async (req, res) => {
  const { path, sort, max } = req.body;

  cloudinary.search
    .expression(`${path}`)
    .sort_by("created_at", `${sort}`)
    .max_results(max)
    .execute()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err.error.message);
    });
};

const uploadCloudinary = async (file, path) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file.tempFilePath,
      {
        folder: path,
      },
      (error, result) => {
        if (error) {
          removeTmp(file.tempFilePath);
          return res.status(400).json({ message: "upload image failed" });
        }
        resolve({ url: result.secure_url });
      }
    );
  });
};

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
