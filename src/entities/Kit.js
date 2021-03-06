const mongoose = require("mongoose");
const aws = require("aws-sdk");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const s3 = new aws.S3();

const KitSchema = new mongoose.Schema({
  season: String,
  model: String,
  sportwear: String,
  platform: String,
  name: String,
  size: Number,
  key: String,
  url: String,
  credits: String,
  storage: String,
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    require: true,
  },
  team: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

KitSchema.pre("remove", function () {
  if (!this.url) {
    this.url = `${process.env.APP_URL}/files/${this.key}`;
  }
});

KitSchema.pre("remove", function () {
  if (process.env.STORAGE_TYPE === 's3' && this.storage === 's3') {
    return s3
      .deleteObject({
        Bucket: process.env.BUCKET,
        Key: this.key,
      })
      .promise();
  } else {
    return promisify(fs.unlink)(
      path.resolve(__dirname, "..", "..", "tmp", "uploads", this.key)
    );
  }
});

module.exports = mongoose.model("Kit", KitSchema);
