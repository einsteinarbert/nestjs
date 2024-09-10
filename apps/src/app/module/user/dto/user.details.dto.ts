import { Column, Model } from 'sequelize-typescript';
export class UserDetailDto extends Model<UserDetailDto>{
    @Column
    shop_name: string;
    @Column
    user_name: string;
    @Column
    user_id: number;
}