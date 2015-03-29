CREATE DATABASE IF NOT EXISTS `n00728069` /*!40100 DEFAULT CHARACTER SET latin1 */;

use n00728069;
CREATE TABLE IF NOT EXISTS `Users` (
  `Username` VARCHAR(12) NOT NULL,
  `Password` VARCHAR(100) NOT NULL,
  `IsAdministrator` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`Username`),
  UNIQUE KEY `Username_UNIQUE` (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `Stocks` (
  `Username` VARCHAR(12) NOT NULL,
  `Stocks` LONGTEXT,
  PRIMARY KEY (`Username`),
  CONSTRAINT `Username` FOREIGN KEY (`Username`) REFERENCES `Users` (`Username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `AuthenticationTickets` (
  `AuthenticationTicket` VARCHAR(36) NOT NULL,
  `LastAccessedTime` DATETIME NOT NULL,
  PRIMARY KEY (`AuthenticationTicket`),
  UNIQUE KEY `AuthenticationTicket_UNIQUE` (`AuthenticationTicket`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `RestaurantTypes` (
  `RestaurantTypeID` VARCHAR(36) NOT NULL,
  `RestaurantTypeName` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`RestaurantTypeID`),
  UNIQUE INDEX `RestaurantTypeID_UNIQUE` (`RestaurantTypeID` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `RestaurantEthnicities` (
  `RestaurantEthnicityID` VARCHAR(36) NOT NULL,
  `RestaurantEthnicityName` VARCHAR(55) NOT NULL,
  PRIMARY KEY (`RestaurantEthnicityID`),
  UNIQUE INDEX `RestaurantEthnicityID_UNIQUE` (`RestaurantEthnicityID` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `Restaurants` (
  `RestaurantID` VARCHAR(36) NOT NULL,
  `RestaurantName` LONGTEXT NULL,
  `RestaurantTypeID` VARCHAR(36) NOT NULL,
  `RestaurantEthnicityID` VARCHAR(36) NOT NULL,
  `IsApproved` TINYINT(1) NULL DEFAULT 0,
  PRIMARY KEY (`RestaurantID`),
  UNIQUE INDEX `RestaurantID_UNIQUE` (`RestaurantID` ASC),
  INDEX `RestaurantTypeID_idx` (`RestaurantTypeID` ASC),
  INDEX `RestaurantEthnicityID_idx` (`RestaurantEthnicityID` ASC),
  CONSTRAINT `Restaurants_RestaurantTypeID`
    FOREIGN KEY (`RestaurantTypeID`)
    REFERENCES `RestaurantTypes` (`RestaurantTypeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `Restaurants_RestaurantEthnicityID`
    FOREIGN KEY (`RestaurantEthnicityID`)
    REFERENCES `RestaurantEthnicities` (`RestaurantEthnicityID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `RestaurantLocations` (
  `RestaurantLocationID` VARCHAR(36) NOT NULL,
  `RestaurantID` VARCHAR(36) NOT NULL,
  `RestaurantCity` VARCHAR(50) NULL,
  `RestaurantState` VARCHAR(50) NULL,
  `RestaurantZip` VARCHAR(10) NULL,
  `RestaurantStreetAddress` VARCHAR(100) NULL,
  PRIMARY KEY (`RestaurantLocationID`),
  UNIQUE INDEX `RestaurantLocationID_UNIQUE` (`RestaurantLocationID` ASC),
  INDEX `RestaurantLocations_RestaurantID_idx` (`RestaurantID` ASC),
  CONSTRAINT `RestaurantLocations_RestaurantID`
    FOREIGN KEY (`RestaurantID`)
    REFERENCES `Restaurants` (`RestaurantID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `RestaurantRatings` (
  `RestaurantLocationID` VARCHAR(36) NOT NULL,
  `Username` VARCHAR(12) NOT NULL,
  `Menu` TINYINT(4) NULL DEFAULT 0,
  `Environment` TINYINT(4) NULL DEFAULT 0,
  `Cost` TINYINT(4) NULL DEFAULT 0,
  `Quality` TINYINT(4) NULL DEFAULT 0,
  `Service` TINYINT(4) NULL DEFAULT 0,
  `Comment` VARCHAR(255) NULL,
  PRIMARY KEY (`RestaurantLocationID`, `Username`),
  INDEX `RestaurantRatings_Username_idx` (`Username` ASC),
  CONSTRAINT `RestaurantRatings_RestaurantLocationID`
    FOREIGN KEY (`RestaurantLocationID`)
    REFERENCES `RestaurantLocations` (`RestaurantLocationID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `RestaurantRatings_Username`
    FOREIGN KEY (`Username`)
    REFERENCES `Users` (`Username`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;