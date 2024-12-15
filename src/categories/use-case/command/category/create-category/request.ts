import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCategoryRequest {
  constructor(
    public data: CreateCategoryBody,
    public userId: string,
  ) {}
}

export class CreateCategoryBody {
  @ApiProperty({
    type: 'string',
    required: true,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(25)
  name: string;
}
