-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: vacations_db
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations` (
  `vacation_id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(200) DEFAULT NULL,
  `destination` varchar(25) DEFAULT NULL,
  `imageName` varchar(45) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `price` int DEFAULT NULL,
  `sumFollowers` int DEFAULT NULL,
  PRIMARY KEY (`vacation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (40,'Phuket is among the world’s finest beach destinations, with fine white sands, nodding palm trees, glittering seas and lively towns. It has something for a wide array of tastes and budgets.','Phuket, Thailand','60309c04-d3b1-4b01-8f9c-5fba8d22e5a2.jpg','2023-01-20','2023-02-20',2499,3),(41,'Tel Aviv, Israel’s largest metropolitan area, serves as a hub for innovation, culture and creativity. “Tel Aviv Nonstop City” is more than just a slogan. With the city’s beautiful beaches.','Tel Aviv, Israel','4abcdb01-f7cb-48ed-a9bf-896233405752.jpg','2023-01-22','2023-02-10',999,3),(51,'Visit the world-famous 17th century capital of Holland. Enjoy the historic buildings, beautiful museums and pleasant ambiance. Go for a boat tour on the canals, stroll through Vondelpark.','Amsterdam, Netherlands','e9a420e7-9ffc-41e3-a920-b093f604a79f.jpeg','2023-01-27','2023-02-03',444,2),(54,'Rio de Janeiro is well known for the beauty of its beaches and of its peaks, ridges, and hills-all partly covered by tropical forests.The city is a centre of leisure for Brazilian.','Rio, Brazil','ad9c9475-b051-49e3-88df-87a66a90edbf.jpg','2023-01-30','2023-02-28',2500,0),(55,'The diversity at the heart of the city makes it a ‘something for everyone’ sort of place, with museums and galleries for the culture vultures..','Berlin, Germany','1d98a2fd-f04d-42dc-ba9e-0e775ceb7c92.jpeg','2023-01-30','2023-02-04',499,0),(56,'Best of Barcelona. Perfect beaches, world-famous tapas, and Gaudí—the Catalan capital is a Mediterranean dream.','Barcelona, Spain','8fb64713-71f9-42c8-8b59-7996368bdf4b.jpg','2023-02-20','2023-02-28',699,1),(57,'Discover the largest halls, unique interiors and opulent decorations in one of the most interesting buildings in Eastern Europe.','Bucarest, Romania','0e82afce-be6f-40de-a14b-e21192feb952.jpg','2023-02-06','2023-02-10',399,0),(58,'As one of the most underrated capital cities in Europe, every corner of Budapest oozes with history, charm, and beauty.','Budapest, Hungary','77b6ab20-658a-4730-8a7c-48e49e660d34.jpg','2023-02-05','2023-02-10',369,1),(59,'The most favorable, popular, and beloved city in Turkey, lifestyle of Istanbul is one of the unique cities in the world.','Istanbul, Türkiye','1aaa9c77-c07e-442b-9c15-75c52c45118d.jpg','2023-03-20','2023-03-25',199,1),(60,'London is one of the most beautiful cities in the world and one of the most popular tourist destinations from all over the world every year.','London, England','1b47192c-43fc-4c0b-b13e-6781009e6606.jpeg','2023-01-31','2023-02-10',799,1),(61,'Madrid is the capital and biggest city in Spain, with a lot of attractions just come and take a rest.','Madrid, Spain','12189313-20ec-49f3-ad83-49a0d16991cd.jpeg','2023-02-14','2023-02-18',499,0),(62,'An perfeft vacation for the summer, a wonderful sea, a lot of attractions for family.','Mykonos, Greece','45792bbc-24ca-4544-95da-7d8abdd705ad.jpg','2023-07-20','2023-07-28',199,0),(63,'Enjoy truly unique experiences: Guided tours, day trips, transfers and much more.','New York, USA','bda63f99-39dd-437d-8c05-d83bf6a7a203.jpg','2023-04-18','2023-05-28',1999,1),(64,'Inviting sidewalk cafes, gleaming boutiques, world-class museums, endless things to do.','Paris, France','9e0401bd-1688-4b60-8b58-366babd70995.jpeg','2023-03-02','2023-03-05',899,0),(65,'Lying at the heart of Europe, it is one of the continent’s finest cities and the major Czech economic and cultural centre. ','Prague, Czech Republic','ed69adb5-aec9-4317-9e84-562332401d45.jpg','2023-02-15','2023-02-18',299,0);
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-31 23:28:02
