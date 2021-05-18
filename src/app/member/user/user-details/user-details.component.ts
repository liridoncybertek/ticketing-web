import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../shared/services/components/user.service';
import {TokenService} from '../../../shared/services/general/token.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  constructor(private userService: UserService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.readUser();
  }



  readUser(): void {
    const currentUser = this.tokenService.getUserFromToken();
    this.userService.readByUsername(currentUser.userName).subscribe(response => {
    });
  }
}
