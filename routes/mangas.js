const express = require('express');
const router = express.Router();

const MangaDb = require('../modules/mangas/mangaDB');

// Add manga page
router.get('/add', (req, res) => {
    res.render('add-manga', { title: 'Add New Manga' });
});

// Handle manga creation
router.post('/add', async (req, res) => {
    const { title, author, genre, description, price, coverImageUrl } = req.body;
    const genresArray = genre.split(',').map(g => g.trim());
    await MangaDb.addManga(title, author,genresArray, description, price, coverImageUrl);
    res.redirect('/mangas');
});

// Catalog page
router.get('/', async (req, res) => {
    const mangas = await MangaDb.getMangas();
    res.render('catalog', { title: 'Manga Catalog', mangas });
});

// Manga details page
router.get('/:id', async (req, res) => {
    const manga = await MangaDb.getManga(req.params.id);
    res.render('manga-details', { title: manga.title, manga });
});



module.exports = router;
