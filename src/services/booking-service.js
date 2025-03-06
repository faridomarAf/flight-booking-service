const {BookingRepository} = require('../repositories');
const db = require('../models');
const axios = require('axios');
const {StatusCodes} = require('http-status-codes');
const {ServerConfig} = require('../config');
const {AppError} = require('../utils');


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

module.exports = {
    createBooking,
}