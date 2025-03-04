
1: sequelized installed:=> npm install sequelize

2:mysql2 installed:=> npm install mysql2

3:sequelize-cli

4:to Initialize Sequelize:=> npx sequelize init

//================================== Create a booking model ===================================

1: to create model:=> npx sequelize model:generate --name Booking --attributes flightId:integer,userId:integer,status:enum,noOfSeats:integer,totalCost:integer

