var _fs = require('fs');
//var Manager1 = require('./question1.js');//路径要书写正确
var DB = require('./question1.js');//路径要书写正确
//定义数组
var data = '';
var _db = new DB();//注意该对象实例化的位置，不能在函数inserttoMysql中实例化，不然造成过多的资源浪费
//创建可读流
var readerStream = _fs.createReadStream('xzt.txt');
readerStream.on('data',function(chunk){
    data += chunk;
    var i = data.indexOf('\n');
    var n = 0 ;
    var tm = {};
    while(i > -1){ 
        var line = data.substring(0, i);
        data = data.substring(i + 1);        
        if(n == 0){
            //console.log("题目：" + line);  
            tm.Q = line;
        }else if(n == 1){
            //console.log("A：" + line);
            tm.A = line;
        }else if(n == 2){
            //console.log("B：" + line);
            tm.B = line;
        }else if(n == 3){
            //console.log("C：" + line);
            tm.C = line;
        }        
        else if(n == 4){
            if(line[0]=='D'&&line[1]=='、'){ //console.log("D：" + line);//数据索引从0开始
                tm.D = line;
            }
            else {
                n=6;
                tm.D=null;
                tm.answer = line;
            }       
        }
        else if(n == 5){
            //console.log("answer：" + line);
            tm.answer = line;
           
        }

        n ++ ;
        if(n > 5){
            //debugger;
            n = 0;
            insertToMysql(tm);
        };
        i = data.indexOf('\n');  
        };       
});
readerStream.on('end',function(){
    console.log("file read end.");
});

var insertToMysql = function(tm){
    console.log('进入insertmysql函数');
    try{
        
        //console.log(_db);
        var sql = 'INSERT INTO tm(Q,A,B,C,D,answer) VALUES(?,?,?,?,?,?)';
        var params = [tm.Q, tm.A, tm.B, tm.C, tm.D,tm.answer];
        var callback = function(){
           
        };

        _db.doInsert(sql,params,callback);
        console.log('执行doInsert函数'); 
       // _db = null;
    }catch(err){
        console.log(err.error_msg);  
    }


    // var newManager1 = new Manager1(tm);
    // newManager1.preserve(newManager1,function(){});
}

