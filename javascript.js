function searchMovie() {
    let btnSearch = document.getElementById('search');
    let inputSearch = document.getElementById('input-search');
    let content = document.getElementById('content');

    btnSearch.addEventListener('click', function () {
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
                    let contentFilm = document.getElementById('content-film');

                    let filmList = [];

                    console.log(movies.length);
                    

                    for (let i = 0; i < movies.length; i++) {
                        filmList.push(`
                            <div class="content-film" >
                                    <div class="content-film-title">
                                        <p>${movies[i].Title}</p>
                                    </div>
                                    <div class="content-film-img">
                                        <img src="${movies[i].Poster}" alt="">
                                    </div>
                                    <div class="content-film-btn">
                                        <p>See Detail >></p>
                                    </div>
                            </div>
                        `)
                    }

                    join = filmList.join('');
                    contentFilm.innerHTML = join;
                    console.log(filmList);
                    
                    console.log(movies);
                    
                    console.log(movies[1].Title);
                    


                } else {
                    content.innerHTML = `<h2 class="error">${result.Error}</h2>`;

                }
                // console.log(result);

            }
        });
    })



}

searchMovie();