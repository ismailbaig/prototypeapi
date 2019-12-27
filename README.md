# prototypeapi
Prototype API

Mock Data is just placed, but the API is calling the real time MONGO DB for data retrieval.

3 APIs created with end points ending with task1, task2, task3

In the project I have made 'Access-Control-Allow-Origin' to '*', meaning any website can access the data. We can change it to a specific URL if needed.

HOW TO RUN:
----------
 In DEV Environment:
--------------------
1. Install Nodejs
2. OPEN Node Command prompt.
3. Go to the folder where this API project is placed
4. run 'npm install'
     This will install all the dependencies needed to run this project.
5. Type 'node alltasks.js'
       This will run the API at the PORT 4000!

In Cloud:
---------
1. Install Nodejs
2. OPEN Node Command prompt.
3. Go to the folder where this API project is placed
4. run 'npm install'
     This will install all the dependencies needed to run this project.
5. run the command 'ng build --prod'
6. Login to any cloud (e.g AWS EC2) instance
7. Open a terminal and the port. Make sure to open the same port which your API is coded. e.g 4000
8. Genereate a PEM file (this is specific for AWS EC2)
9. Install PuTTYgen and convert this PEM file to PPK file.
10. Install FileZilla (or any other FTP tool)
11. Transfer the prod build deliverables to the instance of cloud (e.g AWS EC2)
12. Open any browser and type the end point to get the data.


To Check only API:
------------------
1. Install POSTMAN 
2. Open POSTMAN and call a GET http verb method, e.g localhost:4000/task1
