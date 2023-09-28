const fetchMovies = async () => {
  try {
    const response = await fetch(
      'https://api.themoviedb.org/3/search/movie?api_key=bc2677da3dd13efa950721ffd0d57c87&query="return"'
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log('Oшибка получения данных фильмов:', error);
    return [];
  }
};

export default fetchMovies;
