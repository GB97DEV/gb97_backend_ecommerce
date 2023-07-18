function convertData(event) {
    try {
        const reqObj = JSON.parse(event.body);
        let userObj = { ...reqObj };
        return userObj
    } catch (error) {
        return {
            statusCode: 401,
            body: JSON.stringify({ message: "No se puede convertir la data.", error: error }),
        };
    }
}

export default convertData;