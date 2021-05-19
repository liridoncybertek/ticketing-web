import {Component, OnDestroy, OnInit} from '@angular/core';
import {Response} from '../../shared/models/response';
import {User} from '../../shared/models/user';
import {UserService} from '../../shared/services/components/user.service';
import {TokenService} from '../../shared/services/general/token.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  public users: User[];
  displayedColumns: string[] = ['name', 'email', 'gender', 'phone', 'role', 'actions'];

  private subscription: Subscription = new Subscription();


  constructor(private userService: UserService, private tokenService: TokenService) {
  }

  ngOnInit(): void {
    this.readUsers();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  readUsers(): void {
    const request = this.userService.read().subscribe((response: Response<any>) => {
      if (response.success) {
        this.users = response.data;
      }
    });
    this.subscription.add(request);
  }

  onDelete(username: string): void {
    const request = this.userService.delete(username).subscribe((response: Response<any>) => {
      if (response.success) {
        this.readUsers();
      }
    });
    this.subscription.add(request);
  }


}
