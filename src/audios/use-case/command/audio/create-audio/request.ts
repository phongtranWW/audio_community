import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateAudioRequest {
  constructor(
    public image: Express.Multer.File,
    public sound: Express.Multer.File,
    public data: Omit<CreateAudioBody, 'image' & 'sound'>,
    public userId: string,
  ) {}
}

export class CreateAudioBody {
  @ApiProperty({
    required: true,
    type: 'string',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @ApiProperty({
    required: false,
    type: 'string',
  })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  description: string;

  @ApiProperty({
    required: true,
    type: 'string',
  })
  @IsUUID()
  categoryId: string;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
    required: true,
  })
  image: Express.Multer.File[];

  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
    required: true,
  })
  sound: Express.Multer.File[];
}
