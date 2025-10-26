import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
    {
      // Required for everyone
      email: {
        type: String,
        unique: [true, 'Email already exists'],
        required: [true, 'Email is required'],
      },
      username: {
        type: String,
        required: [true, 'Username is required'],
      },
      image: String,
      role: {
        type: String,
        enum: ['user', 'handyman'],
        default: 'user',
        required: true,
      },
  
      // Optional for both
      phone: {
          type: String,
          default: ''
      },
      address: {
        type: String,
        default: ''
    },
  
      // Optional only for handymen
      services: {
        type: [String],
      },
      rate: {
        type: Number,
      },
      experience: {
        type: String,
      },
      available: {
        type: Boolean,
        default: false
      }
    },
    { timestamps: true }
  );
  
UserSchema.index({ location: '2dsphere' });

const User = models.User || model('User', UserSchema);

export default User;
