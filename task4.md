# Pet Rental System Desing
The system should consist of a simple **nodejs** server instance backed by a **relational database** (postgresql or mysql). The simple needs of the business, at least for an MVP,  don't really pose much scaling issues. In any case, it would be easy to scale to multiple node instances and a couple of database read replicas if necessary.

 A **monolith** design seems sufficient - although it'd be practical to integrate with google / facebook signin instead of implementing a custom email validation, restore, etc.
 As a sort of broker, customers would be served through a front end app (**react**) which needs to consume our API. API would provide the app a list of available pets from partner kennels. A customer booking would consist in the action of posting to the partner's API the booking of a pet by date, this would be validated by the parter later posting to our API when the customer grabbed the pet. The process would be completed by the partner posting to our API when the customer returned the pet.

# Our APIs
This are all the API necessary to run this business

# partner kennels API provieded to us
* paginated list of available pets
/pets/limit={limit}&offset={offset}
* for customers to handle bookings and cancelations POST, DELETE. For us to see current bookings GET
/bookings

# for partner kennels 
* When a customer picks up a pet
/pickups?booking={bookingId}
* When a customer returns a pet
/dropoffs?booking={bookingId}

# for customers (frontend app)
* curated list of pets from all partner kennels
/pets/limit={limit}&offset={offset}
* create booking
POST /bookings
* cancel booking 
DELETE /bookings
