const {BookingService} = require('../services');
const {SuccessResponse, ErrorResponse} = require('../utils/common');
const {StatusCodes} = require('http-status-codes');

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
        const response = await BookingService.makePayment({
            totalCost: req.body.totalCost,
            userId: req.body.userId,
            bookingId: req.body.bookingId
        });

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