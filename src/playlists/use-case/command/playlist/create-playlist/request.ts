import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePlaylistRequest {
  constructor(
    public data: CreatePlaylistBody,
    public userId: string,
  ) {}
}

export class CreatePlaylistBody {
  @ApiProperty({
    type: 'string',
    required: true,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(25)
  name: string;
}
