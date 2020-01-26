import {Injector} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {MatDialog, MatDialogRef} from '@angular/material';
import {AidDialogService} from '@ukmjkim/aid-lib-services';
import {ErrorResponseMessage} from './error-response-message.model';
import {SignInFormComponent} from '../components/sign-in-form/sign-in-form.component';
import {UserSessionService} from '../services/user-session/user-session.service';

const httpStatus = {
  HandledError: 400,
  Unauthorized: 401,
  Forbidden: 403,
  UnexpectedError: 500,
  GatewayTimeout: 504
};

export class HttpRequestErrorHandler {

  public static signInDialogRef: MatDialogRef<SignInFormComponent> = null;
  private httpErrorResponse: HttpErrorResponse;
  private dialog: MatDialog;
  private dialogService: AidDialogService;
  private userSessionService: UserSessionService;

  constructor(httpErrorResponse: HttpErrorResponse, private injector: Injector) {
    this.httpErrorResponse = httpErrorResponse;
  }

  public handleError(appInjector: Injector, handleDefaultError?: boolean): ErrorResponseMessage {
    this.dialog = this.injector.get(MatDialog);
    this.dialogService = this.injector.get(AidDialogService);
    this.userSessionService = this.injector.get(UserSessionService);

    let errorResponse = new ErrorResponseMessage();
    const theError = this.httpErrorResponse.error;
    let errorMessage = theError && theError.message ? theError.message : theError;
    errorMessage = errorMessage && errorMessage.error ? errorMessage.error.message ? errorMessage.error.message : errorMessage.error : errorMessage;

    switch (this.httpErrorResponse.status) {
      case httpStatus.Unauthorized:
      case httpStatus.GatewayTimeout:
          if (this.httpErrorResponse.error === null || this.httpErrorResponse.error.url) {
          if (!HttpRequestErrorHandler.signInDialogRef) {
            console.log('Show login form');
            errorMessage = 'Session timeout. You are being redirected to login page.';
            this.userSessionService.setCurrentUser(null);
            HttpRequestErrorHandler.signInDialogRef = this.dialog.open(SignInFormComponent, {
              width: '600px',
              disableClose: true,

              data: {
                currentUser: null
              }
            });

            HttpRequestErrorHandler.signInDialogRef.afterClosed().subscribe(() => {
              HttpRequestErrorHandler.signInDialogRef = null;
            });
          }
        } else {
          errorMessage = "You don't have access to this feature.";
        }
        break;
      case httpStatus.Forbidden:
        errorMessage = "You don't have access to this feature.";
        break;
      case httpStatus.HandledError:
      case httpStatus.UnexpectedError:
        break;
    }
    this.dialogService.hideProgress();
    if (handleDefaultError) {
      this.dialogService.showMessage(errorMessage);
    }
    errorResponse.setErrorMessage(errorMessage);
    return errorResponse;
  }

  public static handleError<T>(appInjector: Injector, operation: string, result?: T, handleDefaultError?: boolean) {
    const errObs = (error: any): Observable<any> => {
      let httpErrorResponseHandler: HttpRequestErrorHandler = new HttpRequestErrorHandler(error, appInjector);
      let errorResponse = httpErrorResponseHandler.handleError(appInjector, handleDefaultError);
      if (result) {
        return of(result);
      } else {
        return of(errorResponse);
      }
    };
    return errObs;
  }
}
