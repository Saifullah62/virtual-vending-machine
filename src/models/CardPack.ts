import mongoose from 'mongoose';

const cardPackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    trim: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  cards: [{
    name: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    rarity: {
      type: String,
      enum: ['common', 'uncommon', 'rare', 'legendary'],
      required: true,
    },
    dropRate: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
  }],
  active: {
    type: Boolean,
    default: true,
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

cardPackSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const CardPack = mongoose.model('CardPack', cardPackSchema);