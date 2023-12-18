import mysql from "mysql"

export const db= mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"kamla",
    database:"blog"

})
db.connect((err)=>{
    if (err) throw err;
    console.log("Connected to db")
  })
  