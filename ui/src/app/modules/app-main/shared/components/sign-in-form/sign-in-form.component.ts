import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, Validators, FormBuilder, FormControl} from '@angular/forms';
import {HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {startWith, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AidDialogService, AidLoggerService, AidHttpOptions} from '@ukmjkim/aid-lib-services';
import {StateMatcher} from '../../utils/state-matcher';
import {User} from '../../services/user-session/user.model';

@Component({
  selector: 'aid-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss']
})
export class SignInFormComponent implements OnInit {

  isSuccessfullySignedIn: boolean;
  errorMessage: string;
  private matcher: StateMatcher;
  signInForm: FormGroup;
  nameCtrl: FormControl;
  passwordCtrl: FormControl;
  isProcessing: boolean;
  loggedInUser: User;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              private logger: AidLoggerService,
              private dialogRef: MatDialogRef<SignInFormComponent>,
              private formBuilder: FormBuilder,
              private http: HttpClient) {
    this.isProcessing = false;
    this.isSuccessfullySignedIn = false;
    this.matcher = new StateMatcher();
    this.passwordCtrl = new FormControl('', [Validators.required]);
    this.nameCtrl = new FormControl('', [Validators.required]);
    this.buildForm();
  }

  ngOnInit() {
  }

  private buildForm() {
    this.signInForm = this.formBuilder.group({
      name: this.nameCtrl,
      password: this.passwordCtrl
    });
  }

  public signIn(): void {
    if (this.signInForm.invalid) {
      return;
    }

    this.isProcessing = true;
    this.errorMessage = null;
    this.signInForm.disable();

    const loginName = this.nameCtrl.value;
    const password = this.passwordCtrl.value;
    const body = {loginName: loginName, password: password};

    this.http.post<User>('/api/v1/login', body, AidHttpOptions.json()).subscribe(siteUserInfo => {
      this.processSuccessfulLogin(User.fromJson(siteUserInfo));
    }, (err: HttpErrorResponse) => {
      this.processFailedLogin(err);
    });
  }

  private processSuccessfulLogin(user: User) {
    this.loggedInUser = user;
    this.isSuccessfullySignedIn = true;
    setTimeout(() => {
      this.dialogRef.close();
    }, 1000);
  }

  private processFailedLogin(err: HttpErrorResponse) {
    this.errorMessage = 'Your login name or password is not correct. Please verify and try again.';
    this.errorMessage = err.error && err.error.constructor === String ? err.error : this.errorMessage;
    this.isProcessing = false;
    this.signInForm.enable();
  }
}
