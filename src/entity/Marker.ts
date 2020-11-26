import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Marker {
  @PrimaryGeneratedColumn() id: number;

  @Column() name: string;

  @Column() icon: string;

  @Column() isDefault: boolean;

  @Column({ type: "int" })
  public userId: number;

  @ManyToOne(type => User, user => user.markers)
  user: User;
}
