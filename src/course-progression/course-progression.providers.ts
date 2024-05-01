import { Mongoose } from 'mongoose';
import { CourseProgressionSchema } from './schema/course-progression-schema';

export const courseProgressionProviders = [
  {
    provide: 'COURSE_PROGRESSION_MODEL',
    useFactory: (mongoose: Mongoose) =>
      mongoose.model('CourseProgression', CourseProgressionSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
