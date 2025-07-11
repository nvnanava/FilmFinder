//FilmFinder: A web app to find movie details using the OMDB API

const movieForm = document.querySelector(".movieForm"); //capture the form
const movieInput = document.querySelector(".movieInput"); //capture the input
const movieCards = document.querySelector(".movieCard"); //capture the movie card
const movieDefault = document.querySelector(".defaultCard"); //capture the default movie card
const apiKey = "YOURAPIkeyHERE"; //Replace with your own OBMDb API key here

movieForm.addEventListener("submit", async (event) => {
  event.preventDefault(); //prevent the default form submission
  const movie = movieInput.value; //get the value of the film input

  if (movie) {
    try {
      const movieData = await getmovieData(movie); //call the function to get the movie data
      displayMovieData(movieData); //call the function to display the movie data
    } catch (error) {
      //error handling if API call fails
      console.error("Error fetching movie data:", error);
      displayError(error); //display error message
    }
  } else {
    displayError("Please enter a movie name."); //if no movie name is entered
  }
});

//function to fetch movie data from the OMDB API
async function getmovieData(movie) {
  const apiURL = `http://www.omdbapi.com/?t=${movie}&apikey=${apiKey}`; //API URL with the movie name and API key passed in
  const response = await fetch(apiURL); //fetch the data from the API
  if (!response.ok) {
    throw new Error("Could not fetch movie data");
  }
  return await response.json(); //return the JSON data
}

//function to display the movie data
//This function gets called when the movie data from OMDB API is fetched successfully
function displayMovieData(movieData) {
  movieDefault.style.display = "none"; //hide the default movie card
  movieCards.style.display = "flex"; //make the movie card visible
  console.log(movieData); //log the movie data to the console
  movieCards.querySelector(".moviePoster").src = movieData.Poster; //set the image source to the movie poster
  movieCards.querySelector(".movieTitle").textContent = movieData.Title; //set the movie title
  movieCards.querySelector(".movieYear").textContent = movieData.Year; //set the movie year
  movieCards.querySelector(".movieRating").textContent = movieData.imdbRating; //set the movie rating
  movieCards.querySelector(".genre").textContent = movieData.Genre; //set the movie genre
  movieCards.querySelector(".plotDescription").textContent = movieData.Plot; //set the movie plot
}

function displayError(error) {
  const errorMessage = document.querySelector(".errorMessage"); //capture the error message element
  errorMessage.textContent = error; //set the error message text
  errorMessage.style.display = "block";
}
