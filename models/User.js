import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true
  },
  first_name: String,
  last_name: String,
  password: String,
  token: String
});

const User = mongoose.model('User', userSchema);

export default User;