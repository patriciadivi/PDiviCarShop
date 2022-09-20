export class CustomerError extends Error {
  public status: number;

  constructor(paramStatus: number, message: string) {
    super(message);
    this.status = paramStatus;
  }
}

export default CustomerError;