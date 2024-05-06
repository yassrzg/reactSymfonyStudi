-- MariaDB dump 10.19  Distrib 10.6.16-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: studiJo
-- ------------------------------------------------------
-- Server version	10.6.16-MariaDB-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accompagnant`
--

DROP TABLE IF EXISTS `accompagnant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accompagnant` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `main_user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_C9D827FF53257A7C` (`main_user_id`),
  CONSTRAINT `FK_C9D827FF53257A7C` FOREIGN KEY (`main_user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accompagnant`
--

LOCK TABLES `accompagnant` WRITE;
/*!40000 ALTER TABLE `accompagnant` DISABLE KEYS */;
INSERT INTO `accompagnant` VALUES (29,'yass','rzg',10),(31,'loulou','yass',10),(35,'moi','toi',10),(36,'loulou','lys',10),(37,'k','o',10),(38,'iii','iiiii',10),(39,'k','h',10);
/*!40000 ALTER TABLE `accompagnant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accompagnant_event_jo`
--

DROP TABLE IF EXISTS `accompagnant_event_jo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accompagnant_event_jo` (
  `accompagnant_id` int(11) NOT NULL,
  `event_jo_id` int(11) NOT NULL,
  PRIMARY KEY (`accompagnant_id`,`event_jo_id`),
  KEY `IDX_F7FF42FA8A141997` (`accompagnant_id`),
  KEY `IDX_F7FF42FAAEFED2AA` (`event_jo_id`),
  CONSTRAINT `FK_F7FF42FA8A141997` FOREIGN KEY (`accompagnant_id`) REFERENCES `accompagnant` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_F7FF42FAAEFED2AA` FOREIGN KEY (`event_jo_id`) REFERENCES `event_jo` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accompagnant_event_jo`
--

LOCK TABLES `accompagnant_event_jo` WRITE;
/*!40000 ALTER TABLE `accompagnant_event_jo` DISABLE KEYS */;
INSERT INTO `accompagnant_event_jo` VALUES (29,30),(29,32),(31,34),(35,34),(36,34),(37,31),(38,31),(39,31);
/*!40000 ALTER TABLE `accompagnant_event_jo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories_event`
--

DROP TABLE IF EXISTS `categories_event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories_event` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories_event`
--

