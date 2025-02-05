import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Logger } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Users } from './entities/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('api/v1/users')
@Controller('/api/v1/users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @Post()
    @ApiOperation({ summary: 'Create a new user' })
    @ApiOkResponse({
      description: 'The user',
      type: Users,
      isArray: false
    })
  async create(@Body() createUserDto: CreateUserDto) {
    this.logger.log(`Creating a new user with email: ${createUserDto.email}`);

    const user = await this.usersService.create(createUserDto);
    this.logger.log(`User created successfully: ${user.id}`);

    return user;
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get a user by id' })
  @ApiOkResponse({
    description: 'The user',
    type: Users,
    isArray: false
  })
  async findOne(@Param('id') id: string) {
    this.logger.log(`Fetching user with id: ${id}`);

    const user = await this.usersService.findOne(id);
    if (user) {
      this.logger.log(`User found: ${user.id}`);
    } else {
      this.logger.warn(`User not found with id: ${id}`);
    }

    return user;
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update a user' })
  @ApiOkResponse({
    description: 'The user',
    type: Users,
    isArray: false
  })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    this.logger.log(`Updating user with id: ${id}`);
    
    const updatedUser = await this.usersService.update(id, updateUserDto);
    this.logger.log(`User updated successfully: ${updatedUser.id}`);

    return updatedUser
  }
}
