import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { User } from "./User";

@Entity()
export class SelectedMarker {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    icon: string;

    @Column()
    lat: number;

    @Column()
    lng: number;

    @Column()
    street: string;

    @Column()
    city: string;

    @Column()
    country: string;

    @Column({ type: "int" })
    public userId: number;

    @ManyToOne(type => User, user => user.selectedMarkers)
    user: User;
}
