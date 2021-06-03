import {Component, OnDestroy, OnInit} from '@angular/core';
import {Form, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AuthService} from '../../shared/services/components/auth.service';
import {AuthenticationRequest} from '../../shared/models/authenticationRequest';
import {TokenService} from '../../shared/services/general/token.service';
import {Router} from '@angular/router';
import {ToNavigate} from '../../shared/util/toNavigate';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public form: FormGroup;

  private subscription: Subscription = new Subscription();

  constructor(private authService: AuthService, private tokenService: TokenService, private router: Router) {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  private login(): void {
    const user = this.form.value as AuthenticationRequest;

    this.subscription = this.authService.login(user).subscribe(response => {
      const navigationPath = ToNavigate.redirectDependsOnRole(this.tokenService.getRoleFromToken());
      this.router.navigateByUrl(navigationPath);
    }, error => {
      this.router.navigateByUrl('guest');
    });

  }

  public onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.login();
  }
}
