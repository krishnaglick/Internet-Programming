CREATE DATABASE `n00728069` /*!40100 DEFAULT CHARACTER SET latin1 */;

use n00728069;
CREATE TABLE `Users` (
  `Username` varchar(12) NOT NULL,
  `Password` varchar(100) NOT NULL,
  PRIMARY KEY (`Username`),
  UNIQUE KEY `Username_UNIQUE` (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `Stocks` (
  `Username` varchar(12) NOT NULL,
  `Stocks` longtext,
  PRIMARY KEY (`Username`),
  CONSTRAINT `Username` FOREIGN KEY (`Username`) REFERENCES `Users` (`Username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `AuthenticationTickets` (
  `AuthenticationTicket` varchar(36) NOT NULL,
  `LastAccessedTime` datetime NOT NULL,
  PRIMARY KEY (`AuthenticationTicket`),
  UNIQUE KEY `AuthenticationTicket_UNIQUE` (`AuthenticationTicket`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
