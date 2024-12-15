import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';

export class SignUpRequest {
  constructor(public data: SignUpBody) {}
}

export class SignUpBody {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsEmail()
  public email: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsStrongPassword()
  public password: string;
}
