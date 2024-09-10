export class UserDetailDto {
    shop: string;
    user_name: string;
    uid: number;

    constructor(user: any) {
        this.uid = user.user_id;
        this.user_name = user.user_name;
        this.shop = user.shop_name;
    }
}