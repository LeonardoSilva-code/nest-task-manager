import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(
      @InjectRepository(Users)
      private usersRepository: Repository<Users>,
    ) {}
  
  create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOneBy({id: id});
        if (!user) {
          throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
  }

  
  async findOneByUsername(username: string) {
    const user = await this.usersRepository.findOneBy({username: username});
        if (!user) {
          throw new NotFoundException(`User with username ${username} not found`);
        }
        return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    Object.assign(user, updateUserDto);
    return this.usersRepository.save(user);
  }

}
