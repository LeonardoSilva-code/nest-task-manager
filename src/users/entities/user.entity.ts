import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Users {
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    @ApiProperty()
    username?: string;

    @Column()
    @ApiProperty()
    email: string;

    @Column()
    @ApiProperty()
    password: string;

    @Column()
    @ApiProperty()
    confirmPassword?: string;

    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;
}
