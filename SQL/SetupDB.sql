CREATE DATABASE IF NOT EXISTS `n00728069` /*!40100 DEFAULT CHARACTER SET latin1 */;

use n00728069;
CREATE TABLE IF NOT EXISTS `Users` (
  `Username` varchar(12) NOT NULL,
  `Password` varchar(100) NOT NULL,
  PRIMARY KEY (`Username`),
  UNIQUE KEY `Username_UNIQUE` (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `Stocks` (
  `Username` varchar(12) NOT NULL,
  `Stocks` longtext,
  PRIMARY KEY (`Username`),
  CONSTRAINT `Username` FOREIGN KEY (`Username`) REFERENCES `Users` (`Username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `AuthenticationTickets` (
  `AuthenticationTicket` varchar(36) NOT NULL,
  `LastAccessedTime` datetime NOT NULL,
  PRIMARY KEY (`AuthenticationTicket`),
  UNIQUE KEY `AuthenticationTicket_UNIQUE` (`AuthenticationTicket`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `Restaurants` (
  `RestaurantID` INT NOT NULL AUTO_INCREMENT,
  `RestaurantName` varchar(100) NOT NULL,
  PRIMARY KEY (`RestaurantID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `RestaurantRatings` (
  `RestaurantID` int(11) NOT NULL,
  `Username` varchar(12) NOT NULL,
  `Menu` int(11) DEFAULT '0',
  `Enviroment` int(11) DEFAULT '0',
  `Cost` int(11) DEFAULT '0',
  `Quality` int(11) DEFAULT '0',
  `Service` int(11) DEFAULT '0',
  PRIMARY KEY (`RestaurantID`,`Username`),
  UNIQUE KEY `Username_UNIQUE` (`Username`),
  UNIQUE KEY `RestaurantID_UNIQUE` (`RestaurantID`),
  CONSTRAINT `RestaurantID_Ratings` FOREIGN KEY (`RestaurantID`) REFERENCES `restaurants` (`RestaurantID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `Username_Ratings` FOREIGN KEY (`Username`) REFERENCES `users` (`Username`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
