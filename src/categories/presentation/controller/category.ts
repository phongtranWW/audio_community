import {
  CreateCategoryBody,
  CreateCategoryRequest,
} from '@categories/use-case/command/category/create-category/request';
import {
  RenameCategoryBody,
  RenameCategoryRequest,
} from '@categories/use-case/command/category/rename-category/request';
import { GetCategoriesRequest } from '@categories/use-case/query/category/get-categories/request';
import { CategoryDto } from '@categories/use-case/query/dto/category-dto';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Role } from '@users/domain/value-object/role';
import { Roles } from '@users/presentation/decorator/role';
import { JwtGuard } from '@users/presentation/guard/jwt';
import { RoleGuard } from '@users/presentation/guard/role';

@Controller('categories')
@ApiTags('category')
export class CategoryController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Get()
  async getCategories(): Promise<CategoryDto[]> {
    return await this.queryBus.execute(new GetCategoriesRequest());
  }

  @Post('create')
  @ApiBearerAuth()
  @ApiBody({
    type: CreateCategoryBody,
  })
  @Roles(Role.Admin)
  @UseGuards(RoleGuard)
  @UseGuards(JwtGuard)
  async createCategory(
    @Body() body: CreateCategoryBody,
    @Req() request: { user: { userId: string } },
  ): Promise<void> {
    return await this.commandBus.execute(
      new CreateCategoryRequest(body, request.user.userId),
    );
  }

  @Put(':categoryId/rename')
  @ApiBearerAuth()
  @ApiBody({
    type: RenameCategoryBody,
  })
  @Roles(Role.Admin)
  @UseGuards(RoleGuard)
  @UseGuards(JwtGuard)
  async renameCategory(
    @Param('categoryId') categoryId: string,
    @Body() body: RenameCategoryBody,
    @Req() request: { user: { userId: string } },
  ): Promise<void> {
    return await this.commandBus.execute(
      new RenameCategoryRequest(body, categoryId, request.user.userId),
    );
  }
}
