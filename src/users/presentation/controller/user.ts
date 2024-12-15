import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  SignInBody,
  SignInRequest,
} from '@users/use-case/command/user/sign-in/request';
import { SignInResponse } from '@users/use-case/command/user/sign-in/response';
import {
  SignUpBody,
  SignUpRequest,
} from '@users/use-case/command/user/sign-up/request';
import { SignUpResponse } from '@users/use-case/command/user/sign-up/response';
import {
  UpdatePasswordBody,
  UpdatePasswordRequest,
} from '@users/use-case/command/user/update-password/request';
import {
  UpdateProfileBody,
  UpdateProfileRequest,
} from '@users/use-case/command/user/update-profile/request';
import { UpdateProfileResponse } from '@users/use-case/command/user/update-profile/response';
import { UserDto } from '@users/use-case/query/user/dto/user-dto';
import { UserInformationDto } from '@users/use-case/query/user/dto/user-information-dto';
import { GetUserInfomationRequest } from '@users/use-case/query/user/get-user-infomation/request';
import { SearchUsersRequest } from '@users/use-case/query/user/search-users/request';
import { JwtGuard } from '../guard/jwt';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@Controller('users')
@ApiTags('user')
export class UserController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Get('search')
  @ApiQuery({
    required: true,
    name: 'key',
  })
  async searchUsers(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('key') key: string,
  ): Promise<UserDto[]> {
    return await this.queryBus.execute(
      new SearchUsersRequest(page, limit, key),
    );
  }

  @Get(':userId')
  async getUserInformation(
    @Param('userId') userId: string,
  ): Promise<UserInformationDto> {
    return await this.queryBus.execute(new GetUserInfomationRequest(userId));
  }

  @Post('sign-in')
  @ApiBody({
    type: SignInBody,
    examples: {
      TranPhong: {
        value: {
          email: 'tranphong123@gmail.com',
          password: 'Tranphong_123',
        },
      },
      SonTungMTP: {
        value: {
          email: 'sontungmtp123@gmail.com',
          password: 'Sontungmpt_123',
        },
      },
      Avicii: {
        value: {
          email: 'avicii123@gmail.com',
          password: 'Avicii_123',
        },
      },
      AdminOne: {
        value: {
          email: 'adminone123@gmail.com',
          password: 'Adminone_123',
        },
      },
    },
  })
  async signIn(@Body() body: SignInBody): Promise<SignInResponse> {
    return await this.commandBus.execute(new SignInRequest(body));
  }

  @Post('sign-up')
  @ApiBody({
    type: SignUpBody,
  })
  async signUp(@Body() body: SignUpBody): Promise<SignUpResponse> {
    return await this.commandBus.execute(new SignUpRequest(body));
  }

  @Put('update-password')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiBody({
    type: UpdatePasswordBody,
  })
  async updatePassword(
    @Body() body: UpdatePasswordBody,
    @Req() request: { user: { userId: string } },
  ): Promise<void> {
    await this.commandBus.execute(
      new UpdatePasswordRequest(body, request.user.userId),
    );
  }

  @Put('update-profile')
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UpdateProfileBody,
  })
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  async updateProfile(
    @UploadedFile() avatar: Express.Multer.File,
    @Body() body: Omit<UpdateProfileBody, 'avatar'>,
    @Req() request: { user: { userId: string } },
  ): Promise<UpdateProfileResponse | void> {
    return await this.commandBus.execute(
      new UpdateProfileRequest(avatar, body, request.user.userId),
    );
  }
}
