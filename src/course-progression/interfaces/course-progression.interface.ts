import { Document } from 'mongoose';

export interface CourseProgression extends Document {
  courseId: string;
  userId: string;
  completedSteps: {
    [key: number]: number;
  };
}
