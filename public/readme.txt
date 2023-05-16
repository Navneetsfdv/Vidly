this is a backend demo for a Vidly app used for Managing Videos in a Video Rental Store Has 
3 level of Mode i.e ReadOnlyMode , CreationMode by RegisterUsers , Deletion Mode by Admin  
Authentication and authoization features are provided by JWT 

EndPoints served by this app are 

1. ->   READ ONLY MODE 
-> https://navneet-vidly.cyclic.app/api/genres or api/genres/id //for getting all/particular available genres
 
-> https://navneet-vidly.cyclic.app/api/movies or api/movies/id //for getting all/particular available movies with its genre, dailyRentalRate, NoOfStocks

-> https://navneet-vidly.cyclic.app/api/customers or api/customers/id //for getting all/particular available customers

-> https://navneet-vidly.cyclic.app/api/rentals //for getting all available rentals  

2. -> CREATION MODE ( Register to access )

// using POSTMAN send a POST request for registering a user, in this url -> https://navneet-vidly.cyclic.app/api/users
   in the request body provide name,email,password in raw JSON format  

// after registering Authenticate urself by sending POST request, in this url -> https://navneet-vidly.cyclic.app/api/auth
   in the request body provide email,password in raw JSON format, 
   this generates a JWT( Json Web Token ) in response body copy this token

// Now we can create/update by sending a POST/PUT request in -> https://navneet-vidly.cyclic.app/api/genres, /movies, /customers urls 
   and set in Headers tab with key : x-auth-token and value : generated JWT token 
   and provide appropriate description in request body for creating or updating a desired properties  

// Now for Renting out a movie for a customer we send POST request, in this url -> https://navneet-vidly.cyclic.app/api/rentals  
   & provide customerId ,movieId in Req body and  set in Headers tab with key : x-auth-token and value : generated JWT token 
   this creates a rental for a customer and reduces the NumberOfStock of that movie by 1

// Now for Returning a movie to the Store we send POST request, in this url -> https://navneet-vidly.cyclic.app/api/returns 
   & provide customerId ,movieId in Req body and  set in Headers tab with key : x-auth-token and value : generated JWT token 
   this calculates the total rent payable by the customer & increase the numberOfStock of that movie by 1  

3. DELETION MODE by /id for  genres / movies /customers

// Is only reserved for ADMIN can't be set from the client sides 
// Customer IsGold property and IsAdmin can be set from server side only 

for Deletion use below ADMIN details for Authentication to generate jwt
{
    "email" :  "Nav2020kumar@gmail.com",
    "password" : "Navneet@123"
}
  
