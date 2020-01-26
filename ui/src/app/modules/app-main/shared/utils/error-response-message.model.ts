export class ErrorResponseMessage {
  error: boolean;
  message: string;

  constructor() {
    this.error = true;
  }

  public setErrorMessage(errorMessage: string): void {
    this.message = errorMessage;
  }

  public getErrorMessage(): string {
    return this.message ? this.message : 'Unexpected error occurred!';
  }
}
