export function fetchFilms(include_adult) {
    return fetch(`https://api.themoviedb.org/3/discover/movie?api_key=d65708ab6862fb68c7b1f70252b5d91c&language=ru-RU&sort_by=popularity.desc&include_adult=${include_adult}&include_video=false&page=1&with_watch_monetization_types=flatrate`)
        .then(response => response.json())
        .catch(err => console.error(err));
}

export function fetchFilmById(id){
    return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=d65708ab6862fb68c7b1f70252b5d91c&language=ru-RU`)
    .then(response => response.json())
    .catch(err => console.error(err));
}
export function fetchSimilarFilmsById(id){
    return fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=d65708ab6862fb68c7b1f70252b5d91c&language=ru-RU`)
    .then(response => response.json())
    .catch(err => console.error(err));
}