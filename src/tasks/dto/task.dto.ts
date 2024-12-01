import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class TaskDto {
    @ApiProperty({ description: 'The task description', example: 'Buy groceries' })
    @IsNotEmpty()
    task: string;

    @ApiPropertyOptional({ description: 'Is the task done?', example: false })
    @IsBoolean()
    @IsOptional()
    done: boolean;
}