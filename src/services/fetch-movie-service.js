import React from 'react';

class ServiceApi extends React.Component {
  constructor() {
    super();
    this.state = {
      url: new URL('https://api.themoviedb.org'),
      apiKey: 'bc2677da3dd13efa950721ffd0d57c87',
    };
  }

  async getAllMovies(movieName) {
    let url = new URL('3/search/movie', this.state.url);
    url.searchParams.set('api_key', this.state.apiKey);
    url.searchParams.set('query', movieName);
    try {
      const result = await fetch(url);
      if (!result.ok) throw new Error(`Failed to Fetch: ${url} Description: ${result.statusText}`);
      return await result.json();
    } catch (e) {
      throw new Error('Ошибка получения фильмов');
    }
  }

  async getPageMovies(movieName, page) {
    let url = new URL('/search/movie', this.state.url);
    url.searchParams.set('api_key', this.state.apiKey);
    url.searchParams.set('query', movieName);
    url.searchParams.set('page', page);
    try {
      const result = await fetch(url);
      if (!result.ok) throw new Error(`Failed to Fetch: ${url} Description: ${result.statusText}`);
      return await result.json();
    } catch (e) {
      throw new Error('Ошибка получения фильмов');
    }
  }

  async getGenres() {
    let url = new URL('3/genre/movie/list', this.state.url);
    url.searchParams.set('api_key', this.state.apiKey);
    try {
      const result = await fetch(url);
      if (!result.ok) {
        throw new Error('Failed to Fetch');
      }
      return await result.json();
    } catch (e) {
      throw new Error('Ошибка получения фильмов');
    }
  }
}

export default ServiceApi;
