CREATE DATABASE IF NOT EXISTS tk_database CHARACTER SET UTF8;

USE tk_database;

SET FOREIGN_KEY_CHECKS=0;


DROP TABLE IF EXISTS `tm`;
CREATE TABLE `tm` (
  `Q_Id`int(11) NOT NULL AUTO_INCREMENT COMMENT '题号',        
  `Q` varchar(800) NOT NULL  COMMENT '题干',
  `A` varchar(200) NOT NULL COMMENT '答案A',
  `B` varchar(200) NOT NULL COMMENT '答案B',
  `C` varchar(200) NOT NULL COMMENT '答案C',
  `D` varchar(200)  COMMENT '答案D',
  `answer` varchar(100) NOT NULL COMMENT '正确答案',
  PRIMARY KEY (`Q_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='题目信息表';