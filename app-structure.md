
1: sequelized installed:=> npm install sequelize

2:mysql2 installed:=> npm install mysql2

3:sequelize-cli

4:to Initialize Sequelize:=> npx sequelize init

//================================== Create a booking model ===================================

1: to create model:=> npx sequelize model:generate --name Booking --attributes flightId:integer,userId:integer,status:enum,noOfSeats:integer,totalCost:integer

2: add booking model to databasse:=> npx sequelize db:migrate


//================================== Create booking-route ===================================

. booking route created
. create paymentRoute. and its logic: done
. NOTE: when the booking is canceled, we shoul bring back the reserved seat to the totalSeats. for that we are going to create a function: 'cancelBooking' to that for us: done

. NOTE: agian we should create the same logic for those booking-status which initiated but after the 5 minutes which we assigned they did not passed the payment, so they should clean-up and the seats again add to flight totalSeats.

In order to do this functionality, we can install  [ npm install node-cron ] which allows us to scheduale a task which apply every-5-minutes, it works like this, we can tell it every 5 minutes check database, and if there is any booking and its initiated time is greater than 5-minutes cancel that booking

. npm i node-cron installed


