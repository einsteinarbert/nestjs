import { Observable, Observer } from 'rxjs';
import { DependencyService } from '../dependency.service';

let dependencyService: DependencyService;
export function Transactional() {
    return function (
        target: any,
        propertyKey: string,
        descriptor: TypedPropertyDescriptor<any>,
    ) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args: any[]) {

            if (!dependencyService) {
                throw new Error('DependencyService not available');
            }
            const _reflector = dependencyService.getReflector();
            const sequelize = dependencyService.getSequelize();
            return new Observable((obs: Observer<any>) => {
                sequelize.transaction().then(async (transaction) => {
                    try {
                        // Call the original method within the transaction context
                        const result = await originalMethod.apply(this, [...args, { transaction }]);

                        // Commit the transaction if everything goes well
                        console.log('Committing transaction.');
                        await transaction.commit();

                        obs.next(result);
                        obs.complete();
                    } catch (error) {
                        // Rollback the transaction if any error occurs
                        console.log('Rolling back transaction.');
                        await transaction.rollback();

                        obs.error(error);
                    }
                }).catch(async (error) => {
                    // Handle transaction error
                    console.log('Rolling back transaction due to transaction error.');
                    obs.error(error);
                });
            });
        }
    }
}
// Initialize DependencyService (you might need to adjust this according to your setup)
export function initializeDependencyService(service: DependencyService) {
    console.log("init services");
    if (!dependencyService) {
        dependencyService = service;
    }
}

export function getService() {
    console.log("getting services");
    return dependencyService;
}