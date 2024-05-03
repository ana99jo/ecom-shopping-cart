import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  datum: {
    type: Date,
    required: true
  },
  id_korisnik: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Order=mongoose.model('Order',orderSchema)

export default Order;

