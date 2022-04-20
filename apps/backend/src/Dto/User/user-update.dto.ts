import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserUpdateDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  email?: string;
}
