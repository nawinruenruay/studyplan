-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 22, 2024 at 11:04 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `studyplan_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_course`
--

CREATE TABLE `tbl_course` (
  `course_id` char(8) NOT NULL,
  `course_name` varchar(100) NOT NULL,
  `unit` varchar(10) NOT NULL,
  `group_id` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_course`
--

INSERT INTO `tbl_course` (`course_id`, `course_name`, `unit`, `group_id`) VALUES
('1001003W', 'พฤติกรรมมนุษย์กับการพัฒนาตน\r\n', '3(3-0-6)', '01'),
('1001004W', 'พฤติกรรมมนุษย์กับการพัฒนาตน\r\n', '3(3-0-6)', '01'),
('1001005W', 'ทักษะการคิดและการตัดสินใจ\r\n', '3(3-0-6)', '02'),
('1161001W', 'กีฬาและนันทนาการเพื่อคุณภาพชีวิต\r\n', '3(2-2-5)', '03'),
('1161002W', 'การออกกำลังกายเพื่อสุขภาพ\r\n', '3(2-2-5)', '04'),
('1551001W', 'ภาษาอังกฤษพื้นฐาน', '3(3-0-6)', '05'),
('1551002W', 'ภาษาอังกฤษเพื่อการสื่อสาร \r\n', '3(3-0-6)', '06'),
('2501001W', 'ประวัติศาสตร์สังคมและวัฒนธรรมไทย\r\n', '3(3-0-6)', '07'),
('2501003W', 'จิตสาธารณะและพันธะทางสังคมของพลเมือง 1\r\n', '3(3-0-6)', '08'),
('2501004W', 'จิตสาธารณะและพันธะทางสังคมของพลเมือง 2\r\n', '3(3-0-6)', '09');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_group_course`
--

CREATE TABLE `tbl_group_course` (
  `group_id` varchar(2) NOT NULL,
  `group_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_group_course`
--

INSERT INTO `tbl_group_course` (`group_id`, `group_name`) VALUES
('01', 'A ภาษา'),
('02', 'B มนุษย์'),
('03', 'C สังคม'),
('04', 'D วิทย์-คณิต'),
('05', 'E เอกบังคับ'),
('06', 'F เอกเลือก'),
('07', 'H แกน/ครู บังคับ'),
('08', 'I แกน/ครู เลือก'),
('09', 'J ปฏิบัติ'),
('10', 'Z วิชาเสริม');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_plan`
--

CREATE TABLE `tbl_plan` (
  `id` int(11) NOT NULL,
  `year` varchar(20) NOT NULL,
  `group_id` varchar(2) NOT NULL,
  `course_id` char(8) NOT NULL,
  `course_name` varchar(100) NOT NULL,
  `unit` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_plan`
--

INSERT INTO `tbl_plan` (`id`, `year`, `group_id`, `course_id`, `course_name`, `unit`) VALUES
(1, '1/2567', '06', '1551002W', 'ภาษาอังกฤษเพื่อการสื่อสาร \r\n', '3(3-0-6)');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

CREATE TABLE `tbl_users` (
  `id` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`id`, `username`, `password`) VALUES
(1, 'admin', '$2a$10$HwXblY0XNF59Ke.WBhFt6OW2QLuPA.W2P/p4tE6JALJaoqapHJCou');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_course`
--
ALTER TABLE `tbl_course`
  ADD PRIMARY KEY (`course_id`);

--
-- Indexes for table `tbl_group_course`
--
ALTER TABLE `tbl_group_course`
  ADD PRIMARY KEY (`group_id`);

--
-- Indexes for table `tbl_plan`
--
ALTER TABLE `tbl_plan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
