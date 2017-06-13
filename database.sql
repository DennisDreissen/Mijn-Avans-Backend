/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP TABLE IF EXISTS `article`;

CREATE TABLE `article` (
  `id` varchar(255) NOT NULL DEFAULT '',
  `title` varchar(255) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `date` varchar(255) DEFAULT NULL,
  `message` blob,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `article_category`;

CREATE TABLE `article_category` (
  `id` varchar(255) NOT NULL DEFAULT '',
  `category` varchar(255) NOT NULL,
  PRIMARY KEY (`id`,`category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `message`;

CREATE TABLE `message` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `language` varchar(255) DEFAULT NULL,
  `platform` varchar(255) DEFAULT NULL,
  `version` varchar(255) DEFAULT NULL,
  `build` varchar(255) DEFAULT NULL,
  `message` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `version`;

CREATE TABLE `version` (
  `latestReleaseVersion` varchar(255) NOT NULL DEFAULT '',
  `latestReleaseBuild` int(11) DEFAULT NULL,
  `minimumReleaseVersion` varchar(255) DEFAULT NULL,
  `minimumReleaseBuild` int(11) DEFAULT NULL,
  `recommendedReleaseVersion` varchar(255) DEFAULT NULL,
  `recommendedReleaseBuild` int(11) DEFAULT NULL,
  `latestDevelopmentVersion` varchar(255) DEFAULT NULL,
  `latestDevelopmentBuild` int(11) DEFAULT NULL,
  `minimumDevelopmentVersion` varchar(255) DEFAULT NULL,
  `minimumDevelopmentBuild` int(11) DEFAULT NULL,
  `recommendedDevelopmentVersion` varchar(255) DEFAULT NULL,
  `recommendedDevelopmentBuild` int(11) DEFAULT NULL,
  PRIMARY KEY (`latestReleaseVersion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `log`;

CREATE TABLE `log` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `class` varchar(255) DEFAULT NULL,
  `comment` varchar(255) DEFAULT '',
  `details` text,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `ads_user`;

CREATE TABLE `ads_user` (
  `id` varchar(255) NOT NULL,
  `note` varchar(255) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
