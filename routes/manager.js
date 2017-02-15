var express = require('express'),
    router1 = express.Router(),
    Manager = require('../models/question.js'),
    crypto = require('crypto'),
    TITLE_REG = '题目上传';

router1.get('/', function(req, res) {
  res.render('manager',{title:TITLE_REG});
});

router1.post('/', function(req, res) {
  var question_id = req.body['txtquestion_id'],
      question_con = req.body['txtquestion_con'],
      answer_A = req.body['txtanswer_A'],  
      answer_B = req.body['txtanswer_B'],  
      answer_C = req.body['txtanswer_C'],  
      answer_D = req.body['txtanswer_D'],  

     md5 = crypto.createHash('md5');
 
     question_id = md5.update(question_id).digest('hex');

  var newManager = new Manager({
      Q_ID: question_id,
      Q: question_con,
      A: answer_A,
      B: answer_B,
      C: answer_C,
      D: answer_D                
  });

  //检查题号是否已经存在
  Manager.getManagerNumByName(newManager.Q_ID, function (err, results) {        
             
      if (results != null && results[0]['num'] > 0) {
          err = '题目已存在';
      }

      if (err) {
          res.locals.error = err;
          res.render('manager', { title: TITLE_REG });
          return;
      }

      newManager.save(function (err,result) {
          if (err) {
              res.locals.error = err;
              res.render('manager', { title: TITLE_REG }); 
              return;            
          }        

          if(result.insertId > 0)
          {
              res.locals.success = '题目上传成功' ;
          }
          else
          {
              res.locals.error = err;
          }
         
          res.render('manager', { title: TITLE_REG });
          });    
    });          
});

module.exports = router1;