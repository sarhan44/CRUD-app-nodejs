## Introduction
This assignment built in using RESTful APIs in Node.js, will allow us to get, post, update & delete the Vehicle and Violation's Data. 

## Functionalities:
The assignment has two models Vehicle and Violation, I have defined two schema’s Vehicle and Violation respectively to create collections in database.
I have created ten APIs that can perform CRUD operations such as create, get, update, delete the Vehicle and Violation data.

## Tech-Stack: 
* Node.js
* Express.js	            
* Express-rate-limit                
* Mongoose
* Nodemon
* MongoDB 
* Tools:
* VSCode
* Postman
* mongoDB Compass

## Implementation:
The entire project was coded on VS Code. First open VS code and start a terminal of gitbash and run the command “npm init -y” to create a package.json file. Then using mkdir command to create an src folder and similarly, inside the src folder I created five more folders ( controller, DB, middleware, models, routes ) and one main file which is index.js, I have defined the project in separate folders to make code clean and readable, all routes in the route folder, all API functions in the controller folder, all Schemas defined in the model's folder,  database connection in DB folder, and rate limiting in the middleware folder.
I used Postman to make requests to test the project on different HTTP requests like (post, get, patch, and delete).


### How to run the application in your local system:
* Follow these steps :
* Make sure that you have installed the node in your local system.

1. Open VS code editor and open a folder
2. Open terminal
3. Clone my GitHub repository by using this command 
```node.js
- git clone https://github.com/sarhan44/CRUD-app-nodejs.git
``` 
4. Install all dependencies or packages by using this command
```
- npm install 
```
5. Run the app by using this command
 ```
- npm start 
```

#### Postman Collection link [Download](https://drive.google.com/file/d/16I0bltSWR_yj7YB1Wv-blIZwTDlotz1O/view?usp=sharing)

### Postman Setup:
* Download postman collection 
* Open postman 
* Select Import in the left navigation menu.
* Select your file or folder
* Start making requests.
