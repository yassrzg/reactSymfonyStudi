-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : mar. 21 mai 2024 à 15:05
-- Version du serveur : 10.6.18-MariaDB
-- Version de PHP : 8.1.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `voko3428_studiJo`
--

-- --------------------------------------------------------

--
-- Structure de la table `accompagnant`
--

CREATE TABLE `accompagnant` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `main_user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `accompagnant`
--

INSERT INTO `accompagnant` (`id`, `name`, `lastname`, `main_user_id`) VALUES
(29, 'yass', 'rzg', 10),
(31, 'loulou', 'yass', 10),
(35, 'moi', 'toi', 10),
(36, 'loulou', 'lys', 10),
(37, 'k', 'o', 10),
(38, 'iii', 'iiiii', 10),
(39, 'k', 'h', 10),
(40, 'yass', 'stat', 10),
(41, 'toi', 'toi', 10);

-- --------------------------------------------------------

--
-- Structure de la table `accompagnant_event_jo`
--

CREATE TABLE `accompagnant_event_jo` (
  `accompagnant_id` int(11) NOT NULL,
  `event_jo_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `accompagnant_event_jo`
--

INSERT INTO `accompagnant_event_jo` (`accompagnant_id`, `event_jo_id`) VALUES
(29, 30),
(29, 32),
(31, 34),
(35, 34),
(36, 34),
(37, 31),
(38, 31),
(39, 31),
(40, 36),
(41, 37);

-- --------------------------------------------------------

--
-- Structure de la table `categories_event`
--

CREATE TABLE `categories_event` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `categories_event`
--

INSERT INTO `categories_event` (`id`, `name`) VALUES
(1, 'cate1'),
(2, 'tata'),
(3, 'titi'),
(4, 'ttititi'),
(5, 'tittfgs'),
(6, 'tjtigjfsg'),
(7, 'tjgorjdfdsg'),
(8, 'yasss'),
(9, 'loulou');

-- --------------------------------------------------------

--
-- Structure de la table `doctrine_migration_versions`
--

CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Déchargement des données de la table `doctrine_migration_versions`
--

INSERT INTO `doctrine_migration_versions` (`version`, `executed_at`, `execution_time`) VALUES
('DoctrineMigrations\\Version20240424075522', '2024-04-24 08:24:19', 34),
('DoctrineMigrations\\Version20240424082350', '2024-04-24 08:24:19', 10),
('DoctrineMigrations\\Version20240424083714', '2024-04-24 08:37:19', 8),
('DoctrineMigrations\\Version20240424134643', '2024-04-24 13:46:51', 8),
('DoctrineMigrations\\Version20240425110346', '2024-04-25 11:03:58', 50),
('DoctrineMigrations\\Version20240425110654', '2024-04-25 11:06:58', 17),
('DoctrineMigrations\\Version20240426080840', '2024-04-26 08:08:41', 47),
('DoctrineMigrations\\Version20240426081002', '2024-04-26 08:10:09', 16),
('DoctrineMigrations\\Version20240426123227', '2024-04-26 12:32:41', 41),
('DoctrineMigrations\\Version20240426125320', '2024-04-26 12:53:23', 16),
('DoctrineMigrations\\Version20240426125415', '2024-04-26 12:54:18', 15),
('DoctrineMigrations\\Version20240426133339', '2024-04-26 13:33:43', 16),
('DoctrineMigrations\\Version20240426150953', '2024-04-26 15:09:57', 15),
('DoctrineMigrations\\Version20240426172029', '2024-04-26 17:20:33', 29),
('DoctrineMigrations\\Version20240426181421', '2024-04-26 18:14:24', 38),
('DoctrineMigrations\\Version20240426184335', '2024-04-26 18:43:37', 15),
('DoctrineMigrations\\Version20240426213915', '2024-04-26 21:39:17', 22),
('DoctrineMigrations\\Version20240428143326', '2024-04-28 14:33:36', 41),
('DoctrineMigrations\\Version20240429084201', '2024-04-29 08:42:07', 39),
('DoctrineMigrations\\Version20240429135001', '2024-04-29 13:50:04', 20),
('DoctrineMigrations\\Version20240429141035', '2024-04-29 14:10:38', 22),
('DoctrineMigrations\\Version20240429173256', '2024-04-29 17:33:00', 36),
('DoctrineMigrations\\Version20240430100710', '2024-04-30 10:07:16', 17),
('DoctrineMigrations\\Version20240501172424', '2024-05-01 17:24:48', 9),
('DoctrineMigrations\\Version20240501172814', '2024-05-01 17:28:17', 15),
('DoctrineMigrations\\Version20240501173511', '2024-05-01 17:35:14', 16),
('DoctrineMigrations\\Version20240502081048', '2024-05-02 08:10:55', 15),
('DoctrineMigrations\\Version20240502081959', '2024-05-02 08:20:07', 18),
('DoctrineMigrations\\Version20240502082733', '2024-05-02 08:27:49', 18),
('DoctrineMigrations\\Version20240503132417', '2024-05-03 13:24:26', 20);

