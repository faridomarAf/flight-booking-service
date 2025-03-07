const CrudRepository = require('./crud-repository');
const {Booking} = require('../models');
const { AppError } = require('../utils');
const {StatusCodes} = require('http-status-codes');
const {Op} = require('sequelize');
const {Enums} = require('../utils/common');
const {CANCELED, BOOKED} = Enums.BOOKING_STATUS;

class BookingRepository extends CrudRepository {
    constructor(){
        super(Booking)
    }

    async createBooking(data, transaction){
        const response = await Booking.create(data, {transaction: transaction});
        return response
    }

    
    async get(data, transaction){
        const response = await Booking.findByPk(data, {transaction: transaction});
        if(!response){
            throw new AppError('Not able to find the resource', StatusCodes.NOT_FOUND);
        }

        return response;
    }

    async update(id,data, transaction){
        const response = await Booking.update(data,{
            where:{
                id: id
            }
        },{transaction: transaction});

        return response;
    }

    async cancelOldBookings(timestamp){
        //find all old bookings
        const response = await Booking.update({status: CANCELED},{
            where:{
                [Op.and]:[
                    {
                        createdAt:{
                            [Op.lt]: timestamp
                        }
                    },
                    {
                        status:{
                            [Op.ne]: BOOKED// should not updated by timestamp
                        }
                    },
                    {
                        status:{
                            [Op.ne]: CANCELED
                        }
                    }
                ]
            }
        });
        return response;
    }

};

module.exports = BookingRepository;