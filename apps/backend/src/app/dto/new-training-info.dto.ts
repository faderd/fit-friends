import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class NewTrainingInfoDto {
  @Transform(({ value }) => +value)
  @IsNumber()
  public newTrainingId: number;

  @Transform(({ value }) => +value)
  @IsNumber()
  public coachId: number;
}
