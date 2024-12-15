import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class RenameCategoryRequest {
  constructor(
    public data: RenameCategoryBody,
    public categoryId: string,
    public userId: string,
  ) {}
}

export class RenameCategoryBody {
  @ApiProperty({
    type: 'string',
    required: true,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(25)
  name: string;
}
