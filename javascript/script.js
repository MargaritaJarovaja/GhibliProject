window.onload = () =>{
    const filmsInput = document.getElementById("filmsInput");
    const filmsOutput = document.getElementById("filmsOutput");

    let filmsArray = []; 
  
    const movieRequest = new XMLHttpRequest;  
    movieRequest.open('GET','https://ghibliapi.herokuapp.com/films?limit=250');
    movieRequest.onload = () => {
        filmsArray = JSON.parse(movieRequest.responseText);
        let html = `<option value="NaN">Välj en film</option>`; 
        for (let i = 0; i < filmsArray.length; i++){
            html += `<option value="${filmsArray[i].id}">${filmsArray[i].title}</option>`;
        }

        filmsInput.innerHTML = html;
        console.log(filmsArray);
    };

    movieRequest.send();     

    filmsInput.addEventListener("input", () => {
        let html = "";
        if (filmsInput.value !== "NaN"){
            const movie = filmsArray.find(obj => obj.id === filmsInput.value);
            html += `<img src="${movie.movie_banner}" alt="movieposter">`;
            html += `<h2>${movie.title}</h2>`;         
            html += `<img style="float:right; width:35%; margin-left: 8px;" src="${movie.image}" alt="movieposter">`;
            html += `<p><span>Orginal title:</span> ${movie.original_title}</p>`;
            html += `<p><span>Orginal title romanised:</span>  ${movie.original_title_romanised}</p>`;
            html += `<p><span>Release Date:</span>  ${movie.release_date}</p>`;
            html += `<p><span>Director:</span>  ${movie.director}</p>`;
            html += `<p><span>Producer:</span>  ${movie.producer}</p>`;
            html += `<p><span>Running Time:</span>  ${movie.running_time} minutes</p>`;
            html += `<p><span>Rotten Tomate Score:</span>  ${movie.rt_score}</p>`
            html += `<p><span>Description:</span>  ${movie.description}</p>`;         
        };

        filmsOutput.innerHTML = html;
    });
};