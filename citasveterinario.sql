-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 11-07-2022 a las 21:55:31
-- Versión del servidor: 8.0.27
-- Versión de PHP: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `citasveterinario`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `citas`
--

DROP TABLE IF EXISTS `citas`;
CREATE TABLE IF NOT EXISTS `citas` (
  `id_cita` int NOT NULL AUTO_INCREMENT,
  `Nombre_Mascota` varchar(150) NOT NULL,
  `Propietario` varchar(150) NOT NULL,
  `Telefono` varchar(10) NOT NULL,
  `FechaCita` date NOT NULL,
  `HoraCita` time NOT NULL,
  `Sintomas` varchar(900) NOT NULL,
  PRIMARY KEY (`id_cita`)
) ENGINE=MyISAM AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `citas`
--

INSERT INTO `citas` (`id_cita`, `Nombre_Mascota`, `Propietario`, `Telefono`, `FechaCita`, `HoraCita`, `Sintomas`) VALUES
(16, 'Luz', 'Melany', '2461873927', '2022-12-31', '12:59:00', 'slñjkdf'),
(20, 'Ximena', 'kjladjsf', '65432545', '2023-08-07', '03:03:00', 'lkjñasdf'),
(21, 'Hola ', 'jñalf', '1452112554', '2023-08-07', '03:05:00', 'alkjfasdf'),
(22, 'asdfas', 'asdf', '1452112554', '2023-08-07', '03:06:00', 'safñkjslf'),
(23, 'adf', 'adf', '1452112554', '2022-08-07', '03:09:00', 'fsdf'),
(24, 'afd', 'asdf', '1452112554', '2024-09-08', '03:12:00', 'afsfsad'),
(25, 'afaf', 'asdfasfd', '1452112554', '2023-08-07', '03:13:00', 'asdfadsf'),
(26, 'fsdf', 'asdfasdf', '1452112554', '2023-08-07', '03:15:00', 'afdas'),
(27, 'asdf', 'asdfas', '1452112554', '2023-08-07', '04:16:00', 'fadfasfd'),
(28, 'adsfaf', 'asdfaf', '1452112554', '2023-08-07', '03:19:00', 'asdf'),
(29, 'asdfa', 'asdfasf', 'asdfasdf', '2022-08-07', '03:20:00', 'asdfasdf'),
(30, 'asdfadsf', 'asdfadsf', '1452112554', '2023-08-07', '03:21:00', 'adffd'),
(31, 'asdfafs', 'asdfasdf', '1452112554', '2023-08-07', '03:23:00', 'asfdasf'),
(32, 'hola', 'que tal', '1452112554', '2023-08-07', '03:27:00', 'sdfasf'),
(33, 'Canelita', 'Ximena', '1452112554', '2023-08-07', '03:28:00', 'SAFASDFA'),
(34, 'adf', 'que tal', '2461878084', '2023-08-07', '03:29:00', 'vczxv'),
(35, 'Kiara', 'kjladjsf', '2461878084', '2023-08-08', '03:31:00', 'dfafds'),
(36, 'Canelita', 'asdfasfd', '2461878084', '2023-08-07', '15:36:00', 'asfsaf'),
(38, 'Luz', 'Malany', '2461878084', '2023-08-07', '16:25:00', 'safsdf'),
(39, 'Luz', 'adf', '2461878084', '2024-08-07', '16:26:00', 'asdfasdf');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(125) NOT NULL,
  `APP` varchar(125) NOT NULL,
  `APM` varchar(125) NOT NULL,
  `Email` varchar(200) NOT NULL,
  `Pass` varchar(1250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `username` varchar(125) NOT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `Name`, `APP`, `APM`, `Email`, `Pass`, `username`) VALUES
(12, 'Alberto', 'Gutierrez', 'Oropeza', 'bet68guti@gmail.com', '$2a$08$Wc0lX3aWaS/3eqQ9uthUWuD0FwV5SV0BSHzGqbkNf/mxdLHHnM.pO', 'AlbertoGuti'),
(13, 'Alberto', 'Gutierrez', 'Oropeza', 'oropezabeto68@gmail.com', '$2a$08$r1/9Mq8RtN4eaiewbXtPReZp3Ba.GvZkn4tz9aGo1ikXiE5/lx8UO', 'betho'),
(14, 'Alberto', 'Gutierrez', 'Oropeza', 'beto1082474@hotmail.com', '$2a$08$kfttK05BJS6n3bbMtR5qN.KGrldwwX0qN7QKwchyZJsBQcBLWUx1O', 'roberto');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
