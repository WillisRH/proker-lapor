// postcard.js

import mongoose from 'mongoose';

const PostcardSchema = new mongoose.Schema({
  title: String,
  description: String,
  performance: Number,
  owner: [String],
  privatemsg: String,
});

// dkjgaildahs

const Postcard = mongoose.models.Postcard || mongoose.model('Postcard', PostcardSchema);

export default Postcard;
