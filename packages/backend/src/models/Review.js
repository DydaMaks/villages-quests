import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  quest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quest',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true,
    maxlength: 1000
  },
  isVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Один відгук на квест від одного користувача
reviewSchema.index({ user: 1, quest: 1 }, { unique: true });

export default mongoose.model('Review', reviewSchema);