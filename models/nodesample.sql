CREATE DATABASE IF NOT EXISTS nodesample CHARACTER SET UTF8;

USE nodesample;

SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE `userinfo` (
  `Id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `UserName` varchar(64) NOT NULL COMMENT '用户名',
  `UserPass` varchar(64) NOT NULL COMMENT '用户密码',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户信息表';

DROP TABLE IF EXISTS `question`;
CREATE TABLE `question` (
  `Q_ID`int(11) NOT NULL AUTO_INCREMENT COMMENT '题号',
  `Q` varchar(64) NOT NULL  COMMENT '题干',
  `A` varchar(64) NOT NULL COMMENT '答案A',
  `B` varchar(64) NOT NULL COMMENT '答案B',
  `C` varchar(64) NOT NULL COMMENT '答案C',
  `D` varchar(64) NOT NULL COMMENT '答案D',
  PRIMARY KEY (`Q`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='题目信息表';




