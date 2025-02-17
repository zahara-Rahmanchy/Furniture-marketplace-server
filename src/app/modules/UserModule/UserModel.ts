/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-undef */
import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './UserInterface';
import config from '../../config';
import bcrypt from 'bcrypt';

const UserSchema = new Schema<IUser, UserModel>(
  {
    username: {
      type: String,
      required: true,
      message: 'Username is required',
      unique: true,
    },
    email: { type: String, required: true, message: 'Email is required' },
    password: {
      type: String,
      required: true,
      message: 'Password is required',
      minlength: [6, 'Password should be at least 6 characters'],
      maxlength: [20, 'Password cannot be more than 20 characters'],
      select: 0,
    },
    role: {
      type: String,
      enum: ['seller', 'buyer'],
      required: true,
    },
  },

  {
    timestamps: true,
    toJSON: {
      transform: function (doc, data) {
        delete data.password;
      },
    },
  },
);
UserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias

  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

UserSchema.statics.isUserExists = async function (username: string) {
  return await User.findOne({ username }).select({
    _id: 1,
    username: 1,
    password: 1,
    email: 1,
    role: 1,
  });
};
UserSchema.statics.isPasswordCorrect = async function (
  plaintext: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(plaintext, hashedPassword);
};

UserSchema.statics.isCreatedBy = async function (username: string) {
  console.log('entered isCreatedBy: ', username);
  const result = await User.findOne({ username }, { _id: 1 });
  return result?._id;
};

export const User = model<IUser, UserModel>('User', UserSchema);
