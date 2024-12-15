import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateCommentRequest {
  constructor(
    public data: UpdateCommentBody,
    public commentId: string,
    public audioId: string,
    public userId: string,
  ) {}
}

export class UpdateCommentBody {
  @ApiProperty({
    required: true,
    type: 'string',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(256)
  content: string;
}
