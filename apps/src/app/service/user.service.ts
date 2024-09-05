import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repo/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  findAll() {
    return this.userRepository.findAll();
  }

  create(user: any) {
    return this.userRepository.save(user);
  }
}