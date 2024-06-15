const mongoose = require("mongoose");

//set up mongodb url
const dbUrl = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}`;

//set up Schema and model

const mangaSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: Array, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    coverImageUrl: { type: String, required: true },
    stock: { type: Boolean, default: true }
});

const Manga = mongoose.model("Manga", mangaSchema);

//MONGODB FUNCTIONS
async function connect() {
    await mongoose.connect(dbUrl);
}

//Initialize mangas collection with some data.
async function initializeMangas() {
    console.log("Initializing mangas...");
    const mangaList = [
        {
            title: "Haikyuu!!",
            author: "Haruichi Furudate",
            genre: [
                "Action",
                "Drama",
                "Fantasy",
                "Mystery"
              ],
            description: `A chance event triggered Shouyou Hinata's love for volleyball. His club had no members, but somehow persevered and finally 
            made it into its very first and final regular match of middle school, where it was steamrolled by Tobio Kageyama, a superstar player known as 
            "King of the Court." Vowing revenge, Hinata applied to the Karasuno High School volleyball club...only to come face-to-face with his hated rival, Kageyama! 
            A tale of hot-blooded youth and volleyball from the pen of Haruichi Furudate!!`,
            price: 9.99,
            coverImageUrl: "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx65243-mR4MnJFmfaOF.png",
            stock: true
        },
        {
            title: "Attack on Titan",
            author: "Hajime Isayama",
            genre: [
                "Comedy",
                "Drama",
                "Sports"
            ],
            description: `In this post-apocalyptic sci-fi story, humanity has been devastated by the bizarre, giant humanoids known as the Titans.
             Little is known about where they came from or why they are bent on consuming mankind. Seemingly unintelligent, they have roamed the world for years, killing everyone they see. 
             For the past century, what's left of man has hidden in a giant, three-walled city.
             People believe their 50-meter-high walls will protect them from the Titans, but the sudden appearance of an immense Titan is about to change everything. `,
            price: 14.99,
            coverImageUrl: "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx53390-1RsuABC34P9D.jpg",
            stock: true
        },
    ];
    await Manga.insertMany(mangaList);
}

//Get all mangas from the mangas collection
async function getMangas() {
    await connect();
    return await Manga.find({}).sort({ title: 1 });
}

//Get all mangas from the mangas collection
async function getFeaturedMangas() {
    await connect();
    return await Manga.find({}).limit(5);
}

//Function to add a movie to the movies collection
async function addManga(mangaTitle, mangaAuthor, mangaGenre, mangaDescription, mangaPrice, mangaCoverImageUrl) {
    let newManga = new Manga({
        title: mangaTitle,
        author: mangaAuthor,
        genre: mangaGenre,
        description: mangaDescription,
        price: mangaPrice,
        coverImageUrl: mangaCoverImageUrl
    });
    newManga.save();
}

module.exports = {
    getMangas,
    initializeMangas,
    getFeaturedMangas,
    addManga,
}