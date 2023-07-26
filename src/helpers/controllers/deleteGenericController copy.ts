import { Observable } from 'rxjs';
import connectDatabase from "../../database/mongodb";
import customMessage from "../customMessage";

export const deleteGeneric = (Model, event, context, acceptLanguage): Observable<any> => {
  return new Observable(observer => {
    context.callbackWaitsForEmptyEventLoop = false;
    const headers = {
      "Access-Control-Allow-Origin": "*", 
      "Access-Control-Allow-Headers":
        "Content-Type, User-Agent, Authorization, X-Requested-With",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE",
    };
    connectDatabase().then(() => {
      const query = event.pathParameters;
      Model.deleteMany({ _id: { $in: query } })
        .then(objUpdated => {
          const message = customMessage(objUpdated, "d", acceptLanguage);
          observer.next({ statusCode: 200, headers, body: JSON.stringify(message) });
          observer.complete();
        })
        .catch(err => {
          console.error(err);
          observer.error({
            statusCode: err.statusCode || 500,
            body: JSON.stringify({ type: false, message: err.message }),
          });
        });
    }).catch(err => observer.error(err));
  });
};
