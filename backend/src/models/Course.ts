import mongoose, { Schema, Document } from 'mongoose';

export interface ICourse extends Document {
  name: string;
  totalSeats: number;
  generalSeats: number;
  obcSeats: number;
  scSeats: number;
  stSeats: number;
}

const CourseSchema: Schema = new Schema({
  name: { type: String, required: true },
  totalSeats: { type: Number, required: true },
  generalSeats: { type: Number, required: true },
  obcSeats: { type: Number, required: true },
  scSeats: { type: Number, required: true },
  stSeats: { type: Number, required: true },
});

export default mongoose.model<ICourse>('Course', CourseSchema);
