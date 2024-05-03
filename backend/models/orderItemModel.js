import mongoose from "mongoose";

const orderItemSchema = mongoose.Schema({
  id_porudzbina: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  id_proizvod: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  kolicina: {
    type: Number,
    required: true
  },
  ukupna_cena: {
    type: Number,
    required: true
  }
});



const OrderItem=mongoose.model('OrderItem',orderItemSchema)

export default OrderItem;

