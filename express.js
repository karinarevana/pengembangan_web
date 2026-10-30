const express = require('express');

const app = express();
const PORT = 3000;

// Middleware untuk membaca JSON dari request body
app.use(express.json());

// Data mahasiswa sementara
let mahasiswa = [
  { id: 1, nama: 'Andi', jurusan: 'Informatika' },
  { id: 2, nama: 'Budi', jurusan: 'Sistem Informasi' }
];

// GET: mengambil semua data mahasiswa
app.get('/mahasiswa', (req, res) => {
  res.json(mahasiswa);
});

// GET: mengambil satu mahasiswa berdasarkan ID
app.get('/mahasiswa/:id', (req, res) => {
  const id = Number(req.params.id);
  const data = mahasiswa.find(m => m.id === id);

  if (!data) {
    return res.status(404).json({
      pesan: 'Mahasiswa tidak ditemukan'
    });
  }

  res.json(data);
});

// POST: menambahkan mahasiswa baru
app.post('/mahasiswa', (req, res) => {
  const { nama, jurusan } = req.body;

  const dataBaru = {
    id: mahasiswa.length
      ? Math.max(...mahasiswa.map(m => m.id)) + 1
      : 1,
    nama,
    jurusan
  };

  mahasiswa.push(dataBaru);

  res.status(201).json({
    pesan: 'Mahasiswa berhasil ditambahkan',
    data: dataBaru
  });
});

// PUT: memperbarui data mahasiswa
app.put('/mahasiswa/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = mahasiswa.findIndex(m => m.id === id);

  if (index === -1) {
    return res.status(404).json({
      pesan: 'Mahasiswa tidak ditemukan'
    });
  }

  mahasiswa[index] = {
    id,
    nama: req.body.nama,
    jurusan: req.body.jurusan
  };

  res.json({
    pesan: 'Data mahasiswa berhasil diperbarui',
    data: mahasiswa[index]
  });
});

// DELETE: menghapus mahasiswa
app.delete('/mahasiswa/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = mahasiswa.findIndex(m => m.id === id);

  if (index === -1) {
    return res.status(404).json({
      pesan: 'Mahasiswa tidak ditemukan'
    });
  }

  mahasiswa.splice(index, 1);

  res.json({
    pesan: 'Mahasiswa berhasil dihapus'
  });
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});