-- --------------------------------------------------------

--
-- Structure de la table `event_jo`
--

CREATE TABLE `event_jo` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(2000) NOT NULL,
  `date` datetime NOT NULL,
  `image` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `location` varchar(1000) NOT NULL,
  `price_offert_famille` double NOT NULL,
  `stockage` double DEFAULT NULL,
  `category_id` int(11) NOT NULL,
  `price_offert_duo` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `event_jo`
--

INSERT INTO `event_jo` (`id`, `name`, `description`, `date`, `image`, `price`, `location`, `price_offert_famille`, `stockage`, `category_id`, `price_offert_duo`) VALUES
(30, 'louloueventbyyasstoto', 'loulouevent', '2022-10-19 00:00:00', '662bfd8137186.png', 15, '450 loulouland', 30, 640, 1, 149),
(31, 'yassevent', 'yassdescevent', '2026-05-12 03:00:00', '662c00518ac2a.png', 15, 'yass land ', 45, 0, 2, 30),
(32, 'forEvent', 'description of ForEvent', '2026-08-25 00:00:00', '662c02275a4f5.png', 15, 'forEventLocation', 30, 7, 9, 45),
(33, 'lysevent', 'lysevent', '2026-05-09 06:03:00', '662ce2ebeeedc.png', 10, 'lys land', 15, 1, 2, 20),
(34, 'loulouland', 'loulouland event', '2024-05-15 00:00:00', '662f848395f56.jpg', 15, 'loulou land ', 20, 430, 3, 870),
(35, 'yassrzgevent', 'yassrzgevent descri', '2029-01-24 00:00:00', '662fd955035e9.jpg', 10, '30 toto land', 15, 14, 1, 20),
(36, 'new event', 'new event toto', '2024-05-17 10:51:00', '6633543cf0ea0.png', 15, 'tata land', 450, 456, 8, 30),
(37, 'testevent', 'testevent descr', '2024-05-10 14:11:00', '6634d4933de4b.png', 145, 'test land', 1560, 448, 2, 45);

-- --------------------------------------------------------

--
-- Structure de la table `messenger_messages`
--

