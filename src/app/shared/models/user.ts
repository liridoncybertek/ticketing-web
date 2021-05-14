import {Gender} from '../enums/gender';
import {Role} from './role';

export interface User {
  id?: number;
  firstName?: string;
  lastName?: string;
  userName?: string;
  passWord?: string;
  confirmPassword?: string;
  enabled?: boolean;
  phone?: string;
  gender?: Gender;
  role?: Role;
}
