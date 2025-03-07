
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



