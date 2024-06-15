const express = require('express');
const router = express.Router();


const MangaDb = require('../modules/mangas/mangaDB');

// Home page
router.get('/', async (req, res) => {
    let featuredMangas = await MangaDb.getFeaturedMangas();

    if(!featuredMangas.length) {
        await MangaDb.initializeMangas();
        featuredMangas = await MangaDb.getFeaturedMangas();
        
    }
    res.render('index', { title: 'Manga Emporium', featuredMangas });
});

module.exports = router;