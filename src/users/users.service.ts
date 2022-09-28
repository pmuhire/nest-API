import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateUserDto } from './Dtos/user.dto';
import * as bcrpt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const newUser =await this.userRepository.create(createUserDto);
    newUser.password=await bcrpt.hash(newUser.password,10)
    return this.userRepository.save(newUser);
  }

  findUsersById(id: number) {
    return this.userRepository.findOne({where:{id}});
  }

  findUsersByUsername(username: string) {
    return this.userRepository.findOne({where:{username}});
  }

  getUsers(){
    return this.userRepository.find();
  }
}
