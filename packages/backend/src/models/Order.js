import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
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
  participants: {
    type: Number,
    required: true,
    min: 1,
    max: 50
  },
  scheduledDate: {
    type: Date,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  specialRequests: {
    type: String,
    maxlength: 500
  }
}, {
  timestamps: true
});

export default mongoose.model('Order', orderSchema);