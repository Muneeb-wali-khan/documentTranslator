import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique:true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "translator", "user"],
    default: "user",
  },
  mfaEnabled: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});


// hash password method
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
})


//  compare password method
userSchema.methods.comparePassword = async function(password){
  return await bcrypt.compare(password, this.password)
}

// generate token method
userSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id, role: this.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

export const UserModel = mongoose.model("User", userSchema);
