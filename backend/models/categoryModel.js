import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  naziv: {
    type: String,
    required: true
  }
});


const Category=mongoose.model('Category',categorySchema)

export default Category;