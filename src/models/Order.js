import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  customerEmail: {
    type: String,
    required: true,
  },
  items: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'processing',
  },
  shippingDetails: {
    firstName: String,
    lastName: String,
    email: String,
    address: String,
    city: String,
    zip: String,
    country: String,
  },
  paymentMethod: {
    type: String,
    default: 'credit-card',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
