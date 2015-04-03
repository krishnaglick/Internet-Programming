CREATE DATABASE IF NOT EXISTS `n00728069` /*!40100 DEFAULT CHARACTER SET latin1 */;

use n00728069;
CREATE TABLE IF NOT EXISTS `Users` (
  `username` VARCHAR(12) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `isAdministrator` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`username`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `Stocks` (
  `username` VARCHAR(12) NOT NULL,
  `stocks` LONGTEXT,
  PRIMARY KEY (`username`),
  CONSTRAINT `username` FOREIGN KEY (`username`) REFERENCES `Users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `AuthenticationTickets` (
    `authenticationTicket` VARCHAR(36) NOT NULL,
    `lastAccessedTime` DATETIME NOT NULL,
    `isAdministrator` TINYINT(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (`authenticationTicket`),
    UNIQUE KEY `authenticationTicket_UNIQUE` (`authenticationTicket`)
)  ENGINE=INNODB DEFAULT CHARSET=LATIN1;

CREATE TABLE IF NOT EXISTS `RestaurantTypes` (
  `restaurantTypeID` VARCHAR(36) NOT NULL,
  `restaurantTypeName` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`restaurantTypeID`),
  UNIQUE INDEX `restaurantTypeID_UNIQUE` (`restaurantTypeID` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `RestaurantEthnicities` (
  `restaurantEthnicityID` VARCHAR(36) NOT NULL,
  `restaurantEthnicityName` VARCHAR(55) NOT NULL,
  PRIMARY KEY (`restaurantEthnicityID`),
  UNIQUE INDEX `restaurantEthnicityID_UNIQUE` (`restaurantEthnicityID` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `Restaurants` (
  `restaurantID` VARCHAR(36) NOT NULL,
  `restaurantName` LONGTEXT NULL,
  `restaurantTypeID` VARCHAR(36) NOT NULL,
  `restaurantEthnicityID` VARCHAR(36) NOT NULL,
  `isApproved` TINYINT(1) NULL DEFAULT 0,
  PRIMARY KEY (`restaurantID`),
  UNIQUE INDEX `restaurantID_UNIQUE` (`restaurantID` ASC),
  INDEX `restaurantTypeID_idx` (`restaurantTypeID` ASC),
  INDEX `restaurantEthnicityID_idx` (`restaurantEthnicityID` ASC),
  CONSTRAINT `Restaurants_RestaurantTypeID`
    FOREIGN KEY (`restaurantTypeID`)
    REFERENCES `RestaurantTypes` (`restaurantTypeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `Restaurants_restaurantEthnicityID`
    FOREIGN KEY (`restaurantEthnicityID`)
    REFERENCES `RestaurantEthnicities` (`restaurantEthnicityID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `RestaurantLocations` (
  `restaurantLocationID` VARCHAR(36) NOT NULL,
  `restaurantID` VARCHAR(36) NOT NULL,
  `restaurantCity` VARCHAR(50) NULL,
  `Restaurantstate` VARCHAR(50) NULL,
  `restaurantZip` VARCHAR(10) NULL,
  `RestaurantstreetAddress` VARCHAR(100) NULL,
  PRIMARY KEY (`restaurantLocationID`),
  UNIQUE INDEX `restaurantLocationID_UNIQUE` (`restaurantLocationID` ASC),
  INDEX `RestaurantLocations_restaurantID_idx` (`restaurantID` ASC),
  CONSTRAINT `RestaurantLocations_restaurantID`
    FOREIGN KEY (`restaurantID`)
    REFERENCES `Restaurants` (`restaurantID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `RestaurantRatings` (
  `restaurantLocationID` VARCHAR(36) NOT NULL,
  `username` VARCHAR(12) NOT NULL,
  `menuRating` TINYINT(4) NULL DEFAULT 0,
  `environmentRating` TINYINT(4) NULL DEFAULT 0,
  `costRating` TINYINT(4) NULL DEFAULT 0,
  `qualityRating` TINYINT(4) NULL DEFAULT 0,
  `serviceRating` TINYINT(4) NULL DEFAULT 0,
  `comment` VARCHAR(255) NULL,
  PRIMARY KEY (`restaurantLocationID`, `username`),
  INDEX `RestaurantRatings_username_idx` (`username` ASC),
  CONSTRAINT `RestaurantRatings_restaurantLocationID`
    FOREIGN KEY (`restaurantLocationID`)
    REFERENCES `RestaurantLocations` (`restaurantLocationID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `RestaurantRatings_username`
    FOREIGN KEY (`username`)
    REFERENCES `Users` (`username`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;