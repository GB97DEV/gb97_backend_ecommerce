
interface CodeResponse{
  [codigo: string]: { message: string; status: boolean };
};

const responseType = {
  "000.000.000": {status: true, message: "Transaction succeeded"},
  "000.200.100": {status: true, message: "Successfully created checkout"},
  "600.200.201": {status: false, message: "Channel/Merchant not configured for this payment method"},
  "800.110.100": {status: false, message: "Duplicate transaction"},
  "200.100.101": {status: false, message: "Invalid Request Message. No valid XML. XML must be url-encoded! maybe it contains a not encoded ampersand or something similar."},
  "200.100.103": {status: false, message: "Invalid Request Message. The request contains structural errors"},
  "800.100.171": {status: false, message: "Transaction declined (pick up card)"},
  "700.300.700": {status: false, message: "Referenced tx can not be reversed (reversal not possible anymore)"},
  "800.100.174": {status: false, message: "Transaction declined (invalid amount)"},
  "800.100.151": {status: false, message: "Transaction declined (invalid card)"},
  "800.100.402": {status: false, message: "CC/Bank account holder not valid"},
  "800.100.190": {status: false, messge: "Transaction declined (invalid configuration data)"}, 
  "800.100.152": {status: false, messge: "Authorization Error (95) transaction declined by authorization system"}, 
  "800.100.197": {status: false, message: "Transaction declined (registration cancelled externally)."},
  "800.100.176": {status: false, message: "Transaction declined (account temporarily not available. Please try again later)."},
  "100.400.311": {status: false, message: "Transaction declined (format error)."},
  "100.100.100": {status: false, message: "Request contains no creditcard, bank account number or bank name."},
  "800.100.165": {status: false, message: "Transaction declined (card lost)."},
  "800.100.159": {status: false, message: "Transaction declined (stolen card)."},
  "800.100.155": {status: false, message: "Transaction declined (amount exceeds credit)."},
  "100.100.400": {status: false, message: "Request contains no cc/bank account holder."},
  "100.100.303": {status: false, message: "Card Expired."},
  "800.100.170": {status: false, message: "Transaction declined (transaction not permitted)."},
  "100.550.310": {status: false, message: "Amount exceeds limit for the registered account."},
  "800.100.168": {status: false, message: "Transaction declined (restricted card)."},
  "800.100.179": {status: false, message: "Transaction declined (exceeds withdrawal count limit)."},
  "100.100.402": {status: false, message: "CC/Bank account holder not valid."},
  "600.200.100": {status: false, message: "Invalid Payment Method."},
  "700.100.200": {status: false, message: "Non matching reference amount."},
  "700.400.200": {status: false, message: "Tannot refund (refund volume exceeded or tx reversed or invalid workflow?"},
  "800.100.157": {status: false, message: "Transaction declined (wrong expiry date)."},
  "800.100.501": {status: false, message: "Card holder has advised his bank to stop all recurring payments for this merchant."},
  "800.100.100": {status: false, message: "Transaction declined for unknown reason."},
  "800.300.500": {status: false, message: "Transaction temporary blacklisted (too many tries invalid CVV)."},
  "800.300.501": {status: false, message: "Transaction temporary blacklisted (too many tries invalid expire date)."},
  "900.100.201": {status: false, message: "Error on the external gateway (bank)."},
  "900.100.100": {status: false, message: "Unexpected communication error with connector/acquirer."},
  "900.100.300": {status: false, message: "No response from connector/acquirer [uncertain result]."},
  "800.100.199": {status: false, message: "Transaction declined (invalid tax number)."},
  "600.200.500": {status: false, message: "Invalid payment data. You are not configured for this currency or sub type (country or brand)."},
  "800.100.156": {status: false, message: "Transaction declined (format error) Depende del valor del código en el campo Response, revisar el apartado 4.3.2"},
  "800.100.162": {status: false, message: "Transaction declined (limit exceeded)."},
  "100.100.101": {status: false, message: "Invalid creditcard, bank account number or bank name."},
  "100.700.801": {status: false, message: "Identity contains no or invalid identification value."},
  "100.400.147": {status: false, message: "Payment void and transaction denied by ReD Shield."},
  "100.400.149": {status: false, message: "Payment void and data error by ReD Shield."},
  "100.400.325": {status: false, message: "External risk system not available."},
  "100.380.401": {status: false, message: "User Authentication Failed. (3DSecure Error)."},
  "100.380.501": {status: false, message: "User Authentication Error (risk management transaction timeout)."},
  "100.396.103": {status: false, message: "Previously pending transaction timed out (Error in asynchronous workflow)."},
  "100.390.108": {status: false, message: "Transaction rejected because merchant not participating in 3DSecure program (3DSecure Error)."},
  "100.390.112": {status: false, message: "Technical Error in 3D system (3DSecure Error)."},
  "000.100.112": {status: true, message: "Request successfully processed in 'Merchant in Connector Test Mode' "},
  "000.100.110": {status: true, message: "Request successfully processed in 'Merchant in Integrator Test Mode'"},
  "200.300.404": {status: false, message: "Invalid or missing parameter."},
  "000.200.000": {status: true,  message: "Transaction pending"}
}

const ValidateCode = (codigo: string) => {
  // Verificar si el código está en el objeto de significados
  const resultado = responseType[codigo];
  // Si el código no está en el objeto, devolver un mensaje de error por defecto
  return resultado || { message: "Código no reconocido", status: false };
}

export const ResponseBody = async(response: any) => {
  // Supongamos que el resultado es un objeto que contiene un campo 'result' con el código
  const codigoResultado = response.result.code;
  // Validar el código y obtener su significado y estado
  const { message, status } = ValidateCode(codigoResultado);
  let body = {};
  // Generar el nuevo cuerpo de respuesta
  if(message === "Código no reconocido"){
    console.log(response);
    body = {
      response: status,
      code: codigoResultado,
      message: message,
      data: null
    }
  } else{
    const newResponse = { ...response };
    delete newResponse.result;
    body = {
        response: status,
        code: codigoResultado,
        message: message,
        data: newResponse
    };
  }

  return body;
}