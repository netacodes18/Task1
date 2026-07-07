import mongoose, { Schema, Document } from 'mongoose';

export interface IStudent extends Document {
  name: string;
  marks: number;
  category: string;
  applicationDate: Date;
  preferences: mongoose.Types.ObjectId[];
  isAllocated: boolean;
  allocatedCourse: mongoose.Types.ObjectId | null;
  preferenceMet: number | null;
  isWaitlisted: boolean;
  waitlistCourse: mongoose.Types.ObjectId | null;
  waitlistNumber: number | null;
}

const StudentSchema: Schema = new Schema({
  name: { type: String, required: true },
  marks: { type: Number, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['General', 'OBC', 'SC', 'ST']
  },
  applicationDate: { type: Date, default: Date.now },
  preferences: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  isAllocated: { type: Boolean, default: false },
  allocatedCourse: { type: Schema.Types.ObjectId, ref: 'Course', default: null },
  preferenceMet: { type: Number, default: null },
  isWaitlisted: { type: Boolean, default: false },
  waitlistCourse: { type: Schema.Types.ObjectId, ref: 'Course', default: null },
  waitlistNumber: { type: Number, default: null }
});

export default mongoose.model<IStudent>('Student', StudentSchema);
