--
-- Base de datos: `mi-presupuesto`
--

CREATE DATABASE IF NOT EXISTS `mi-presupuesto2`;
USE `mi-presupuesto2`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `accounts`
--

CREATE TABLE `accounts` (
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `balance` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `accounts`
--

INSERT INTO `accounts` (`email`, `password`, `name`, `balance`) VALUES
('celeste@email.com', '111', 'Celeste Wright', 39300),
('madeline@email.com', '123', 'Madeline Martha Mackenzie', 110210);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movements`
--

CREATE TABLE `movements` (
  `id` varchar(100) NOT NULL,
  `mount` int(11) NOT NULL,
  `type` varchar(10) NOT NULL,
  `category` int(100) NOT NULL,
  `concept` varchar(50) NOT NULL,
  `date` date NOT NULL,
  `user_email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `movements`
--

INSERT INTO `movements` (`id`, `mount`, `type`, `category`, `concept`, `date`, `user_email`) VALUES
('0049531d-b334-496f-ba98-4c4f8cc63a90', 4000, 'Egreso', 7, 'Computadora', '2021-04-21', 'madeline@email.com'),
('0b98b95e-fc9e-4ee4-ad0f-23744945f0d4', 400, 'Egreso', 5, 'Disney+', '2021-04-21', 'celeste@email.com'),
('1', 40000, 'Ingreso', 1, 'Sueldo Enero', '2021-01-10', 'madeline@email.com'),
('124e318a-bb7b-4e17-863e-bcf98a9eb063', 10000, 'Egreso', 6, 'Ropa y zapatos', '2021-04-21', 'celeste@email.com'),
('17940973-5d8e-4008-a004-563bcfbd5458', 3000, 'Egreso', 4, 'Cena familiar', '2021-04-21', 'celeste@email.com'),
('2', 800, 'Egreso', 5, 'Cine', '2021-01-15', 'madeline@email.com'),
('26a38a21-aee8-4330-9b35-8018675eefff', 25000, 'Egreso', 5, '5 Album BTS', '2021-04-21', 'celeste@email.com'),
('3', 800, 'Egreso', 8, 'Gastos teléfono', '2021-01-20', 'madeline@email.com'),
('4', 20000, 'Ingreso', 2, 'Aguinaldo', '2021-01-28', 'madeline@email.com'),
('5a14b1e5-b69a-45be-94a1-0d5833755251', 4500, 'Egreso', 5, 'Entradas Opera', '2021-04-21', 'celeste@email.com'),
('79ce9989-56e8-4618-8201-773187efb079', 2400, 'Egreso', 7, 'Regalos de cumpleaños', '2021-04-21', 'celeste@email.com'),
('8bddf5c7-d02e-4403-866d-a6dcbcad1760', 100000, 'Ingreso', 1, 'Sueldo Marzo', '2021-04-20', 'celeste@email.com'),
('92e45bc4-7381-41cc-bad7-0f837cc8340e', 12000, 'Egreso', 10, 'Marzo', '2021-04-01', 'madeline@email.com'),
('93643a76-b36d-47e1-ba7e-8eafee1fec15', 6000, 'Egreso', 4, 'Gasto mensual Café', '2021-04-21', 'celeste@email.com'),
('9d147352-93ba-4dab-8c1a-116ab9536b7a', 1400, 'Egreso', 5, 'Cine', '2021-04-21', 'celeste@email.com'),
('a16abfab-b8a9-4780-b5f1-b3263b45f943', 3500, 'Egreso', 6, 'Vestido de Coctel', '2021-04-21', 'celeste@email.com'),
('da9c570a-a928-4dba-b687-2434092d2e48', 1200, 'Egreso', 7, 'Libros escolares', '2021-04-21', 'madeline@email.com'),
('df786c5c-e2d9-4a3d-8fcf-3c5645f11f36', 70000, 'Ingreso', 1, 'Sueldo Abril', '2021-04-21', 'madeline@email.com'),
('e6d772e9-7ffa-46b8-9d6c-523112926cb8', 3000, 'Egreso', 8, 'Terapeuta', '2021-04-21', 'celeste@email.com'),
('fe96de3e-02eb-43a6-a7b3-6ceea0935544', 990, 'Egreso', 7, 'redondeador de esquinas', '2021-04-01', 'madeline@email.com'),
('ff14a00b-fec3-4c42-9006-77d9014ffe7f', 1500, 'Egreso', 7, 'Útiles escolares', '2021-04-21', 'celeste@email.com');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`email`);

--
-- Indices de la tabla `movements`
--
ALTER TABLE `movements`
  ADD PRIMARY KEY (`id`);
COMMIT;
