SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE DATABASE IF NOT EXISTS `project-neutron` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `project-neutron`;

CREATE TABLE `profiles` (
  `id` int(11) NOT NULL,
  `name` varchar(64) NOT NULL,
  `email` varchar(256) NOT NULL,
  `pwhash` varchar(512) NOT NULL,
  `wins` int(11) NOT NULL DEFAULT 0,
  `games` int(11) DEFAULT 0,
  `exp` int(11) DEFAULT 0,
  `korong` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `profiles` (`id`, `name`, `email`, `pwhash`, `wins`, `games`, `exp`, `korong`) VALUES
(1, 'Bagaci', 'Bagaci@bagamail.com', '$argon2id$v=19$m=65536,t=3,p=4$tukFeTQjxB1T4gGurUNFug$8P3S/GI4OIYPvx3k6vWiLxXPkEDpU/a4qycv6m8gbtU', 0, 0, 0, 0),
(2, 'admin', 'adminmail@mail.com', '$argon2id$v=19$m=65536,t=3,p=4$Uv+24TqKcltmuTPR9Yiyqg$0Smzvw1bJg+ebsWk2gfMPS+9RStTfaERaw2k4bsukdc', 0, 0, 0, 0),
(5, 'lol', 'adminmail@mail.con', '$argon2id$v=19$m=65536,t=3,p=4$h0sZ9To0/VPy88KC++Zu5g$SMvPxXpPgy0qDYa7BtuYdKoQki7ECAK4l9FOm/GrzKM', 0, 0, 0, 0),
(6, 'bagci', 'bagci', '$argon2id$v=19$m=65536,t=3,p=4$vh1mq41VoLYdalZAjsESDQ$OTyccq4ctTqm2RDKVhBosZ7Ed2Il1BJM5CMOYYVZPO4', 0, 0, 0, 0);

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `question` varchar(256) NOT NULL,
  `answers` varchar(5000) NOT NULL,
  `correct` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `questions` (`id`, `question`, `answers`, `correct`) VALUES
(33, 'Melyik következő kifejezés nem egy adatbázis-kezelő rendszer neve?', 'MySQL,Excel,Oracle,Microsoft Access', 2),
(34, 'Melyik következő kifejezés nem egy programozási nyelv neve?', 'Java,C++,Python,Word', 3),
(35, 'Melyik a Magyarország legmagasabb hegye?', 'Kékes,Mátrabérc,Nagy-Somos-kő,Csóványos', 0),
(36, 'undefined', 'Balaton,Tisza-tó,Fertő-tó,Hévíz-tó', 0),
(37, 'Hol található Magyarország legmélyebb része?', 'a Késkes hegyen,a Mátrában,a Dunántúlon,a Hortobágyon', 3),
(38, 'Melyik a Magyarország legnagyobb folyója?', 'Duna,Tisza,Dráva,Rába', 0),
(39, 'Melyik a Magyarország legnagyobb városa?', 'Budapest,Debrecen,Szeged,Miskolc', 0),
(40, 'Melyik a Magyarország legnagyobb szigete?', 'Öreg-sziget,Margit-sziget,Szentendre-sziget,Csepel-sziget', 3),
(41, 'Ki írta a következő irodalmi művet: A három testőr?', 'Charles Dickens,Jules Verne,Alexandre Dumas,William Shakespeare', 2),
(42, 'Milyen típusú játék a League of Legends?', 'FPS,MMORPG,MOBA,RTS', 2),
(43, 'Milyen műfajú zenék hallhatók a League of Legends játékban?', 'Rock,Metal,Klasszikus,Elektronikus zenék', 3),
(44, 'Mi a Google cég legismertebb terméke?', 'Android,Chrome,YouTube,Keresőmotor', 3),
(45, 'Mi a Google Chrome böngésző?', 'Keresőmotor,Szoftver,Operációs rendszer,Böngésző', 3),
(46, 'Melyik az egyetlen, legáltalánosabban elfogadott fizetőeszköz Magyarországon?', 'Euro,Forint,Dollár,Pfund', 1),
(47, 'Milyen készpénzfajtákat lehet Magyarországon forgalomba hozni?', '5,10,20,50,100, 200, 500, 1000, 2000, 5000, 10000, 20000,5,10,20,50,100, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000,5,10,20,50,100, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000, 100000,5,10,20,50,100, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000, 100000, 200000', 0),
(48, 'Melyik az a bank, amelyik Magyarországon a legnagyobb hálózattal rendelkezik?', 'OTP,Erste,K&H,MKB', 0),
(49, 'Melyik a legnagyobb magyar bank?', 'OTP,Erste,K&H,MKB', 0),
(50, 'Melyik volt az ókori Egyiptom legfontosabb istennője?', 'Anubis,Osiris,Horus,Isis', 3),
(51, 'Melyik volt az ókori Egyiptom legfontosabb folyója?', 'Nílus,Eufrátesz,Tigris,Jordan', 0),
(52, 'Melyik csapat nyerte meg az első labdarúgó-világbajnokságot?', 'Brazília,Argentina,Spanyolország,Uruguay', 3),
(53, 'Melyik atléta nyerte el az első olimpiai aranyérmet 100 méter síkfutásban?', 'Thomas Burke,Usuain Bolt,Carl Lewis,Jesse Owens', 0),
(54, 'Melyik kosárlabda csapat nyerte el a legtöbb NBA-bajnokságot?', 'Boston Celtics és a Los Angeles Lakers,Los Angeles Lakers és a Chicago Bulls,Chicago Bulls és Boston Celtics,San Antonio Spurs és a Chicago Bulls', 0),
(55, 'Melyik számrendszerben íródik le a következő szám: 1010101?', 'Bináris,Oktális,Hexadecimális,Decimális', 0),
(56, 'Melyik számrendszerben íródik le a következő szám: AF?', 'Bináris,Oktális,Hexadecimális,Decimális', 2),
(57, 'Melyik számrendszerben íródik le a következő szám: 123?', 'Bináris,Oktális,Hexadecimális,Decimális', 3),
(58, 'Mikor ünnepeljük a Karácsonyt?', 'December 24-én,December 25-én,December 26-án,December 27-én', 1),
(59, 'Mikor ünnepeljük a Szilvesztert?', 'December 24-én,December 25-én,December 26-án,December 31-én', 3),
(60, 'Melyik evangélista írta le az első Karácsonyt?', 'Máté,Márk,Lukács,János', 2),
(61, 'Melyik evangélista írta le az első Szilvesztert?', 'Máté,Márk,Lukács,János', 3),
(62, 'Melyik állat hangját használják a Jingle Bells című karácsonyi dalban?', 'Kutya,Cicák,Ló,Disznó', 2),
(63, 'Milyen típusú előfizetések állnak rendelkezésre a Spotify-n?', 'Ingyenes, Felnőtt, Diák, Kedvezményes,Ingyenes, Felnőtt, Diák, Kedvezményes, Családi,Ingyenes, Felnőtt, Diák, Kedvezményes, Családi, Kedvezményes,Ingyenes, Felnőtt, Diák, Kedvezményes, Családi, Kedvezményes, Nyugdíjas', 1),
(64, 'Milyen állatok a csótányok?', 'Kétéltűek,Rovarok,Halak,Madarak', 1),
(65, 'Melyik zenekar volt az első, amelyik kétszer is megnyerte a magyar Rock-Maraton díjat?', 'Road,Omega,Napalm Death,Tankcsapda', 3),
(66, 'Melyik a legnépszerűbb szórakozási forma Magyarországon?', 'Könyvek olvasása,Mozizás,Kertészkedés,tévézés', 3),
(67, 'Milyen épületekben találhatóak az általában a mozik?', 'Könyvtárakban,Múzeumokban,Bevásárlólözpontokban,Iskolákban', 2);

CREATE TABLE `rooms` (
  `id` int(11) NOT NULL,
  `userIdOne` int(11) DEFAULT NULL,
  `userIdTwo` int(11) DEFAULT NULL,
  `gameState` int(11) DEFAULT NULL,
  `identifier` varchar(5) NOT NULL,
  `private` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `skinlist` (
  `id` int(11) NOT NULL,
  `skinSrc` varchar(126) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


ALTER TABLE `profiles`
  ADD PRIMARY KEY (`id`,`name`);

ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `skinlist`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `profiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

ALTER TABLE `rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `skinlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
