import mongoose from 'mongoose';

const sharepackSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  cards: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Card',
  }],
  revealed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

sharepackSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const Sharepack = mongoose.model('Sharepack', sharepackSchema);