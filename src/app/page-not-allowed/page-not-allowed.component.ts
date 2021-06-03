import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TokenService} from '../shared/services/general/token.service';
import {ToNavigate} from '../shared/util/toNavigate';

@Component({
  selector: 'app-page-not-allowed',
  templateUrl: './page-not-allowed.component.html',
  styleUrls: ['./page-not-allowed.component.scss']
})
export class PageNotAllowedComponent implements OnInit {

  constructor(private router: Router, private tokenService: TokenService) {
  }

  ngOnInit(): void {
  }

  public toNavigate(): void {
    const navigationPath = ToNavigate.redirectDependsOnRole(this.tokenService.getRoleFromToken());
    this.router.navigateByUrl(navigationPath);
  }
}
