CREATE SCHEMA IF NOT EXISTS datawarehouse;

use datawarehouse;

CREATE TABLE IF NOT EXISTS roles (
    id int NOT NULL AUTO_INCREMENT,
    description varchar(255) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO roles (description) VALUES ("admin"), ("user");

CREATE TABLE IF NOT EXISTS users (
  id int NOT NULL AUTO_INCREMENT,
  username varchar(255) NOT NULL,
  name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  roleId int DEFAULT NULL,
  PRIMARY KEY (id),
  KEY roleId (roleId),
  CONSTRAINT users_ibfk_1 FOREIGN KEY (roleId) REFERENCES roles (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO users 
(username, name, last_name, email, password, roleId) 
VALUES ("admin","Julian","Montoya","jmontoya@admin.com", "Admin20*", 1),
("user1","Pedro","Mina","pmina@user.com", "User1*", 2),
("user2","Ana","Ochoa","aochoa@user.com", "User2*", 2);

CREATE TABLE IF NOT EXISTS regions (
    id int NOT NULL AUTO_INCREMENT,
    description varchar(255) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO regions
(description) 
VALUES ("Sudamerica"), ("Centroamerica"), ("Norteamerica");

CREATE TABLE IF NOT EXISTS countries (
    id int NOT NULL AUTO_INCREMENT,
    description varchar(255) NOT NULL,
    regionId int DEFAULT NULL,
    PRIMARY KEY (id),
    KEY regionId (regionId),
    CONSTRAINT countries_ibfk_1 FOREIGN KEY (regionId) REFERENCES regions (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO countries
(description, regionId) 
VALUES ("Colombia", 1), ("Argentina", 1), ("Brasil", 1), ("Mexico", 2), ("EEUU", 3);

CREATE TABLE IF NOT EXISTS cities (
    id int NOT NULL AUTO_INCREMENT,
    description varchar(255) NOT NULL,
    countryId int DEFAULT NULL,
    PRIMARY KEY (id),
    KEY countryId (countryId),
    CONSTRAINT cities_ibfk_1 FOREIGN KEY (countryId) REFERENCES countries (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO cities
(description, countryId) 
VALUES ("Medellin", 1), ("Bogotá", 1),
("Buenos Aires", 2), ("Córdoba", 2),
("Río de Janeiro", 3), ("Sao Pablo", 3),
("CDMX", 4), ("Monterrey", 4),
("Miami", 5), ("NYC", 5);

CREATE TABLE IF NOT EXISTS companies (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  address varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  phone varchar(255) NOT NULL,
  cityId int DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT companies_ibfk_1 FOREIGN KEY (cityId) REFERENCES cities (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO companies (name, address, email, phone, cityId)
VALUES ("Acamica", "acamica 123", "hola@acamica.com", "300000000", 2),
("Tax", "Tax 456", "Tax@gmail.com", "300050001", 1),
("Koba", "Koba 789", "koba@hotmail.com", "305658000", 3),
("Rappi", "Rappi 101", "rappi@yahoo.com", "301114110", 2);

CREATE TABLE IF NOT EXISTS contacts (
  id int NOT NULL AUTO_INCREMENT,
  full_name varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  cityId int DEFAULT NULL,
  companyId int DEFAULT NULL,
  position varchar(255) NOT NULL,
  fav_channel varchar(255) NOT NULL,
  interest varchar(255) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT contacts_ibfk_1 FOREIGN KEY (cityId) REFERENCES cities (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO contacts (full_name, email, cityId, companyId, position, fav_channel, interest)
VALUES ("Ana Castrillón", "acastrillon@gmail.com", 1, 1, "UX Designer", "Facebook", "100"),
("Pedro Alvarez", "aalvarez@gmail.com", 2, 2, "Full Stack", "Whatsapp", "75"),
("Olga Escobar", "oescobar@gmail.com", 3, 2, "Developer", "Call", "50"),
("Julian Montoya", "jmontoya@gmail.com", 3, 3, "GIS Developer", "Email", "25"),
("Roberto Gomez", "rgomez@gmail.com", 5, 4, "UI Designer", "Pending", "0"),
("Pedro Alvarez", "aalvarez@gmail.com", 2, 2, "Full Stack", "Whatsapp", "75"),
("Olga Escobar", "oescobar@gmail.com", 3, 2, "Developer", "Call", "50"),
("Julian Montoya", "jmontoya@gmail.com", 3, 3, "GIS Developer", "Email", "25"),
("Roberto Gomez", "rgomez@gmail.com", 5, 4, "UI Designer", "Pending", "0"),
("Pedro Alvarez", "aalvarez@gmail.com", 2, 2, "Full Stack", "Whatsapp", "75"),
("Olga Escobar", "oescobar@gmail.com", 3, 2, "Developer", "Call", "50"),
("Julian Montoya", "jmontoya@gmail.com", 3, 3, "GIS Developer", "Email", "25"),
("Roberto Gomez", "rgomez@gmail.com", 5, 4, "UI Designer", "Pending", "0");

