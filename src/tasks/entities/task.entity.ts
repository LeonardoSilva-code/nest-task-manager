import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Project } from '../../projects/entities/project.entity';
import { AutoMap } from '@automapper/classes';

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  @AutoMap()
  id: string;

  @Column()
  @AutoMap()
  title: string;

  @Column()
  @AutoMap()
  description: string;

  @Column({
    type: 'simple-enum',
    enum: TaskStatus,
    default: TaskStatus.TODO,
  })
  @AutoMap()
  status: TaskStatus;

  @Column({
    type: 'simple-enum',
    enum: TaskPriority,
    default: TaskPriority.MEDIUM,
  })
  @AutoMap()
  priority: TaskPriority;

  @Column()
  @AutoMap()
  due_date: Date;

  @Column()
  @AutoMap()
  created_by: string;

  @CreateDateColumn()
  @AutoMap()
  created_at: Date;

  @UpdateDateColumn()
  @AutoMap()
  updated_at: Date;

  @ManyToOne(() => Project, project => project.tasks)
  @AutoMap()
  project: Project;
}