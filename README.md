# ToDo List App - Backend

This is the backend part of the MERN stack ToDo List application. It is built with Node.js, Express, and MongoDB.

## Folder Structure and its functions

* controllers - This folder contains functions for user task management (add, read, update, delete), user authentication (register, login, logout), and profile retrieval.

* database - This folder contains a function for database connection with custom name and URI.

* middlewares - This folder contains a JWT-based user authentication function and a custom error handler class.

* models - It contains MongoDB schemas for creating users and tasks.

* routes - It contains GET, POST, PUT, and DELETE routes for tasks and users.

* utils - Contains a function to create an authentication cookie in the browser.
## Tech Stack 

* Node.js
* Express
* MongoDB
* Mongoose

## Features

* Implements user authentication by creating a JWT cookie and storing it in the browser.

*  Utilizes bcrypt to encrypt user passwords before database storage.

*  Uses CORS to accept responses from different URIs.

## Deployed Link

* This app is deployed on Render. Link below

* [Todo List - Backend](https://nodejs-todo-app-rn4w.onrender.com/)

* *Note* : This link is for the backend only; no frontend design is included. Please check the frontend repository. Link below.

* [Todo List - Front-End](https://github.com/Aftab1112/React-Todo-App)

## Author
 **Aftab Reshamwale.**

Please feel free to suggest improvements for my project.  
