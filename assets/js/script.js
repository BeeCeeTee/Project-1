
const cardContainer = $('#card-container')

// Colors and font selection
function renderStyles() {
    if (year >= 1950 && year < 1960) {
        $(':root').css({
            '--primary-color': '#3EADD2',
            '--secondary-color': '#F2CB05',
            '--accent-color': '#F28157',
            '--text-color': '#031C26',
            '--background-color': '#FFF7EF',
            '--heading': 'Carter One',
            '--body': 'Truculenta'
        });
    }

    if (year >= 1960 && year < 1970) {
        $(':root').css({
            '--primary-color': '#FF8636',
            '--secondary-color': '#54BCD6',
            '--accent-color': '#9BBD25',
            '--text-color': '#310C0B',
            '--background-color': '#FFE101',
            '--heading': 'Spicy Rice',
            '--body': 'Life Savers'
        });
    }

    if (year >= 1970 && year < 1980) {
        $(':root').css({
            '--primary-color': '#E59F23',
            '--secondary-color': '#7E9636',
            '--accent-color': '#633B07',
            '--text-color': '#3C2000',
            '--background-color': '#E2C6A7',
            '--heading': 'Bungee Shade',
            '--body': 'Michroma'
        });
    }

    if (year >= 1980 && year < 1990) {
        $(':root').css({
            '--primary-color': '#FA8057',
            '--secondary-color': '#E754B0',
            '--accent-color': '#F3D751',
            '--text-color': '#8CA9FD',
            '--background-color': '#2B0D29',
            '--heading': 'Monoton',
            '--body': 'Orbitron'
        });
    }

    if (year >= 1990 && year < 2000) {
        $(':root').css({
            '--primary-color': '#5ABFAD',
            '--secondary-color': '#D93682',
            '--accent-color': '#5D3B8C',
            '--text-color': '#FDB64C',
            '--background-color': '#161616',
            '--heading': 'Yuji Boku',
            '--body': 'Special Elite'
        });
    }

    if (year >= 2000 && year < 2010) {
        $(':root').css({
            '--primary-color': '#5E88BA',
            '--secondary-color': '#B4CBE4',
            '--accent-color': '#D6D6D6',
            '--text-color': '#112236',
            '--background-color': '#FCFBFC',
            '--heading': 'Cute Font',
            '--body': 'Jura'
        });
    }

    if (year >= 2010 && year < 2020) {
        $(':root').css({
            '--primary-color': '#',
            '--secondary-color': '#',
            '--accent-color': '#',
            '--text-color': '#',
            '--background-color': '#',
            '--heading': '',
            '--body': ''
        });
    }

    if (year >= 2020) {
        $(':root').css({
            '--primary-color': '#',
            '--secondary-color': '#',
            '--accent-color': '#',
            '--text-color': '#',
            '--background-color': '#',
            '--heading': '',
            '--body': ''
        });
    }
};

function dynamicColors() { // Returns a date-based color scheme
    element.style.color = "";

}

