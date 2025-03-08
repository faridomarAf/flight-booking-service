const {BookingService} = require('../services');
const {SuccessResponse, ErrorResponse} = require('../utils/common');
const {StatusCodes} = require('http-status-codes');

const inMemoryDb = {};

const createBooking = async(req, res)=>{

    try {
        const response = await BookingService.createBooking({
            flightId: req.body.flightId,
            userId: req.body.userId,
            noOfSeats: req.body.noOfSeats
        });

        SuccessResponse.data = response;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
};

const makePayment = async(req, res)=>{
    try {
        const idempotencyKey = req.headers['x-idempotency-key'];

        if(!idempotencyKey){
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'idempotencyKey is missing!'
            });
        }

        if(inMemoryDb[idempotencyKey]){
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'cannot retry on a successfull payment!'
            });
        }
        
        const response = await BookingService.makePayment({
            totalCost: req.body.totalCost,
            userId: req.body.userId,
            bookingId: req.body.bookingId
        });

        //if the payment successfully done
        inMemoryDb[idempotencyKey] = idempotencyKey;

        SuccessResponse.data = response;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}


module.exports = {
    createBooking,
    makePayment
}