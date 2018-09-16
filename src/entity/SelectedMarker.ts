import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

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
}
