import {Component} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {Router} from '@angular/router';
import {TokenService} from '../../shared/services/general/token.service';
import {User} from '../../shared/models/user';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  menuItems = [
    {
      menuName: 'Administration',
      subMenus: [{name: 'User Create', url: '/member/users'}, {name: 'Project Create', url: '/member/projects'}]
    },
    { menuName: 'Manager',
      subMenus: [{name: 'Project Status', url: '/member/project/details'}, {name: 'Task Create', url: '/member/tasks'}]
    },
    {menuName: 'Employee', subMenus: [{name: 'Pending Tasks', url: '#'}, {name: 'Archive', url: '#'}]}
  ];

  currentUser: User;

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private tokenService: TokenService) {
    this.currentUser = this.tokenService.getUserFromToken();
  }

  logout(): void {
    this.tokenService.deleteTokens();
    this.router.navigateByUrl('guest');
  }
}
