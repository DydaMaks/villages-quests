import mongoose from 'mongoose';

const questSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 2000
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true,
    default: 'medium'
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  duration: {
    type: Number,
    required: true,
    min: 15,
    max: 480
  },
  maxParticipants: {
    type: Number,
    min: 1,
    max: 50,
    default: 10
  },
  images: [{
    url: String,
    alt: String
  }],
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  rating: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  },
  tags: [String]
}, {
  timestamps: true
});

export default mongoose.model('Quest', questSchema);