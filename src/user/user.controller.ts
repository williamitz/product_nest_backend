import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { JwtUser } from 'src/auth/decorator/jwt-user.decorator';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Auth()
  create(@Body() createUserDto: CreateUserDto, @JwtUser() user: User) {
    console.log({ user });
    return this.userService.create(createUserDto);
  }
  
  @Get()
  @Auth()
  findAll( @JwtUser() user: User ) {
    console.log({ user });
    // throw new BadRequestException('Bad request');
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
