//引用文件系统和数据库系统
var fs = require('fs');
var mysql = require('mysql');
var FileManager = function() {
    //为数据库新开辟一个连接池
    var pool = mysql.createPool({
        host: '127.0.0.1',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'tk_database'
    });

    //从连接池中获取一个链接
    pool.getConnection(function(e, con) {
        //监测链接异常
        if (e) {
            console.log(e);
        } else {
            //定义数据流变量
            var data = '';
            //实例化数据流方法
            var readerStream = fs.createReadStream('xzt.txt');
            //读取数据流
            readerStream.on('data', function(chunk) {
                //chunk数据流一次性读取的字符数buffer（）
                //将chunk中的字符累加到data中
                data += chunk;
                //检测data中第一个回车符\n的索引位置，起始为1
                var i = data.indexOf('\n');
                //用于监测行数
                var n = 0;
                //定义tm对象
                var tm = {};
                //循环读取数据
                while (i > -1) {
                    //读取到索引的所有字符
                    var line = data.substring(0, i);
                    //截掉line之后的data
                    data = data.substring(i + 1);
                    //循环读取每个题目的每一行
                    if (n == 0) {
                        //console.log("题目：" + line);  
                        tm.Q = line;
                    } else if (n == 1) {
                        //console.log("A：" + line);
                        tm.A = line;
                    } else if (n == 2) {
                        //console.log("B：" + line);
                        tm.B = line;
                    } else if (n == 3) {
                        //console.log("C：" + line);
                        tm.C = line;
                    } else if (n == 4) {
                        if (line[0] == 'D' && line[1] == '、') { //console.log("D：" + line);//数据索引从0开始
                            tm.D = line;
                        } else {
                            n = 6;
                            tm.D = null;
                            tm.answer = line;
                        }
                    } else if (n == 5) {
                        //console.log("answer：" + line);
                        tm.answer = line;
                    }

                    n++;
                    //读够一道题目之后行进行存储
                    if (n > 5) {
                        n = 0;
                        var sql = 'INSERT INTO tm(Q,A,B,C,D,answer) VALUES(?,?,?,?,?,?)';
                        var params = [tm.Q, tm.A, tm.B, tm.C, tm.D, tm.answer];
                        con.query(sql, params);
                    };
                    //读取剩余题目的索引
                    i = data.indexOf('\n');
                    //防止上传试卷中出现空行
                    if (i == 1) {
                        data = data.substring(2);
                        i = data.indexOf('\n');
                    }
                };
            });
            //关闭文件流
            readerStream.on('end', function() {
                console.log("file read end.");
                //释放链接
                con.release();
            });
        }
    });
}

module.exports = FileManager;
