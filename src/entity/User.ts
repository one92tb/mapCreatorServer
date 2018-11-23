import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Marker } from "./Marker";
import { SelectedMarker } from "./SelectedMarker";

@Entity()
export class User {
  @PrimaryGeneratedColumn() id: number;

  @Column() login: string;

  @Column() password: string;

  @OneToMany(type => SelectedMarker, selectedMarker => selectedMarker.user)
  selectedMarkers: SelectedMarker[];

  @OneToMany(type => Marker, marker => marker.user)
  markers: Marker[];


}
