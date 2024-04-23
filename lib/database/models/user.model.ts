import { Schema, model, models } from 'mongoose';

//clerkId, email, username, photo, firstName, lastName, planId, creditBalance
const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true},
  email: { type: String, required: true, unique: true },
  username: { type: String, required: false, unique: true },
 photo: { type: String, required: false },
 firstName: { type: String, requried:false },
 lastName: { type: String, required:false },
 // planId: { type: Number, default: 1 },
 // creditBalance: { type: Number, default: 10},
});

const User = models?.user || model('User', UserSchema);

export default User;