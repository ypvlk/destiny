import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginCredentialsBodyDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email message' })
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
