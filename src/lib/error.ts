export class ResponseError extends Error {
  status: boolean;
  message: string;

  constructor(message: string, status: boolean) {
    super("Errror"); // Memanggil constructor dari Error
    this.status = status;
    this.message = message;
    this.name = this.constructor.name; // Mengatur nama class
    // Error.captureStackTrace(this, this.constructor); // Menangkap stack trace
  }
}
