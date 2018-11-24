-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2018. Nov 24. 20:11
-- Kiszolgáló verziója: 10.1.34-MariaDB
-- PHP verzió: 7.2.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `szemelygepjarmuportal`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cars`
--

CREATE TABLE `cars` (
  `id` varchar(20) COLLATE utf8mb4_bin NOT NULL,
  `preview_url` varchar(100) COLLATE utf8mb4_bin NOT NULL,
  `marka` varchar(15) COLLATE utf8mb4_bin DEFAULT NULL,
  `modell` varchar(30) COLLATE utf8mb4_bin DEFAULT NULL,
  `ar` int(10) DEFAULT NULL,
  `ev` year(4) DEFAULT NULL,
  `kivitel` varchar(10) COLLATE utf8mb4_bin DEFAULT NULL,
  `km` mediumint(6) DEFAULT NULL,
  `szin` varchar(10) COLLATE utf8mb4_bin DEFAULT NULL,
  `tomeg` smallint(4) DEFAULT NULL,
  `uzemanyag` varchar(8) COLLATE utf8mb4_bin DEFAULT NULL,
  `hengerUrtartalom` smallint(4) DEFAULT NULL,
  `teljesitmeny` smallint(3) DEFAULT NULL,
  `hajtas` varchar(20) COLLATE utf8mb4_bin DEFAULT NULL,
  `valto` varchar(10) COLLATE utf8mb4_bin DEFAULT NULL,
  `leiras` varchar(400) COLLATE utf8mb4_bin NOT NULL,
  `feltoltve` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `userId` varchar(24) COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- A tábla adatainak kiíratása `cars`
--

INSERT INTO `cars` (`id`, `preview_url`, `marka`, `modell`, `ar`, `ev`, `kivitel`, `km`, `szin`, `tomeg`, `uzemanyag`, `hengerUrtartalom`, `teljesitmeny`, `hajtas`, `valto`, `leiras`, `feltoltve`, `userId`) VALUES
('jl9vk77h', 'https://res.cloudinary.com/dcjedk0md/image/upload/v1535228752/onz151tyn2hfiiwpbf95.jpg', 'Ferrari', '458 Convertible', 46990000, 2018, 'Cabrio', 21000, 'Piros', 1890, 'Benzin', 5200, 560, 'Összkerék hajtás', 'Manuális', 'The International Geneva Motor Show is an annual auto show held in March in the Swiss city of Geneva. The show is hosted at the Palexpo, a convention centre located next to the Geneva Cointrin International Airport. ', '2018-08-25 20:25:54', '103567163284662476880'),
('jmd8yhd8', 'https://res.cloudinary.com/dcjedk0md/image/upload/v1537609436/uyefgdxutcv003ishaxp.jpg', 'BMW', 'M5', 21503100, 2018, 'Sedan', 2100, 'Kék', 2140, 'Benzin', 4500, 610, 'Összkerék hajtás', 'Automata', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 150', '2018-09-22 09:43:57', '103567163284662476880'),
('jmdcazxd', 'https://res.cloudinary.com/dcjedk0md/image/upload/v1537615059/bpni2gow0tczj90qtgvd.jpg', 'BMW', 'M5', 25474836, 2018, 'Sedan', 52141, 'Piros', 2100, 'Benzin', 2152, 500, 'Összkerék hajtás', 'Automata', 'The BMW M5 is a high performance variant of the 5 Series executive car built by the Motorsport division of BMW. The first incarnation of the M5 was hand-built in 1986 on the 535i chassis with a modified engine from the M1 that made it the fastest production sedan at the time.[1] Versions of the M5 have been built from subsequent generations of the 5 Series platform.', '2018-09-22 11:17:39', '103567163284662476880'),
('jmi2tx9x', 'https://res.cloudinary.com/dcjedk0md/image/upload/v1537901477/qcbd0hwtexpgbyh5cehg.jpg', 'Porsche', '911', 30000000, 2018, 'Cabrio', 5420, 'Fehér', 1780, 'Benzin', 3400, 460, 'Hátsó kerék', 'Automata', 'The Porsche 911 (pronounced Nine Eleven or in German: Neunelfer) is a two-door, 2+2 high performance rear-engined classic German sports car made since 1963 by Porsche AG of Stuttgart, Germany. It has a rear-mounted six cylinder boxer engine and all round independent suspension. It has undergone continuous development, though the basic concept has remained unchanged. The engines were air-cooled unt', '2018-09-25 18:51:18', '103567163284662476880'),
('jmyts6wp', 'https://res.cloudinary.com/dcjedk0md/image/upload/v1538914205/vc49y00yvadysnxysexb.jpg', 'Bentley', 'Continental GT', 32132131, 2017, 'Sedan', 54000, 'Fehér', 2300, 'Benzin', 5000, 450, 'Hátsó kerék', 'Automata', 'A könnyedebb forma persze viszonylagos: a külseje alapján az előző Continental GT-ről nem volt nehéz elképzelni, hogy ólomból öntötték. Az alapforma itt is hasonló, de az autó oldalán a konkáv élek határozottan karcsúbbá teszik, ahogy a szélesebb és alacsonyabbra helyezett hűtőrács és a kisebb külső fényszóró is segít filigránabbnak mutatni a kétajtóst. A formaterv nem csak könnyedebb, de részlete', '2018-10-07 12:10:04', '103803547015263117373'),
('jovp2glj', 'https://res.cloudinary.com/dcjedk0md/image/upload/v1543078450/lwk9s911whah5q68i7yh.jpg', 'Audi', 'A6', 19990000, 2017, 'Sedan', 16750, 'Fehér', 2320, 'Benzin', 3000, 350, 'Összkerék hajtás', 'Automata', 'Kiemelkedő térkínálat és jövőbe mutató digitális technikák egy vérbeli atléta megjelenésével - az új Audi A6 Avant az élet minden területén igazi győztes típus. Kívül sportos és elegáns, belül kulturált és tágas, az A6 széleskörű hálózati kapcsolatban korunk digitális vívmányaival és innovatív vezetői segédrendszereivel még magasabbra emeli a mércét a business-kategóriában - ismét.', '2018-11-24 16:54:12', '103567163284662476880');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `comments`
--

CREATE TABLE `comments` (
  `id` mediumint(6) NOT NULL,
  `userId` varchar(21) COLLATE utf8mb4_bin NOT NULL,
  `carId` varchar(20) COLLATE utf8mb4_bin NOT NULL,
  `text` text COLLATE utf8mb4_bin NOT NULL,
  `feltoltve` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- A tábla adatainak kiíratása `comments`
--

INSERT INTO `comments` (`id`, `userId`, `carId`, `text`, `feltoltve`) VALUES
(19, '103567163284662476880', 'jl9vk77h', 'asd', '2018-09-11 20:15:53'),
(20, '103567163284662476880', 'jl9vk77h', 'ewqewqewq\n', '2018-09-15 14:35:17'),
(21, '103567163284662476880', 'jmjiy1tw', 'assssssssssd', '2018-10-07 10:01:15'),
(22, '103567163284662476880', 'jovp2glj', 'Kedvenc autóm!', '2018-11-24 18:20:35');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `images`
--

CREATE TABLE `images` (
  `id` mediumint(15) NOT NULL,
  `secure_url` varchar(100) COLLATE utf8mb4_bin NOT NULL,
  `carId` varchar(20) COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- A tábla adatainak kiíratása `images`
--

INSERT INTO `images` (`id`, `secure_url`, `carId`) VALUES
(1, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1534266125/zgvnlqwcmcpluxibgnfd.jpg', 'fe16hp7icjkz6l7k5'),
(2, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1534270412/ufmd4knrp3ebqlf4jcno.jpg', 'fe16hp7icjkz6l7k5'),
(3, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1534753464/hx3rz1qfhtyt0nrwuqqc.jpg', 'jl20l33x'),
(4, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1534753464/uzvuekytjuh7jugqmgjf.jpg', 'jl20l33x'),
(5, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1534766246/t9ypejokybt76cw1ni74.jpg', 'jl287222'),
(6, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1534766739/lkcc8oeqksofa3abiw9w.png', 'jl28hlw6'),
(7, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1534766739/wt3ve14rdpmcijk0nuxl.png', 'jl28hlw6'),
(8, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1534917544/bfevctxfafsjpfz1mefi.jpg', 'jl4q9wbz'),
(9, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1534917759/nb1vftiinkg7kl7ggpam.jpg', 'jl4qeium'),
(10, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1534917992/keihykoikoza8esn2cnj.jpg', 'jl4qjij3'),
(11, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1534918124/qkjlb1qgrb9ysvhipvhz.jpg', 'jl4qmcq6'),
(12, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1534918508/idybds3jfzkadmy6scei.jpg', 'jl4qukas'),
(13, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1534959006/y1yffhz1oxfyy015b8ji.jpg', 'jl5eyks4'),
(14, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1534959689/ju9gtmndwkezob4bzpbe.jpg', 'jl5fd7y1'),
(15, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1534959867/qebkea3daoctamxkyaao.jpg', 'jl5fh1w9'),
(16, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1534960173/bvww9aaob3po2jyuofjk.jpg', 'jl5fnm0l'),
(17, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1534960173/trdnsivxtiw5y6qkrzyj.jpg', 'jl5fnm0l'),
(18, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1534960174/utpul9ujuv5hjdjh8xvi.jpg', 'jl5fnm0l'),
(19, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1534960379/lwjn2q9ysq20xhnmp3z8.jpg', 'jl5fs0ob'),
(20, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1534960379/whskgwtail6thr4sw0py.jpg', 'jl5fs0ob'),
(21, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1534960379/zkfebijzq6jedmnjl3c3.jpg', 'jl5fs0ob'),
(22, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1534960486/wagfu6gagceq4p5br5g1.jpg', 'jl5fubod'),
(23, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1534960487/zccfev7aa0wccedw4err.jpg', 'jl5fubod'),
(24, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1534960863/q22ajse7axcqoos4makt.jpg', 'jl5g2dp9'),
(25, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1534960863/swjzauzplp0njqkqyn5r.jpg', 'jl5g2dp9'),
(26, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1534961022/i8dzhmh2ynb6ullumozh.jpg', 'jl5g5t88'),
(27, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1534961022/negfvlnkqjoxuaw1nrfg.jpg', 'jl5g5t88'),
(28, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1534961191/bc8z3shsilgno4xjpegy.jpg', 'jl5g9fit'),
(29, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1534961191/fvig0ppgngthwzsftk5e.jpg', 'jl5g9fit'),
(30, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1534961191/h4khy3wdsqoyak0hvu30.jpg', 'jl5g9fit'),
(31, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1534961191/oewe3dhvifvjn3lxxj9a.jpg', 'jl5g9fit'),
(32, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1534961191/yxx3io9twu6x7gpoxvjn.jpg', 'jl5g9fit'),
(33, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1535228752/byxzbk9tzjxp3ojfcajk.jpg', 'jl9vk77h'),
(34, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1535228752/jvzvd5plfrdrxmjexvli.jpg', 'jl9vk77h'),
(35, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1535228752/lupjtzdjr9aen95wbb9w.jpg', 'jl9vk77h'),
(36, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1535228752/tgctrlxmtdse5vybsj7q.jpg', 'jl9vk77h'),
(37, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1535228752/xcscktcmwhzducmal0ws.jpg', 'jl9vk77h'),
(38, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1537609436/gmukkh6idhdgekgkbiio.jpg', 'jmd8yhd8'),
(39, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1537609436/hkm8br1o3iis2jol2pd2.jpg', 'jmd8yhd8'),
(40, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1537609436/qwqh6yvihzlrygqtqekz.jpg', 'jmd8yhd8'),
(41, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1537609436/sdcxn7pc4xi3knipzgln.jpg', 'jmd8yhd8'),
(42, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1537615059/jbnj6ewmx74p51tfob7c.jpg', 'jmdcazxd'),
(43, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1537615059/jtu29cku0oo4fc0tp3dm.jpg', 'jmdcazxd'),
(44, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1537615059/waorfmkz3d0flcqxxpqt.jpg', 'jmdcazxd'),
(45, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1537615059/xdhwzila5ssle0dc2ab3.jpg', 'jmdcazxd'),
(46, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1537901475/udv0hikdfyqoiobu0j37.jpg', 'jmi2tx9x'),
(47, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1537901475/vjksgudkna5dup3cd7sd.jpg', 'jmi2tx9x'),
(48, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1537901475/z22qwat3bqystex7enat.jpg', 'jmi2tx9x'),
(49, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1537901477/soe32x9gbvcelrg67jdg.jpg', 'jmi2tx9x'),
(50, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1537989009/l0km9gsrja2jvrkiughr.jpg', 'jmjiy1tw'),
(51, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1537989009/oidahrcaockeoenftr4h.jpg', 'jmjiy1tw'),
(52, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1537989009/sbzd0xjnabsqkj2tom4w.jpg', 'jmjiy1tw'),
(53, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1537989010/iz6mcgjmu7z5xwqrbfnd.jpg', 'jmjiy1tw'),
(54, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1537990869/dppjqe5rl13timz4ok22.jpg', 'jmjk1xcp'),
(55, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1537990869/nmmcqxb3cvaqfcs8nrsh.jpg', 'jmjk1xcp'),
(56, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1537990870/gbfxxbyj7amia97qkkns.jpg', 'jmjk1xcp'),
(57, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1537990870/hn7mqzkd4ip1fezgumxs.jpg', 'jmjk1xcp'),
(58, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1538914204/eclczhtcog9h7gllsela.jpg', 'jmyts6wp'),
(59, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1538914205/vh6cpk6ymnjlaxrppzot.jpg', 'jmyts6wp'),
(60, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1538914205/ykiatocacrxqlcxt11aw.jpg', 'jmyts6wp'),
(61, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1538914205/c83rgtzoiddiraqrtyzx.jpg', 'jmyts6wp'),
(62, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1538914205/o4xnzelv1u9z7bsytcmc.jpg', 'jmyts6wp'),
(63, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1543078450/pn2kn82zdpmef6h39m79.jpg', 'jovp2glj'),
(64, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1543078450/xcvkhgwmm2zzrqje9mcq.jpg', 'jovp2glj'),
(65, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1543078450/e7lwgzqwefwzjtfh2j7p.jpg', 'jovp2glj'),
(66, 'https://res.cloudinary.com/dcjedk0md/image/upload/v1543078450/qnhc1cgpsuxkeyg60pdc.jpg', 'jovp2glj');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `likes`
--

CREATE TABLE `likes` (
  `id` mediumint(8) NOT NULL,
  `carId` varchar(20) COLLATE utf8mb4_bin NOT NULL,
  `userId` varchar(21) COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- A tábla adatainak kiíratása `likes`
--

INSERT INTO `likes` (`id`, `carId`, `userId`) VALUES
(8, 'fe16hp7icjkz6l7k5', '103567163284662476880'),
(9, 'jl20l33x', '103567163284662476880'),
(10, 'jl9vk77h', '103567163284662476880'),
(11, 'jmdcazxd', '103567163284662476880');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `messages`
--

CREATE TABLE `messages` (
  `id` mediumint(10) NOT NULL,
  `email` varchar(30) COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(30) COLLATE utf8mb4_bin NOT NULL,
  `type` varchar(20) COLLATE utf8mb4_bin NOT NULL,
  `message` text COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- A tábla adatainak kiíratása `messages`
--

INSERT INTO `messages` (`id`, `email`, `name`, `type`, `message`) VALUES
(10, 'cseszko.arpad@gmail.com', 'dsadsads', '', 'fasgqwtw r rwqrqwr fsgs'),
(11, 'cseszko.arpad@gmail.com', 'dsadsads', '', 'fasgqwtw r rwqrqwr fsgs'),
(12, 'cseszko.arpad@gmail.com', 'Árpi', 'Auto erdeklodes', 'Érdekel az autó');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `newsletter`
--

CREATE TABLE `newsletter` (
  `id` mediumint(15) NOT NULL,
  `email` varchar(30) COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(20) COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- A tábla adatainak kiíratása `newsletter`
--

INSERT INTO `newsletter` (`id`, `email`, `name`) VALUES
(1, 'cseszko.arpad@gmail.com', 'Árpi');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `userId` varchar(21) COLLATE utf8mb4_bin NOT NULL,
  `email` varchar(30) COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_bin DEFAULT NULL,
  `profilePic` varchar(200) COLLATE utf8mb4_bin DEFAULT NULL,
  `location` varchar(20) COLLATE utf8mb4_bin NOT NULL,
  `phone` varchar(15) COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`userId`, `email`, `name`, `profilePic`, `location`, `phone`) VALUES
('103567163284662476880', '', 'Cseszkó Árpád', 'https://lh6.googleusercontent.com/-j9LsEhZ0lqA/AAAAAAAAAAI/AAAAAAAAAE0/t58XIQx_HKk/photo.jpg?sz=50', 'Szeged', '5125fsa'),
('103803547015263117373', 'cseszko.arpad@gmail.com', 'Árpád Cseszkó', 'https://lh6.googleusercontent.com/-yXYUT9JI_YA/AAAAAAAAAAI/AAAAAAAAAAA/AAN31DVE_hwqkdHBIhh4FGCTRHKhZDpZWA/mo/photo.jpg?sz=50', '', '');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_key` (`userId`);

--
-- A tábla indexei `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_key_comments` (`userId`);

--
-- A tábla indexei `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- A tábla indexei `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_key_like` (`userId`);

--
-- A tábla indexei `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `newsletter`
--
ALTER TABLE `newsletter`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `comments`
--
ALTER TABLE `comments`
  MODIFY `id` mediumint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT a táblához `images`
--
ALTER TABLE `images`
  MODIFY `id` mediumint(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT a táblához `likes`
--
ALTER TABLE `likes`
  MODIFY `id` mediumint(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT a táblához `messages`
--
ALTER TABLE `messages`
  MODIFY `id` mediumint(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT a táblához `newsletter`
--
ALTER TABLE `newsletter`
  MODIFY `id` mediumint(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `cars`
--
ALTER TABLE `cars`
  ADD CONSTRAINT `FK_key` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE;

--
-- Megkötések a táblához `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `FK_key_comments` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE;

--
-- Megkötések a táblához `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `FK_key_like` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
