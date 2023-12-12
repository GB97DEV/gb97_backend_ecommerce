class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;

    // Ajusta el prototipo para que el error se muestre correctamente en el stack trace
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export default CustomError;