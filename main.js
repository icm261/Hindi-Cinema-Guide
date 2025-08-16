document.addEventListener('DOMContentLoaded', function() {
    fetchMovie('Chhaava', 'bo');
    fetchMovie('Superboys of Malegaon', 'cc');

    const upcoming = ['Metro In Dino', 'Dhadak 2', 'War 2'];
    const container = document.getElementById('upcomingreleaseslist');
    let count = 1;

    for (const movie of upcoming) {
        const trailer = document.createElement('a');
        trailer.id = `uptrailer + ${count}`;
        trailer.setAttribute("target", "_blank");

        const newDiv = document.createElement("div");
        newDiv.classList.add('releaseitem');
        newDiv.classList.add('flex');
        trailer.appendChild(newDiv);

        const heading = document.createElement('h4');
        heading.textContent = movie;
        newDiv.appendChild(heading);

        const img = document.createElement('img');
        img.id = `upimg + ${count}`;
        newDiv.appendChild(img);

        const director = document.createElement('p');
        director.id = `updirector + ${count}`;
        director.textContent = movie;
        newDiv.appendChild(director);

        const actors = document.createElement('p');
        actors.id = `upactors + ${count}`;
        actors.textContent = movie;
        newDiv.appendChild(actors);

        fetchMovie(movie, `up + ${count}`);
        container.appendChild(trailer);
        count ++;
    }
});

function changeText(title, type) {

    fetchMovie(title, type);

    const elementID = type == 'bo' ? 'boxoffice' : 'criticschoice';
    const activeButton = document.getElementById(elementID).querySelector('.clicked');
    activeButton.classList.remove('clicked');
    if (title == 'Chhaava' && type == 'cc') {
            document.getElementById('Chhaava2').classList.add('clicked');
        }
    else {
        document.getElementById(title).classList.add('clicked');
    }

    let collection;
    let quote;

    if (title == 'Kesari Chapter 2') {
        collection =  '₹144.35cr';
    } else if (title == 'Sky Force') {
        collection =  '₹168.88cr';
    } else if (title == 'Sikandar') {
        collection = '₹176.18cr';
    } else if (title == 'Raid 2') {
        collection = '₹238.33cr';
    } else if (title == 'Chhaava' && type == 'bo') {
        collection = '₹797.34cr';
    } else if (title == 'Chhaava' && type == 'cc') {
        quote =  'A thunderous tribute to a beloved hero';
    } else if (title == 'Dhoom Dhaam') {
        quote =  'An entertaining rom-com';
    } else if (title == 'Deva') {
        quote = 'Mumbai Police gets a fiery remake';
    } else if (title == 'The Mehta Boys') {
        quote = 'A deep dive into the complexities of a father-son relationship';
    } else if (title == 'Superboys of Malegaon') {
        quote = 'A tribute to the cinephile';
    } else {
        console.log ('Title Not In Selection');
    }

    type == 'bo' 
        ? document.getElementById('collection').innerHTML = `<h3 id="collection">Worldwide Collection: <span class="boldText">${collection}</span></h3>`
        : document.getElementById('quote').innerHTML = `<h3 class="italicText">${quote}</h3>`;
};

function fetchMovie (title, type) {

    const apiKey = 'bd7de59eab8dc1c4cc5d1319ce5e35f0';
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(title)}`

    fetch (url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            let img_path;
            let id;

            if (data['results'].length > 1) {
                for (const movie of data['results']) {
                    const year = movie.release_date.substring(0,4);
                    if (year == '2025' && movie.original_language == 'hi') {
                        id = movie.id;
                        img_path = movie.backdrop_path;
                        break;
                    }
                }
            }
            else {
                id = data['results'][0]['id'];
                img_path = data['results'][0]['backdrop_path'];
            }

            const imgid = type == 'bo' ? 'boimg' : ((type == 'cc') ? 'ccimg' : `upimg + ${type[type.length-1]}`);
            document.getElementById(imgid).src = `https://image.tmdb.org/t/p/original/${img_path}`;
            return fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then (data => {
            const crew = data['crew'];
            let director;

            for (const member of crew) {
                if (member.job == 'Director') {
                    director = member.name;
                    break;
                }
            }

            const cast = data['cast'];
            let actors = '';
            let count = 0;

            for (const actor of cast) {
                if (count > 2) {
                    break;
                }

                if (count == 0) {
                    actors += actor.name;
                }
                else {
                    actors += ', ' + actor.name;
                }
                count ++;
            }

            const dirid = type == 'bo' ? 'director' : ((type == 'cc') ? 'ccdirector' : `updirector + ${type[type.length-1]}`);
            const actid = type == 'bo' ? 'actors' : ((type == 'cc') ? 'ccactors' : `upactors + ${type[type.length-1]}`);
            
            document.getElementById(dirid).innerHTML = `<p id="${dirid}"><span class="boldText">Director:</span> ${director}</p>`;
            document.getElementById(actid).innerHTML = `<p id="${actid}"><span class="boldText">Actors:</span> ${actors}</p>`;
            return fetch(`https://api.themoviedb.org/3/movie/${data['id']}/videos?api_key=${apiKey}`)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (type.substring(0,2) == 'up') {
                for (const video of data['results']) {
                    if (video.type == 'Trailer') {
                        document.getElementById(`uptrailer + ${type[type.length-1]}`).href = `https://www.youtube.com/watch?v=${video.key}`;
                        break;
                    }
                }
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

}