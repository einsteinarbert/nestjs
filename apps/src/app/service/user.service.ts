import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repo/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll() {
    return await this.userRepository.findAll();
  }

  create(user: any) {
    return this.userRepository.save(user);
  }
}