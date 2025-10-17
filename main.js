document.addEventListener('DOMContentLoaded', function() {
    fetchMovie('Superboys of Malegaon', 'cc');
    fetchWikiData();
    fetchUpcomingSection();
});

function changeText(title, type, combined) {

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

    if (combined) {
        for (let i=0; i < combined[0].length; i++) {
            if (title == combined[0][i]) {
                collection = combined[1][i];
            }
        }
    }

    if (type == 'cc') {
        if (title == 'Chhaava') {
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
                        img_path = movie.backdrop_path ? movie.backdrop_path : movie.poster_path;
                        break;
                    }
                }
            }
            else {
                id = data['results'][0]['id'];
                img_path = data['results'][0]['backdrop_path'] ? data['results'][0]['backdrop_path'] : data['results'][0]['poster_path'];
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
            return fetch(`https://api.themoviedb.org/3/movie/${data['id']}/videos?api_key=${apiKey}&include_video_language=en,hi`)
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

function fetchWikiData () {
    const url = `https://en.wikipedia.org/w/api.php?origin=*&action=parse&format=json&page=List_of_Hindi_films_of_2025&prop=text&section=1`
    
    const html = fetch (url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const parser = new DOMParser();
            const external = parser.parseFromString(data['parse']['text']['*'], "text/html");
            const table = document.adoptNode(external.querySelector("table:nth-of-type(2)"));
            rows = table.querySelectorAll("tr:not(:first-child)")
            const names = Array.from(rows, r => r.querySelector("td:nth-child(2)").textContent.trim()).slice(0,5);
            const collection = Array.from(rows, r => r.querySelector("td:nth-child(5)").textContent.trim()).slice(0,5);
            let cleanNames = []
            for (const name of names) {
                cleanNames.push(name.replace(/[^a-zA-Z0-9 ]/g, ''));
            }
            let combined = [cleanNames, collection];
            return combined;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

    const printHTML = () => {
        html.then((combined) => {
            const container = document.getElementById('boxofficelist');
            const newList = document.createElement("ul");
            newList.classList.add('flex');

            names = combined[0];
            let count = 1;
            
            for (const movie of names) {
                const listItem = document.createElement('li');
                
                const newDiv = document.createElement("div");
                newDiv.classList.add('btn');
                if (count == 1) {
                    newDiv.classList.add('clicked');
                }

                if (count == 5) {
                    newDiv.classList.add('btn-bottom')
                }
                newDiv.id = movie;
                newDiv.addEventListener('click', function() {
                    changeText(movie, 'bo', combined); // Pass the array directly
                });

                newDiv.textContent = movie;
                listItem.appendChild(newDiv);

                newList.appendChild(listItem);
                count++;
            }

            container.appendChild(newList);
            fetchMovie(combined[0][0], 'bo');
        });
    };

    printHTML();
}


function fetchUpcomingData (section, curr_month, curr_date, months) {
    const url = `https://en.wikipedia.org/w/api.php?origin=*&action=parse&format=json&page=List_of_Hindi_films_of_2025&prop=text&section=${section}`
    
    const html = fetch (url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const parser = new DOMParser();
            const external = parser.parseFromString(data['parse']['text']['*'], "text/html");
            const table = document.adoptNode(external.querySelector("table"));
            const rows = table.querySelectorAll("tr:not(:first-child)");

            const names = Array.from(rows, r => r.querySelector("td:has(i)").textContent.trim());
            const firstRow = Array.from(rows, r => r.querySelector("td:nth-child(1)").textContent.trim());
            const firstDates = (Array.from(rows, r => r.querySelector("td:nth-child(2)").textContent.trim())).filter(item => {
                return /^[0-9]+$/.test(item);
            })

            const secondMonthID = months.indexOf(curr_month) != months.length - 1 ? firstRow.indexOf(months[months.indexOf(curr_month) + 1]) : firstRow.length;
            const postMonth = firstRow.slice(firstRow.indexOf(curr_month) + 1, secondMonthID);

            if (firstDates[months.indexOf(curr_month)] >= curr_date) {
                return returnUpcoming(postMonth, names);
            }
            else {
                const upcoming = returnUpcoming(postMonth, names, null, 'start', curr_date);
                if (upcoming) {
                    return upcoming;
                }
            }

            return secondMonthID != firstRow.length ? returnUpcoming(firstRow.slice(secondMonthID + 1), names) : [];
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

    const printUpcomingHTML = () => {
        html.then((upcoming) => {
            const container = document.getElementById('upcomingreleaseslist');
            let count = 1;

            if (upcoming.length === 0) {
                const heading = document.createElement('h1');
                heading.textContent = 'No new movies upcoming';
                container.appendChild(heading);
            }
            else {
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
            }
        });
    };

    printUpcomingHTML();

}

function fetchUpcomingSection() {
    const today = new Date();
    const curr_date = 15;
    //const curr_date = Number(today.toLocaleString('default', { day: 'numeric' }));
    const curr_month = 'OCT';
    //const curr_month = today.toLocaleString('default', { month: 'short' }).toUpperCase();

    let line;
    let months;
    if (curr_month == 'JAN' || curr_month == 'FEB' || curr_month == 'MAR') {
        line = 'January–March';
        months = ['JAN', 'FEB', 'MAR'];
    } else if (curr_month == 'APR' || curr_month == 'MAY' || curr_month == 'JUN') {
        line = 'April–June';
        months = ['APR', 'MAY', 'JUN'];
    } else if (curr_month == 'JUL' || curr_month == 'AUG' || curr_month == 'SEP') {
        line = 'July–September';
        months = ['JUL', 'AUG', 'SEP'];
    } else {
        line = 'October–December';
        months = ['OCT', 'NOV', 'DEC'];
    }

    const url = `https://en.wikipedia.org/w/api.php?origin=*&action=parse&format=json&page=List_of_Hindi_films_of_2025&prop=sections&disabletoc=1`
    fetch (url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const sections = data['parse']['sections'];
            for (const section of sections) {
                if (line == section['line']) {
                    fetchUpcomingData(section['index'], curr_month, curr_date, months);
                }
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
    });
}

function returnUpcoming (postMonth, names, item, type, curr_date) {
    let count = type == 'prev' ? -1 : 1;
    let i = type == 'post' ? postMonth.indexOf(item) + 1 : (type == 'prev' ? postMonth.length - 2 : 0);
    let condition = type == 'prev' ? 0 : postMonth.length;
    while (i != condition) {
        if (/^[0-9]+$/.test(postMonth[i])) {
            if (type == 'start' && postMonth[i] >= curr_date) {
                if (i == postMonth.length - 1
                    || postMonth.slice(i).every(str => /^[0-9]+$/.test(str))) {
                    return returnUpcoming(postMonth, names, postMonth[i], 'prev');
                }
                else {
                    return returnUpcoming(postMonth, names, postMonth[i], 'post');
                }
            }
            count += 1;
        }
        else {
            if (type != 'start') {
                const movie = (type == 'post') ? postMonth[postMonth.indexOf(item) + count] : postMonth[i];
                const namesID = names.indexOf(movie) - count;
                return names.splice(namesID, 3);
            }
        }
        i = type == 'prev' ? i - 1 : i + 1;
    }
}