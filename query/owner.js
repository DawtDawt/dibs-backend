function getStoreById(request, response) {

    const store_id = request.params.store_id;
    console.log("getStoreById: store_id: " + store_id);
    return response.status(200).send("ok");
}

function getBarberReservations(request, response) {

    const store_id = request.params.store_id;
    const barber_id = request.params.barber_id;
    console.log("getBarberReservations: store_id: " + store_id);
    console.log("getBarberReservations: barber_id: " + barber_id);
    return response.status(200).send("ok");
}

function registerStore(request, response) {
    
    const body = request.body;
    // TODO localize store object and decide on schemas
    console.log("registerStore: object: " + body);
    return response.status(200).send("ok");
}

module.exports = {
    getStoreById,
    getBarberReservations,
    registerStore,
}