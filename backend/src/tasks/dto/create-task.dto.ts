import { IsString, IsNotEmpty, IsIn } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsIn(['pending', 'completed'])
  status?: string = 'pending'; // Default value
}
