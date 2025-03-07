const cron = require('node-cron');
const { BookingService } = require('../../services');

const schedualCrons = ()=>{
        cron.schedule('*/30 * * * * ', async ()=>{// run every 30 minutes
        await BookingService.cancelOldBookings();
    })
};

module.exports = schedualCrons;
