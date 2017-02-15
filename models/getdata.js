var mysql = require('mysql');
var DB_NAME = 'manager';

var pool  = mysql.createPool({
    host     : '127.0.0.1',
    user     : 'root',
    password : '123456'
});

pool.on('connection', function(connection) {  
    connection.query('SET SESSION auto_increment_increment=1'); 
});  

function Issue(user){

};
module.exports = Issue;

pool.getConnection(function(err, connection) {

    var useDbSql = "USE " + DB_NAME;
    connection.query(useDbSql, function (err) {
         if (err) {
            console.log("USE Error: " + err.message);
            return;
         }
         console.log('USE succeed'); 
    });

    //读取数据
    //var str = req.params.str;
    Issue.prototype.read = function read(str,callback) {
		/*
        var user = {
            Q_ID: this.Q_ID
        }; 
		*/
        var getUser_Sql = "SELECT Q_ID,Q,A,B,C,D FROM question" ;
        

        connection.query(getUser_Sql, function (err,result) {
            if (err) {
                console.log("getUser_Sql Error: " + err.message);
                return;
            }
            //console.log(result);
            console.log("invoked[read]");
            console.log(JSON.stringify(result));
            callback(err,JSON.stringify(result));  //result是一个对象，  
        });            
    };
    
connection.release();


//       //根据题目内容得到题目数量
//     Issue.getManagerNumByName = function getManagerNumByName(Q, callback) {

//         var getManagerNumByName_Sql = "SELECT COUNT(1) AS num FROM question WHERE Q = ?";

//         connection.query(getManagerNumByName_Sql, [Q], function (err, result) {
//             if (err) {
//                 console.log("getManagerNumByName Error: " + err.message);
//                 return;
//             }

//             //connection.release();

//             console.log("invoked[getManagerNumByName]");
//             callback(err,result);                     
//         });        
//     };

//     //根据题目内容得到题目信息
//     Issue.getManagerByUserName = function getManagerNumByName(Q, callback) {

//         var getManagerByUserName_Sql = "SELECT * FROM question WHERE Q = ?";

//         connection.query(getManagerByUserName_Sql, [Q], function (err, result) {
//             if (err) {
//                 console.log("getManagerByUserName Error: " + err.message);
//                 return;
//             }

//             //connection.release();

//             console.log("invoked[getManagerByUserName]");
//             callback(err,result);                     
//         });        
//     };
 
 });