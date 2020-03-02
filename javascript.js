let btnSearch = document.getElementById('search');
let inputSearch = document.getElementById('input-search');
let content = document.getElementById('content');
let contentFilm = document.getElementById('content-film');

function MovieList() {
    $.ajax({
        url: 'http://www.omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': '47bf85bb',
            's': inputSearch.value,
        },
        success: function (result) {

            if (result.Response == "True") {
                let movies = result.Search;

                let filmList = [];

                console.log(movies.length);

                console.log(filmList);

                for (let i = 0; i < movies.length; i++) {
                    filmList.push(`
                        <div class="content-film" >
                                <div class="content-film-img">
                                    <img src="${movies[i].Poster}" alt="">
                                </div>
                                <div class="content-film-title">
                                    <h4>${movies[i].Title}</h4>
                                    <p>${movies[i].Year}</p>
                                </div>
                                <div class="content-film-btn">
                                    <p>See Detail >></p>
                                </div>
                        </div>
                    `)
                }

                join = filmList.join('');
                contentFilm.innerHTML = join;

                console.log(join);


            } else {
                content.innerHTML = `<h2 class="error">${result.Error}</h2>`;

            }
            console.log(result);

        }
    });
}

function searchMovie() {

    btnSearch.addEventListener('click', function () {
        
        MovieList();
        // window.location.reload();
    })

    inputSearch.onkeyup = function(e){
        if (e.which === 13) {
            MovieList();
        }
        
    }
}






searchMovie();

