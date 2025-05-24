# Dev Connect
 <p>This is powerful plaform where developers can connect with each other</p>
 <p> Developers can send request to other developers . other developers can accept it or reject their connection </P>

 # why we choose this ?
 <p>This is bcz it have more features that will help me in some other projects </P>

 # How company make the projects ?
 
 ### SDLC (water fall model)
 #### Requirement phase 
 <p>Here project manager or product manager work where project manager will define full overview of project . </p>
 <p>The job of project manager is to talk with clients that which software you actually need . what are your problem . what kind of features you want to add </P>

 #### Designer
 <P> Designer work to how things would be define to work it . how one component will comminucate with other component . actually designer would define the complete architerture of app or software which is done by tech team or seniors engineer </p>


 #### Developers 
 <p>Developer work to build that project on the basis of design and requirement</P>

 #### Testing 
 <P>In testing where software developers write unit test cases for software and its responsibility of developers <h2> but </h2> in some industry tester will test all the cases of software </p>


 #### Deployment 
 <p>this is done by deveops engineer which is managing and take care of services</p>

 #### Maintance 
 <p>Update or adding more feature with time </P>
 


 ### Features  , HLD , LLD
 ##### Features
 <P>create account   , login , updateprofile , send connection request , accept or reject , status  , feed page , see our matches </P>

 ##### HLD 
 <P> In high level design we are bascially study about which things we use to build this project like react , nodejs , mongodb</p>


 ##### LLD
 <P>In Low Level Design we give planning about the project we define DB collections in  detail that how many tables and which fields is used in DB </P>


 # Creating our own server

 <p> First we initalize the package npm init </p>

 #### Package.json
<p>This file is used to tell us about all the data of project </p>

#### Creating server
<p>for creating backend server for upcoming request and response handling we need to use express js => npm i express by using this command in terminal two files come one is node modules and other is package lock.json </p>

#### Node Modules 
<p>In node modules all the files that our project need</p>

#### Packagelock.json
<p>This will used to show that which currently versions we using for starting or the strating versions or data show in the begining of project which exact versions we using </p>

#### Difference bw carret and telda 

#### caret ^ 
<p>this will used to update the vesion with time when a new update come </p>

#### Telda ~
<p>This will update the patch version only </p>

 # Routing and Request handlers

 ### playing with routing 
 . Also we have nodemodule file which is too large when we initalize git repository then alot of files come this files is actually comes from nodemodules so we donot need it to push it into github so we use gitignore and write inside it node_modules then node modules will be not pushed into github also every files that we write in gitignore will be ignored 

 ## Routing 
 . As we see that the route initally when we start from / and come request to that server then it will definitely show dashboard but after this if we write /hello or any thing this will not working bcz when code execute then it will start from 1 line so when we give / then this will match one by one route but first it see / then thats why after slash everything come this will not work so its solution it that we need to change its order because order will matter alot .


 ## Advance Routing concept 

 ## Dyanamic Routing 
 . this will use to give dynamic information to url for example 
 . localhost:5000/user?userid=101&pass=1234 => then to see this in console we wrote simply req.query

 ### But 
 . localhost:5000/user/101/atifkhan/1234 and see this in console we write it like app.get("/user/:id/:name/:passward"(req,res)=>{
    req.params
 })

 ## Difference in req.query and  req.params
.Params used for specific and query used for filter all same things.
 . this is for params
 :id → One specific item (e.g., /user/101)
.this is for query
?search=value → Filter/search many items (e.g., /users?name=Atif)


# Middleware 
<p>used for code reusabitlity  , easy to manage  , performance  , security and modularity </p>
<p>Learn multiple route handling </p>

# Error Handling
<p>error handling using try catch and also throw new Error('') </p>

# Database , Schema , Models Mongoose

## Database
<P>Data base is used to store the data in organized order </p>

## Schema
<p>is the way by which we define a collection </p>

## Model 
<p>Creating model to intreacting with database or schema </p>

# Diving into Api's

