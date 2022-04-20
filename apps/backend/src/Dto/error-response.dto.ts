import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ErrorResponseDto {
  @ApiPropertyOptional()
  @IsString()
  code: string;

  @ApiProperty()
  @IsNumber()
  status: number;

  @ApiProperty()
  @IsString()
  message: string;

  @ApiPropertyOptional()
  @IsString()
  name: string;
}
