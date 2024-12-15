import { ApiProperty } from '@nestjs/swagger';
import { IsStrongPassword } from 'class-validator';

export class UpdatePasswordRequest {
  constructor(
    public data: UpdatePasswordBody,
    public userId: string,
  ) {}
}

export class UpdatePasswordBody {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsStrongPassword()
  currentPassword: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsStrongPassword()
  newPassword: string;
}
