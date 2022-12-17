SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


CREATE DATABASE IF NOT EXISTS `project-neutron` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `project-neutron`;

CREATE TABLE `profiles` (
  `id` int(11) NOT NULL,
  `name` varchar(64) NOT NULL,
  `email` varchar(256) NOT NULL,
  `pwhash` varchar(512) NOT NULL,
  `wins` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `question` varchar(256) NOT NULL,
  `answers` varchar(5000) NOT NULL,
  `correct` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `questions` (`id`, `question`, `answers`, `correct`) VALUES
(1, 'Melyik irodalmi mű a következő: A három testőr?', 'Alexandre Dumas,Charles Dickens,Jules Verne,William Shakespeare', 0),
(2, 'Melyik következő kifejezés nem egy adatbázis-kezelő rendszer neve?', 'MySQL,Excel,Oracle,Microsoft Access', 1),
(3, 'Melyik következő operációs rendszer nem számítógépeken fut?', 'Windows,iOS,Android,Linux', 2),
(4, 'Melyik következő kifejezés nem egy programozási nyelv neve?', 'Java,C++,Python,Word', 3),
(5, 'Melyik következő eszköz nem egy adatbeviteli eszköz?', 'Billentyűzet,Egér,Mikrofon,Scanner', 2),
(6, 'Melyik következő kifejezés nem egy számítógépes hálózat típusa?', 'LAN,WAN,VPN,TV', 3),
(7, 'Melyik következő elem a legnehezebb?', 'a tungsten,az osmium,a platinium,az irídium', 1),
(8, 'Melyik következő állítás nem igaz a molekulákra?', 'A molekulák két vagy több atommal állnak össze.,A molekulák képesek reakcióba lépni egymással.,A molekulák összetételétől függően különböző fizikai és kémiai tulajdonságokkal rendelkeznek.,A molekulák legtöbbje állatokból és növényekből származik.', 3),
(9, 'Melyik következő állítás nem igaz a kémiai reakciókról?', 'A kémiai reakciók során új anyagok keletkeznek.,A kémiai reakciók során a reakciós anyagok összetétele megváltozik.,A kémiai reakciók során a reakciós anyagok mennyisége megváltozik.,A kémiai reakciók során a reakciós anyagok formája megváltozik.', 3),
(10, 'Melyik következő elem nem része a hidrogén-oxigén összetételű víznek (H2O)?', 'Oxigén,Szén,Hidrogén,Nitrogén', 1),
(11, 'Melyik következő állítás nem igaz az elektrolízisről?', 'Az elektrolízis során a vezető anyagot áram által szétválasztják.,Az elektrolízis során a vezető anyagot kémiai reakció által szétválasztják.,Az elektrolízis során a vezető anyagot hőmérséklet-változás által szétválasztják.', 1),
(12, 'Melyik következő csillagjegy a legérzékenyebb?', 'Bika,Skorpió,Nyilas,Halak', 3),
(13, 'Melyik következő állítás nem igaz az asztrológiáról?', 'Az asztrológia egy ősi tudomány, mely az égitestek állásának, mozgásának és hatásainak elemzésével foglalkozik.,Az asztrológia az emberek személyiségének és jövőjének megismerésére használja az égitestek állását és mozgását.,Az asztrológia az égitestek állását és mozgását használja a védekezésre és a gyógyításra.,Az asztrológia a modern tudományok által elismert tudományág.', 3),
(14, 'Melyik következő állítás nem igaz a táplálkozásról?', 'A táplálkozás során a szervezetünk számára szükséges tápanyagokat és energiát vesszük magunkhoz.,A táplálkozás során fontos, hogy megfelelő mennyiségű fehérjét, szénhidrátot, zsírt és vitaminokat fogyasszunk.,A táplálkozás során a megfelelő folyadékbevitel is fontos, hogy szervezetünk megfelelően működjön.,A táplálkozás során elég ha csak a kedvenc ételeinket fogyasztjuk, más tápanyagokat nem szükséges bevinni.', 3),
(15, 'Melyik következő állítás nem igaz a környezetvédelemről?', 'A környezetvédelem az emberi tevékenységek által okozott környezeti problémák megelőzésére és kezelésére irányuló tevékenységek összessége.,A környezetvédelem célja a természeti erőforrások kihasználásának minimalizálása és az élővilág védelme.,A környezetvédelem nemcsak a természeti környezet, hanem az emberi környezet védelmét is célul tűzi ki.,A környezetvédelem nem fontos, mert az emberi tevékenységek nem okoznak környezeti problémákat.', 3),
(16, 'Melyik következő állítás nem igaz az állatokról?', 'Az állatok lehetnek húsevők, növényevők vagy általános élelmezésűek.,Az állatok lehetnek különféle méretűek, formájúak és színűek.,Az állatok lehetnek szabadon élők vagy tartottak.,Az állatok nem képesek mozogni.', 3),
(17, 'Melyik következő állítás nem igaz a növényekről?', 'A növények fotoszintézissel állítják elő saját táplálékukat.,A növények képesek mozogni.,A növények többféle módon szaporodnak, például magról, rügyből, gyökérsarjból és hajtásokból.,A növényeknek szükségük van tápanyagokra, vízre és oxigénre a növekedéshez és fejlődéshez.', 1),
(18, 'Melyik következő állítás nem igaz a közlekedésről?', 'A közlekedés az emberek és áruk szállítását szolgáló eszközök összessége.,A közlekedés lehet tömegközlekedés, közúti közlekedés, vízi közlekedés, vasúti közlekedés és légi közlekedés.,A közlekedés fontos szerepet játszik az emberek mindennapi életében, mert lehetővé teszi, hogy eljussunk a munkahelyünkre, iskolába, boltba stb.,A közlekedés nem okoz károsanyag-kibocsátást és nem terheli a környezetet.', 3),
(19, 'Melyik következő állítás nem igaz a vírusokról?', 'A vírusok kórokozók, melyek képesek betegségeket okozni az élő szervezetekben.,A vírusok önálló életformák, melyek képesek szaporodni, de csak sejtekben tudnak élni.,A vírusokat csak a sejtmembrán át tudják behatolni a sejtekbe, ahol a sejtek saját anyagcseréjét használják fel a szaporodáshoz.,A vírusok nem okozhatnak betegségeket, mert nem rendelkeznek saját anyagcserével.', 3),
(20, 'Melyik következő állítás nem igaz a természeti katasztrófákról?', 'A természeti katasztrófák olyan események, melyeket a természet okoz, és amelyek komoly károkat okoznak az emberekben, az állatokban és a természetben.,A természeti katasztrófák lehetnek természeti csapások, mint például a hurrikánok, az árvizek, a földrengések, a vulkánkitörések és a szökőárak.,A természeti katasztrófák előrejelzése és megelőzése lehetővé teszi, hogy az emberek időben menekülhessenek és védekezhessenek a katasztrófa előtt.,A természeti katasztrófák nem okoznak károkat az emberekben, az állatokban és a természetben.', 3),
(21, 'Melyik következő állítás nem igaz a naprendszerről?', 'A Naprendszer a Nap körüli bolygórendszere, melyben a Nap és a Nap körüli bolygók keringenek.,A Naprendszerben több mint 200 bolygó található, köztük a Föld is.,A Naprendszer a Nap körül keringő bolygók, holdak, üstökösök és kisebb objektumok összessége.,A Naprendszerben a Nap és a bolygók között gravitációs kölcsönhatások működnek, melyeknek köszönhetően a bolygók keringenek a Napon.', 1),
(22, 'Melyik következő állítás nem igaz a Földről?', 'A Föld a Naprendszer második legkisebb bolygója, amely a Nap körül kering.,A Föld külső rétege, a kőzetekből álló litoszféra légkörünk alatt található.,A Föld átlagos távolsága a Naptól 149,6 millió kilométer, és körülbelül 365,25 nap alatt teszi meg a keringési útját.,A Földön többféle éghajlat található, amelyeket a Föld eltérő távolsága a Naptól, a Föld forgása és a Föld dőlésszöge határoz meg.', 0),
(23, 'Melyik következő állítás nem igaz a Földről?', 'A Föld a Naprendszer második legkisebb bolygója, amely a Nap körül kering.,A Föld külső rétege, a kőzetekből álló litoszféra légkörünk alatt található.,A Föld átlagos távolsága a Naptól 149,6 millió kilométer, és körülbelül 365,25 nap alatt teszi meg a keringési útját.,A Földön többféle éghajlat található, amelyeket a Föld eltérő távolsága a Naptól, a Föld forgása és a Föld dőlésszöge határoz meg.', 0),
(24, 'Melyik következő állítás nem igaz a Föld légköréről?', 'A Föld légköre a Föld felszínétől kezdődően a Földön található levegő összessége.,A Föld légköre a Föld felszínétől kezdődően a Földön található víz összessége.,A Föld légköre a Föld felszínétől kezdődően a Földön található élőlények összessége.,A Föld légköre a Föld felszínétől kezdődően a Földön található összes anyag összessége.', 3),
(25, 'Melyik következő állítás nem igaz a kémiai reakciókról?', 'A kémiai reakciók során új anyagok keletkeznek.,A kémiai reakciók során a reakciós anyagok összetétele megváltozik.,A kémiai reakciók során a reakciós anyagok mennyisége megváltozik.,A kémiai reakciók során a reakciós anyagok formája megváltozik.', 3),
(26, 'Melyik következő elem nem része a hidrogén-oxigén összetételű víznek (H2O)?', 'Oxigén,Szén,Hidrogén,Nitrogén', 1),
(27, 'Melyik következő csillagjegy a legérzékenyebb?', 'Bika,Skorpió,Nyilas,Halak', 3),
(28, 'Melyik következő állítás nem igaz az asztrológiáról?', 'Az asztrológia a csillagok és a bolygók állásának és mozgásának tanulmányozásával foglalkozik.,Az asztrológia az emberi sorsot és jövőbeli eseményeket jósoló tudomány.,Az asztrológia segítségével megállapítható, hogy az egyes csillagjegyekhez tartozó személyek milyen tulajdonságokkal rendelkeznek.,Az asztrológia az astrofizikával rokon tudomány, de nem tekinthető az astrofizika részét.', 1),
(29, 'Melyik következő állítás nem igaz az atommagról?', 'Az atommag a legkisebb része az állandó atomoknak.,Az atommagot általában protonok és neutronok összessége alkotja.,Az atommagot körülvevő elektronok száma meghaladhatja az atommag protonjainak számát.', 2),
(30, 'Melyik következő állítás nem igaz az elemekről?', 'Az elemek a természetben előforduló összes anyag alapvető összetevői.,Az elemeket a protonszámuk alapján osztályozzák.,Az elemek általában azonos tulajdonságokkal rendelkeznek.', 2),
(31, 'Melyik következő állítás nem igaz a periódusos rendszerről?', 'A periódusos rendszer az elemek rendszerezésére szolgáló táblázat.,A periódusos rendszer az elemeket a protonszámuk alapján sorrendbe rendezi.,A periódusos rendszerben az elemek azonos tulajdonságokkal rendelkeznek az adott oszlopban.,A periódusos rendszer az elemeket a fizikai és kémiai tulajdonságaik alapján rendezi.', 3),
(32, 'Melyik a Magyarország legmagasabb hegye?', 'Kékes,Mátrabérc,Nagy-Somos-kő,Csóványos', 0);


ALTER TABLE `profiles`
  ADD PRIMARY KEY (`id`,`name`);

ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `profiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
