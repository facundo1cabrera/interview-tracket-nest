import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

import { LoginUserDto, CreateUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';
import { RoleProtected } from './decorators/role-protected.decorator';
import { UserRoleGuard } from './guards/user-role.guard';
import { ValidRoles } from './interfaces';
import { Auth } from './decorators';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async createUser(@Body() createAuthDto: CreateUserDto) {
    return await this.authService.create(createAuthDto);
  }

  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto);
  }


  @Get('private')
  @Auth()
  testPrivateRoute(
    @GetUser() user: User,
  ) {
    return {
      ok: true,
      message: "",
      user
    }
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(
    @GetUser() user: User
  ) {
    return this.authService.checkAuthStatus( user )
  }
}
