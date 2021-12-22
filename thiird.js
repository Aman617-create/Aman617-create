const {Pool} = require('pg');


const pool = new Pool({
    host:'localhost',
    port:'5432',
    user:'postgres',
    passwor :'admin',
    database:'demand'
});



module.exports=pool;