LOCK TABLES `categories_event` WRITE;
/*!40000 ALTER TABLE `categories_event` DISABLE KEYS */;
INSERT INTO `categories_event` VALUES (1,'cate1'),(2,'tata'),(3,'titi'),(4,'ttititi'),(5,'tittfgs'),(6,'tjtigjfsg'),(7,'tjgorjdfdsg'),(8,'yasss'),(9,'loulou');
/*!40000 ALTER TABLE `categories_event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctrine_migration_versions`
--

DROP TABLE IF EXISTS `doctrine_migration_versions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctrine_migration_versions`
--

LOCK TABLES `doctrine_migration_versions` WRITE;
/*!40000 ALTER TABLE `doctrine_migration_versions` DISABLE KEYS */;
INSERT INTO `doctrine_migration_versions` VALUES ('DoctrineMigrations\\Version20240424075522','2024-04-24 08:24:19',34),('DoctrineMigrations\\Version20240424082350','2024-04-24 08:24:19',10),('DoctrineMigrations\\Version20240424083714','2024-04-24 08:37:19',8),('DoctrineMigrations\\Version20240424134643','2024-04-24 13:46:51',8),('DoctrineMigrations\\Version20240425110346','2024-04-25 11:03:58',50),('DoctrineMigrations\\Version20240425110654','2024-04-25 11:06:58',17),('DoctrineMigrations\\Version20240426080840','2024-04-26 08:08:41',47),('DoctrineMigrations\\Version20240426081002','2024-04-26 08:10:09',16),('DoctrineMigrations\\Version20240426123227','2024-04-26 12:32:41',41),('DoctrineMigrations\\Version20240426125320','2024-04-26 12:53:23',16),('DoctrineMigrations\\Version20240426125415','2024-04-26 12:54:18',15),('DoctrineMigrations\\Version20240426133339','2024-04-26 13:33:43',16),('DoctrineMigrations\\Version20240426150953','2024-04-26 15:09:57',15),('DoctrineMigrations\\Version20240426172029','2024-04-26 17:20:33',29),('DoctrineMigrations\\Version20240426181421','2024-04-26 18:14:24',38),('DoctrineMigrations\\Version20240426184335','2024-04-26 18:43:37',15),('DoctrineMigrations\\Version20240426213915','2024-04-26 21:39:17',22),('DoctrineMigrations\\Version20240428143326','2024-04-28 14:33:36',41),('DoctrineMigrations\\Version20240429084201','2024-04-29 08:42:07',39),('DoctrineMigrations\\Version20240429135001','2024-04-29 13:50:04',20),('DoctrineMigrations\\Version20240429141035','2024-04-29 14:10:38',22),('DoctrineMigrations\\Version20240429173256','2024-04-29 17:33:00',36),('DoctrineMigrations\\Version20240430100710','2024-04-30 10:07:16',17);
/*!40000 ALTER TABLE `doctrine_migration_versions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_jo`
--

DROP TABLE IF EXISTS `event_jo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event_jo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(2000) NOT NULL,
  `date` datetime NOT NULL,
  `image` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `location` varchar(1000) NOT NULL,
  `price_offert_famille` double NOT NULL,
  `stockage` double DEFAULT NULL,
  `category_id` int(11) NOT NULL,
  `price_offert_duo` double NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_CD0862C012469DE2` (`category_id`),
  CONSTRAINT `FK_CD0862C012469DE2` FOREIGN KEY (`category_id`) REFERENCES `categories_event` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_jo`
--

LOCK TABLES `event_jo` WRITE;
/*!40000 ALTER TABLE `event_jo` DISABLE KEYS */;
INSERT INTO `event_jo` VALUES (30,'louloueventbyyass','loulouevent','2022-10-19 00:00:00','662bfd8137186.png',15,'450 loulouland',30,640,1,149),(31,'yassevent','yassdescevent','2026-05-12 03:00:00','662c00518ac2a.png',15,'yass land ',45,0,2,30),(32,'forEvent','description of ForEvent','2026-08-25 00:00:00','662c02275a4f5.png',15,'forEventLocation',30,7,9,45),(33,'lysevent','lysevent','2026-05-09 06:03:00','662ce2ebeeedc.png',10,'lys land',15,1,2,20),(34,'loulouland','loulouland event','2024-05-15 00:00:00','662f848395f56.jpg',15,'loulou land ',20,438,3,870),(35,'yassrzgevent','yassrzgevent descri','2029-01-24 00:00:00','662fd955035e9.jpg',10,'30 toto land',15,15,1,20);
/*!40000 ALTER TABLE `event_jo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messenger_messages`
--

DROP TABLE IF EXISTS `messenger_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `messenger_messages` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `body` longtext NOT NULL,
  `headers` longtext NOT NULL,
  `queue_name` varchar(190) NOT NULL,
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `available_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `delivered_at` datetime DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)',
  PRIMARY KEY (`id`),
  KEY `IDX_75EA56E0FB7336F0` (`queue_name`),
  KEY `IDX_75EA56E0E3BD61CE` (`available_at`),
  KEY `IDX_75EA56E016BA31DB` (`delivered_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messenger_messages`
--

LOCK TABLES `messenger_messages` WRITE;
/*!40000 ALTER TABLE `messenger_messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `messenger_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `qr_code`
--

DROP TABLE IF EXISTS `qr_code`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `qr_code` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `event_id` int(11) DEFAULT NULL,
  `token_qr_code` varchar(255) NOT NULL,
  `user_token` varchar(255) NOT NULL,
  `is_used` tinyint(1) NOT NULL,
  `token_url` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)',
  `num_command` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_7D8B1FB5A76ED395` (`user_id`),
  KEY `IDX_7D8B1FB571F7E88B` (`event_id`),
  CONSTRAINT `FK_7D8B1FB571F7E88B` FOREIGN KEY (`event_id`) REFERENCES `event_jo` (`id`),
  CONSTRAINT `FK_7D8B1FB5A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qr_code`
--

LOCK TABLES `qr_code` WRITE;
/*!40000 ALTER TABLE `qr_code` DISABLE KEYS */;
INSERT INTO `qr_code` VALUES (23,10,32,'662f6390b0a22','6628ede7d13de',0,'662f6390b0a25','0000-00-00 00:00:00',''),(24,10,30,'662f646df2b87','6628ede7d13de',0,'662f646df2b8b','0000-00-00 00:00:00',''),(27,10,34,'662f84a62fbe9','6628ede7d13de',0,'662f84a62fbeb','0000-00-00 00:00:00',''),(30,10,34,'662fa620d13a7','6628ede7d13de',0,'662fa620d13ae','2024-04-29 13:52:32',''),(31,10,34,'662fa85ee06af','6628ede7d13de',0,'662fa85ee06b4','2024-04-29 15:02:06',''),(32,10,34,'662faa8907d32','6628ede7d13de',0,'662faa8907d37','2024-04-29 15:11:21',''),(33,10,30,'662faebca604c','6628ede7d13de',0,'662faebca604f','2024-04-29 15:29:16',''),(34,10,34,'662ffd0c067ea','6628ede7d13de',0,'662ffd0c067ed','2024-04-29 21:03:24',''),(35,10,32,'6630bbd15a32c','6628ede7d13de',0,'6630bbd15a331','2024-04-30 10:37:21',''),(36,10,31,'6630bc748f82e','6628ede7d13de',0,'6630bc748f832','2024-04-30 10:40:04',''),(37,10,31,'6630bcf87892c','6628ede7d13de',0,'6630bcf87892f','2024-04-30 10:42:16',''),(38,10,31,'6630bd1882e54','6628ede7d13de',0,'6630bd1882e58','2024-04-30 10:42:48',''),(39,10,31,'6630bdbab9cba','6628ede7d13de',0,'6630bdbab9cbe','2024-04-30 10:45:30',''),(40,10,31,'6630bdbe708a5','6628ede7d13de',0,'6630bdbe708a9','2024-04-30 10:45:34',''),(41,10,31,'6630bdbf024ae','6628ede7d13de',0,'6630bdbf024b3','2024-04-30 10:45:35',''),(42,10,31,'6630c4fca5458','6628ede7d13de',0,'6630c4fca545e','2024-04-30 11:16:28','ff19ef6a-5c3a-4f70-be6b-26ca5b6835c2');
/*!40000 ALTER TABLE `qr_code` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `qr_code_accompagnant`
--

DROP TABLE IF EXISTS `qr_code_accompagnant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `qr_code_accompagnant` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `qr_code_user_id` int(11) DEFAULT NULL,
  `accompagnant_user_id` int(11) DEFAULT NULL,
  `is_used` tinyint(1) NOT NULL,
  `token_url` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)',
  PRIMARY KEY (`id`),
  KEY `IDX_44F003A993C669` (`qr_code_user_id`),
  KEY `IDX_44F003E51F27F4` (`accompagnant_user_id`),
  CONSTRAINT `FK_44F003A993C669` FOREIGN KEY (`qr_code_user_id`) REFERENCES `qr_code` (`id`),
  CONSTRAINT `FK_44F003E51F27F4` FOREIGN KEY (`accompagnant_user_id`) REFERENCES `accompagnant` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qr_code_accompagnant`
--

LOCK TABLES `qr_code_accompagnant` WRITE;
/*!40000 ALTER TABLE `qr_code_accompagnant` DISABLE KEYS */;
INSERT INTO `qr_code_accompagnant` VALUES (29,23,29,0,'662f6390b8da1','0000-00-00 00:00:00'),(30,24,29,0,'662f646df30f1','0000-00-00 00:00:00'),(33,27,31,0,'662f84a630056','0000-00-00 00:00:00'),(38,30,35,0,'662fa620d185d','2024-04-29 13:52:32'),(39,33,29,0,'662faebca66cf','2024-04-29 15:29:16'),(40,34,36,0,'662ffd0c06bd0','2024-04-29 21:03:24'),(41,37,37,0,'6630bcf878d0b','2024-04-30 10:42:16'),(42,37,38,0,'6630bcf878ee5','2024-04-30 10:42:16'),(43,37,39,0,'6630bcf878f8d','2024-04-30 10:42:16'),(44,38,37,0,'6630bd188358e','2024-04-30 10:42:48'),(45,38,38,0,'6630bd18838f1','2024-04-30 10:42:48'),(46,38,39,0,'6630bd1883bbc','2024-04-30 10:42:48'),(47,39,37,0,'6630bdbaba2b5','2024-04-30 10:45:30'),(48,39,38,0,'6630bdbaba4cd','2024-04-30 10:45:30'),(49,39,39,0,'6630bdbaba6a9','2024-04-30 10:45:30'),(50,40,37,0,'6630bdbe70f89','2024-04-30 10:45:34'),(51,40,38,0,'6630bdbe7121f','2024-04-30 10:45:34'),(52,40,39,0,'6630bdbe713b6','2024-04-30 10:45:34'),(53,41,37,0,'6630bdbf02cd1','2024-04-30 10:45:35'),(54,41,38,0,'6630bdbf0302a','2024-04-30 10:45:35'),(55,41,39,0,'6630bdbf0332b','2024-04-30 10:45:35');
/*!40000 ALTER TABLE `qr_code_accompagnant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(180) NOT NULL,
  `roles` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`roles`)),
  `password` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `token` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `consent` tinyint(1) NOT NULL,
  `token_auth` varchar(255) DEFAULT NULL,
  `is_double_auth` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_8D93D649E7927C74` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (10,'leila.chouali.arc@gmail.com','[\"ROLE_ADMIN\"]','$2y$13$Jf1QRzZzPNSM18m.CkpO9.koJjY3TBIPEFtsYm75FvCa1w3H7diYS',1,'2024-04-24 11:32:55','6628ede7d13de','toto','toto',1,NULL,1);
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

-- Dump completed on 2024-04-30 15:44:26
