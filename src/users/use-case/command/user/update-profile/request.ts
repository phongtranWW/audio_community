import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '@users/domain/value-object/gender';
import { IsEnum, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateProfileRequest {
  constructor(
    public avatar: Express.Multer.File,
    public data: Omit<UpdateProfileBody, 'avatar'>,
    public userId: string,
  ) {}
}

export class UpdateProfileBody {
  @ApiProperty({
    required: true,
    type: 'enum',
    enum: Gender,
  })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(25)
  firstName: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(25)
  lastName: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(25)
  stageName: string;

  @ApiProperty({
    required: true,
    type: 'string',
    format: 'binary',
  })
  avatar: Express.Multer.File;
}
