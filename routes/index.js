var express = require('express'),
    router = express.Router();
    Issue = require('../models/getdata.js'),

router.get('/', function(req, res) {
	
  if(req.cookies.islogin)
  { 
         console.log('cookies:' + req.cookies.islogin);
       req.session.username = req.cookies.islogin;
  }  

  if(req.session.username)
  {    
          console.log('session:' + req.session.username);
        res.locals.username = req.session.username;      
  }
  else
  {
        res.redirect('/login');
        return;    
  }
  
  
  var issues = new Issue();
	console.log(req.params);
	var str = req.params.str;

  console.log("str is :" + str);
	issues.read(str,function(err,result){
		if(err)
			throw '读取失败';
		else
      //var _result = 
			res.render('index',{title:'主页',question:result});
    
  //var _result = JSON.stringify(result);
  //console.log(_result);
	});

});

module.exports = router;


