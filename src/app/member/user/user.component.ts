import {Component, OnInit} from '@angular/core';
import {Response} from '../../shared/models/response';
import {User} from '../../shared/models/user';
import {UserService} from '../../shared/services/user.service';
import {TokenService} from '../../shared/services/token.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private userService: UserService, private tokenService: TokenService) {
  }

  ngOnInit(): void {
    this.readUser();
  }

  readUser(): void {
    const currentUser = this.tokenService.getUserFromToken();
    this.userService.readByUsername(currentUser.userName).subscribe(response => {
      console.log(response);
    });
  }

}
