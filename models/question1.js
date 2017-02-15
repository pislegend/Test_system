//////////////////.................Manager1....................////////////////
var mysql = require('mysql');

function DB(){
    if(this instanceof DB){
        this.connect();
    }else{
        throw{
            error_msg:'please create the constructor of DB like this:"var _db = new DB();"'
        }
    }
}

DB.prototype.connect = function(){
    this.client = mysql.createPool({
    host     : '127.0.0.1',
    user     : 'root',
    password : '123456',
    port:'3306',
    database:'tk_database'
    });     
};


DB.prototype.doInsert = function(sql,params,callback){
    this.client.getConnection(function(e,con){
        if(e){
            console.log(e);
        }
        else{
        con.query(sql,params,function(err,results){
            console.log('进入query函数的回调');
            if (err) {
                console.log("insertManager1_Sql Error: " + err.message);
                return;
            }
            //console.log(timu.Q + "insert ok!");
            if(results && typeof callback ==='function')  
            {  
                callback(results);  
            } 
            console.log('一次插入结束！');        
        });
        con.release();
        }
    });
};
    
module.exports = DB;


// //创建连接
// var pool  = mysql.createPool({
//     host     : '127.0.0.1',
//     user     : 'root',
//     password : '123456',
//     port:'3306',
//     database:'tk_database'
// });
// //定义对象
// function Manager1(timu){
//             //this.Q_ID = user.Q_ID,
//             this.Q = timu.Q,
//             this.A = timu.A,
//             this.B = timu.B,
//             this.C = timu.C,
//             this.D = timu.D,
//             this.Answer = timu.answer
// };

// //连接
// Manager1.prototype.preserve = function(timu,callback){ 
//     var timu = {
//             Q: this.Q,
//             A: this.A,
//             B: this.B,
//             C: this.C,
//             D: this.D, 
//             Answer:this.Answer
//               };
// pool.getConnection(function(err,tkconn){


//         var insertManager1_Sql = "INSERT INTO tm(Q,A,B,C,D,answer) VALUES(?,?,?,?,?,?)";

//         tkconn.query(insertManager1_Sql, [timu.Q, timu.A, timu.B, timu.C, timu.D,timu.Answer], function (err,result){
//             if (err) {
//                 console.log("insertManager1_Sql Error: " + err.message);
//                 return;
//             }
//             console.log(timu.Q + "insert ok!");
//             callback(err,result);  
//             //tkconn.release();       
//         }); 
        
// });
// };
// module.exports = Manager1;