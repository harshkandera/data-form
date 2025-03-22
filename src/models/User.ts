import mongoose, { Document, Schema, Model } from "mongoose";

// 1️⃣ Form Tags Interface & Model
export interface IFormTags extends Document {
  name: string;
}

const TagsSchema: Schema<IFormTags> = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

export const TagModel: Model<IFormTags> = mongoose.models["Tags"] || mongoose.model<IFormTags>("Tags", TagsSchema);


// 2️⃣ User Interface & Model
export interface IUser extends Document {
  name: string;
  phone: string;
  email?: string;
  password?: string;
  role: "user" | "admin";
  isVerified: boolean;
  isProfileCompleted: boolean;
  googleId?: string;
  provider: "email" | "google";
  image?: string;
  Tags?: mongoose.Types.ObjectId[];
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
    },
    Tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tags" }], 
    image: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isProfileCompleted: {
      type: Boolean,
      default: false,
    },
    googleId: {
      type: String,
    },
    provider: {
      type: String,
      enum: ["email", "google"],
      default: "email",
      required: true,
    },
  },
  { timestamps: true }
);

const UserModel: Model<IUser> = mongoose.models["User"] || mongoose.model<IUser>("User", UserSchema);
export default UserModel;
