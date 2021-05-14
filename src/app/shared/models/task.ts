import {Project} from './project';
import {User} from './user';
import {Status} from '../enums/status';

export interface Task {
  id?: number;
  project?: Project;
  assignedEmployee?: User;
  taskSubject?: string;
  taskDetail?: string;
  taskStatus?: Status;
  assignedDate?: Date;
}
