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


