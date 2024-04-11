import { Schema, model, models } from 'mongoose';

//clerkId, email, username, photo, firstName, lastName, planId, creditBalance
const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true},
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  photo: { type: String, required: false },
  firstName: { type: String },
  lastName: { type: String },
  planId: { type: Number, default: 1 },
  creditBalance: { type: Number, default: 10},
});

const User = models?.user || model('User', UserSchema);

export default User;