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

                // console.log(movies.length);

                // console.log(filmList);

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
                                <div class="content-film-btn" data-id="${movies[i].imdbID}" onClick="showpopUp()">
                                    <p>See Detail >></p>
                                </div>
                        </div>
                    `)
                }

                join = filmList.join('');
                contentFilm.innerHTML = join;

                // console.log(join);


            } else {
                contentFilm.innerHTML = `<h2 class="error">${result.Error}</h2>`;
            }
            
            // ShowPopUp ();
            getDataPopup();
        }
    });
}

function searchMovie() {

    btnSearch.addEventListener('click', function () {
        
        MovieList();
    })

    inputSearch.onkeyup = function(e){
        if (e.which === 13) {
            MovieList();
            
        }
        
    }
}



function getDataPopup (){
    let seeDetail = document.getElementsByClassName('content-film-btn');
    let popUp = document.getElementById('popUp');


    for (let i = 0 ; i < seeDetail.length ; i++) {
        seeDetail[i].addEventListener('click' , function(){
            console.log(this.dataset.id);

            $.ajax({
                url: 'http://www.omdbapi.com',
                type: 'get',
                dataType: 'json',
                data: {
                    'apikey': '47bf85bb',
                    'i': this.dataset.id,
                },
                success: function (movie) {
        
                    if (movie.Response === "True") {
        
                        let filmDetail = [];
                        console.log(movie);
                     
        
                        // console.log(movies.length);
        
        
                            filmDetail.push(`
                                <div class="popUp-box">
                                    <div class="popUp-Title">
                                        <h3>${movie.Title}</h3>
                                        <button id="popUp-btn-close" onClick="closePopUpBtn()">X</button>
                                    </div>
                                    <div class="popUp-Img">
                                        <img src="${movie.Poster}" alt="">
                                    </div>
                                    <div class="popUp-Detail">
                                        <div class="popUp-Detail-Plot">
                                            <h3>Description</h3>
                                            <p>${movie.Plot}</p>
                                        </div>
                                        <div class="popUp-Detail-Cast">
                                            <span>Cast : ${movie.Actors}</span>
                                        </div>
                                    </div>
                                </div>
                            `)
                        

                        console.log(filmDetail);
                        
        
                        join = filmDetail.join('');
                        popUp.innerHTML = join;
        
                        // console.log(join);
        
        
                    } else {
                        contentFilm.innerHTML = `<h2 class="error">${result.Error}</h2>`;
                    }
                }
            });
            
            
        })
    }
    
    // 
}


function showpopUp (){
    let popUp = document.getElementById('popUp');
    
    popUp.style.display = 'block';
    overlay.classList.add('active');


  

}

function closePopUpBtn (){
    let btnClose = document.getElementById('popUp-btn-close');
    let popUp = document.getElementById('popUp');
    console.log(btnClose);

    // btnClose.addEventListener('click', function(){
        // console.log('here');
    popUp.style.display = 'none';
    overlay.classList.remove('active'); 
        
    // })

    
   
}

searchMovie();
closePopUpBtn ();

