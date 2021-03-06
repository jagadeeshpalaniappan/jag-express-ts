import mongoose from 'mongoose';

export type AuthDocument = mongoose.Document & {
  username: string;
  password: string;
  salt: string;
  roles: Array<string>;
  name: string;
};

const authSchema = new mongoose.Schema<AuthDocument>(
  {
    username: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
    },
    password: String,
    salt: String,
    roles: [String],
    name: String,
  },
  { timestamps: true },
);
export const Auth = mongoose.model<AuthDocument>('Auth', authSchema);
