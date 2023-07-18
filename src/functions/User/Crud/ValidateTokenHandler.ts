import jwt from 'jsonwebtoken';

const validateToken = async (authorizationHeader) => {
  if (!authorizationHeader) {
    return { isValid: false, message: 'No se proporcionó un token en la cabecera de autorización.' };
  }

  const token = authorizationHeader;
  
  try {
    jwt.verify(token, 'HKHVHJVKBKJKJBKBKHKBMKHB');
    return { isValid: true, message: 'Token válido y no caducado.' };
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return { isValid: false, isExpired: true, message: 'Token caducado.' };
    } else {
      return { isValid: false, message: 'Token no válido.' };
    }
  }
};

export const main = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
    "Access-Control-Allow-Methods": "POST,GET",
  };

  try {
    // Validar token
    const Authorization = event.headers.Authorization;
    const validationResult = await validateToken(Authorization);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(validationResult),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};


