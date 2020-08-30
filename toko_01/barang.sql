-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 29, 2020 at 05:05 AM
-- Server version: 10.4.10-MariaDB
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `toko`
--

-- --------------------------------------------------------

--
-- Table structure for table `barang`
--

CREATE TABLE `barang` (
  `id` int(11) NOT NULL,
  `nama` tinytext DEFAULT NULL,
  `deskripsi` text DEFAULT NULL,
  `deskripsi_panjang` text DEFAULT NULL,
  `file_id` int(11) DEFAULT NULL,
  `gbr_url` text DEFAULT NULL,
  `harga` tinytext DEFAULT NULL,
  `wa` tinytext DEFAULT NULL,
  `publish` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `barang`
--

INSERT INTO `barang` (`id`, `nama`, `deskripsi`, `deskripsi_panjang`, `file_id`, `gbr_url`, `harga`, `wa`, `publish`) VALUES
(1, 'Magic Sponge/Busa pembersih ajaib', NULL, '<ul>\n<li>Dari bahan yang lembut dan mudah dipakai, tidak menyakiti kulit.</li>\n<li>Tidak perlu sabun/detergen, hanya dengan menggunakan air bersih.</li>\n<li>Dapat digunakan permukaan cembung dan cekung.</li>\n<li>Menghilangkan noda dengan mudah pada bermacam permukaan dan jenis bahan.</li>\n<li>Bisa dipakai untuk membersihkan motor, dan permukaan kendaraan secara instan.</li>\n<li>Busa ini bisa di potong sesuai dengan kebutuhan.</li>\n<li>Bisa untuk membersihkan kerak air yang ada kaca aquarium.</li>\n<li>Busa ini bisa di potong sesuai dengan kebutuhan.</li>\n<li>Dapat digunakan berulang kali.</li>\n</ul>\n<p>Peringatan:</p>\n<ul>\n<li>Jangan menggosok terlalu keras. Akan mengakibatkan cepat sobek. Sebelum menggunakan bisa dites dahulu sedikit kepermukaan yg akan dibersihkan.</li>\n<li>Untuk kulit yang sensifit, sebaiknya gunakan sarung tangan saat Anda menggunakannya.</li>\n</ul>\n<p>Spesifikasi:<br />Warna putih<br />Ukuran barang: 10 * 6 * 2 cm dikemas plastik 1-1<br />Berat bersih: 10g<br />Harga tertera merupakan harga per 1 pcs</p>', 1, NULL, 'Rp. 8.000 (1 biji) / Rp. 15.000 (2 biji) / Rp. 60.000 (10 biji)', '6281219753619', 1),
(2, 'Imboost kid sirup 60 ml', 'deskripsi', '<p>Meningkatkan kekebalan tubuh. Sebagai terapi tambahan untuk menstimulasi/meningkatkan sistem imun pada pasien infeksi akut atau kronik.</p>\n<p>IMBOOST KIDS SIRUP merupakan suplemen daya tahan tubuh yang bersifat Imunostimulan yang berfungsi untuk menjaga kesehatan tubuh agar tidak mudah sakit. Suplemen ini mengandung Echinacea purpurea herb dry extract dan Zn Piccolinate yang bekerja cepat mengaktifkan sistem daya tahan tubuh namun tetap aman untuk dikonsumsi. Imboost akan bekerja langsung di sistem pertahanan tubuh kita dengan memperbanyak antibodi sehingga daya tahan tubuh lebih kuat melawan serangan virus.</p>\n<p>Tiap 5 ml mengandung : Echinacea Purpurea extract 250 mg, Zn Picolinate 5 mg</p>\n<p><strong>Aturan Pakai</strong></p>\n<p>Anak di atas usia 6 tahun : 5 ml, 3 kali sehari. Anak umur 2 - 6 tahun: 5 ml, 1 sampai 2 kali per hari. Anak umur 1 -2 tahun: Dosis sesuai dengan anjuran dokter.</p>\n<p>Dikonsumsi sesudah makan</p>\n<p>&nbsp;</p>\n<p><strong>Perhatian:<br /></strong>Tidak boleh digunakan oleh penderita sclerosis multiple, penyakit kolagen, leucosis, tuberculosis, AIDS dan penyakit autoimun.</p>\n<p>Hentikan pemakaian jika terjadi reaksi alergi. Tidak dianjurkan untuk digunakan lebih dari 8 minggu. Hindari penggunaan pada wanita hamil atau menyusui. Konsultasikan dengan dokter Anda jika digunakan bersama obat lain. Produk ini tidak boleh digunakan untuk anak di bawah usia 1 tahun.</p>\n<p><em>sumber</em>: HalodDoc</p>', 4, NULL, 'Rp. 63.500,-', '6281219753619', 1),
(3, 'Kisspray Amoris', '-', '<p>-</p>', 0, NULL, '-', '6281219753619', 1),
(4, 'Kisspray Violet', 'deskripsi-', '<p>-</p>', 0, NULL, '-', '6281219753619', 1),
(5, 'Garam Himalaya', NULL, '<p>deksripsi belum tersedia</p>', 0, NULL, '-', '6281219753619', 1),
(6, 'Imboost force kids 160 ml', NULL, '<p>deskripsi belum tersedia</p>', 0, NULL, '-', '6281219753619', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `barang`
--
ALTER TABLE `barang`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `barang`
--
ALTER TABLE `barang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