//Movie API Key
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNjYyNjI4N2M2ZGU3Yzk4ODUwNjVlNTBjN2MyNzY1NCIsInN1YiI6IjY2MDYxN2JmYTg5NGQ2MDE3YzYyNDkxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.B1Lq6M9BipX3yYlMkNkluP9ljFAU7rklKjW2B6_X0_A'
    }
};
//once birthday is submitted this function will run
async function birthdaySubmission() {
  const birthdates = JSON.parse(localStorage.getItem('birthdates'));
  console.log(birthdates)

  let recentInput = birthdates.reverse()[0]
  console.log(recentInput)

  const reformatDate = dayjs(recentInput).format('YYYY-DD-MM');
  $('#3a').text(reformatDate);
  console.log(reformatDate)

  const year = dayjs(recentInput).format('YYYY')
  console.log(year)

  const mediaChoice = document.getElementById("media").value
  
  //API URLs
  articleRequestURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?pub_date=${reformatDate}&api-key=anAU8Yk0RQpGTel7ZLCurFyigefJRTo3`
  bookRequestURL = `https://api.nytimes.com/svc/books/v3/lists/overview.json?published_date=${reformatDate}&api-key=anAU8Yk0RQpGTel7ZLCurFyigefJRTo3`
  moviesRequestURL = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_year=${year}&sort_by=revenue.desc`

if (mediaChoice === 'news') {
  fetch(articleRequestURL)

  .then(response => response.json())
  .then(data => {
    const articles = data.list
    console.log(data.response.docs[0])
    const article = {
        headline: data.response.docs[0].headline.main,
        author: data.response.docs[0].byline.original,
        description: data.response.docs[0].snippet,
        image: data.response.docs[0].multimedia[0].url,
      }
      console.log(article);
      createArticleCard(article);
  });
}
else if (mediaChoice === 'movies'){
  fetch(moviesRequestURL, options)
  .then(response => response.json())
  .then(data => {
    const movies = data.list
    console.log(data.results[0])
    const movie = {
        title: data.results[0].title,
        description: data.results[0].overview,
        poster: data.results[0].poster_path,
      };
      console.log(movie);
      createMovieCard(movie);
  });
}
else if (mediaChoice === 'books') {

  fetch(bookRequestURL)
    .then(response => response.json())
    .then(data => {
      const books = data.list
      // console.log(data.results.lists[0].books[0])
      const book = {
        title: data.results.lists[0].books[0].title,
        author: data.results.lists[0].books[0].author,
        description: data.results.lists[0].books[0].description,
        bookImage: data.results.lists[0].books[0].book_image,
      };
      console.log(book);
      createBookCard(book);
    });
}
else {
  fetch(articleRequestURL)
  .then(response => response.json())
  .then(data => {
    const articles = data.list
    console.log(data.response.docs[0])
    const article = {
        headline: data.response.docs[0].headline.main,
        author: data.response.docs[0].byline.original,
        description: data.response.docs[0].snippet,
        image: data.response.docs[0].multimedia[0].url,
      }
      console.log(article);
      createArticleCard(article);
  });

  fetch(moviesRequestURL, options)
    .then(response => response.json())
    .then(data => {
      const movies = data.list
      console.log(data.results[0])
      const movie = {
        title: data.results[0].title,
        description: data.results[0].overview,
        poster: data.results[0].poster_path,
      };
      console.log(movie);
      createMovieCard(movie);
    });

    fetch(bookRequestURL)
    .then(response => response.json())
    .then(data => {
      const books = data.list
      // console.log(data.results.lists[0].books[0])
      const book = {
        title: data.results.lists[0].books[0].title,
        author: data.results.lists[0].books[0].author,
        description: data.results.lists[0].books[0].description,
        bookImage: data.results.lists[0].books[0].book_image,
      };
      console.log(book);
      createBookCard(book);
    });

}
}

function createMovieCard(movie) {

  const movieCard = $("<div>").addClass("card").attr('id', 'movieCard');
  const movieCardBody = $("<div>").addClass("cardBody");
  const movieHeader = $("<h3>").addClass("movieHeader").text('Top Movie The Year You Were Born:');
  const movieTitle = $("<h4>").addClass("movieTitle").text(movie.title);
  const movieDescription = $("<p>").addClass("movieDesc").text(movie.description);
  const moviePoster = $("<img>").addClass("moviePoster").attr('src','https://media.themoviedb.org/t/p/w500/'+movie.poster, 'max-width', '100px', 'max-height', '100px');

  movieCardBody.append(movieHeader, movieTitle, movieDescription, moviePoster);

    movieCard.append(movieCardBody);
    cardContainer.append(movieCard);

    return movieCard;
}


function createBookCard(book) {

  const bookCard = $("<div>").addClass("card").attr('id', 'bookCard');
  const bookCardBody = $("<div>").addClass("cardBody");
  const bookHeader = $("<h3>").addClass("bookHeader").text('Top Book The Year You Were Born:');
  const bookTitle = $("<h4>").addClass("bookTitle").text(book.title);
  const bookAuthor = $("<p>").addClass("bookAuthor").text(book.author);
  const bookDescription = $("<p>").addClass("bookDesc").text(book.description);
  const bookImage = $("<img>").addClass("bookImage").attr('src', book.bookImage)

  bookCardBody.append(bookHeader, bookTitle, bookAuthor, bookDescription, bookImage);
  bookCard.append(bookCardBody);
  cardContainer.append(bookCard);

    return bookCard;
}

function createArticleCard(article) {
  const articleCard = $("<div>").addClass("articleCard");
  const articleCardBody = $("<div>").addClass("cardBody");
  const articleHeader = $("<h3>").addClass("articleHeader").text('Top News From The Day You Were Born:');
  const articleTitle = $("<h4>").addClass("articleTitle").text(article.headline);
  const articleAuthor = $("<p>").addClass("articleAuthor").text(article.author);
  const articleDescription = $("<p>").addClass("articleDesc").text(article.description);
  const articleImage = $("<img>").addClass("articleImage").attr('src','https://static01.nyt.com/'+article.image);


  articleCardBody.append(articleHeader, articleTitle, articleAuthor, articleDescription, articleImage);
  articleCard.append(articleCardBody);
  cardContainer.append(articleCard);
  return articleCard;


}





//MODAL:

// Modal open
var modal = document.querySelector('#js-modal-trigger');
modal.addEventListener('click', function () {
    document.querySelector('.modal').classList.add('is-active');
});
//


const formEl = document.querySelector('#birthdate-form');
const dateInputEl = document.querySelector('#datepicker');
submitButton = document.querySelector('#submit-date');
const handleFormSubmit = function (event) {
    event.preventDefault();

    var firstGetItem = JSON.parse(localStorage.getItem("birthdates"));
    if (!Array.isArray(firstGetItem)) {
        firstGetItem = [];
    }
    const dateInput = dateInputEl.value;
    console.log(dateInput);
    firstGetItem.push(dateInput);
    localStorage.setItem('birthdates', JSON.stringify(firstGetItem));
    birthdaySubmission();
};



formEl.addEventListener('submit', handleFormSubmit);
// Closes Modal on Submit
submitButton.addEventListener('click', function () {
    document.querySelector('.modal').classList.remove('is-active');
});


//Closes Modal on Cancel
const cancelButton = document.querySelector('#cancel-button');
cancelButton.addEventListener('click', function () {
    event.preventDefault();
    document.querySelector('.modal').classList.remove('is-active');
});


$('#datepicker').datepicker({
    startDate: '1960-01-01',
    showOtherMonths: true,
    changeMonth: true,
    changeYear: true,
    yearRange: "-74:+0",
});

// To close modal by means of the X in upper-right corner
var modalClose = document.querySelector(".modal-close")
modalClose.addEventListener('click', function () {
    document.querySelector('.modal').classList.remove('is-active');
})