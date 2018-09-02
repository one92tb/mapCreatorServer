import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Marker {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    icon: string;

}
