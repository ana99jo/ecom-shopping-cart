import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  ime: {
    type: String,
    required: true
  },
  prezime: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  adresa: {
    type: String,
    required: true
  },
  korisnicko_ime: {
    type: String,
    required: true
  },
  lozinka: {
    type: String,
    required: true
  },
  tip: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  }
});

const User=mongoose.model('User',userSchema)

export default User;
