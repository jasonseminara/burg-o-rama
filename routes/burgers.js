'use strict'
var express = require('express');
var burgers = express.Router();
var db = require('../db/pg');
var burgerData = [];

var dumpMethod = (req,res)=>res.send( req.method + " burgers! // METHOD NOT IMPLEMENTED" )

// burgers route (collection)
burgers.route('/')
  /*burger homepage*/
  .get( db.getAllBurgers, (req,res)=>
    res.render('pages/burger_all',{data:res.rows })
  )

  /*create a new burger*/
  .post(db.insertBurger, (req,res)=>res.redirect('./') )

/* show create burger form*/
burgers.get('/new', (req,res)=>
	res.render('pages/burger_edit', { 
    burgerForm:{ 
      title:'Create your Dream Burger',
      burgerURL:'/burgers/', 
      submitMethod:'post'
    }
  })
)
/*show edit form for one burger*/
burgers.get('/:burgerID/edit', (req,res)=>
	res.render('pages/burger_edit', { 
    burgerForm:{ 
      title:'Edit your Dream Burger',
      burgerURL:'/burgers/'+ req.params.burgerID+'?_method=PUT', 
      submitMethod:'post'
    }
  })
)

// single burgers
burgers.route('/:burgerID')
	.get((req,res)=>{
    var bID = req.params.burgerID;
    // if there is not a burger at position :burgerID, throw a non-specific error
    if(!(bID in burgerData)){
      res.sendStatus(404);
      return;
    }
    res.render('pages/burger_one', {
      burgerID:bID,
      burgerURL:'/burgers/'+bID,
      burgerData: burgerData[bID]})
  })
  /*one burger update*/
  .put((req,res)=>{
    var bID = req.params.burgerID;
    console.log("PUUUUUUUT", req.body)
    // if we don't have a burger there, let's 
    if(!(bID in burgerData)){
      res.sendStatus(404);
      return;
    }

    //replace the burger at :burgerID position
    burgerData[bID] = req.body;

    //redirect to the new burger
    res.redirect('/' + bID)
  })

  .delete(db.deleteBurger, (req,res)=>res.redirect('./') )



module.exports = burgers;