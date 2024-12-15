import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class RenamePlaylistRequest {
  constructor(
    public data: RenamePlaylistBody,
    public playlistId: string,
    public userId: string,
  ) {}
}

export class RenamePlaylistBody {
  @ApiProperty({
    type: 'string',
    required: true,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(25)
  name: string;
}
