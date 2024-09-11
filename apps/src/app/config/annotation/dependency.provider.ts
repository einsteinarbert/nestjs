import { DependencyService } from './dependency.service';

export const DependencyProviders = [
  {
    provide: 'dependency_service',
    useValue: DependencyService,
  },
];
