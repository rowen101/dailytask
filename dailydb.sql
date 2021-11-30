-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 30, 2021 at 09:25 AM
-- Server version: 5.7.31
-- PHP Version: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dailydb`
--

-- --------------------------------------------------------

--
-- Table structure for table `core_app`
--

DROP TABLE IF EXISTS `core_app`;
CREATE TABLE IF NOT EXISTS `core_app` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `app_code` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `app_name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `app_icon` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status_message` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `core_app_uuid_index` (`uuid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `core_app`
--

INSERT INTO `core_app` (`id`, `uuid`, `app_code`, `app_name`, `description`, `app_icon`, `status`, `status_message`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, '598806f8-af8e-4ec9-bccc-b9d6531f6212', 'OUR', 'Omni Unified Resource Software', 'Managment portal for all applications', 'default', 'Active', 'Welcome', 1, NULL, '2021-11-12 20:13:55', '2021-11-12 20:13:55'),
(2, 'a261dfdf-f5f3-4f57-87ac-2751ebc8028e', 'WMS', 'Warehouse Management Solution', 'Warehouse Management', 'default', 'Active', 'Welcome', 1, NULL, '2021-11-12 20:13:55', '2021-11-12 20:13:55');

-- --------------------------------------------------------

--
-- Table structure for table `core_client`
--

