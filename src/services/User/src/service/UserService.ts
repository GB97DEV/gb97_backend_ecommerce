import { Observable, from, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import User from "@/services/User/src/models/UserModel";
import jwt from "jsonwebtoken";
import { deleteGeneric } from "@/helpers/controllers/deleteGenericController";

export const checkIfUserExists = (userName: string): Observable<any> => {
  return from(User.findOne({ userName: userName }));
}

export const registerUser = (userObj: any): Observable<any> => {
  return checkIfUserExists(userObj.userName).pipe(
    mergeMap(userExist => {
      if (userExist) {
        throw new Error("El usuario ya existe.");
      }

      return createJwtToken(userObj);
    }),
    mergeMap(token => {
      return createUser(userObj).pipe(
        mergeMap(userObjCreated => {
          return of({ token, user: userObjCreated });
        })
      );
    })
  );
}

export const createJwtToken = (user: any): Observable<any> => {
  return from(jwt.sign(
    { id: user },
    "HKHVHJVKBKJKJBKBKHKBMKHB",
    { expiresIn: "1d" }
  ));
}

export const createUser = (userObj: any): Observable<any> => {
  return from(User.create(userObj));
}

export const deleteUser = (event, context): Observable<any> => {
  return new Observable(observer => {
    try {
      const acceptLanguage =
        event.headers["Accept-Language"] ||
        event.headers["accept-language"] ||
        "en";

      // Convierte la promesa a un observable
      const result$ = from(deleteGeneric(User, event, context, acceptLanguage));
      
      result$
        .subscribe({
          next: result => {
            observer.next(result);
            observer.complete();
          },
          error: error => observer.error(error)
        });
    } catch (error) {
      observer.error(error);
    }
  });
};
