-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: calculatordb
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cargobike`
--

DROP TABLE IF EXISTS `cargobike`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cargobike` (
  `id` int NOT NULL AUTO_INCREMENT,
  `PowerType` varchar(50) DEFAULT NULL,
  `Manufacture` float DEFAULT NULL,
  `Maintenance` float DEFAULT NULL,
  `Eol` float DEFAULT NULL,
  `Engine` float DEFAULT NULL,
  `Battery` float DEFAULT NULL,
  `Electricity` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cargobike`
--

LOCK TABLES `cargobike` WRITE;
/*!40000 ALTER TABLE `cargobike` DISABLE KEYS */;
INSERT INTO `cargobike` VALUES (1,'Electric',12,11,16,14,19,0.014),(2,'Mechanical',6,7,11,0,0,0);
/*!40000 ALTER TABLE `cargobike` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classicbike`
--

DROP TABLE IF EXISTS `classicbike`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classicbike` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Material` varchar(50) DEFAULT NULL,
  `PowerType` varchar(50) DEFAULT NULL,
  `Manufacture` float DEFAULT NULL,
  `Maintenance` float DEFAULT NULL,
  `Eol` float DEFAULT NULL,
  `Engine` float DEFAULT NULL,
  `Battery` float DEFAULT NULL,
  `Electricity` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classicbike`
--

LOCK TABLES `classicbike` WRITE;
/*!40000 ALTER TABLE `classicbike` DISABLE KEYS */;
INSERT INTO `classicbike` VALUES (1,'Bamboo','Electric',10,10,15,15,20,0.015),(2,'Bamboo','Mechanical',10,10,15,0,0,0),(5,'Aluminium','Electric',10,10,15,15,20,0.015),(6,'Aluminium','Mechanical',5,5,10,0,0,0);
/*!40000 ALTER TABLE `classicbike` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eating`
--

DROP TABLE IF EXISTS `eating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eating` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Region` varchar(255) NOT NULL,
  `Habit` varchar(255) NOT NULL,
  `Impact` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eating`
--

LOCK TABLES `eating` WRITE;
/*!40000 ALTER TABLE `eating` DISABLE KEYS */;
INSERT INTO `eating` VALUES (1,'North America','Omnivore',10),(2,'North America','Vegetarian',30),(3,'South America','Omnivore',10),(4,'South America','Vegetarian',300),(5,'India','Vegetarian',300),(6,'India','Omnivore',10),(7,'China','Vegetarian',300),(8,'China','Omnivore',10),(9,'Europe','Omnivore',10),(10,'Europe','Vegetarian',300);
/*!40000 ALTER TABLE `eating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `electricity`
--

DROP TABLE IF EXISTS `electricity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `electricity` (
  `id` int NOT NULL AUTO_INCREMENT,
  `region` varchar(255) DEFAULT NULL,
  `electricity` decimal(6,4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `electricity`
--

LOCK TABLES `electricity` WRITE;
/*!40000 ALTER TABLE `electricity` DISABLE KEYS */;
INSERT INTO `electricity` VALUES (1,'Brazil',0.2468),(2,'Canada',0.2002),(3,'China',0.9529),(4,'India',1.4699),(5,'United States',0.4770),(6,'Global',0.7359),(7,'Europe',0.3276),(8,'Africa',0.8271),(9,'North America',0.4454),(10,'Asia',0.9380),(11,'Latin and Caribbean',0.4900),(12,'Middle East',0.9212);
/*!40000 ALTER TABLE `electricity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fitness`
--

DROP TABLE IF EXISTS `fitness`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fitness` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Fitness` int NOT NULL,
  `Impact` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fitness`
--

LOCK TABLES `fitness` WRITE;
/*!40000 ALTER TABLE `fitness` DISABLE KEYS */;
INSERT INTO `fitness` VALUES (1,0,10),(2,1,20),(3,2,30),(4,3,40),(5,4,50),(6,5,60),(7,6,70),(8,7,80);
/*!40000 ALTER TABLE `fitness` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sportbike`
--

DROP TABLE IF EXISTS `sportbike`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sportbike` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Material` varchar(50) DEFAULT NULL,
  `PowerType` varchar(50) DEFAULT NULL,
  `Manufacture` float DEFAULT NULL,
  `Maintenance` float DEFAULT NULL,
  `Eol` float DEFAULT NULL,
  `Engine` float DEFAULT NULL,
  `Battery` float DEFAULT NULL,
  `Electricity` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sportbike`
--

LOCK TABLES `sportbike` WRITE;
/*!40000 ALTER TABLE `sportbike` DISABLE KEYS */;
INSERT INTO `sportbike` VALUES (1,'Steel','Electric',14,13,19,17,22,0.017),(2,'Steel','Mechanical',9,10,15,0,0,0),(3,'Aluminium','Electric',12,11,17,15,20,0.015),(4,'Aluminium','Mechanical',7,8,13,0,0,0),(5,'Carbon','Electric',13,12,18,16,21,0.016),(6,'Carbon','Mechanical',8,9,14,0,0,0);
/*!40000 ALTER TABLE `sportbike` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transports`
--

DROP TABLE IF EXISTS `transports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transports` (
  `id` int NOT NULL AUTO_INCREMENT,
  `country` varchar(100) NOT NULL,
  `mode` varchar(100) NOT NULL,
  `impact` decimal(10,4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transports`
--

LOCK TABLES `transports` WRITE;
/*!40000 ALTER TABLE `transports` DISABLE KEYS */;
INSERT INTO `transports` VALUES (1,'France','Walking',2.0000),(2,'France','Motorcycle',143.0000),(3,'France','Car',212.0000),(4,'France','Coach',21.0000),(5,'France','Electric Train',38.0000),(6,'France','Plane',242.0000),(7,'United States','Walking',3.0000),(8,'United States','Motorcycle',153.0000),(9,'United States','Car',262.0000),(10,'United States','Coach',29.0000),(11,'United States','Electric Train',54.0000),(12,'United States','Plane',282.0000),(13,'Global','Walking',5.0000),(14,'Global','Motorcycle',161.0000),(15,'Global','Car',373.0000),(16,'Global','Coach',61.0000),(17,'Global','Electric Train',64.0000),(18,'Global','Plane',118.0000),(19,'France','Shared E-Scooter',61.0000),(20,'Global','Shared E-Scooter',NULL),(21,'Denmark','Shared E-Scooter',60.0000),(22,'Norway','Shared E-Scooter',60.0000),(23,'Canada','Shared E-Scooter',63.0000),(24,'Spain','Shared E-Scooter',67.0000),(25,'Italy','Shared E-Scooter',68.0000),(26,'Netherlands','Shared E-Scooter',70.0000),(27,'United States','Shared E-Scooter',72.0000),(28,'United Kingdom','Shared E-Scooter',72.0000),(29,'Germany','Shared E-Scooter',75.0000),(30,'Australia','Shared E-Scooter',79.0000),(31,'China','Shared E-Scooter',81.0000);
/*!40000 ALTER TABLE `transports` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-19 12:28:30
