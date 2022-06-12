import { Schema, model, Document, Model } from "mongoose";
import bcrypt from 'bcrypt';
import validator from 'validator';

export interface IUser {
  username: string;
  password: string;
  email: string;
}

interface UserDocument extends IUser, Document {
  comparePassword: (password: string) => boolean;
};

interface UserModel extends Model<UserDocument> {
  login: (email: string, password: string) => Promise<UserDocument>;
};

const UserSchema = new Schema<UserDocument>({
  username: {
    type: String,
    required: [true, 'Please enter a name!'],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'The password should be at least 6 characters long!'],
  },
  email: {
    type: String,
    required: [true, 'Please enter a email!'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid email address!']
  }
});

// Hash password with bcrypt
UserSchema.pre<UserDocument>('save', function(next) {
  let user = this;
  
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  const encrypted = bcrypt.hashSync(this.password, 10);
  
  // Replace the password with the hash
  this.password = encrypted;

  return next();
});

// Compare password
UserSchema.methods.comparePassword = function(this: UserDocument, password: string) {
  return bcrypt.compareSync(password, this.password);
}

// Login
UserSchema.statics.login = async function(email: string, password: string) {
  const user = await this.findOne({ email });
  if (user) {
    const isAuthenticated = await user.comparePassword(password);
    if (isAuthenticated) {
      return user;
    } else {
      throw Error('Incorrect password');
    }
  } else {
    throw Error('Incorrect email');
  }
}

export default model<UserDocument, UserModel>('User', UserSchema);