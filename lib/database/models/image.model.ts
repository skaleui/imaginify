import { Schema, models, model, Document } from 'mongoose';


export interface IImage extends Document {
  title: string;
  transformationType: string;
  publicId: string;
  secureUrl: URL;
  width?: number; // Optional because it's not marked as required
  height?: number; // Optional because it's not marked as required
  config?: Record<string, any>; // 'Object' type can be represented as a Record in TypeScript
  transformationUrl?: URL; // Optional because it's not marked as required
  aspectRatio?: string; // Optional because it's not marked as required
  color?: string; // Optional because it's not marked as required
  prompt?: string; // Optional because it's not marked as required
  author: {
    _id: string;
    firstName: string;
    lastName: string;
  }; // Using object author 
  createdAt?: Date; // Default value is provided, so it's optional
  updatedAt?: Date; // Default value is provided, so it's optional
}

const ImageSchema = new Schema({
  title: { type: String, required: true },
  transformationType: { type: String, required: true },
  publicId: { type: String, required: true },
  secureUrl: { type: URL, required: true },
  width: { type: Number },
  height: { type: Number },
  config: { type: Object },
  transformationUrl: { type: URL },
  aspectRatio: { type: String },
  color: { type: String },
  prompt: { type: String },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Image = models?.Image || model('Image', ImageSchema);

export default Image;