DROP TABLE IF EXISTS `core_client`;
CREATE TABLE IF NOT EXISTS `core_client` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `client_code` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `client_name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `logo` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(4) NOT NULL DEFAULT '1',
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `core_client_uuid_index` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `core_dropdown`
--

DROP TABLE IF EXISTS `core_dropdown`;
CREATE TABLE IF NOT EXISTS `core_dropdown` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `table_key` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `column_key` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `identity_code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sort_order` int(11) NOT NULL DEFAULT '10',
  `trace_code` int(11) NOT NULL DEFAULT '50',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_table_column_code` (`table_key`,`column_key`,`identity_code`),
  KEY `wi_tbl_idx_table_column` (`table_key`,`column_key`),
  KEY `wi_tbl_idx_code_map` (`identity_code`,`trace_code`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `core_dropdown`
--

INSERT INTO `core_dropdown` (`id`, `table_key`, `column_key`, `identity_code`, `description`, `sort_order`, `trace_code`, `is_active`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'permission', 'permission', 'insert', 'Insert Record', 10, 50, 1, 1, NULL, '2021-11-12 20:13:55', '2021-11-12 20:13:55'),
(2, 'permission', 'permission', 'update', 'Update Record', 10, 50, 1, 1, NULL, '2021-11-12 20:13:55', '2021-11-12 20:13:55'),
(3, 'permission', 'permission', 'delete', 'Delete Record', 10, 50, 1, 1, NULL, '2021-11-12 20:13:55', '2021-11-12 20:13:55');

-- --------------------------------------------------------

--
-- Table structure for table `core_icon`
--

DROP TABLE IF EXISTS `core_icon`;
CREATE TABLE IF NOT EXISTS `core_icon` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `icon_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `core_menu`
--

DROP TABLE IF EXISTS `core_menu`;
CREATE TABLE IF NOT EXISTS `core_menu` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `app_id` int(10) UNSIGNED NOT NULL,
  `menu_code` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'NONE',
  `menu_title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `parent_id` int(11) NOT NULL DEFAULT '0',
  `menu_icon` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `menu_route` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sort_order` int(11) NOT NULL DEFAULT '100',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_by` int(11) NOT NULL DEFAULT '0',
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `core_menu_app_id_foreign` (`app_id`),
  KEY `core_menu_uuid_index` (`uuid`),
  KEY `core_menu_menu_code_index` (`menu_code`),
  KEY `core_menu_menu_title_index` (`menu_title`),
  KEY `core_menu_menu_route_index` (`menu_route`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `core_menu`
--

INSERT INTO `core_menu` (`id`, `uuid`, `app_id`, `menu_code`, `menu_title`, `description`, `parent_id`, `menu_icon`, `menu_route`, `sort_order`, `is_active`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'fab634b7-fd3b-4a21-a98a-2575d5e56ef8', 1, 'NONE', 'Administration', 'System Administration', 0, 'default', 'default', 100, 1, 1, NULL, '2021-11-12 20:13:55', '2021-11-12 20:13:55'),
(2, '2b86942b-382b-4d0f-bb5a-b5c7e7ff46ce', 1, 'NONE', 'Menu', 'Menu Management', 0, 'default', 'default', 100, 1, 1, NULL, '2021-11-12 20:13:55', '2021-11-12 20:13:55'),
(3, 'cb77ef92-09de-4f4c-9d3a-fc1fc33b2363', 1, 'NONE', 'User', 'User Management', 0, 'default', 'default', 100, 1, 1, NULL, '2021-11-12 20:13:55', '2021-11-12 20:13:55'),
(4, '23f190cb-2419-40b0-a75d-d7963e94ebaa', 1, 'NONE', 'Role', 'Role Management', 0, 'default', 'default', 100, 1, 1, NULL, '2021-11-12 20:13:55', '2021-11-12 20:13:55'),
(6, '520e73fb-bb53-407f-869d-2024a5874be5', 1, 'NONE', 'Data Definition', 'System Default Data Management', 0, 'default', 'default', 100, 1, 1, NULL, '2021-11-12 20:13:55', '2021-11-12 20:13:55'),
(7, '9fd34f09-4c68-4746-804c-f6feda4c45b9', 1, 'NONE', 'Printers', 'Printer Management', 0, 'default', 'default', 100, 1, 1, NULL, '2021-11-12 20:13:55', '2021-11-12 20:13:55');

-- --------------------------------------------------------

--
-- Table structure for table `core_message`
--

DROP TABLE IF EXISTS `core_message`;
CREATE TABLE IF NOT EXISTS `core_message` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `message_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message_code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_by` int(11) NOT NULL DEFAULT '0',
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `core_passwordreset`
--

DROP TABLE IF EXISTS `core_passwordreset`;
CREATE TABLE IF NOT EXISTS `core_passwordreset` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL,
  KEY `core_passwordreset_email_index` (`email`),
  KEY `core_passwordreset_token_index` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `core_permission`
--

DROP TABLE IF EXISTS `core_permission`;
CREATE TABLE IF NOT EXISTS `core_permission` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `menu_id` int(10) UNSIGNED NOT NULL,
  `permission_code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_by` int(11) NOT NULL DEFAULT '0',
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `core_permission_menu_id_foreign` (`menu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `core_permission`
--

INSERT INTO `core_permission` (`id`, `menu_id`, `permission_code`, `description`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 1, 'insert', 'insert', 0, NULL, NULL, NULL),
(2, 1, 'delete', 'delete', 0, NULL, NULL, NULL),
(3, 1, 'update', 'update', 0, NULL, NULL, NULL),
(4, 1, 'view', 'view', 0, NULL, NULL, NULL),
(5, 2, 'insert', 'insert', 0, NULL, NULL, NULL),
(6, 2, 'delete', 'delete', 0, NULL, NULL, NULL),
(7, 2, 'update', 'update', 0, NULL, NULL, NULL),
(8, 2, 'view', 'view', 0, NULL, NULL, NULL),
(9, 3, 'insert', 'insert', 0, NULL, NULL, NULL),
(10, 3, 'delete', 'delete', 0, NULL, NULL, NULL),
(11, 3, 'update', 'update', 0, NULL, NULL, NULL),
(12, 3, 'view', 'view', 0, NULL, NULL, NULL),
(13, 4, 'insert', 'insert', 0, NULL, NULL, NULL),
(14, 4, 'delete', 'delete', 0, NULL, NULL, NULL),
(15, 4, 'update', 'update', 0, NULL, NULL, NULL),
(16, 4, 'view', 'view', 0, NULL, NULL, NULL),
(17, 6, 'insert', 'insert', 0, NULL, NULL, NULL),
(18, 6, 'delete', 'delete', 0, NULL, NULL, NULL),
(19, 6, 'update', 'update', 0, NULL, NULL, NULL),
(20, 6, 'view', 'view', 0, NULL, NULL, NULL),
(21, 7, 'insert', 'insert', 0, NULL, NULL, NULL),
(22, 7, 'delete', 'delete', 0, NULL, NULL, NULL),
(23, 7, 'update', 'update', 0, NULL, NULL, NULL),
(24, 7, 'view', 'view', 0, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `core_printer`
--

DROP TABLE IF EXISTS `core_printer`;
CREATE TABLE IF NOT EXISTS `core_printer` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `printer_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `printer_code` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `ip_address` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `printer_port` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `access_type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'SMB',
  `user_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shell_exec` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sort_order` int(11) NOT NULL DEFAULT '100',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_by` int(11) NOT NULL DEFAULT '0',
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `core_printer_printer_code_unique` (`printer_code`),
  KEY `core_printer_uuid_index` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `core_role`
--

DROP TABLE IF EXISTS `core_role`;
CREATE TABLE IF NOT EXISTS `core_role` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `role_code` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_by` int(11) NOT NULL DEFAULT '0',
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `core_role_uuid_index` (`uuid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `core_role`
--

INSERT INTO `core_role` (`id`, `uuid`, `role_code`, `description`, `is_active`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'd0dc08aa-329b-46e6-b437-81aa8b4903ee', 'admin', 'Administrator', 1, 1, NULL, '2021-11-12 20:13:55', '2021-11-12 20:13:55'),
(2, '57af7a83-207a-4526-bb0a-4551a2cb725c', 'user', 'Standard User', 1, 1, NULL, '2021-11-12 20:13:55', '2021-11-12 20:13:55');

-- --------------------------------------------------------

--
-- Table structure for table `core_rolepermission`
--

DROP TABLE IF EXISTS `core_rolepermission`;
CREATE TABLE IF NOT EXISTS `core_rolepermission` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `role_id` int(10) UNSIGNED NOT NULL,
  `permission_id` int(10) UNSIGNED NOT NULL,
  `is_allowed` tinyint(1) NOT NULL DEFAULT '1',
  `created_by` int(11) NOT NULL DEFAULT '0',
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `core_rolepermission_role_id_foreign` (`role_id`),
  KEY `core_rolepermission_permission_id_foreign` (`permission_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `core_rolepermission`
--

INSERT INTO `core_rolepermission` (`id`, `role_id`, `permission_id`, `is_allowed`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, 1, NULL, '2021-11-12 20:13:55', '2021-11-12 20:13:55'),
(2, 1, 2, 1, 1, NULL, '2021-11-12 20:13:55', '2021-11-12 20:13:55'),
(3, 1, 3, 1, 1, NULL, '2021-11-12 20:13:55', '2021-11-12 20:13:55'),
(4, 1, 4, 1, 1, NULL, '2021-11-12 20:13:55', '2021-11-12 20:13:55'),
(5, 1, 5, 1, 1, NULL, '2021-11-12 20:13:55', '2021-11-12 20:13:55'),
(6, 1, 6, 1, 1, NULL, '2021-11-12 20:13:56', '2021-11-12 20:13:56'),
(7, 1, 7, 1, 1, NULL, '2021-11-12 20:13:56', '2021-11-12 20:13:56'),
(8, 1, 8, 1, 1, NULL, '2021-11-12 20:13:56', '2021-11-12 20:13:56'),
(9, 1, 9, 1, 1, NULL, '2021-11-12 20:13:56', '2021-11-12 20:13:56'),
(10, 1, 10, 1, 1, NULL, '2021-11-12 20:13:56', '2021-11-12 20:13:56'),
(11, 1, 11, 1, 1, NULL, '2021-11-12 20:13:56', '2021-11-12 20:13:56'),
(12, 1, 12, 1, 1, NULL, '2021-11-12 20:13:56', '2021-11-12 20:13:56'),
(13, 1, 13, 1, 1, NULL, '2021-11-12 20:13:56', '2021-11-12 20:13:56'),
(14, 1, 14, 1, 1, NULL, '2021-11-12 20:13:56', '2021-11-12 20:13:56'),
(15, 1, 15, 1, 1, NULL, '2021-11-12 20:13:56', '2021-11-12 20:13:56'),
(16, 1, 16, 1, 1, NULL, '2021-11-12 20:13:56', '2021-11-12 20:13:56'),
(17, 1, 17, 1, 1, NULL, '2021-11-12 20:13:56', '2021-11-12 20:13:56'),
(18, 1, 18, 1, 1, NULL, '2021-11-12 20:13:56', '2021-11-12 20:13:56'),
(19, 1, 19, 1, 1, NULL, '2021-11-12 20:13:56', '2021-11-12 20:13:56'),
(20, 1, 20, 1, 1, NULL, '2021-11-12 20:13:56', '2021-11-12 20:13:56'),
(21, 1, 21, 1, 1, NULL, '2021-11-12 20:13:56', '2021-11-12 20:13:56'),
(22, 1, 22, 1, 1, NULL, '2021-11-12 20:13:56', '2021-11-12 20:13:56'),
(23, 1, 23, 1, 1, NULL, '2021-11-12 20:13:56', '2021-11-12 20:13:56'),
(24, 1, 24, 1, 1, NULL, '2021-11-12 20:13:56', '2021-11-12 20:13:56');

-- --------------------------------------------------------

--
-- Table structure for table `core_setting`
--

DROP TABLE IF EXISTS `core_setting`;
CREATE TABLE IF NOT EXISTS `core_setting` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `category` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_child` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `setting_code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `prerequisite` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `input_type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `core_setting_category_index` (`category`),
  KEY `core_setting_category_child_index` (`category_child`),
  KEY `core_setting_setting_code_index` (`setting_code`),
  KEY `core_setting_description_index` (`description`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `daily_tasks`
--

DROP TABLE IF EXISTS `daily_tasks`;
CREATE TABLE IF NOT EXISTS `daily_tasks` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `week` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `site` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `district` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ticket` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT '1',
  `type` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subject` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `raisedby` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `position` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `department` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `days` int(11) NOT NULL DEFAULT '100',
  `hitmiss` tinyint(1) NOT NULL DEFAULT '0',
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `sla` tinyint(1) NOT NULL DEFAULT '0',
  `remarks` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `publish` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `daily_tasks_uuid_index` (`uuid`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `daily_tasks`
--

INSERT INTO `daily_tasks` (`id`, `uuid`, `user_id`, `week`, `site`, `district`, `ticket`, `type`, `subject`, `raisedby`, `position`, `department`, `days`, `hitmiss`, `status`, `sla`, `remarks`, `publish`, `created_at`, `updated_at`) VALUES
(1, '247777db-44fd-457b-af75-e196cdfb3fa6', 1, '46', 'Cebu', 'DC', '234', '1', 'Install app laptop', 'Mark Bimbo', 'supervisor', 'ops', 1, 1, 1, 1, 'none', 0, '2021-11-17 18:45:41', '2021-11-29 21:37:17'),
(2, '3bcfa805-e326-4f9a-8cbc-63020e2b1879', 1, '46', 'Cebu', 'DC', '78656', '1', 'Install app laptop', 'Mark Bimbo', 'supervisor', 'ops', 1, 1, 0, 0, 'none', 1, '2021-11-17 18:48:59', '2021-11-29 21:34:34'),
(6, '6056bf74-8252-4959-9ed6-7408c59cf3f3', 1, '48', 'sdfds', 'cebu', NULL, '2', 'sdfs', 'sdf', 'sdf', 'sdfs', 100, 1, 1, 1, NULL, 1, '2021-11-29 22:24:10', '2021-11-29 23:22:39'),
(5, '16187f0a-cfc2-4e7b-af92-29341f3b95d3', 1, '48', 'Tayud', 'Distric 5', NULL, '2', 'no Enternet', 'sfdsf', 'manager', 'operation', 100, 1, 1, 1, NULL, 1, '2021-11-29 21:48:38', '2021-11-29 21:50:29');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `help_sections`
--

DROP TABLE IF EXISTS `help_sections`;
CREATE TABLE IF NOT EXISTS `help_sections` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `systemID` int(11) NOT NULL,
  `section_name` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `help_sections_uuid_index` (`uuid`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `help_sections`
--

INSERT INTO `help_sections` (`id`, `uuid`, `systemID`, `section_name`, `created_at`, `updated_at`) VALUES
(1, 'fc455983-a0fd-4143-836c-9ab66111a9a8', 2, 'dg', '2021-11-14 22:47:47', '2021-11-14 22:47:47');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2019_08_04_030441_core_tables', 1),
(2, '2021_04_08_160433_create_help_sections_table', 1),
(17, '2021_11_17_012014_create_options_table', 3),
(14, '2019_12_14_000001_create_personal_access_tokens_table', 2),
(15, '2021_11_15_011553_create_daily_tasks_table', 2);

-- --------------------------------------------------------

--
-- Table structure for table `options`
--

DROP TABLE IF EXISTS `options`;
CREATE TABLE IF NOT EXISTS `options` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `soptiontype` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `options_uuid_index` (`uuid`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `options`
--

INSERT INTO `options` (`id`, `uuid`, `soptiontype`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'a8713c73-9c07-4a3f-8843-97eb675529b4', 'ticket', 'Os Ticket', 1, '2021-11-18 18:00:16', '2021-11-18 18:00:16'),
(2, '6114b020-9ed4-472d-9ccc-1a2487d9c94b', 'ticket', 'Viber', 1, '2021-11-18 18:00:25', '2021-11-18 18:00:25'),
(3, '376ba19e-7532-44de-9e22-abff1e7aeaad', 'ticket', 'Email', 1, '2021-11-18 18:00:32', '2021-11-18 18:00:32'),
(4, '9de6d78d-1aef-4698-ae97-1bc96663233b', 'ticket', 'Call', 1, '2021-11-18 18:00:57', '2021-11-18 18:00:57'),
(5, 'f47777a9-036c-4417-b784-618734a8ea26', 'ticket', 'Text', 1, '2021-11-18 18:01:02', '2021-11-18 18:01:02'),
(6, '09013999-b081-407b-8346-b4124d4b73d1', 'ticket', 'Verbal', 1, '2021-11-18 18:01:34', '2021-11-18 18:01:34'),
(7, 'fc4eca30-dc79-431b-bfca-5faada046ce3', 'gender', 'Male', 1, '2021-11-18 18:01:51', '2021-11-18 18:01:51'),
(8, 'fbd5a5e9-160f-4e64-8473-62d94458ea00', 'gender', 'Female', 1, '2021-11-18 18:02:05', '2021-11-18 18:02:05'),
(9, '280f1c23-c80e-4836-b373-09e3fc2db3da', 'hitmiss', 'Hit', 1, '2021-11-18 18:03:45', '2021-11-18 18:03:45'),
(10, '41a75d27-6eee-40b8-9b67-07d9528daa03', 'hitmiss', 'Miss', 1, '2021-11-18 18:03:55', '2021-11-18 18:03:55'),
(11, 'ce8f52ce-8466-494b-94ee-e53cb95f9b94', 'status', 'Open', 1, '2021-11-18 18:06:36', '2021-11-18 18:06:36'),
(12, '4a7269ed-5b62-4c89-8a44-d673d8bda048', 'status', 'Close', 1, '2021-11-18 18:06:43', '2021-11-18 18:06:43'),
(13, 'e9d722af-08f2-4ffc-b7e6-f0b0da73a8a8', 'status', 'Resolve', 1, '2021-11-18 18:06:55', '2021-11-18 18:06:55'),
(14, 'e8dff678-445b-4493-a7f5-bd847e1d006c', 'status', 'Pinding', 1, '2021-11-18 18:07:07', '2021-11-18 18:07:07'),
(15, 'ad6c8c83-ca1c-43cf-b395-dd9ab992d260', 'status', 'Miss', 1, '2021-11-18 18:07:14', '2021-11-18 18:07:14'),
(16, 'c229ed67-03d2-4196-874d-d81bfecb4dd5', 'status', 'Hit', 1, '2021-11-18 18:07:38', '2021-11-18 18:07:38'),
(17, '3bc45b89-82a4-4fae-87c8-39c7abc5afb3', 'Sla', 'Hit', 1, '2021-11-18 18:07:48', '2021-11-18 18:07:48'),
(18, 'cead4696-6979-44d7-9140-d54d57f30424', 'Sla', 'Miss', 1, '2021-11-18 18:07:54', '2021-11-18 18:07:54');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_change_date` date DEFAULT NULL,
  `user_type` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role_id` int(10) UNSIGNED DEFAULT NULL,
  `first_name` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_change_password` int(11) NOT NULL DEFAULT '0',
  `last_ip_address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_session_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_activity` datetime DEFAULT NULL,
  `incorrect_logins` int(11) DEFAULT NULL,
  `photo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `language` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'EN',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `google_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_by` int(11) NOT NULL DEFAULT '0',
  `updated_by` int(11) DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  KEY `users_role_id_foreign` (`role_id`),
  KEY `users_uuid_index` (`uuid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `uuid`, `name`, `email`, `email_verified_at`, `password`, `password_change_date`, `user_type`, `role_id`, `first_name`, `last_name`, `is_change_password`, `last_ip_address`, `last_session_id`, `last_activity`, `incorrect_logins`, `photo`, `language`, `is_active`, `google_id`, `created_by`, `updated_by`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'eeced731-d4de-49fe-ac05-cc5a1fdbc6ad', 'System Administrator', 'admin@codesafe.com', '2019-10-26 12:38:09', '$2y$10$B8LTiUXiD8d.9PWaYdiwD.hHT.HC47HGj5AVeW92wyYCh2uD1dNve', NULL, 'admin', 1, 'System', 'Administrator', 0, NULL, NULL, NULL, NULL, NULL, 'EN', 1, NULL, 1, NULL, NULL, '2021-11-12 20:13:56', '2021-11-12 20:13:56'),
(2, 'cd3ad702-05a1-446b-af51-bb200262b409', 'System Administrator', 'ronelgonzales5@gmail.com', '2019-10-26 12:38:09', '$2y$10$1sp6.NR6C2TxaaXmarXikupdUWrYDMbTLGVRlfhYUQbGBQIp8SGBG', NULL, 'admin', 1, 'System', 'Administrator', 0, NULL, NULL, NULL, NULL, NULL, 'EN', 1, NULL, 1, NULL, NULL, '2021-11-12 20:13:56', '2021-11-12 20:13:56');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `core_menu`
--
ALTER TABLE `core_menu`
  ADD CONSTRAINT `core_menu_app_id_foreign` FOREIGN KEY (`app_id`) REFERENCES `core_app` (`id`);

--
-- Constraints for table `core_permission`
--
ALTER TABLE `core_permission`
  ADD CONSTRAINT `core_permission_menu_id_foreign` FOREIGN KEY (`menu_id`) REFERENCES `core_menu` (`id`);

--
-- Constraints for table `core_rolepermission`
--
ALTER TABLE `core_rolepermission`
  ADD CONSTRAINT `core_rolepermission_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `core_permission` (`id`),
  ADD CONSTRAINT `core_rolepermission_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `core_role` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `core_role` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
