import {Status} from '../enums/status';
import {User} from './user';

export interface Project {
  id?: number;
  projectName?: string;
  projectCode?: string;
  startDate?: Date;
  endDate?: Date;
  projectDetail: string;
  completeTaskCounts?: number;
  unfinishedTaskCounts?: number;
  projectStatus?: Status;
  assignedManager?: User;
}
