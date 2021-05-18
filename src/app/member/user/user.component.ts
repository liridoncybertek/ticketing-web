import {Component, OnInit} from '@angular/core';
import {Response} from '../../shared/models/response';
import {User} from '../../shared/models/user';
import {UserService} from '../../shared/services/components/user.service';
import {TokenService} from '../../shared/services/general/token.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public users: User[];
  displayedColumns: string[] = ['name', 'email', 'gender', 'phone', 'role', 'actions'];

  constructor(private userService: UserService, private tokenService: TokenService) {
  }

  ngOnInit(): void {
    this.readUsers();
  }


  readUsers(): void {
    this.userService.read().subscribe((response: Response<any>) => {
      if (response.success) {
        this.users = response.data;
      }
    });
  }

}
