import { verify } from "jsonwebtoken";

const secretKey = 'HKHVHJVKBKJKJBKsd23234324fsdfdsfsddfdsfBKHKBMKHB';

export const authMiddleware = (handler: any) => {
  return async (event: any, context: any) => {
    try {
      const authHeader = event.headers.Authorization;
      if (!authHeader) {
        return {
          statusCode: 401,
          body: JSON.stringify({ message: "Authorization header missing"}),
        };
      }
      const token = authHeader;
      if (!token) {
        return {
          statusCode: 401,
          body: JSON.stringify({ message: "Token missing"}),
        };
      };

      const decoded = verify(token, secretKey);
      if (!decoded) {
        return {
          statusCode: 401,
          body: JSON.stringify({ message: "Invalid Token"}),
        };
      }

      event.token = decoded; // añade el objeto decodificado al objeto "event" para que esté disponible en los controladores

      return await handler(event, context); // llama al siguiente controlador en la cadena
    
    } catch (error) {
      console.error("Authorization failed", error);
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "Unauthorized", error: error }),
      };
    }
  };
};



