import {Injectable} from '@angular/core';

import {JwtHelperService} from '@auth0/angular-jwt';
import {Constants} from '../constants/constants';
import {Role} from '../models/role';
import get = Reflect.get;
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private jwtHelperInstance = new JwtHelperService();

  constructor() {
  }

  public getJwtHelperInstance(): JwtHelperService {
    return this.jwtHelperInstance;
  }

  public setToken(key: string, token: string): void {
    if (!(key && token)) {
      return;
    }

    localStorage.setItem(key, token);
  }

  public getToken(key: string = Constants.ACCESS_TOKEN): string | null {
    return localStorage.getItem(key);
  }


  public getTokenExpirationDate(key: string = Constants.ACCESS_TOKEN): Date | null {

    const token = this.getToken(key);

    return token ? this.jwtHelperInstance.getTokenExpirationDate(token) : null;
  }

  public isTokenExpired(key: string = Constants.ACCESS_TOKEN): boolean {

    const token = this.getToken(key);

    if (!token) {
      return true;
    }

    return this.jwtHelperInstance.isTokenExpired(token);
  }

  public deleteTokens(...keys: string[]): void {
    keys.forEach(key => localStorage.removeItem(key));
  }

  public getUserFromToken(): User {
    const decodeToken = this.jwtHelperInstance.decodeToken(this.getToken());
    return decodeToken as User;
  }

  public getRoleFromToken(): string {
    const role = this.getUserFromToken().role as Role;
    return role.description;
  }
}
