CREATE DATABASE `n00728069` /*!40100 DEFAULT CHARACTER SET latin1 */;

use n00728069;
CREATE TABLE `Users` (
  `User_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Username` varchar(12) NOT NULL,
  `Password` varchar(100) NOT NULL,
  PRIMARY KEY (`User_ID`),
  UNIQUE KEY `User_ID_UNIQUE` (`User_ID`),
  UNIQUE KEY `Username_UNIQUE` (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `Stocks` (
  `User_ID` int(11) NOT NULL,
  `Stocks` longtext,
  PRIMARY KEY (`User_ID`),
  CONSTRAINT `User_ID` FOREIGN KEY (`User_ID`) REFERENCES `Users` (`User_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `AuthenticationTickets` (
  `AuthenticationTicket` varchar(36) NOT NULL,
  `LastAccessedTime` datetime NOT NULL,
  PRIMARY KEY (`AuthenticationTicket`),
  UNIQUE KEY `AuthenticationTicket_UNIQUE` (`AuthenticationTicket`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
