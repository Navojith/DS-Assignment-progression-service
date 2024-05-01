import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'course-progression' })
export class CourseProgression {
  @Prop({ required: true })
  courseId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  completedSteps: number;
}
export const CourseProgressionSchema =
  SchemaFactory.createForClass(CourseProgression);