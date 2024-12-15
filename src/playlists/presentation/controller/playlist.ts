import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AddAudioToPlaylistRequest } from 'src/playlists/use-case/command/playlist/add-audio-to-playlist/request';
import {
  CreatePlaylistBody,
  CreatePlaylistRequest,
} from 'src/playlists/use-case/command/playlist/create-playlist/request';
import { DeleteAudioFromPlaylistRequest } from 'src/playlists/use-case/command/playlist/delete-audio-from-playlist/request';
import { DeletePlaylistRequest } from 'src/playlists/use-case/command/playlist/delete-playlist/request';
import {
  RenamePlaylistBody,
  RenamePlaylistRequest,
} from 'src/playlists/use-case/command/playlist/rename-playlist/request';
import { PlaylistDetailDto } from 'src/playlists/use-case/query/dto/playlist-detail-dto';
import { PlaylistDto } from 'src/playlists/use-case/query/dto/playlist-dto';
import { GetPlaylistDetailRequest } from 'src/playlists/use-case/query/playlist/get-playlist-detail/request';
import { GetPlaylistsRequest } from 'src/playlists/use-case/query/playlist/get-playlists/request';
import { JwtGuard } from '@users/presentation/guard/jwt';

@Controller('playlists')
@ApiTags('playlist')
@ApiBearerAuth()
@UseGuards(JwtGuard)
export class PlaylistController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Get()
  async getPlaylists(
    @Req() request: { user: { userId: string } },
  ): Promise<PlaylistDto[]> {
    return await this.queryBus.execute(
      new GetPlaylistsRequest(request.user.userId),
    );
  }

  @Get(':playlistId')
  async getPlaylistDetail(
    @Param('playlistId') playlistId: string,
    @Req() request: { user: { userId: string } },
  ): Promise<PlaylistDetailDto> {
    return await this.queryBus.execute(
      new GetPlaylistDetailRequest(request.user.userId, playlistId),
    );
  }

  @Post('create')
  @ApiBody({
    type: CreatePlaylistBody,
  })
  async createPlaylist(
    @Body() body: CreatePlaylistBody,
    @Req() request: { user: { userId: string } },
  ): Promise<void> {
    await this.commandBus.execute(
      new CreatePlaylistRequest(body, request.user.userId),
    );
  }

  @Put(':playlistId/add-audio/:audioId')
  async addAudioToPlaylist(
    @Param('playlistId') playlistId: string,
    @Param('audioId') audioId: string,
    @Req() request: { user: { userId: string } },
  ): Promise<void> {
    await this.commandBus.execute(
      new AddAudioToPlaylistRequest(audioId, playlistId, request.user.userId),
    );
  }

  @Put(':playlistId/rename')
  @ApiBody({
    type: RenamePlaylistBody,
  })
  async renamePlaylist(
    @Param('playlistId') playlistId: string,
    @Body() body: RenamePlaylistBody,
    @Req() request: { user: { userId: string } },
  ): Promise<void> {
    await this.commandBus.execute(
      new RenamePlaylistRequest(body, playlistId, request.user.userId),
    );
  }

  @Delete(':playlistId/delete-audio/:audioId')
  async deleteAudioFromPlaylist(
    @Param('playlistId') playlistId: string,
    @Param('audioId') audioId: string,
    @Req() request: { user: { userId: string } },
  ): Promise<void> {
    await this.commandBus.execute(
      new DeleteAudioFromPlaylistRequest(
        audioId,
        playlistId,
        request.user.userId,
      ),
    );
  }

  @Delete(':playlistId')
  async deletePlaylist(
    @Param('playlistId') playlistId: string,
    @Req() request: { user: { userId: string } },
  ): Promise<void> {
    await this.commandBus.execute(
      new DeletePlaylistRequest(playlistId, request.user.userId),
    );
  }
}
