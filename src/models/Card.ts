import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  rarity: {
    type: String,
    enum: ['common', 'uncommon', 'rare', 'ultra-rare'],
    required: true,
  },
  sharePrice: {
    type: Number,
    required: true,
    min: 0,
  },
  totalShares: {
    type: Number,
    required: true,
    min: 1,
  },
  availableShares: {
    type: Number,
    required: true,
    min: 0,
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

cardSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const Card = mongoose.model('Card', cardSchema);