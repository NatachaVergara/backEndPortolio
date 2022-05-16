const mysql = require('mysql');
const config = require('./db.config')
module.exports.request = (query) => new Promise((res,rej) => {
    const connection = mysql.createPool({
        host: process.env.LOCAL ? 'localhost' : config.HOST,
        user: process.env.LOCAL ? 'root' : config.USER,
        password: config.PASSWORD,
        database: process.env.LOCAL ? 'portfolio' : config.DATABASE
    })

    connection.query(query, (error,data,field) =>{
        if(error) rej(error)

        connection.end((err)=>{
            if(err) rej(err)
            res(data)
        })
    })

})

