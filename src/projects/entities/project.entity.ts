import { AutoMap } from '@automapper/classes';
import { Task } from 'src/tasks/entities/task.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Project {
    @PrimaryGeneratedColumn('uuid')
    @AutoMap()
    id: string;
  
    @Column()
    @AutoMap()
    name: string;
  
    @Column()
    @AutoMap()
    description: string;
  
    @Column()
    @AutoMap()
    owner_id: string;
  
    @CreateDateColumn()
    @AutoMap()
    created_at: Date;
  
    @UpdateDateColumn()
    @AutoMap()
    updated_at: Date;
  
    @OneToMany(() => Task, task => task.project)
    @AutoMap()
    tasks: Task[];
}
