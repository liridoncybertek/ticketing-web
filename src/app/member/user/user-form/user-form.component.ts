import {Component, OnDestroy, OnInit, Output, EventEmitter} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {UserService} from '../../../shared/services/components/user.service';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../../shared/models/user';
import {Response} from '../../../shared/models/response';
import {Location} from '@angular/common';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnDestroy {

  public form: FormGroup;

  private subscription: Subscription = new Subscription();

  public isAddMode: boolean;

  public username: string;

  @Output() loadPage = new EventEmitter<void>();

  roles = [
    {id: 1, name: 'Admin'},
    {id: 2, name: 'Manager'},
    {id: 3, name: 'Employee'}
  ];

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private location: Location) {
  }


  ngOnInit(): void {
    this.username = this.activatedRoute.snapshot.params.id;
    this.isAddMode = !this.username;

    this.initForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  initForm(): void {
    this.form = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      userName: new FormControl(null, [Validators.required]),
      passWord: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null, [Validators.required]),
      enabled: new FormControl(false),
      phone: new FormControl(null),
      gender: new FormControl(null),
      role: new FormControl(null, [Validators.required]),
    });

    if (!this.isAddMode) {
      this.subscription.add(this.userService.readByUsername(this.username)
        .subscribe(x => this.form.patchValue(x.data)));
    }
  }

  public onSubmit(): void {

    if (this.form.invalid) {
      return;
    }

    this.isAddMode ? this.createUser() : this.updateUser();
  }

  private createUser(): void {
    const user = this.form.value as User;


    const request = this.userService.createUser(user).subscribe((response: Response<any>) => {
      if (response.success) {
        this.loadPage.emit();
      }
    });

    this.subscription.add(request);
  }

  private updateUser(): void {
    const user = this.form.value as User;

    const request = this.userService.updateUser(user).subscribe((response: Response<any>) => {
      if (response.success) {
        this.form.reset();
        this.loadPage.emit();
        this.location.go('/member/users');
      }
    });

    this.subscription.add(request);
  }


}
