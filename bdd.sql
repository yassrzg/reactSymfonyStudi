-- MariaDB dump 10.19-11.3.2-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: studiJo
-- ------------------------------------------------------
-- Server version	11.3.2-MariaDB-1:11.3.2+maria~ubu2204

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
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accompagnant`
--

LOCK TABLES `accompagnant` WRITE;
/*!40000 ALTER TABLE `accompagnant` DISABLE KEYS */;
INSERT INTO `accompagnant` VALUES
(29,'yass','rzg',10),
(31,'loulou','yass',10),
(35,'moi','toi',10),
(36,'loulou','lys',10),
(37,'k','o',10),
(38,'iii','iiiii',10),
(39,'k','h',10),
(40,'yass','stat',10),
(41,'toi','toi',10),
(42,'loulou','rzg',10);
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
INSERT INTO `accompagnant_event_jo` VALUES
(29,40),
(42,42);
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories_event`
--

LOCK TABLES `categories_event` WRITE;
/*!40000 ALTER TABLE `categories_event` DISABLE KEYS */;
INSERT INTO `categories_event` VALUES
(10,'Triahtlon'),
(11,'Natation'),
(12,'Athéltisme'),
(13,'Volley'),
(14,'Ballon');
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
INSERT INTO `doctrine_migration_versions` VALUES
('DoctrineMigrations\\Version20240424075522','2024-04-24 08:24:19',34),
('DoctrineMigrations\\Version20240424082350','2024-04-24 08:24:19',10),
('DoctrineMigrations\\Version20240424083714','2024-04-24 08:37:19',8),
('DoctrineMigrations\\Version20240424134643','2024-04-24 13:46:51',8),
('DoctrineMigrations\\Version20240425110346','2024-04-25 11:03:58',50),
('DoctrineMigrations\\Version20240425110654','2024-04-25 11:06:58',17),
('DoctrineMigrations\\Version20240426080840','2024-04-26 08:08:41',47),
('DoctrineMigrations\\Version20240426081002','2024-04-26 08:10:09',16),
('DoctrineMigrations\\Version20240426123227','2024-04-26 12:32:41',41),
('DoctrineMigrations\\Version20240426125320','2024-04-26 12:53:23',16),
('DoctrineMigrations\\Version20240426125415','2024-04-26 12:54:18',15),
('DoctrineMigrations\\Version20240426133339','2024-04-26 13:33:43',16),
('DoctrineMigrations\\Version20240426150953','2024-04-26 15:09:57',15),
('DoctrineMigrations\\Version20240426172029','2024-04-26 17:20:33',29),
('DoctrineMigrations\\Version20240426181421','2024-04-26 18:14:24',38),
('DoctrineMigrations\\Version20240426184335','2024-04-26 18:43:37',15),
('DoctrineMigrations\\Version20240426213915','2024-04-26 21:39:17',22),
('DoctrineMigrations\\Version20240428143326','2024-04-28 14:33:36',41),
('DoctrineMigrations\\Version20240429084201','2024-04-29 08:42:07',39),
('DoctrineMigrations\\Version20240429135001','2024-04-29 13:50:04',20),
('DoctrineMigrations\\Version20240429141035','2024-04-29 14:10:38',22),
('DoctrineMigrations\\Version20240429173256','2024-04-29 17:33:00',36),
('DoctrineMigrations\\Version20240430100710','2024-04-30 10:07:16',17),
('DoctrineMigrations\\Version20240501172424','2024-05-01 17:24:48',9),
('DoctrineMigrations\\Version20240501172814','2024-05-01 17:28:17',15),
('DoctrineMigrations\\Version20240501173511','2024-05-01 17:35:14',16),
('DoctrineMigrations\\Version20240502081048','2024-05-02 08:10:55',15),
('DoctrineMigrations\\Version20240502081959','2024-05-02 08:20:07',18),
('DoctrineMigrations\\Version20240502082733','2024-05-02 08:27:49',18),
('DoctrineMigrations\\Version20240503132417','2024-05-03 13:24:26',20),
('DoctrineMigrations\\Version20240528070043','2024-05-28 10:11:50',34),
('DoctrineMigrations\\Version20240528080841','2024-05-28 10:11:50',6),
('DoctrineMigrations\\Version20240528101256','2024-05-28 10:13:03',48),
('DoctrineMigrations\\Version20240528103228','2024-05-28 10:32:34',14),
('DoctrineMigrations\\Version20240528103332','2024-05-28 10:33:39',27);
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
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_jo`
--

LOCK TABLES `event_jo` WRITE;
/*!40000 ALTER TABLE `event_jo` DISABLE KEYS */;
INSERT INTO `event_jo` VALUES
(38,'Triathlon','Rejoignez-nous pour le Triathlon, un défi sportif palpitant qui combine natation, cyclisme et course à pied. ','2024-07-31 16:11:00','6655ad1fef50c.webp',30,'Paris',100,500,10,60),
(39,'natation artistique','Assistez à une compétition spectaculaire de natation artistique où les athlètes allient grâce, synchronisation et créativité dans des routines aquatiques captivantes.','2024-07-25 16:17:00','6655ad29b3501.webp',45,'Paris',150,50,11,90),
(40,'Athlétisme ','Vibrez au rythme des épreuves d\'athlétisme sur piste au légendaire Stade de France, où les meilleurs athlètes du monde rivaliseront pour la médaille d\'or.','2024-07-25 16:19:00','6655ad4e70f54.jpg',15,'Paris',70,398,12,25),
(42,'Basket-ball','Vivez l\'intensité du basket-ball olympique lors d\'un match palpitant entre les équipes nationales les plus talentueuses du monde, dans l\'atmosphère électrique du Parc des Expositions de la Porte de Versailles','2024-07-31 16:24:00','6655ad66c25d4.jpg',20,'Paris',100,28,14,30),
(43,'Beach Volley','Profitez du soleil et du sable lors du tournoi de beach volley sur les magnifiques plages de Marseille, où les équipes s\'affronteront pour la gloire olympique.','2024-08-16 12:58:00','6655b8f370aee.webp',20,'Marseille',70,750,13,35);
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
  `is_paye` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_7D8B1FB5A76ED395` (`user_id`),
  KEY `IDX_7D8B1FB571F7E88B` (`event_id`),
  CONSTRAINT `FK_7D8B1FB571F7E88B` FOREIGN KEY (`event_id`) REFERENCES `event_jo` (`id`),
  CONSTRAINT `FK_7D8B1FB5A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qr_code`
