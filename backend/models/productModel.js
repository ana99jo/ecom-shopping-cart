import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  naziv: {
    type: String,
    required: true
  },
  cena: {
    type: Number,
    required: true
  },
  opis: {
    type: String,
    required: true
  },
  dostupna_kolicina: {
    type: Number,
    required: true
  },
  slika: {
    type: String,
    required: true
  },
  id_kategorija: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
});

const Product=mongoose.model('Product',productSchema)

export default Product;
