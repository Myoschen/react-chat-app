import { Schema, ObjectId, model } from "mongoose";

export interface IUser {
  id: ObjectId;
  username: string;
  password: string;
  email: string;
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 16,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 20,
  },
  email: {
    type: String,
  }
});

const User = model('User', userSchema);

export default User;