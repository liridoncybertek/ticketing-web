import {Component, OnDestroy, OnInit} from '@angular/core';
import {Form, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AuthService} from '../../shared/services/auth.service';
import {AuthenticationRequest} from '../../shared/models/authenticationRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public form: FormGroup;

  private subscription: Subscription = new Subscription();

  constructor(private authService: AuthService) {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.initForm();
    this.onSubmit();
  }

  initForm(): void {
    this.form = new FormGroup({
      username: new FormControl('admin@admin.com', [Validators.required]),
      password: new FormControl('Abc1', [Validators.required])
    });
  }

  private login(): void {
    const user = this.form.value as AuthenticationRequest;

    this.subscription = this.authService.login(user).subscribe(response => {
      //TODO: do a custom routing depends on role when we login!!!!
      console.log('response is: ', response);
    }, error => {
      console.log('error is: ', error);
    });

  }

  public onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.login();
  }
}
