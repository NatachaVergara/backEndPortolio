const config = require('./db.config')
const mysql = require('mysql');


module.exports.request = (query) => new Promise((res,rej) => {
    const connection = mysql.createPool({
        host: config.HOST,
        user: config.USER,
        password: config.PASSWORD,
        database: config.DB
    })

    connection.query(query, (error,data,field) =>{
        if(error) rej(error)

        connection.end((err)=>{
            if(err) rej(err)
            res(data)
        })
    })

})

