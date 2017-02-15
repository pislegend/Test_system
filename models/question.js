//////////////////.................Manager....................////////////////
var mysql = require('mysql');
var DB_NAME1 = 'manager';

var pool1  = mysql.createPool({
    host     : '127.0.0.1',
    user     : 'root',
    password : '123456'
});

pool1.on('connection', function(connection) {  
    connection.query('SET SESSION auto_increment_increment=1'); 
});  

function Manager(user){
            //this.Q_ID = user.Q_ID,
            this.Q = user.Q,
            this.A = user.A,
            this.B = user.B,
            this.C = user.C,
            this.D = user.D
};


pool1.getConnection(function(err, connection) {

    var useDbSql = "USE " + DB_NAME1;
    connection.query(useDbSql, function (err) {
         if (err) {
            console.log("USE Error: " + err.message);
            return;
         }
         console.log('USE succeed');
    });

//保存数据
    Manager.prototype.save = function save(callback) {
        var tm = {
            //Q_ID: this.Q_ID,
            Q: this.Q,
            A: this.A,
            B: this.B,
            C: this.C,
            D: this.D 
        };

        var insertManager_Sql = "INSERT INTO question(Q,A,B,C,D) VALUES(?,?,?,?,?)";

        connection.query(insertManager_Sql, [tm.Q, tm.A, tm.B, tm.C, tm.D], function (err,result) {
            if (err) {
                console.log("insertManager_Sql Error: " + err.message);
                return;
            }

            //connection.release();

            console.log(tm.Q + "insert ok!");
            callback(err,result);                     
        });       
    };

    //根据题目内容得到题目数量
    Manager.getManagerNumByName = function getManagerNumByName(Q, callback) {

        var getManagerNumByName_Sql = "SELECT COUNT(1) AS num FROM question WHERE Q = ?";

        connection.query(getManagerNumByName_Sql, [Q], function (err, result) {
            if (err) {
                console.log("getManagerNumByName Error: " + err.message);
                return;
            }

            //connection.release();

            console.log("invoked[getManagerNumByName]");
            callback(err,result);                     
        });        
    };

    //根据题目内容得到题目信息
    Manager.getManagerByUserName = function getManagerNumByName(Q, callback) {

        var getManagerByUserName_Sql = "SELECT * FROM question WHERE Q = ?";

        connection.query(getManagerByUserName_Sql, [Q], function (err, result) {
            if (err) {
                console.log("getManagerByUserName Error: " + err.message);
                return;
            }

            //connection.release();

            console.log("invoked[getManagerByUserName]");
            callback(err,result);                     
        });        
    };
 
});

module.exports = Manager;