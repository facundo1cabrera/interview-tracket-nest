import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LoginUserDto, CreateUserDto } from './dto';
import { User } from './entities/user.entity';

import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
    ) {}
  
  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create({
        ...createUserDto,
        password: bcrypt.hashSync(createUserDto.password, 10)
      });

      await this.userRepository.save(user);
      return {
        email: user.email,  
        id: user.id
      }
    } catch (e) {
      throw new BadRequestException("User already exists");
      console.log(e);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
  

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, id: true, password: true }
    });

    if ( !user )
      throw new UnauthorizedException();

    if ( !bcrypt.compareSync( password, user.password ))
      throw new UnauthorizedException();

    const currentDate = new Date();
    return { id: user.id, token: this.getJwtToken({ id: user.id }), expiration: currentDate.setHours(currentDate.getHours() + 6)};
  }

  private getJwtToken( payload: JwtPayload ) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  async checkAuthStatus(user: User) {
    return {
      id: user.id,
      token: this.getJwtToken({ id: user.id })
    }
  }
}
