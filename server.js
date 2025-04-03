// this will be the starting file of the project

const express = require("express")
const mongoose = require("mongoose")
const app = express()
const server_config =require("./configs/server.config")
const db_config = require('./configs/db.config')
const user_model = require('./models/user.model')
const bcrypt = require("bcryptjs")


//  creste am admin user at the starting of the application 
//  if not already present




mongoose.connect(db_config.DB_URL)

const db = mongoose.connection

db.on("error", () => {
    console.log("error while connection to the mongodb");
})

db.once("open" , () =>{
    console.log("connection to MongoDB");
    init()
})


 async function init() {
    try {
        let user = await user_model.findOne({userId : "admin"})

        if(user) {
            console.log("Admin is already present");
            return
        }

    } catch (error) {
        console.log("error while reading the data", error);  
    }

    try {
        user = await user_model.create({
            name : "Barkat",
            userId : "admin",
            userType : "ADMIN",
            email : "barkat0126@gmail.com",
            password : bcrypt.hashSync("welcome1",8)
        })
        console.log("Admin created", user);
        
    } catch (error) {
        console.log("Error while create admin", error);
        
    }
}






//  start the server

app.listen(server_config.PORT, () => {
    console.log("SERVER STARTED AT PORT NUM :", server_config.PORT)
})