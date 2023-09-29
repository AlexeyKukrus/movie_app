const fetchMovies = async (search, page) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=bc2677da3dd13efa950721ffd0d57c87&query='${search}'&page=${page}`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    throw new Error('Oшибка получения данных фильмов:', error);
  }
};

export default fetchMovies;
