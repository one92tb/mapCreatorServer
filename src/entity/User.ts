import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Marker } from "./Marker";
import { Indicator } from "./Indicator";

@Entity()
export class User {
  @PrimaryGeneratedColumn() id: number;

  @Column() login: string;

  @Column() password: string;

  @OneToMany(type => Indicator, indicators => indicators.user)
  indicators: Indicator[];

  @OneToMany(type => Marker, marker => marker.user)
  markers: Marker[];


}
