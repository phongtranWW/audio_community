import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SignInRequest {
  constructor(public data: SignInBody) {}
}

export class SignInBody {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsEmail()
  public email: string;

  @IsString()
  @ApiProperty({
    required: true,
    type: String,
  })
  public password: string;
}
