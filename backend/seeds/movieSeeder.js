const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Movie = require('../models/Movie');

// Load .env from backend root directory
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const movies = [
  {
    title: 'The Godfather Part II',
    description: 'The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.',
    rating: 9.0,
    releaseDate: new Date('1974-12-20'),
    duration: 202,
    director: 'Francis Ford Coppola',
    genre: ['Crime', 'Drama'],
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BMWMwMGQzZTItY2JlNC00OWZiLWIyMDctNDk2ZDQ2YjRjMWQ0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
    imdbId: 'tt0071562',
  },
  {
    title: '12 Angry Men',
    description: 'A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence.',
    rating: 9.0,
    releaseDate: new Date('1957-04-10'),
    duration: 96,
    director: 'Sidney Lumet',
    genre: ['Crime', 'Drama'],
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BMWU4N2FjNzYtNTVkNC00NzQ0LTg0MjAtYTJlMjFhNGUxZDFmXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_.jpg',
    imdbId: 'tt0050083',
  },
  {
    title: "Schindler's List",
    description: 'In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.',
    rating: 9.0,
    releaseDate: new Date('1993-12-15'),
    duration: 195,
    director: 'Steven Spielberg',
    genre: ['Biography', 'Drama', 'History'],
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzItYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
    imdbId: 'tt0108052',
  },
  {
    title: 'The Lord of the Rings: The Return of the King',
    description: "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
    rating: 9.0,
    releaseDate: new Date('2003-12-17'),
    duration: 201,
    director: 'Peter Jackson',
    genre: ['Action', 'Adventure', 'Drama'],
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
    imdbId: 'tt0167260',
  },
  {
    title: 'Pulp Fiction',
    description: 'The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.',
    rating: 8.9,
    releaseDate: new Date('1994-10-14'),
    duration: 154,
    director: 'Quentin Tarantino',
    genre: ['Crime', 'Drama'],
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
    imdbId: 'tt0110912',
  },
  {
    title: 'Forrest Gump',
    description: 'The presidencies of Kennedy and Johnson, the Vietnam War, and other historical events unfold from the perspective of an Alabama man with an IQ of 75.',
    rating: 8.8,
    releaseDate: new Date('1994-07-06'),
    duration: 142,
    director: 'Robert Zemeckis',
    genre: ['Drama', 'Romance'],
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg',
    imdbId: 'tt0109830',
  },
  {
    title: 'Inception',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    rating: 8.8,
    releaseDate: new Date('2010-07-16'),
    duration: 148,
    director: 'Christopher Nolan',
    genre: ['Action', 'Sci-Fi', 'Thriller'],
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg',
    imdbId: 'tt1375666',
  },
  {
    title: 'Fight Club',
    description: 'An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.',
    rating: 8.8,
    releaseDate: new Date('1999-10-15'),
    duration: 139,
    director: 'David Fincher',
    genre: ['Drama'],
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BNDIzNDU0YzEtYzE5Ni00ZjlkLTk5ZjgtNjM3NWE4YzA3Nzk3XkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_.jpg',
    imdbId: 'tt0137523',
  },
  {
    title: 'The Matrix',
    description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
    rating: 8.7,
    releaseDate: new Date('1999-03-31'),
    duration: 136,
    director: 'Lana Wachowski, Lilly Wachowski',
    genre: ['Action', 'Sci-Fi'],
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
    imdbId: 'tt0133093',
  },
  {
    title: 'Goodfellas',
    description: 'The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners.',
    rating: 8.7,
    releaseDate: new Date('1990-09-19'),
    duration: 145,
    director: 'Martin Scorsese',
    genre: ['Biography', 'Crime', 'Drama'],
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtN2RjYy00YzM1LWI4ZmQtMjIwYjFjNmI3ZGEwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
    imdbId: 'tt0099685',
  },
  {
    title: 'Interstellar',
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    rating: 8.7,
    releaseDate: new Date('2014-11-07'),
    duration: 169,
    director: 'Christopher Nolan',
    genre: ['Adventure', 'Drama', 'Sci-Fi'],
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
    imdbId: 'tt0816692',
  },
  {
    title: 'The Silence of the Lambs',
    description: 'A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.',
    rating: 8.6,
    releaseDate: new Date('1991-02-14'),
    duration: 118,
    director: 'Jonathan Demme',
    genre: ['Crime', 'Drama', 'Thriller'],
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
    imdbId: 'tt0102926',
  },
  {
    title: 'Saving Private Ryan',
    description: 'Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.',
    rating: 8.6,
    releaseDate: new Date('1998-07-24'),
    duration: 169,
    director: 'Steven Spielberg',
    genre: ['Drama', 'War'],
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BZjhkMDM4MWItZTVjOC00ZDRhLThmYTAtM2I5NzBmNmNlMzI1XkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_.jpg',
    imdbId: 'tt0120815',
  },
  {
    title: 'The Green Mile',
    description: 'The lives of guards on Death Row are affected by one of their charges: a black man accused of child murder and rape, yet who has a mysterious gift.',
    rating: 8.6,
    releaseDate: new Date('1999-12-10'),
    duration: 189,
    director: 'Frank Darabont',
    genre: ['Crime', 'Drama', 'Fantasy'],
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BMTUxMzQyNjA5MF5BMl5BanBnXkFtZTYwOTU2NTY3._V1_.jpg',
    imdbId: 'tt0120689',
  },
  {
    title: 'Parasite',
    description: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
    rating: 8.5,
    releaseDate: new Date('2019-05-30'),
    duration: 132,
    director: 'Bong Joon Ho',
    genre: ['Comedy', 'Drama', 'Thriller'],
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg',
    imdbId: 'tt6751668',
  },
  {
    title: 'The Prestige',
    description: 'After a tragic accident, two stage magicians engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit each other.',
    rating: 8.5,
    releaseDate: new Date('2006-10-20'),
    duration: 130,
    director: 'Christopher Nolan',
    genre: ['Drama', 'Mystery', 'Sci-Fi'],
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BMjA4NDI0MTIxNF5BMl5BanBnXkFtZTYwNTM0MzY2._V1_.jpg',
    imdbId: 'tt0482571',
  },
  {
    title: 'Gladiator',
    description: 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.',
    rating: 8.5,
    releaseDate: new Date('2000-05-05'),
    duration: 155,
    director: 'Ridley Scott',
    genre: ['Action', 'Adventure', 'Drama'],
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BMDliMmNhNDEtODUyOS00MjNlLTgxODEtN2U3NzIxMGVkZTA1L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
    imdbId: 'tt0172495',
  },
];

const seedMovies = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('MongoDB Connected for seeding...');

    // Clear existing movies (optional - uncomment if you want to remove old data first)
    // await Movie.deleteMany({});
    // console.log('Existing movies cleared');

    // Insert movies
    const insertedMovies = await Movie.insertMany(movies);
    console.log(`✅ Successfully seeded ${insertedMovies.length} movies!`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding movies:', error.message);
    process.exit(1);
  }
};

seedMovies();