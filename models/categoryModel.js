import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    lowercase: true,
  }
}, { timestamps: true }
);

export default mongoose.model('Category', categorySchema);

//using 'slugify' package: for seo, converts or maps symbols to english equivalents
//eg: if there is space in url convert it to _or-