CREATE DATABASE  IF NOT EXISTS `club_meetings` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `club_meetings`;
-- MySQL dump 10.13  Distrib 8.0.36, for macos14 (x86_64)
--
-- Host: localhost    Database: club_meetings
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `building`
--

DROP TABLE IF EXISTS `building`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `building` (
  `building_id` int NOT NULL AUTO_INCREMENT,
  `building_code` varchar(4) NOT NULL,
  `building_name` varchar(64) NOT NULL,
  PRIMARY KEY (`building_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `building`
--

LOCK TABLES `building` WRITE;
/*!40000 ALTER TABLE `building` DISABLE KEYS */;
INSERT INTO `building` VALUES (1,'BH','Behrakis Health Science Center'),(2,'CSC','Curry Student Center'),(3,'DG','Dodge Hall'),(4,'EV','East Village'),(5,'EC','Egan Center'),(6,'EL','Ell Hall'),(7,'EXP','EXP'),(8,'ISEC','Interdisciplinary Science and Engineering Complex'),(9,'IV','International Village'),(10,'MC','Marino Center'),(11,'RY','Ryder Hall'),(12,'SH','Shillman Hall'),(13,'SL','Snell Library'),(14,'WVH','West Village H');
/*!40000 ALTER TABLE `building` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `club`
--

DROP TABLE IF EXISTS `club`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `club` (
  `club_id` int NOT NULL AUTO_INCREMENT,
  `club_name` varchar(64) NOT NULL,
  PRIMARY KEY (`club_id`),
  UNIQUE KEY `club_name` (`club_name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `club`
--

LOCK TABLES `club` WRITE;
/*!40000 ALTER TABLE `club` DISABLE KEYS */;
INSERT INTO `club` VALUES (1,'Database Designers'),(2,'MongoDB Users'),(3,'Sea Glass Collecting Club'),(4,'Skiing Club');
/*!40000 ALTER TABLE `club` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meeting`
--

DROP TABLE IF EXISTS `meeting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meeting` (
  `meeting_date` date NOT NULL,
  `room_id` int NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `group_start_date` date NOT NULL,
  PRIMARY KEY (`room_id`,`start_time`,`end_time`,`meeting_date`),
  KEY `room_id` (`room_id`,`start_time`,`end_time`,`group_start_date`),
  CONSTRAINT `meeting_ibfk_1` FOREIGN KEY (`room_id`, `start_time`, `end_time`, `group_start_date`) REFERENCES `meeting_group` (`room_id`, `start_time`, `end_time`, `start_date`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meeting`
--

LOCK TABLES `meeting` WRITE;
/*!40000 ALTER TABLE `meeting` DISABLE KEYS */;
INSERT INTO `meeting` VALUES ('2024-04-18',1,'18:45:00','21:45:00','2024-04-18'),('2024-04-05',2,'20:40:00','22:30:00','2024-04-05'),('2024-04-12',2,'20:40:00','22:30:00','2024-04-05'),('2024-04-19',2,'20:40:00','22:30:00','2024-04-05'),('2024-04-26',2,'20:40:00','22:30:00','2024-04-05'),('2024-04-19',20,'20:45:00','21:45:00','2024-04-19'),('2024-01-01',22,'17:00:00','18:00:00','2024-01-01'),('2024-01-08',22,'17:00:00','18:00:00','2024-01-01'),('2024-01-15',22,'17:00:00','18:00:00','2024-01-01'),('2024-01-22',22,'17:00:00','18:00:00','2024-01-01'),('2024-01-29',22,'17:00:00','18:00:00','2024-01-01'),('2024-02-05',22,'17:00:00','18:00:00','2024-01-01'),('2024-02-12',22,'17:00:00','18:00:00','2024-01-01'),('2024-02-19',22,'17:00:00','18:00:00','2024-01-01'),('2024-02-26',22,'17:00:00','18:00:00','2024-01-01'),('2024-03-04',22,'17:00:00','18:00:00','2024-01-01'),('2024-03-11',22,'17:00:00','18:00:00','2024-01-01'),('2024-03-18',22,'17:00:00','18:00:00','2024-01-01'),('2024-03-25',22,'17:00:00','18:00:00','2024-01-01'),('2024-04-01',22,'17:00:00','18:00:00','2024-01-01'),('2024-04-08',22,'17:00:00','18:00:00','2024-01-01'),('2024-04-15',22,'17:00:00','18:00:00','2024-01-01'),('2024-04-22',22,'17:00:00','18:00:00','2024-01-01'),('2024-04-29',22,'17:00:00','18:00:00','2024-01-01'),('2024-01-02',22,'17:00:00','18:00:00','2024-01-02'),('2024-01-09',22,'17:00:00','18:00:00','2024-01-02'),('2024-01-16',22,'17:00:00','18:00:00','2024-01-02'),('2024-01-23',22,'17:00:00','18:00:00','2024-01-02'),('2024-01-30',22,'17:00:00','18:00:00','2024-01-02'),('2024-02-06',22,'17:00:00','18:00:00','2024-01-02'),('2024-02-13',22,'17:00:00','18:00:00','2024-01-02'),('2024-02-20',22,'17:00:00','18:00:00','2024-01-02'),('2024-02-27',22,'17:00:00','18:00:00','2024-01-02'),('2024-03-05',22,'17:00:00','18:00:00','2024-01-02'),('2024-03-12',22,'17:00:00','18:00:00','2024-01-02'),('2024-03-19',22,'17:00:00','18:00:00','2024-01-02'),('2024-03-26',22,'17:00:00','18:00:00','2024-01-02'),('2024-04-02',22,'17:00:00','18:00:00','2024-01-02'),('2024-04-09',22,'17:00:00','18:00:00','2024-01-02'),('2024-04-16',22,'17:00:00','18:00:00','2024-01-02'),('2024-04-23',22,'17:00:00','18:00:00','2024-01-02'),('2024-04-30',22,'17:00:00','18:00:00','2024-01-02'),('2024-04-30',58,'17:00:00','18:00:00','2024-04-30'),('2024-04-03',68,'20:40:00','22:30:00','2024-04-03'),('2024-04-10',68,'20:40:00','22:30:00','2024-04-03'),('2024-04-17',68,'20:40:00','22:30:00','2024-04-03'),('2024-04-24',68,'20:40:00','22:30:00','2024-04-03'),('2024-05-01',68,'20:40:00','22:30:00','2024-04-03'),('2024-04-04',68,'20:40:00','22:30:00','2024-04-04'),('2024-04-11',68,'20:40:00','22:30:00','2024-04-04'),('2024-04-18',68,'20:40:00','22:30:00','2024-04-04'),('2024-04-25',68,'20:40:00','22:30:00','2024-04-04'),('2024-01-01',73,'10:30:00','11:35:00','2024-01-01'),('2024-01-08',73,'10:30:00','11:35:00','2024-01-01'),('2024-01-15',73,'10:30:00','11:35:00','2024-01-01'),('2024-01-22',73,'10:30:00','11:35:00','2024-01-01'),('2024-01-29',73,'10:30:00','11:35:00','2024-01-01'),('2024-02-05',73,'10:30:00','11:35:00','2024-01-01'),('2024-02-12',73,'10:30:00','11:35:00','2024-01-01'),('2024-02-19',73,'10:30:00','11:35:00','2024-01-01'),('2024-02-26',73,'10:30:00','11:35:00','2024-01-01'),('2024-03-04',73,'10:30:00','11:35:00','2024-01-01'),('2024-03-11',73,'10:30:00','11:35:00','2024-01-01'),('2024-03-18',73,'10:30:00','11:35:00','2024-01-01'),('2024-03-25',73,'10:30:00','11:35:00','2024-01-01'),('2024-04-01',73,'10:30:00','11:35:00','2024-01-01'),('2024-04-08',73,'10:30:00','11:35:00','2024-01-01'),('2024-04-15',73,'10:30:00','11:35:00','2024-01-01'),('2024-04-22',73,'10:30:00','11:35:00','2024-01-01'),('2024-04-29',73,'10:30:00','11:35:00','2024-01-01'),('2024-01-02',73,'10:30:00','11:35:00','2024-01-02'),('2024-01-09',73,'10:30:00','11:35:00','2024-01-02'),('2024-01-16',73,'10:30:00','11:35:00','2024-01-02'),('2024-01-23',73,'10:30:00','11:35:00','2024-01-02'),('2024-01-30',73,'10:30:00','11:35:00','2024-01-02'),('2024-02-06',73,'10:30:00','11:35:00','2024-01-02'),('2024-02-13',73,'10:30:00','11:35:00','2024-01-02'),('2024-02-20',73,'10:30:00','11:35:00','2024-01-02'),('2024-02-27',73,'10:30:00','11:35:00','2024-01-02'),('2024-03-05',73,'10:30:00','11:35:00','2024-01-02'),('2024-03-12',73,'10:30:00','11:35:00','2024-01-02'),('2024-03-19',73,'10:30:00','11:35:00','2024-01-02'),('2024-03-26',73,'10:30:00','11:35:00','2024-01-02'),('2024-04-02',73,'10:30:00','11:35:00','2024-01-02'),('2024-04-09',73,'10:30:00','11:35:00','2024-01-02'),('2024-04-16',73,'10:30:00','11:35:00','2024-01-02'),('2024-04-23',73,'10:30:00','11:35:00','2024-01-02'),('2024-04-30',73,'10:30:00','11:35:00','2024-01-02'),('2024-01-03',73,'10:30:00','11:35:00','2024-01-03'),('2024-01-10',73,'10:30:00','11:35:00','2024-01-03'),('2024-01-17',73,'10:30:00','11:35:00','2024-01-03'),('2024-01-24',73,'10:30:00','11:35:00','2024-01-03'),('2024-01-31',73,'10:30:00','11:35:00','2024-01-03'),('2024-02-07',73,'10:30:00','11:35:00','2024-01-03'),('2024-02-14',73,'10:30:00','11:35:00','2024-01-03'),('2024-02-21',73,'10:30:00','11:35:00','2024-01-03'),('2024-02-28',73,'10:30:00','11:35:00','2024-01-03'),('2024-03-06',73,'10:30:00','11:35:00','2024-01-03'),('2024-03-13',73,'10:30:00','11:35:00','2024-01-03'),('2024-03-20',73,'10:30:00','11:35:00','2024-01-03'),('2024-03-27',73,'10:30:00','11:35:00','2024-01-03'),('2024-04-03',73,'10:30:00','11:35:00','2024-01-03'),('2024-04-10',73,'10:30:00','11:35:00','2024-01-03'),('2024-04-17',73,'10:30:00','11:35:00','2024-01-03'),('2024-04-24',73,'10:30:00','11:35:00','2024-01-03'),('2024-05-01',73,'10:30:00','11:35:00','2024-01-03'),('2024-01-04',73,'10:30:00','11:35:00','2024-01-04'),('2024-01-11',73,'10:30:00','11:35:00','2024-01-04'),('2024-01-18',73,'10:30:00','11:35:00','2024-01-04'),('2024-01-25',73,'10:30:00','11:35:00','2024-01-04'),('2024-02-01',73,'10:30:00','11:35:00','2024-01-04'),('2024-02-08',73,'10:30:00','11:35:00','2024-01-04'),('2024-02-15',73,'10:30:00','11:35:00','2024-01-04'),('2024-02-22',73,'10:30:00','11:35:00','2024-01-04'),('2024-02-29',73,'10:30:00','11:35:00','2024-01-04'),('2024-03-07',73,'10:30:00','11:35:00','2024-01-04'),('2024-03-14',73,'10:30:00','11:35:00','2024-01-04'),('2024-03-21',73,'10:30:00','11:35:00','2024-01-04'),('2024-03-28',73,'10:30:00','11:35:00','2024-01-04'),('2024-04-04',73,'10:30:00','11:35:00','2024-01-04'),('2024-04-11',73,'10:30:00','11:35:00','2024-01-04'),('2024-04-18',73,'10:30:00','11:35:00','2024-01-04'),('2024-04-25',73,'10:30:00','11:35:00','2024-01-04'),('2024-01-05',73,'10:30:00','11:35:00','2024-01-05'),('2024-01-12',73,'10:30:00','11:35:00','2024-01-05'),('2024-01-19',73,'10:30:00','11:35:00','2024-01-05'),('2024-01-26',73,'10:30:00','11:35:00','2024-01-05'),('2024-02-02',73,'10:30:00','11:35:00','2024-01-05'),('2024-02-09',73,'10:30:00','11:35:00','2024-01-05'),('2024-02-16',73,'10:30:00','11:35:00','2024-01-05'),('2024-02-23',73,'10:30:00','11:35:00','2024-01-05'),('2024-03-01',73,'10:30:00','11:35:00','2024-01-05'),('2024-03-08',73,'10:30:00','11:35:00','2024-01-05'),('2024-03-15',73,'10:30:00','11:35:00','2024-01-05'),('2024-03-22',73,'10:30:00','11:35:00','2024-01-05'),('2024-03-29',73,'10:30:00','11:35:00','2024-01-05'),('2024-04-05',73,'10:30:00','11:35:00','2024-01-05'),('2024-04-12',73,'10:30:00','11:35:00','2024-01-05'),('2024-04-19',73,'10:30:00','11:35:00','2024-01-05'),('2024-04-26',73,'10:30:00','11:35:00','2024-01-05'),('2024-04-10',75,'08:50:00','10:50:00','2024-04-10'),('2024-04-17',75,'08:50:00','10:50:00','2024-04-17'),('2024-03-31',75,'10:50:00','20:50:00','2024-03-31'),('2024-04-07',75,'10:50:00','20:50:00','2024-03-31'),('2024-04-14',75,'10:50:00','20:50:00','2024-03-31'),('2024-04-21',75,'10:50:00','20:50:00','2024-03-31'),('2024-04-28',75,'10:50:00','20:50:00','2024-03-31'),('2024-05-05',75,'10:50:00','20:50:00','2024-03-31'),('2024-05-12',75,'10:50:00','20:50:00','2024-03-31'),('2024-05-19',75,'10:50:00','20:50:00','2024-03-31'),('2024-05-26',75,'10:50:00','20:50:00','2024-03-31'),('2024-06-02',75,'10:50:00','20:50:00','2024-03-31'),('2024-06-09',75,'10:50:00','20:50:00','2024-03-31'),('2024-06-16',75,'10:50:00','20:50:00','2024-03-31'),('2024-06-23',75,'10:50:00','20:50:00','2024-03-31'),('2024-06-30',75,'10:50:00','20:50:00','2024-03-31'),('2024-04-17',76,'08:50:00','10:50:00','2024-04-17'),('2024-04-17',78,'08:50:00','10:50:00','2024-04-17'),('2024-04-01',107,'20:40:00','22:30:00','2024-04-01'),('2024-04-08',107,'20:40:00','22:30:00','2024-04-01'),('2024-04-15',107,'20:40:00','22:30:00','2024-04-01'),('2024-04-22',107,'20:40:00','22:30:00','2024-04-01'),('2024-04-29',107,'20:40:00','22:30:00','2024-04-01'),('2024-04-16',107,'20:40:00','22:30:00','2024-04-16');
/*!40000 ALTER TABLE `meeting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meeting_group`
--

DROP TABLE IF EXISTS `meeting_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meeting_group` (
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `start_date` date NOT NULL,
  `room_id` int NOT NULL,
  `user_id` int NOT NULL,
  `club_id` int NOT NULL,
  `team_name` varchar(64) NOT NULL,
  PRIMARY KEY (`room_id`,`start_time`,`end_time`,`start_date`),
  KEY `user_id` (`user_id`),
  KEY `club_id` (`club_id`,`team_name`),
  CONSTRAINT `meeting_group_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `meeting_group_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `meeting_group_ibfk_3` FOREIGN KEY (`club_id`, `team_name`) REFERENCES `team` (`club_id`, `team_name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meeting_group`
--

LOCK TABLES `meeting_group` WRITE;
/*!40000 ALTER TABLE `meeting_group` DISABLE KEYS */;
INSERT INTO `meeting_group` VALUES ('18:45:00','21:45:00','2024-04-18',1,1,1,'Marketing'),('20:40:00','22:30:00','2024-04-05',2,1,2,'Eboard'),('20:45:00','21:45:00','2024-04-19',20,1,1,'Marketing'),('17:00:00','18:00:00','2024-01-01',22,1,1,'Webteam'),('17:00:00','18:00:00','2024-01-02',22,1,1,'Webteam'),('17:00:00','18:00:00','2024-04-30',58,1,1,'Webteam'),('20:40:00','22:30:00','2024-04-03',68,1,2,'Professional'),('20:40:00','22:30:00','2024-04-04',68,1,2,'Professional'),('10:30:00','11:35:00','2024-01-01',73,1,1,'Eboard'),('10:30:00','11:35:00','2024-01-02',73,1,1,'Eboard'),('10:30:00','11:35:00','2024-01-03',73,1,1,'Eboard'),('10:30:00','11:35:00','2024-01-04',73,1,1,'Eboard'),('10:30:00','11:35:00','2024-01-05',73,1,1,'Eboard'),('08:50:00','10:50:00','2024-04-10',75,1,4,'Eboard'),('08:50:00','10:50:00','2024-04-17',75,1,4,'Amateur Skiers'),('10:50:00','20:50:00','2024-03-31',75,1,3,'Eboard'),('08:50:00','10:50:00','2024-04-17',76,1,4,'Elite Skiers'),('08:50:00','10:50:00','2024-04-17',78,1,4,'Amateur Skiers'),('20:40:00','22:30:00','2024-04-01',107,1,2,'Student'),('20:40:00','22:30:00','2024-04-16',107,1,2,'Student');
/*!40000 ALTER TABLE `meeting_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `room_id` int NOT NULL AUTO_INCREMENT,
  `room_number` int NOT NULL,
  `capacity` int NOT NULL,
  `building_id` int NOT NULL,
  PRIMARY KEY (`room_id`),
  KEY `building_id` (`building_id`),
  CONSTRAINT `room_ibfk_1` FOREIGN KEY (`building_id`) REFERENCES `building` (`building_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=163 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (1,7,22,1),(2,10,175,1),(3,25,25,1),(4,30,48,1),(5,105,46,1),(6,204,30,1),(7,210,16,1),(8,220,56,1),(9,225,49,1),(10,307,23,1),(11,310,103,1),(12,315,56,1),(13,320,56,1),(14,325,56,1),(15,201,200,2),(16,232,30,2),(17,236,30,2),(18,242,50,2),(19,335,60,2),(20,334,15,2),(21,336,15,2),(22,435,30,2),(23,50,82,3),(24,70,48,3),(25,111,18,3),(26,119,63,3),(27,130,48,3),(28,140,36,3),(29,150,48,3),(30,170,48,3),(31,173,52,3),(32,230,48,3),(33,270,48,3),(34,330,48,3),(35,370,48,3),(36,430,48,3),(37,470,48,3),(38,2,59,4),(39,8,20,4),(40,10,20,4),(41,24,82,4),(42,102,30,4),(43,101,120,5),(44,101,1000,6),(45,311,28,6),(46,312,72,6),(47,408,21,6),(48,410,36,6),(49,411,23,6),(50,201,50,7),(51,202,50,7),(52,203,50,7),(53,204,50,7),(54,301,36,7),(55,310,36,7),(56,311,36,7),(57,610,36,7),(58,210,80,7),(59,102,275,8),(60,136,48,8),(61,138,48,8),(62,140,48,8),(63,142,48,8),(64,148,24,8),(65,201,24,8),(66,202,24,8),(67,203,24,8),(68,204,24,8),(69,13,26,9),(70,14,21,9),(71,16,20,9),(72,18,20,9),(73,19,97,9),(74,22,44,9),(75,210,60,10),(76,220,60,10),(77,230,60,10),(78,310,20,10),(79,128,24,11),(80,145,12,11),(81,154,27,11),(82,157,33,11),(83,161,36,11),(84,204,15,11),(85,209,24,11),(86,220,20,11),(87,243,21,11),(88,264,16,11),(89,267,20,11),(90,270,20,11),(91,275,20,11),(92,285,20,11),(93,296,33,11),(94,301,18,11),(95,334,999,11),(96,396,21,11),(97,403,20,11),(98,429,42,11),(99,435,33,11),(100,456,30,11),(101,335,1,11),(102,336,1,11),(103,337,1,11),(104,338,1,11),(105,339,1,11),(106,340,1,11),(107,105,114,12),(108,135,114,12),(109,210,46,12),(110,215,52,12),(111,220,76,12),(112,305,114,12),(113,315,52,12),(114,320,76,12),(115,325,52,12),(116,335,114,12),(117,415,52,12),(118,420,76,12),(119,425,52,12),(120,461,6,13),(121,462,6,13),(122,463,6,13),(123,464,6,13),(124,465,6,13),(125,466,6,13),(126,467,6,13),(127,468,6,13),(128,469,6,13),(129,470,6,13),(130,471,6,13),(131,472,6,13),(132,473,6,13),(133,474,6,13),(134,91,6,13),(135,92,6,13),(136,420,1,13),(137,421,1,13),(138,422,1,13),(139,423,1,13),(140,424,1,13),(141,425,1,13),(142,434,1,13),(143,435,1,13),(144,451,1,13),(145,452,1,13),(146,453,1,13),(147,454,1,13),(148,455,1,13),(149,456,1,13),(150,457,1,13),(151,3,30,13),(152,9,25,13),(153,13,36,13),(154,31,54,13),(155,37,48,13),(156,45,12,13),(157,111,42,13),(158,119,40,13),(159,125,33,13),(160,108,68,14),(161,110,68,14),(162,210,36,14);
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room_type`
--

DROP TABLE IF EXISTS `room_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room_type` (
  `type_name` varchar(64) NOT NULL,
  PRIMARY KEY (`type_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room_type`
--

LOCK TABLES `room_type` WRITE;
/*!40000 ALTER TABLE `room_type` DISABLE KEYS */;
INSERT INTO `room_type` VALUES ('Athletic Room'),('Auditorium'),('Ballroom'),('Classroom'),('Dance Studio'),('Ensemble Music'),('Group Study Room'),('Individual Study Room'),('Lab'),('Lecture'),('Makerspace'),('Office'),('Piano Room'),('Practice Room');
/*!40000 ALTER TABLE `room_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team`
--

DROP TABLE IF EXISTS `team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `team` (
  `team_name` varchar(64) NOT NULL,
  `num_members` int NOT NULL,
  `club_id` int NOT NULL,
  PRIMARY KEY (`team_name`,`club_id`),
  KEY `club_id` (`club_id`),
  CONSTRAINT `team_ibfk_1` FOREIGN KEY (`club_id`) REFERENCES `club` (`club_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team`
--

LOCK TABLES `team` WRITE;
/*!40000 ALTER TABLE `team` DISABLE KEYS */;
INSERT INTO `team` VALUES ('Amateur Skiers',1,4),('Eboard',1,1),('Eboard',1,2),('Eboard',1,3),('Eboard',1,4),('Elite Skiers',1,4),('Marketing',1,1),('Professional',1,2),('Student',1,2),('Webteam',1,1);
/*!40000 ALTER TABLE `team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team_to_user`
--

DROP TABLE IF EXISTS `team_to_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `team_to_user` (
  `user_id` int NOT NULL,
  `club_id` int NOT NULL,
  `team_name` varchar(64) NOT NULL,
  `status` enum('approved','pending','denied') NOT NULL,
  PRIMARY KEY (`user_id`,`club_id`,`team_name`),
  KEY `team_name` (`team_name`,`club_id`),
  CONSTRAINT `team_to_user_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `team_to_user_ibfk_2` FOREIGN KEY (`team_name`, `club_id`) REFERENCES `team` (`team_name`, `club_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team_to_user`
--

LOCK TABLES `team_to_user` WRITE;
/*!40000 ALTER TABLE `team_to_user` DISABLE KEYS */;
INSERT INTO `team_to_user` VALUES (1,1,'Eboard','approved'),(1,1,'Marketing','approved'),(1,1,'Webteam','approved'),(1,2,'Eboard','approved'),(1,2,'Professional','approved'),(1,2,'Student','approved'),(1,3,'Eboard','approved'),(1,4,'Amateur Skiers','approved'),(1,4,'Eboard','approved'),(1,4,'Elite Skiers','approved');
/*!40000 ALTER TABLE `team_to_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `update_num_members` AFTER INSERT ON `team_to_user` FOR EACH ROW BEGIN
    UPDATE team
    SET num_members = num_members + 1
    WHERE team_name = NEW.team_name AND club_id = NEW.club_id;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `type_to_room`
--

DROP TABLE IF EXISTS `type_to_room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `type_to_room` (
  `type_name` varchar(64) NOT NULL,
  `room_id` int NOT NULL,
  PRIMARY KEY (`type_name`,`room_id`),
  KEY `room_id` (`room_id`),
  CONSTRAINT `type_to_room_ibfk_1` FOREIGN KEY (`type_name`) REFERENCES `room_type` (`type_name`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `type_to_room_ibfk_2` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type_to_room`
--

LOCK TABLES `type_to_room` WRITE;
/*!40000 ALTER TABLE `type_to_room` DISABLE KEYS */;
INSERT INTO `type_to_room` VALUES ('Classroom',1),('Auditorium',2),('Classroom',3),('Classroom',4),('Classroom',5),('Classroom',6),('Classroom',7),('Lecture',8),('Classroom',9),('Classroom',10),('Classroom',11),('Lecture',11),('Classroom',12),('Lecture',12),('Classroom',13),('Lecture',13),('Lecture',14),('Ballroom',15),('Office',16),('Office',17),('Dance Studio',18),('Classroom',19),('Lecture',19),('Classroom',20),('Classroom',21),('Classroom',22),('Classroom',23),('Lecture',23),('Classroom',24),('Classroom',25),('Classroom',26),('Lecture',26),('Classroom',27),('Classroom',28),('Classroom',29),('Classroom',30),('Classroom',31),('Lecture',31),('Classroom',32),('Classroom',33),('Classroom',34),('Classroom',35),('Classroom',36),('Classroom',37),('Classroom',38),('Lecture',38),('Classroom',39),('Classroom',40),('Classroom',41),('Lecture',41),('Classroom',42),('Auditorium',43),('Auditorium',44),('Classroom',45),('Classroom',46),('Lecture',46),('Classroom',47),('Classroom',48),('Classroom',49),('Classroom',50),('Lecture',50),('Classroom',51),('Lecture',51),('Classroom',52),('Lecture',52),('Classroom',53),('Lecture',53),('Classroom',54),('Classroom',55),('Classroom',56),('Classroom',57),('Lab',58),('Makerspace',58),('Auditorium',59),('Classroom',60),('Classroom',61),('Classroom',62),('Classroom',63),('Classroom',64),('Classroom',65),('Classroom',66),('Classroom',67),('Classroom',68),('Classroom',69),('Classroom',70),('Classroom',71),('Classroom',72),('Classroom',73),('Lecture',73),('Classroom',74),('Athletic Room',75),('Athletic Room',76),('Athletic Room',77),('Athletic Room',78),('Classroom',79),('Classroom',80),('Classroom',81),('Classroom',82),('Classroom',83),('Classroom',84),('Classroom',85),('Classroom',86),('Classroom',87),('Classroom',88),('Classroom',89),('Classroom',90),('Classroom',91),('Classroom',92),('Classroom',93),('Classroom',94),('Auditorium',95),('Classroom',96),('Classroom',97),('Classroom',98),('Ensemble Music',99),('Ensemble Music',100),('Practice Room',101),('Practice Room',102),('Practice Room',103),('Piano Room',104),('Piano Room',105),('Piano Room',106),('Classroom',107),('Lecture',107),('Classroom',108),('Lecture',108),('Classroom',109),('Lecture',109),('Classroom',110),('Lecture',110),('Classroom',111),('Lecture',111),('Classroom',112),('Lecture',112),('Classroom',113),('Lecture',113),('Classroom',114),('Lecture',114),('Classroom',115),('Lecture',115),('Classroom',116),('Lecture',116),('Classroom',117),('Lecture',117),('Classroom',118),('Lecture',118),('Classroom',119),('Lecture',119),('Group Study Room',120),('Group Study Room',121),('Group Study Room',122),('Group Study Room',123),('Group Study Room',124),('Group Study Room',125),('Group Study Room',126),('Group Study Room',127),('Group Study Room',128),('Group Study Room',129),('Group Study Room',130),('Group Study Room',131),('Group Study Room',132),('Group Study Room',133),('Group Study Room',134),('Group Study Room',135),('Individual Study Room',136),('Individual Study Room',137),('Individual Study Room',138),('Individual Study Room',139),('Individual Study Room',140),('Individual Study Room',141),('Individual Study Room',142),('Individual Study Room',143),('Individual Study Room',144),('Individual Study Room',145),('Individual Study Room',146),('Individual Study Room',147),('Individual Study Room',148),('Individual Study Room',149),('Individual Study Room',150),('Classroom',151),('Classroom',152),('Classroom',153),('Classroom',154),('Lecture',154),('Classroom',155),('Classroom',156),('Classroom',157),('Classroom',158),('Classroom',159),('Classroom',160),('Lecture',160),('Classroom',161),('Lecture',161),('Classroom',162);
/*!40000 ALTER TABLE `type_to_room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(64) NOT NULL,
  `email` varchar(64) NOT NULL,
  `first_name` varchar(64) NOT NULL,
  `last_name` varchar(64) NOT NULL,
  `phone_number` varchar(16) NOT NULL,
  `password` varchar(72) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone_number` (`phone_number`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'kdurant','durant@example.com','Kathleen','Durant','1234567890','123');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-17 20:53:59