CREATE TABLE `messenger_messages` (
  `id` bigint(20) NOT NULL,
  `body` longtext NOT NULL,
  `headers` longtext NOT NULL,
  `queue_name` varchar(190) NOT NULL,
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `available_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `delivered_at` datetime DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `qr_code`
--

CREATE TABLE `qr_code` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `event_id` int(11) DEFAULT NULL,
  `token_qr_code` varchar(255) NOT NULL,
  `user_token` varchar(255) NOT NULL,
  `is_used` tinyint(1) NOT NULL,
  `token_url` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)',
  `num_command` varchar(255) NOT NULL,
  `is_paye` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `qr_code`
--

INSERT INTO `qr_code` (`id`, `user_id`, `event_id`, `token_qr_code`, `user_token`, `is_used`, `token_url`, `created_at`, `num_command`, `is_paye`) VALUES
(23, 10, 32, '662f6390b0a22', '6628ede7d13de', 0, '662f6390b0a25', '0000-00-00 00:00:00', '', 0),
(24, 10, 30, '662f646df2b87', '6628ede7d13de', 0, '662f646df2b8b', '0000-00-00 00:00:00', '', 0),
(27, 10, 34, '662f84a62fbe9', '6628ede7d13de', 0, '662f84a62fbeb', '0000-00-00 00:00:00', '', 0),
(30, 10, 34, '662fa620d13a7', '6628ede7d13de', 0, '662fa620d13ae', '2024-04-29 13:52:32', '', 0),
(31, 10, 34, '662fa85ee06af', '6628ede7d13de', 0, '662fa85ee06b4', '2024-04-29 15:02:06', '', 0),
(32, 10, 34, '662faa8907d32', '6628ede7d13de', 0, '662faa8907d37', '2024-04-29 15:11:21', '', 0),
(33, 10, 30, '662faebca604c', '6628ede7d13de', 0, '662faebca604f', '2024-04-29 15:29:16', '', 0),
(34, 10, 34, '662ffd0c067ea', '6628ede7d13de', 0, '662ffd0c067ed', '2024-04-29 21:03:24', '', 0),
(35, 10, 32, '6630bbd15a32c', '6628ede7d13de', 0, '6630bbd15a331', '2024-04-30 10:37:21', '', 0),
(36, 10, 31, '6630bc748f82e', '6628ede7d13de', 0, '6630bc748f832', '2024-04-30 10:40:04', '', 0),
(37, 10, 31, '6630bcf87892c', '6628ede7d13de', 0, '6630bcf87892f', '2024-04-30 10:42:16', '', 0),
(38, 10, 31, '6630bd1882e54', '6628ede7d13de', 0, '6630bd1882e58', '2024-04-30 10:42:48', '', 0),
(39, 10, 31, '6630bdbab9cba', '6628ede7d13de', 0, '6630bdbab9cbe', '2024-04-30 10:45:30', '', 0),
(40, 10, 31, '6630bdbe708a5', '6628ede7d13de', 0, '6630bdbe708a9', '2024-04-30 10:45:34', '', 0),
(41, 10, 31, '6630bdbf024ae', '6628ede7d13de', 0, '6630bdbf024b3', '2024-04-30 10:45:35', '', 0),
(42, 10, 31, '6630c4fca5458', '6628ede7d13de', 0, '6630c4fca545e', '2024-04-30 11:16:28', '', 0),
(43, 10, 35, '66327a284267a', '6628ede7d13de', 0, '66327a284267f', '2024-05-01 18:21:44', '', 0),
(44, 10, 34, '663282731ecbf', '6628ede7d13de', 0, '663282731ecc4', '2024-05-01 18:57:07', '663282731ecc3', 0),
(45, 10, 34, '6632827f0c69c', '6628ede7d13de', 0, '6632827f0c6a5', '2024-05-01 18:57:19', '6632827f0c6a4', 0),
(46, 10, 34, '663282d158d87', '6628ede7d13de', 0, '663282d158d91', '2024-05-01 18:58:41', '663282d158d90', 0),
(47, 10, 34, '663282dc6e5e8', '6628ede7d13de', 0, '663282dc6e5ef', '2024-05-01 18:58:52', '663282dc6e5ee', 0),
(48, 10, 34, '663283d2d0e1f', '6628ede7d13de', 0, '663283d2d0e23', '2024-05-01 19:02:58', '663283d2d0e22', 0),
(49, 10, 34, '66328413bdf24', '6628ede7d13de', 0, '66328413bdf29', '2024-05-01 19:04:03', '66328413bdf28', 0),
(50, 10, 34, '6632841db7c3a', '6628ede7d13de', 0, '6632841db7c41', '2024-05-01 19:04:13', '6632841db7c40', 0),
(51, 10, 34, '6632842a24b77', '6628ede7d13de', 0, '6632842a24b7d', '2024-05-01 19:04:26', '6632842a24b7c', 0),
(52, 10, 36, '663354561e928', '6628ede7d13de', 0, '663354561e934', '2024-05-02 09:52:38', '663354561e933', 1),
(53, 10, 37, '6634d50aa0dc8', '6628ede7d13de', 0, '6634d50aa0dd9', '2024-05-03 13:14:02', '6634d50aa0dd8', 1);

-- --------------------------------------------------------

--
-- Structure de la table `qr_code_accompagnant`
--

CREATE TABLE `qr_code_accompagnant` (
  `id` int(11) NOT NULL,
  `qr_code_user_id` int(11) DEFAULT NULL,
  `accompagnant_user_id` int(11) DEFAULT NULL,
  `is_used` tinyint(1) NOT NULL,
  `token_url` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `qr_code_accompagnant`
--

INSERT INTO `qr_code_accompagnant` (`id`, `qr_code_user_id`, `accompagnant_user_id`, `is_used`, `token_url`, `created_at`) VALUES
(29, 23, 29, 0, '662f6390b8da1', '0000-00-00 00:00:00'),
(30, 24, 29, 0, '662f646df30f1', '0000-00-00 00:00:00'),
(33, 27, 31, 0, '662f84a630056', '0000-00-00 00:00:00'),
(38, 30, 35, 0, '662fa620d185d', '2024-04-29 13:52:32'),
(39, 33, 29, 0, '662faebca66cf', '2024-04-29 15:29:16'),
(40, 34, 36, 0, '662ffd0c06bd0', '2024-04-29 21:03:24'),
(41, 37, 37, 0, '6630bcf878d0b', '2024-04-30 10:42:16'),
(42, 37, 38, 0, '6630bcf878ee5', '2024-04-30 10:42:16'),
(43, 37, 39, 0, '6630bcf878f8d', '2024-04-30 10:42:16'),
(44, 38, 37, 0, '6630bd188358e', '2024-04-30 10:42:48'),
(45, 38, 38, 0, '6630bd18838f1', '2024-04-30 10:42:48'),
(46, 38, 39, 0, '6630bd1883bbc', '2024-04-30 10:42:48'),
(47, 39, 37, 0, '6630bdbaba2b5', '2024-04-30 10:45:30'),
(48, 39, 38, 0, '6630bdbaba4cd', '2024-04-30 10:45:30'),
(49, 39, 39, 0, '6630bdbaba6a9', '2024-04-30 10:45:30'),
(50, 40, 37, 0, '6630bdbe70f89', '2024-04-30 10:45:34'),
(51, 40, 38, 0, '6630bdbe7121f', '2024-04-30 10:45:34'),
(52, 40, 39, 0, '6630bdbe713b6', '2024-04-30 10:45:34'),
(53, 41, 37, 0, '6630bdbf02cd1', '2024-04-30 10:45:35'),
(54, 41, 38, 0, '6630bdbf0302a', '2024-04-30 10:45:35'),
(55, 41, 39, 0, '6630bdbf0332b', '2024-04-30 10:45:35'),
(56, 52, 40, 0, '663354561f4ed', '2024-05-02 09:52:38'),
(57, 53, 41, 0, '6634d50aa17e5', '2024-05-03 13:14:02');

-- --------------------------------------------------------

--
-- Structure de la table `reset_password`
--

CREATE TABLE `reset_password` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `token` varchar(255) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `reset_password`
--

INSERT INTO `reset_password` (`id`, `user_id`, `token`, `date`) VALUES
(1, 10, '6634ea9d7bdf4', '2024-05-03'),
(2, 10, '6634eadb07711', '2024-05-03'),
(3, 10, '6634ee5285ea4', '2024-05-03'),
(4, 10, '6634f3f9b219a', '2024-05-03'),
(5, 10, '663627ca6c255', '2024-05-04');

-- --------------------------------------------------------

--
-- Structure de la table `stats_qr_code`
--

CREATE TABLE `stats_qr_code` (
  `id` int(11) NOT NULL,
  `qr_code_count` int(11) NOT NULL,
  `month` int(11) NOT NULL,
  `year` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `stats_qr_code`
--

INSERT INTO `stats_qr_code` (`id`, `qr_code_count`, `month`, `year`) VALUES
(1, 3, 5, 2024);

-- --------------------------------------------------------

--
-- Structure de la table `stats_user`
--

CREATE TABLE `stats_user` (
  `id` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `month` int(11) NOT NULL,
  `login_count` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `stats_user`
--

INSERT INTO `stats_user` (`id`, `year`, `month`, `login_count`) VALUES
(1, 2024, 5, 21);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
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
  `is_double_auth` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `email`, `roles`, `password`, `is_active`, `created_at`, `token`, `firstname`, `lastname`, `consent`, `token_auth`, `is_double_auth`) VALUES
(10, 'leila.chouali.arc@gmail.com', '[\"ROLE_ADMIN\"]', '$2y$13$dAI15u.PRbzThPmnmqRg9OsyoIe3.B1S1gj1UPWp1gOFLk.zU5ID.', 1, '2024-04-24 11:32:55', '6628ede7d13de', 'Leila', 'yass', 1, NULL, 0),
(21, 'yass.srgrzg@gmail.com', '[\"ROLE_USER\"]', '$2y$13$soHPPvbxT19vdt8iWMgONOj.Js1EgJNVaV0ISxtPiyKo9XvEi43NO', 1, '2024-05-21 13:44:59', '664c893b66c7a', 'yass', 'rzg', 1, NULL, 1),
(22, 'studijoeval@gmail.com', '[\"ROLE_ADMIN\"]', '$2y$13$uGbcWHLL/B94fe1GjPrDqOf7KfSYdM4es66boMO0xtHOQ8GZeWVGm', 1, '2024-05-21 14:27:09', '664c931d9f7a8', 'studiJoEval', 'studiJo', 1, NULL, 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `accompagnant`
--
ALTER TABLE `accompagnant`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_C9D827FF53257A7C` (`main_user_id`);

--
-- Index pour la table `accompagnant_event_jo`
--
ALTER TABLE `accompagnant_event_jo`
  ADD PRIMARY KEY (`accompagnant_id`,`event_jo_id`),
  ADD KEY `IDX_F7FF42FA8A141997` (`accompagnant_id`),
  ADD KEY `IDX_F7FF42FAAEFED2AA` (`event_jo_id`);

--
-- Index pour la table `categories_event`
--
ALTER TABLE `categories_event`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `doctrine_migration_versions`
--
ALTER TABLE `doctrine_migration_versions`
  ADD PRIMARY KEY (`version`);

--
-- Index pour la table `event_jo`
--
ALTER TABLE `event_jo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_CD0862C012469DE2` (`category_id`);

--
-- Index pour la table `messenger_messages`
--
ALTER TABLE `messenger_messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_75EA56E0FB7336F0` (`queue_name`),
  ADD KEY `IDX_75EA56E0E3BD61CE` (`available_at`),
  ADD KEY `IDX_75EA56E016BA31DB` (`delivered_at`);

--
-- Index pour la table `qr_code`
--
ALTER TABLE `qr_code`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_7D8B1FB5A76ED395` (`user_id`),
  ADD KEY `IDX_7D8B1FB571F7E88B` (`event_id`);

--
-- Index pour la table `qr_code_accompagnant`
--
ALTER TABLE `qr_code_accompagnant`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_44F003A993C669` (`qr_code_user_id`),
  ADD KEY `IDX_44F003E51F27F4` (`accompagnant_user_id`);

--
-- Index pour la table `reset_password`
--
ALTER TABLE `reset_password`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_B9983CE5A76ED395` (`user_id`);

--
-- Index pour la table `stats_qr_code`
--
ALTER TABLE `stats_qr_code`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `stats_user`
--
ALTER TABLE `stats_user`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_8D93D649E7927C74` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `accompagnant`
--
ALTER TABLE `accompagnant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT pour la table `categories_event`
--
ALTER TABLE `categories_event`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `event_jo`
--
ALTER TABLE `event_jo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT pour la table `messenger_messages`
--
ALTER TABLE `messenger_messages`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `qr_code`
--
ALTER TABLE `qr_code`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT pour la table `qr_code_accompagnant`
--
ALTER TABLE `qr_code_accompagnant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT pour la table `reset_password`
--
ALTER TABLE `reset_password`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `stats_qr_code`
--
ALTER TABLE `stats_qr_code`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `stats_user`
--
ALTER TABLE `stats_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `accompagnant`
--
ALTER TABLE `accompagnant`
  ADD CONSTRAINT `FK_C9D827FF53257A7C` FOREIGN KEY (`main_user_id`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `accompagnant_event_jo`
--
ALTER TABLE `accompagnant_event_jo`
  ADD CONSTRAINT `FK_F7FF42FA8A141997` FOREIGN KEY (`accompagnant_id`) REFERENCES `accompagnant` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_F7FF42FAAEFED2AA` FOREIGN KEY (`event_jo_id`) REFERENCES `event_jo` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `event_jo`
--
ALTER TABLE `event_jo`
  ADD CONSTRAINT `FK_CD0862C012469DE2` FOREIGN KEY (`category_id`) REFERENCES `categories_event` (`id`);

--
-- Contraintes pour la table `qr_code`
--
ALTER TABLE `qr_code`
  ADD CONSTRAINT `FK_7D8B1FB571F7E88B` FOREIGN KEY (`event_id`) REFERENCES `event_jo` (`id`),
  ADD CONSTRAINT `FK_7D8B1FB5A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `qr_code_accompagnant`
--
ALTER TABLE `qr_code_accompagnant`
  ADD CONSTRAINT `FK_44F003A993C669` FOREIGN KEY (`qr_code_user_id`) REFERENCES `qr_code` (`id`),
  ADD CONSTRAINT `FK_44F003E51F27F4` FOREIGN KEY (`accompagnant_user_id`) REFERENCES `accompagnant` (`id`);

--
-- Contraintes pour la table `reset_password`
--
ALTER TABLE `reset_password`
  ADD CONSTRAINT `FK_B9983CE5A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
