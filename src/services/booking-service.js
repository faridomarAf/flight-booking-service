const {BookingRepository} = require('../repositories');
const db = require('../models');
const axios = require('axios');
const {StatusCodes} = require('http-status-codes');
const {ServerConfig} = require('../config');
const {AppError} = require('../utils');
const {Enums} = require('../utils/common');
const {BOOKED, CANCELED} = Enums.BOOKING_STATUS;


const bookingRepository = new BookingRepository()

const createBooking = async(data)=>{
    // first create an unmanaged-transaction;
    const transaction = await db.sequelize.transaction();

    try {
        //to get the flight details for flight-booking
        const flight = await axios.get(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}`);
        const flightData = flight.data.data
        
        //check number of seats are available
        if(data.noOfSeats > flightData.totalSeats){// if error, transaction will roll-back, otherwise, it will commit
            throw new AppError('Not enough seat available!', StatusCodes.BAD_REQUEST);
        }

        // initiate the booking
        const totalBillingAmount = data.noOfSeats * flightData.price;
        const bookingPayload = {...data, totalCost: totalBillingAmount};
        const booking = await bookingRepository.create(bookingPayload, transaction);

        //after booking, reserve seats
        await axios.patch(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}/seats`, {
            seats: data.noOfSeats
        })

        await transaction.commit();
        return booking;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

const makePayment = async(data)=>{
    
    const transaction = await db.sequelize.transaction();

    try {
        // get booking details
        const bookingDetails = await bookingRepository.get(data.bookingId, transaction);

        //check is booking is canceled
        if(bookingDetails.status == CANCELED){
            throw new AppError('The booking has expired', StatusCodes.BAD_REQUEST);
        }

        //get the booking time:
        const bookingTime = new Date(bookingDetails.createdAt);

        //get current time:
        const currentTime = new Date();

        if(currentTime - bookingTime > 300000){//300000 === 5 minutes
            await bookingRepository.update(data.bookingId, {status: CANCELED}, transaction);
            throw new AppError('The booking has been expired!', StatusCodes.BAD_REQUEST);
        }

        if(bookingDetails.totalCost != data.totalCost){
            throw new AppError('The amoutn of Payment does not match!', StatusCodes.BAD_REQUEST);
        }

        if(bookingDetails.userId != data.userId){
            throw new AppError('The user corresponding to the booking does not match!', StatusCodes.BAD_REQUEST);
        }

        // to change Payment status from Pending to Booked
        await bookingRepository.update(data.bookingId, {status: BOOKED}, transaction);
        await transaction.commit();

    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};



module.exports = {
    createBooking,
    makePayment,
}