<p> we are already make static apis now make a dynamic api for example a person login from frontend and my server handle its request using req.body but when we console this req.body then undefined come at console this is bcz we need to use middle ware here app.use(express.json()) this is used to read the json data from user side </p>

<p>Supoose i want to find a user account by its specific parameter like by email then we use model.findOne(email:req.body.email) </p>

## difference in find() and findOne()
<p>Both work same but if if use find() and find email if multiple users have same email then it show all email data pf user but findOne() show only one </p>

## Delete Api
<p>we can delete api by using deleteOne()  , deleteMany() , findbyIdand delete() , findoneanddelete() these all using first filter the data then delete the data</p>

## UpdateApi
<P>also i done an update the data of user by differenct methods</p>

## important
<p>Its important to note that we should need to update or delete the data of user by id bcz id has unique </p>


# Data sanitization and schema validation 
<p>Schema validation is so important and crucial part </p>
<p>We need data validation mostly in post , put/patch bcz using that methods we update or push the data into database</p>

## required
<p>this check is used to required the data mandatory becuase if some one write require with field and miss that filed to push or update then it throw an error </p>

## Unique
<p>this field is used to handle duplicate enterence of data into database </p>

## default
<p>when i used default value then when a user does not enter something then this default value is come </p>

## Trim 
<p> trim is used to remove spaces </p>

## Lowerspace
<p>is used when its true it convert upperspace latter to lowercase</p>

## maxlength & minlength vs min & max
<p>maximum and minimum length is used for string data and min and max is used for max data</p>

## How we make our own custom function
<p> for example inside in gender i write that validator function validate(vlaue) it take a value and then check a condition that if(![male , female , other].includes.value) mean that if that genders is not present then throw an error</p>

## enum
<P> enum and validator work same but enum used for fixed list while validator used for custom </p>

## timestamp
<p>In time stamp it give to us when to create a document and when to update a document its a good practice to write it</p>

# Important 
<p>supoose i want that when a user signup then he will not able to update its email and name and its remain fetaure can update like photo , gender ,age etc so we use api level validatioon </p>

<p>i use logic for it objects.keys(data) will pick all the values and then .every check ti with every value of update array if not present in update array then give me error </p>

## using of npm validator 
<p> it have a lot of function suppose if some one enter invalid email address so we use it inside schema validate function and use loigv to handle that if validator.isemail(value) is not then throw error</p>

# Encryption of passward
<p>supoose if user want to sign in and he enter some milicious data or attacker attack and enter some unexpected data then what we will do ? </p>

## First validation of our schema 
<p>we use to validate our data that come from user side using npm package of npm i validator </p>
<p>then we use to make a folder with utails name and use logic inside for validation that if then user cannot enter name email etc then donot go further </p>

## second is encryption of passward using bcrypt 
<p>so i use npm i bycrypt for encryption of passward and handle it with async await bcz it return a promise </p>
<p>then i update the new instance of user which check the data against schema which is come form req.body and mention those field which is inside in schema extract those fields this is bcz when some one added extra fields in postman then that data cannot goes to database</p>

## using bcrypt for login 
<p>i used bcrypt for login bcrpt.compare but first i find an email if present then use compare function to compare our encrypt passward with an plaintext passward </p>

# Authentication , jwt and cookies
  - on login make validaion after valid generate jwt token and wrap it into inside cookies
  - make an api /proflie
  - on every api call first we need to validate the token
  - for validation we make middleware
  - then after valid the user user can get data from server or update it or sending connection request
  - also use token expires when the token expire then user must need to login
  - work with jwt expire and also cookies expire

# Diving into APi's and express Router()

- we use to group multiple apis =>express.router this is because when we have multiple of apis and we write all of apis in app.js this is not  the well way so we need to arrange it in different groups for code better

## Done some imporatant apis with validations
 ## connection request api
    -  only interested and ignore will allowed
    -  a person cannot send request to yourself 
    -  when A send request to B then A cannot send back request to B and ALso Bcannot send request to A
    -  suppose someone enter dummy id so what happen ?
## updatepasswardapi
## edit profile api
## compund index