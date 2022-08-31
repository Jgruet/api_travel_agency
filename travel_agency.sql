-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 31 août 2022 à 11:51
-- Version du serveur : 10.4.22-MariaDB
-- Version de PHP : 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `travel_agency`
--

-- --------------------------------------------------------

--
-- Structure de la table `customer`
--

CREATE TABLE `customer` (
  `id_customer` int(11) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `birthdate` date NOT NULL,
  `email` varchar(255) DEFAULT '',
  `is_companion` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `hotel_booking`
--

CREATE TABLE `hotel_booking` (
  `id_hotel_booking` varchar(50) NOT NULL,
  `id_customer` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `plane_booking`
--

CREATE TABLE `plane_booking` (
  `id_plane_booking` varchar(50) NOT NULL,
  `id_customer` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `stay`
--

CREATE TABLE `stay` (
  `id_stay` int(11) NOT NULL,
  `id_travel` int(11) NOT NULL,
  `start_at` date NOT NULL,
  `end_at` date NOT NULL,
  `id_main_customer` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `stay_customer`
--

CREATE TABLE `stay_customer` (
  `id_stay` int(11) NOT NULL,
  `id_customer` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `travel`
--

CREATE TABLE `travel` (
  `id_travel` int(11) NOT NULL,
  `destination` varchar(255) NOT NULL,
  `id_hotel` int(11) NOT NULL,
  `board_type` varchar(30) NOT NULL,
  `margin` float NOT NULL,
  `reduction` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `upload`
--

CREATE TABLE `upload` (
  `id_upload` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `id_travel` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id_customer`);

--
-- Index pour la table `hotel_booking`
--
ALTER TABLE `hotel_booking`
  ADD KEY `IDX1558` (`id_customer`);

--
-- Index pour la table `plane_booking`
--
ALTER TABLE `plane_booking`
  ADD KEY `IDX1537` (`id_customer`);

--
-- Index pour la table `stay`
--
ALTER TABLE `stay`
  ADD PRIMARY KEY (`id_stay`),
  ADD KEY `IDX1538` (`id_travel`),
  ADD KEY `IDX1634` (`id_main_customer`);

--
-- Index pour la table `stay_customer`
--
ALTER TABLE `stay_customer`
  ADD PRIMARY KEY (`id_stay`,`id_customer`),
  ADD KEY `id_customer` (`id_customer`);

--
-- Index pour la table `travel`
--
ALTER TABLE `travel`
  ADD PRIMARY KEY (`id_travel`);

--
-- Index pour la table `upload`
--
ALTER TABLE `upload`
  ADD PRIMARY KEY (`id_upload`),
  ADD KEY `IDX1557` (`id_travel`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `customer`
--
ALTER TABLE `customer`
  MODIFY `id_customer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=297;

--
-- AUTO_INCREMENT pour la table `stay`
--
ALTER TABLE `stay`
  MODIFY `id_stay` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;

--
-- AUTO_INCREMENT pour la table `travel`
--
ALTER TABLE `travel`
  MODIFY `id_travel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;

--
-- AUTO_INCREMENT pour la table `upload`
--
ALTER TABLE `upload`
  MODIFY `id_upload` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `hotel_booking`
--
ALTER TABLE `hotel_booking`
  ADD CONSTRAINT `hotel_booking_ibfk_1` FOREIGN KEY (`id_customer`) REFERENCES `customer` (`id_customer`) ON DELETE CASCADE;

--
-- Contraintes pour la table `plane_booking`
--
ALTER TABLE `plane_booking`
  ADD CONSTRAINT `plane_booking_ibfk_2` FOREIGN KEY (`id_customer`) REFERENCES `customer` (`id_customer`) ON DELETE CASCADE;

--
-- Contraintes pour la table `stay`
--
ALTER TABLE `stay`
  ADD CONSTRAINT `stay_ibfk_1` FOREIGN KEY (`id_travel`) REFERENCES `travel` (`id_travel`) ON DELETE CASCADE,
  ADD CONSTRAINT `stay_ibfk_2` FOREIGN KEY (`id_main_customer`) REFERENCES `customer` (`id_customer`) ON DELETE CASCADE;

--
-- Contraintes pour la table `stay_customer`
--
ALTER TABLE `stay_customer`
  ADD CONSTRAINT `stay_customer_ibfk_1` FOREIGN KEY (`id_stay`) REFERENCES `stay` (`id_stay`) ON DELETE CASCADE,
  ADD CONSTRAINT `stay_customer_ibfk_2` FOREIGN KEY (`id_customer`) REFERENCES `customer` (`id_customer`) ON DELETE CASCADE;

--
-- Contraintes pour la table `upload`
--
ALTER TABLE `upload`
  ADD CONSTRAINT `upload_ibfk_1` FOREIGN KEY (`id_travel`) REFERENCES `travel` (`id_travel`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
