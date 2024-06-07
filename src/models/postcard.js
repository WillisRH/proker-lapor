import mongoose from 'mongoose';

const PostcardSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  owner: 
  [{ 
    type: String, 
    ref: 'User' 
  }],
  privatemsg: {
     type: String
    },
  performance: { 
    type: Number, 
    required: true 
  },
  referto: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Postcard' 
  } 
}, {
  timestamps: true
});

export default mongoose.models.Postcard || mongoose.model('Postcard', PostcardSchema);
