When you generate a NestJS app using Nx with the command `nx g @nrwl/nest:app my-app`, Nx creates a well-structured monorepo that organizes your NestJS application within a larger workspace. Here's an overview of the project structure:

### Typical Nx + NestJS Project Structure

```
my-workspace/
├── apps/
│   └── my-app/
│       ├── src/
│       │   ├── app/
│       │   │   ├── app.controller.ts
│       │   │   ├── app.controller.spec.ts
│       │   │   ├── app.module.ts
│       │   │   └── app.service.ts
│       │   ├── main.ts
│       │   └── assets/
│       ├── test/
│       ├── jest.config.ts
│       ├── tsconfig.app.json
│       ├── tsconfig.json
│       ├── tsconfig.spec.json
│       └── tslint.json
├── libs/
├── node_modules/
├── tools/
├── nx.json
├── workspace.json (or angular.json)
├── package.json
├── tsconfig.base.json
└── tslint.json
```

### Detailed Breakdown

#### 1. **`apps/` Folder**:
   - This folder contains all your applications in the Nx workspace. For a NestJS application, you will find a directory named `my-app` (or the name you gave during generation).
   - Each app has its own isolated space for code, tests, and configurations.

   ##### Inside `apps/my-app/`:
   
   - **`src/`**: Contains the source code for the application.
     - **`app/`**: This folder contains the main files of your NestJS app:
       - **`app.controller.ts`**: A sample controller that handles incoming requests.
       - **`app.controller.spec.ts`**: A basic unit test file for the controller.
       - **`app.module.ts`**: The main application module, where the components of the app are organized.
       - **`app.service.ts`**: A service file that handles business logic.
     - **`main.ts`**: The entry point of the NestJS application, which bootstraps the `AppModule`.
     - **`assets/`**: (Optional) This directory holds static files or assets for the application.
   
   - **`test/`**: This folder contains the unit and integration tests specific to the app.

   - **`jest.config.ts`**: Jest configuration for the app, enabling testing capabilities.

   - **`tsconfig.app.json`**: TypeScript configuration specific to the app's source code.

   - **`tsconfig.json`**: A general TypeScript configuration file.

   - **`tsconfig.spec.json`**: TypeScript configuration for the tests.

   - **`tslint.json`**: Linting rules specific to the app.

#### 2. **`libs/` Folder**:
   - The `libs` folder is used to store shared libraries and modules that can be reused across multiple applications in your monorepo.
   - You can generate a library (e.g., for services, DTOs, or utility functions) using Nx, and it will be placed here.

#### 3. **`tools/` Folder**:
   - This folder is optional and can be used to define custom scripts, migrations, or tools that apply to the entire workspace.

#### 4. **`node_modules/` Folder**:
   - Contains the dependencies for the entire workspace.

#### 5. **Configuration Files**:
   - **`nx.json`**: Nx-specific configuration file, which defines the monorepo's settings and target defaults.
   - **`workspace.json` (or `angular.json`)**: Configuration file for workspace projects and their settings, including how to build and serve them.
   - **`package.json`**: The standard npm configuration file that defines dependencies and scripts.
   - **`tsconfig.base.json`**: Base TypeScript configuration file, extending it to other `tsconfig` files across the workspace.
   - **`tslint.json`**: Linting configuration for the entire workspace.

### Key Features:
- **Modular Architecture**: Nx promotes a modular architecture by dividing applications and libraries, making it easier to manage large projects with shared components.
- **Code Sharing**: By using the `libs/` folder, you can share code between different applications in the monorepo (e.g., between different NestJS services or even a frontend React/Angular app).
- **Testing**: Nx comes with Jest support built-in, and test configurations are already set up for the generated app.
- **Scalability**: Nx is designed to help teams manage large-scale projects with multiple applications and services in one place.

This structure helps maintain a clean and scalable organization of your codebase, suitable for both small and large projects.

## add new function

To place the new **controller**, **service**, and **repository** in a new package (submodule) within the `app/` directory, you'll follow the same pattern as before but isolate the new functionality in a separate folder under `app/`. This separation helps maintain modularity and organization, particularly in larger applications.

### Steps to Organize the New Package (Submodule):

Let's assume the new submodule is related to **users**, and you want to create a new folder/package called `user/` under `app/`.

### 1. **Create the New Submodule Folder**:

First, create a folder inside `app/` for the new feature/module.

```
src/
└── app/
    └── user/  <-- New folder for the user submodule
```

### 2. **Add the New Service**:

Inside the new `user/` folder, create `user.service.ts`.

```typescript
// src/app/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

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
```

### 3. **Add the New Repository**:

In the same `user/` folder, create `user.repository.ts`.

```typescript
// src/app/user/user.repository.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  private readonly users = [];

  findAll() {
    return this.users;
  }

  save(user: any) {
    this.users.push(user);
    return user;
  }
}
```

### 4. **Add the New Controller**:

Now, create `user.controller.ts` in the `user/` folder.

```typescript
// src/app/user/user.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post()
  create(@Body() user: any) {
    return this.userService.create(user);
  }
}
```

### 5. **Create the User Module**:

Next, create a **module** to group all the user-related functionality. Create `user.module.ts` in the `user/` folder.

```typescript
// src/app/user/user.module.ts
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
```

### 6. **Update the App Module to Include the User Submodule**:

Finally, update the `app.module.ts` file to import the new `UserModule` so that NestJS can use it.

```typescript
// src/app/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';  // Import UserModule

@Module({
  imports: [UserModule],  // Add UserModule to the imports array
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### Updated Project Structure

After adding the new submodule, the project structure should look like this:

```
my-workspace/
├── apps/
│   └── my-app/
│       ├── src/
│       │   ├── app/
│       │   │   ├── app.controller.ts
│       │   │   ├── app.controller.spec.ts
│       │   │   ├── app.module.ts
│       │   │   ├── app.service.ts
│       │   │   └── user/                    <-- New folder for user submodule
│       │   │       ├── user.controller.ts   <-- New controller
│       │   │       ├── user.module.ts       <-- New module
│       │   │       ├── user.repository.ts   <-- New repository
│       │   │       └── user.service.ts      <-- New service
│       ├── test/
│       ├── jest.config.ts
│       ├── tsconfig.app.json
│       ├── tsconfig.json
│       ├── tsconfig.spec.json
│       └── tslint.json
├── libs/
├── node_modules/
├── tools/
├── nx.json
├── workspace.json
├── package.json
├── tsconfig.base.json
└── tslint.json
```

### Explanation:

- **`user/` submodule**:
  - This folder contains everything related to the "user" feature of the application (controller, service, repository, and module).
  - **`user.module.ts`** groups together the `UserController`, `UserService`, and `UserRepository`.
  
- **Modular Approach**: NestJS promotes a modular architecture by organizing related functionality into modules (in this case, the `UserModule`). This helps maintain clean and scalable code.

By organizing your project like this, you create self-contained, reusable modules that can be easily maintained and extended in the future. This structure is particularly useful when building large, scalable applications.

**Testing API**
> [find alll api](http://localhost:3333/api/v1/users/find-all)

```json
[{"name":"HieuTT77","level":"SA"}]
```