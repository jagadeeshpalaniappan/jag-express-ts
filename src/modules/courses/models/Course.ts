import mongoose from 'mongoose';

export type CourseDocument = mongoose.Document & {
  title: string;
  description: string;
};

const courseSchema = new mongoose.Schema<CourseDocument>(
  {
    title: String,
    description: String,
  },
  { timestamps: true },
);
export const Course = mongoose.model<CourseDocument>('Course', courseSchema);
