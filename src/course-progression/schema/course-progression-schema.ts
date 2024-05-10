import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CompletedSteps } from '../course-progression.service';

@Schema({ collection: 'course-progression' })
export class CourseProgression {
  @Prop({ required: true })
  courseId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ type: Object, required: true, default: {} }) // Define completedSteps as a map of numbers
  completedSteps: CompletedSteps;
}
export const CourseProgressionSchema =
  SchemaFactory.createForClass(CourseProgression);
