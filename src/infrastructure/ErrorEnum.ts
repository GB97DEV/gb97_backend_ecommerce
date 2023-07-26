export enum StatusCodeEnum {
  OK = 200,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  InternalServerError = 500,
  // Añade otros códigos de estado aquí según sea necesario
}

export type Gb97ErrorAttr<T extends string, V = StatusCodeEnum> = {
  code: T;
  message: string;
  statusCode: V;
};

export type Gb97Errors<T extends string, V = StatusCodeEnum> = {
  [k in T]: Gb97ErrorAttr<T, V>;
};

export class Gb97Error<T extends string, V = StatusCodeEnum> extends Error {
  readonly code: string;
  private readonly _message?: string;
  private readonly _error: Gb97ErrorAttr<T, V>;
  private _metadata?: object;

  constructor(error: Gb97ErrorAttr<T, V>, message?: string, metadata?: object) {
    super(message);
    this.code = error.code;
    this._message = message;
    this._error = error;
    this._metadata = metadata;
  }

  get message(): string {
    return this._message || this._error.message;
  }

  getStatusCode(): V {
    return this._error.statusCode;
  }

  getMetadata<W extends object = object>(): W | object {
    return this._metadata || {};
  }

  setMetadata<W extends object = object>(metadata: W): void {
    this._metadata = metadata;
  }
}

export enum ErrorCode {
  E001 = "E001",
  E002 = "E002",
  E003 = "E003",
  E004 = "E004",
}

export const ERRORS: Gb97Errors<ErrorCode> = {
  [ErrorCode.E001]: {
    code: ErrorCode.E001,
    message: "El cuerpo de la petición es inválido.",
    statusCode: StatusCodeEnum.BadRequest,
  },
  [ErrorCode.E002]: {
    code: ErrorCode.E002,
    message: "Ha ocurrido un error inesperado.",
    statusCode: StatusCodeEnum.InternalServerError,
  },
  [ErrorCode.E003]: {
    code: ErrorCode.E003,
    message: "El cliente no existe.",
    statusCode: StatusCodeEnum.NotFound,
  },
  [ErrorCode.E004]: {
    code: ErrorCode.E004,
    message: "Ya existe un cliente registrado con el mobile recibido en la solicitud.",
    statusCode: StatusCodeEnum.BadRequest,
  },
};
