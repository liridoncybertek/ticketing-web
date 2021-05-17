import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TokenService} from '../shared/services/token.service';

@Component({
  selector: 'app-page-not-allowed',
  templateUrl: './page-not-allowed.component.html',
  styleUrls: ['./page-not-allowed.component.scss']
})
export class PageNotAllowedComponent implements OnInit {

  constructor(private router: Router, private tokenService: TokenService) { }

  ngOnInit(): void {
  }

  public toNavigate(): void {
    const roleFromToken = this.tokenService.getRoleFromToken();

    switch (roleFromToken) {
      case 'Admin':
        this.router.navigateByUrl('/member/users');
        break;
      case 'Manger':
        this.router.navigateByUrl('/member/projects');
        break;
      case 'Employee':
        this.router.navigateByUrl('/member/tasks');
        break;
      default:
        this.router.navigateByUrl('guest');

    }
  }
}
