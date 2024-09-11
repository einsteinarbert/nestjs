import { Injectable, CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import { TRANSACTIONAL_KEY } from '../decorator/transactional.decorator';
import { Sequelize } from 'sequelize';

@Injectable()
export class TransactionInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly sequelize: Sequelize, // Inject Sequelize instance
  ) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const isTransactional = this.reflector.get<boolean>(TRANSACTIONAL_KEY, context.getHandler());
    if (context.getType() === 'http') {
      const handler = context.getHandler();
      const classRef = context.getClass();

      if (!handler || !classRef) {
        return next.handle(); // Nếu không phải class hoặc method, bỏ qua
      }

      console.log('Class:', classRef.name);
      console.log('Method:', handler.name);
      // Nếu không có decorator @Transactional, bỏ qua
      if (!isTransactional) {
        return next.handle();
      }
      // Thực hiện transaction nếu có @Transactional
      return new Observable(observer => {
        this.sequelize.transaction().then(async (transaction) => {
          next
            .handle()
            .pipe(
              tap(() => {
                console.log("Commiting transaction.");
                transaction.commit();
              }), // Commit nếu thành công
              catchError(async (error) => {
                await transaction.rollback(); // Rollback nếu có lỗi
                console.log("Rollbacked transaction.");
                observer.error(error); // Trả lỗi về Observable
              })
            )
            .subscribe({
              next: (result) => observer.next(result),
              error: (err) => observer.error(err),
              complete: () => observer.complete(),
            });
        });
      });
    }
    return next.handle();
  }
}
