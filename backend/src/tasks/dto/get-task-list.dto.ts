import { IsOptional, IsIn } from 'class-validator';

export class GetTasksFilterDto {
  @IsOptional()
  @IsIn(['pending', 'completed'])
  status?: string;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc';
}
