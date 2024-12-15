import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCommentRequest {
  constructor(
    public data: CreateCommentBody,
    public audioId: string,
    public userId: string,
  ) {}
}

export class CreateCommentBody {
  @ApiProperty({
    required: true,
    type: 'string',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(256)
  content: string;
}
