const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'shazam.p.rapidapi.com',
        'X-RapidAPI-Key': 'adc5082072msh0760dcdf7189792p184a37jsn7fbceb199f76'
    }
};

export function fetchTopTracks() {
    return fetch('https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=rj&api_key=75df4c0dd1c2d1c7cd0bbbc551f3d373&format=json', options)
        .then(response => response.json())
        .catch(err => console.error(err));
}