export class CreateCourseProgressionDto {
  readonly courseId: string;
  readonly userId: string;
  readonly completedSteps: {
    [key: number]: number;
  };
}
