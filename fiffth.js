const express = require('express');
const app = express();
const bodyparser = require('body-parser')
const pool = require('./third');

urlencode = bodyparser.urlencoded({ extended: false });
parser = bodyparser.json();

pool.connect()


// FOR CHECKING DATA IS AVAILABLE



app.get('/api/reading', (req, response) => {
    pool.query(`SELECT * FROM cities`, (err, res) => {
        if (err) {
            console.log(err.message)
        } else {
            var dop = res.rowCount
        }
     if (dop > 0) {
         response.send("DATA IS AVAILABLE ")
    } else {
        console.error("no data available")
        }
    })

})



//       EXPORTER DETAILS WITHOUT PASSWORD

app.get('/api/read', (request, response) => {
    pool.query(`SELECT * FROM users LEFT JOIN exporter_profile ON
users.user_id=exporter_profile.user_id `, (err, res) => {
        if (err) {
            console.log(err.message)
        } else {
            var gui = res.rows
            for (i = 0; i < gui.length; i++) {
                delete (gui[i].password)
            }
        }
        response.send(gui)
    })
})




//POST PHONE NUMBER AND GET DETAILS

app.post('/api/create', parser, (req, res) => {

    const phone_number = req.body.phone_number;
    pool.query(`SELECT * FROM  users WHERE phone_number= $1 `, [phone_number], (err, result) => {
        if (err) {
            console.log(err.message)
        } else {
            poli = (result.rows)
        }
        res.send(poli)
    })
})



app.listen(4002)




