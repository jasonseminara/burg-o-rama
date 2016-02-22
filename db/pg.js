'use strict'
var pg = require('pg');

var config = {
    host: process.env.DB_HOST, // server name or IP address;
    port: 5432,
    database: 'burgerama',
    user: process.env.DB_USER,
    password: process.env.DB_PASS
};


module.exports.getAllBurgers = (req,res,next)=>{

  pg.connect(config, (err, client,done)=>{
    if(err){
      done();
      console.log(err);
      res.status(500).json({success:false,data:err});
    }

    client.query("select * from burgers", (err, results)=>{
      // release the query
      done();
      if(err){
        console.error('error running query',err);
      }
      console.log(results.rows);
      res.rows = results.rows;
      next();
    })
  })
}

module.exports.insertBurger = (req,res,next)=>{

   pg.connect(config, (err, client,done)=>{
    if(err){
      done();
      console.log(err);
      res.status(500).json({success:false,data:err});
    }


    var insertBurgerString = `insert into burgers 
    ( burger_name, meat_type, meat_temp, cheese_type, extras)
    VALUES
    ( $1,$2,$3,$4,$5 ) 
    returning burger_id`;

    client.query(
      insertBurgerString,
      [
        req.body.name,
        req.body.meat,
        req.body.temperature, 
        req.body.cheese,
        req.body.extras
      ], 
      (err, results)=>{
        // release the query
        done();
        if(err){
          console.error('error running query',err);
        }
        console.log(results.id);
        res.newBurgerID = results.rows.id;
        next();
      })
  })
};

module.exports.deleteBurger = (req,res,next)=>{
  pg.connect(config, (err, client,done)=>{
    if(err){
      done();
      console.log(err);
      res.status(500).json({success:false,data:err});
    }

    client.query(`delete from burgers where burger_id = $1`, [req.params.burgerID], (err, results)=>{
      // release the query
      done();
      if(err){
        console.error('error running query',err);
      }
      console.log(results.rows);
      res.rows = results.rows;
      next();
    })
  })
}