--

LOCK TABLES `qr_code` WRITE;
/*!40000 ALTER TABLE `qr_code` DISABLE KEYS */;
INSERT INTO `qr_code` VALUES
(54,10,42,'664caf0c16427','6628ede7d13de',0,'664caf0c1645a','2024-05-21 15:26:20','664caf0c16456',1),
(56,10,40,'6655b7f4d051e','6628ede7d13de',0,'6655b7f4d0529','2024-05-28 11:54:44','6655b7f4d0528',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qr_code_accompagnant`
--

LOCK TABLES `qr_code_accompagnant` WRITE;
/*!40000 ALTER TABLE `qr_code_accompagnant` DISABLE KEYS */;
INSERT INTO `qr_code_accompagnant` VALUES
(58,54,42,0,'664caf0c1bfd9','2024-05-21 15:26:20'),
(60,56,29,0,'6655b7f4d12fb','2024-05-28 11:54:44');
/*!40000 ALTER TABLE `qr_code_accompagnant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reset_password`
--

DROP TABLE IF EXISTS `reset_password`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reset_password` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `token` varchar(255) NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_B9983CE5A76ED395` (`user_id`),
  CONSTRAINT `FK_B9983CE5A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reset_password`
--

LOCK TABLES `reset_password` WRITE;
/*!40000 ALTER TABLE `reset_password` DISABLE KEYS */;
INSERT INTO `reset_password` VALUES
(1,10,'6634ea9d7bdf4','2024-05-03'),
(2,10,'6634eadb07711','2024-05-03'),
(3,10,'6634ee5285ea4','2024-05-03'),
(4,10,'6634f3f9b219a','2024-05-03'),
(5,10,'663627ca6c255','2024-05-04');
/*!40000 ALTER TABLE `reset_password` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stats_event_purchase`
--

DROP TABLE IF EXISTS `stats_event_purchase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stats_event_purchase` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `event_id` int(11) DEFAULT NULL,
  `count` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_3BC2D7CE71F7E88B` (`event_id`),
  CONSTRAINT `FK_3BC2D7CE71F7E88B` FOREIGN KEY (`event_id`) REFERENCES `event_jo` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stats_event_purchase`
--

LOCK TABLES `stats_event_purchase` WRITE;
/*!40000 ALTER TABLE `stats_event_purchase` DISABLE KEYS */;
INSERT INTO `stats_event_purchase` VALUES
(3,40,2);
/*!40000 ALTER TABLE `stats_event_purchase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stats_qr_code`
--

DROP TABLE IF EXISTS `stats_qr_code`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stats_qr_code` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `qr_code_count` int(11) NOT NULL,
  `month` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stats_qr_code`
--

LOCK TABLES `stats_qr_code` WRITE;
/*!40000 ALTER TABLE `stats_qr_code` DISABLE KEYS */;
INSERT INTO `stats_qr_code` VALUES
(1,9,5,2024);
/*!40000 ALTER TABLE `stats_qr_code` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stats_user`
--

DROP TABLE IF EXISTS `stats_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stats_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `year` int(11) NOT NULL,
  `month` int(11) NOT NULL,
  `login_count` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stats_user`
--

LOCK TABLES `stats_user` WRITE;
/*!40000 ALTER TABLE `stats_user` DISABLE KEYS */;
INSERT INTO `stats_user` VALUES
(1,2024,5,26);
/*!40000 ALTER TABLE `stats_user` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES
(10,'leila.chouali.arc@gmail.com','[\"ROLE_ADMIN\"]','$2y$13$dAI15u.PRbzThPmnmqRg9OsyoIe3.B1S1gj1UPWp1gOFLk.zU5ID.',1,'2024-04-24 11:32:55','6628ede7d13de','Leila','yass',1,NULL,0),
(21,'yass.srgrzg@gmail.com','[\"ROLE_USER\"]','$2y$13$soHPPvbxT19vdt8iWMgONOj.Js1EgJNVaV0ISxtPiyKo9XvEi43NO',1,'2024-05-21 13:44:59','664c893b66c7a','yass','rzg',1,NULL,1),
(22,'studijoeval@gmail.com','[\"ROLE_ADMIN\"]','$2y$13$uGbcWHLL/B94fe1GjPrDqOf7KfSYdM4es66boMO0xtHOQ8GZeWVGm',1,'2024-05-21 14:27:09','664c931d9f7a8','studiJoEval','studiJo',1,NULL,1);
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

-- Dump completed on 2024-05-28 12:05:07
