import { Observable, from, throwError, of } from "rxjs";
import { switchMap, map, catchError } from "rxjs/operators";
import connectDatabase from "@/database/mongodb";
import {
  checkIfUserExists,
  createUser,
  createJwtToken,
} from "./../../service/UserService";

export const main = (event, context): Observable<any> => {
  context.callbackWaitsForEmptyEventLoop = false;

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Content-Type, User-Agent, Authorization, X-Requested-With",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE",
  };

  console.log('AQUI ESTOY')

  return connectDatabase().pipe(
    map(() => {
      console.log("Successfully connected to the database");
      return true;
    }),
    switchMap(() => checkIfUserExists(JSON.parse(event.body).userName)),
    switchMap((userExist) => {
      if (userExist) {
        return of({
          statusCode: 201,
          headers,
          body: JSON.stringify({
            response: false,
            message: "El usuario ya existe.",
            serverMessage: null,
            data: userExist,
          }),
        });
      } else {
        return createJwtToken(event.body.user).pipe(
          switchMap(() => {
            const reqUserObj = JSON.parse(event.body);
            let userObj = { ...reqUserObj };
            return createUser(userObj);
          }),
          map((userObjCreated) => {
            return {
              statusCode: 200,
              headers,
              body: JSON.stringify({
                response: true,
                message: "Usuario creado exitosamente.",
                serverMessage: null,
                data: userObjCreated,
              }),
            };
          })
        );
      }
    }),
    catchError((err) => {
      console.error("Failed to connect to the database", err);
      return throwError(() => ({
        statusCode: err.statusCode || 500,
        headers,
        body: JSON.stringify({
          response: false,
          message: "No se pudo crear el usuario",
          serverMessage: err.message,
          data: null,
        }),
      }));
    })
  );
};
