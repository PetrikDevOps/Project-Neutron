SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE DATABASE IF NOT EXISTS `project-neutron` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `project-neutron`;

CREATE TABLE IF NOT EXISTS `profiles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `email` varchar(256) NOT NULL,
  `pwhash` varchar(512) NOT NULL,
  `wins` int(11) NOT NULL DEFAULT 0,
  `games` int(11) DEFAULT 0,
  `exp` int(11) DEFAULT 0,
  `korong` int(11) DEFAULT 0,
  PRIMARY KEY (`id`,`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `profiles` (`id`, `name`, `email`, `pwhash`, `wins`, `games`, `exp`, `korong`) VALUES
(1, 'Bagaci', 'Bagaci@bagamail.com', '$argon2id$v=19$m=65536,t=3,p=4$tukFeTQjxB1T4gGurUNFug$8P3S/GI4OIYPvx3k6vWiLxXPkEDpU/a4qycv6m8gbtU', 0, 0, 0, 0),
(2, 'admin', 'adminmail@mail.com', '$argon2id$v=19$m=65536,t=3,p=4$Uv+24TqKcltmuTPR9Yiyqg$0Smzvw1bJg+ebsWk2gfMPS+9RStTfaERaw2k4bsukdc', 0, 0, 0, 0),
(5, 'lol', 'adminmail@mail.con', '$argon2id$v=19$m=65536,t=3,p=4$h0sZ9To0/VPy88KC++Zu5g$SMvPxXpPgy0qDYa7BtuYdKoQki7ECAK4l9FOm/GrzKM', 0, 0, 0, 0);

CREATE TABLE IF NOT EXISTS `questions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question` varchar(256) NOT NULL,
  `answers` varchar(5000) NOT NULL,
  `correct` int(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `questions` (`id`, `question`, `answers`, `correct`) VALUES


CREATE TABLE IF NOT EXISTS `rooms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userIdOne` int(11) DEFAULT NULL,
  `userIdTwo` int(11) DEFAULT NULL,
  `gameState` int(11) DEFAULT NULL,
  `identifier` varchar(5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `rooms` (`id`, `userIdOne`, `userIdTwo`, `gameState`, `identifier`) VALUES
(8, 2, NULL, NULL, 'M1Iqo');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
