import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
    @ApiProperty({ description: "User's username", example: 'ali' })
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty({ description: "User's password", example: 'ali1234' })
    @IsNotEmpty()
    password: string;
}
