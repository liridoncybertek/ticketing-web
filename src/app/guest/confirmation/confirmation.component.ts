import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../shared/services/components/auth.service';
import {Response} from '../../shared/models/response';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  token: string;

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.queryParams.token;

    if (this.token) {
      this.confirmAccount();
    }
  }

  private confirmAccount(): void {
    this.authService.confirmation(this.token).subscribe((response: Response<any>) => {
      if (response.success) {
        this.router.navigateByUrl('guest');
      }
    });
  }
}
