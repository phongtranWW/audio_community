import {
  CreateAudioBody,
  CreateAudioRequest,
} from '@audio/use-case/command/audio/create-audio/request';
import { CreateAudioResponse } from '@audio/use-case/command/audio/create-audio/response';
import { DeleteAudioRequest } from '@audio/use-case/command/audio/delete-audio/request';
import { LikeAudioRequest } from '@audio/use-case/command/audio/like-audio/request';
import { ListenAudioRequest } from '@audio/use-case/command/audio/listen-audio/request';
import { UnlikeAudioRequest } from '@audio/use-case/command/audio/unlike-audio/request';
import {
  CreateCommentBody,
  CreateCommentRequest,
} from '@audio/use-case/command/comment/create-comment/request';
import { DeleteCommentRequest } from '@audio/use-case/command/comment/delete-comment/request';
import {
  UpdateCommentBody,
  UpdateCommentRequest,
} from '@audio/use-case/command/comment/update-comment/request';
import { GetAudioDetailRequest } from '@audio/use-case/query/audio/get-audio-detail/request';
import { GetAudiosRequest } from '@audio/use-case/query/audio/get-audios/request';
import { GetAudioCommentsRequest } from '@audio/use-case/query/comment/get-audio-comments/request';
import { AudioDto } from '@audio/use-case/query/dto/audio-dto';
import { CommentDto } from '@audio/use-case/query/dto/comment-dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from '@users/presentation/guard/jwt';

@Controller('audios')
@ApiTags('audio')
export class AudioController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Get()
  @ApiQuery({
    name: 'page',
    required: true,
  })
  @ApiQuery({
    name: 'limit',
    required: true,
  })
  @ApiQuery({
    name: 'categoryId',
    required: false,
  })
  @ApiQuery({
    name: 'userId',
    required: false,
  })
  @ApiQuery({
    name: 'key',
    required: false,
  })
  async getAudios(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('categoryId') categoryId?: string,
    @Query('userId') userId?: string,
    @Query('key') key?: string,
  ): Promise<AudioDto[]> {
    return await this.queryBus.execute(
      new GetAudiosRequest(page, limit, categoryId, userId, key),
    );
  }

  @Get(':audioId')
  async getAudioDetail(@Param('audioId') audioId: string): Promise<AudioDto[]> {
    return await this.queryBus.execute(new GetAudioDetailRequest(audioId));
  }

  @Get(':audioId/comments')
  async getAudioComments(
    @Param('audioId') audioId: string,
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ): Promise<CommentDto[]> {
    return await this.queryBus.execute(
      new GetAudioCommentsRequest(page, limit, audioId),
    );
  }

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @ApiBody({ type: CreateAudioBody })
  @UseGuards(JwtGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'sound', maxCount: 1 },
    ]),
  )
  async createAudio(
    @UploadedFiles()
    files: {
      image: Express.Multer.File[];
      sound: Express.Multer.File[];
    },
    @Body() body: Omit<CreateAudioBody, 'image' & 'sound'>,
    @Req() request: { user: { userId: string } },
  ): Promise<CreateAudioResponse> {
    return await this.commandBus.execute(
      new CreateAudioRequest(
        files.image[0],
        files.sound[0],
        body,
        request.user.userId,
      ),
    );
  }

  @Post(':audioId/comments/create')
  @ApiBearerAuth()
  @ApiBody({
    type: CreateCommentBody,
  })
  @UseGuards(JwtGuard)
  async createComment(
    @Param('audioId') audioId: string,
    @Body() body: CreateCommentBody,
    @Req() request: { user: { userId: string } },
  ): Promise<void> {
    return await this.commandBus.execute(
      new CreateCommentRequest(body, audioId, request.user.userId),
    );
  }

  @Put(':audioId/like')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  async likeAudio(
    @Param('audioId') audioId: string,
    @Req() request: { user: { userId: string } },
  ): Promise<void> {
    return await this.commandBus.execute(
      new LikeAudioRequest(audioId, request.user.userId),
    );
  }

  @Put(':audioId/unlike')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  async unlikeAudio(
    @Param('audioId') audioId: string,
    @Req() request: { user: { userId: string } },
  ): Promise<void> {
    return await this.commandBus.execute(
      new UnlikeAudioRequest(audioId, request.user.userId),
    );
  }

  @Put(':audioId/listen')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  async listenAudio(
    @Param('audioId') audioId: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Req() request: { user: { userId: string } },
  ): Promise<void> {
    return await this.commandBus.execute(new ListenAudioRequest(audioId));
  }

  @Put(':audioId/comments/:commentId/update')
  @ApiBearerAuth()
  @ApiBody({
    type: UpdateCommentBody,
  })
  @UseGuards(JwtGuard)
  async updateComment(
    @Param('audioId') audioId: string,
    @Param('commentId') commentId: string,
    @Body() body: UpdateCommentBody,
    @Req() request: { user: { userId: string } },
  ): Promise<void> {
    return await this.commandBus.execute(
      new UpdateCommentRequest(body, commentId, audioId, request.user.userId),
    );
  }

  @Delete(':audioId')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  async deleteAudio(
    @Param('audioId') audioId: string,
    @Req() request: { user: { userId: string } },
  ): Promise<void> {
    return await this.commandBus.execute(
      new DeleteAudioRequest(audioId, request.user.userId),
    );
  }

  @Delete(':audioId/comments/:commentId/delete')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  async deleteComment(
    @Param('audioId') audioId: string,
    @Param('commentId') commentId: string,
    @Req() request: { user: { userId: string } },
  ): Promise<void> {
    return await this.commandBus.execute(
      new DeleteCommentRequest(commentId, audioId, request.user.userId),
    );
  }
}
