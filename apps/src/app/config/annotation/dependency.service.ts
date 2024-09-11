import {Inject, Injectable} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Sequelize } from 'sequelize';

@Injectable()
export class DependencyService {
  constructor(
    readonly reflector: Reflector,
    @Inject('SEQUELIZE') readonly sequelize: Sequelize
  ) {}

  getReflector(): Reflector {
    return this.reflector;
  }

  getSequelize(): Sequelize {
    return this.sequelize;
  }
}
