import { Table, Column, Model, AutoIncrement, PrimaryKey } from 'sequelize-typescript';

@Table({ tableName: 'user', timestamps: false })
export class User extends Model {
  @PrimaryKey // Marks this column as the primary key
  @AutoIncrement // Automatically increments the ID
  @Column({ field: 'user_id' }) // Maps this to the 'user_id' column in the DB
  user_id: number;

  @Column({ field: 'name' }) // Maps to the 'user_name' column in the DB
  name: string;
}
