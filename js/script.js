const ApiKey = "3c90e722-ff85-4da4-a064-98a7da8dd911";
const baseUrl = "https://api.thecatapi.com/v1/";

const viewbreeds = `${baseUrl}breeds`;
const viewcategories = `${baseUrl}categories`;
var ViewModal = document.querySelector('.modal');

const contents = document.querySelector("#content-list");
const title = document.querySelector(".card-title");

const fetchHeader = {
    headers: {
        'x-api-key': ApiKey
    }
};

function getListCategories() {
   // title.innerHTML = "Kategori"
    fetch(viewcategories, fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            let html = '';
            resJson.forEach(categories => {
                let b = `
                            <div class="col s12 m3">
                                <div class="card grey darken-3">
                                <div class="card-content white-text">
                                    <span class="card-title">${categories.name}</span>
                                    <p>     ID      : ${categories.id} <br>
                                            Nama  : ${categories.name} 
                                    </p>
                                </div>
                                
                                </div>
                            </div>
                        `;
                html+=b;
            });
            let container = document.querySelector('.list');
            container.innerHTML = html;     
        })
}

function getListBreeds() {
    fetch(viewbreeds, fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            let html = '';
            resJson.forEach(breeds => {
                let c = `
                            <div class="col s12 m4">
                            <div class="card white darken-2">
                            <div class="card-content black-text">
                                <p> ID      : ${breeds.id} <br><br>
                                    Asal    : ${breeds.origin} <br><br>
                                    Nama    : ${breeds.name}

                                </p>
                                <div class="card-action">
                                 <a href="#modal1" data-id="${breeds.id}" class="secondary-content modal-trigger">
                                 <i class="material-icons" data-id="${breeds.id}">info</i></a>
                            </div>
                            </div>
                            </div>
                            </div>
                        `;
                html+=c;
            });
            
            let container = document.querySelector('.list');
            container.innerHTML = html;    
        })
}

function getInfoBreeds(id){
    fetch(id,fetchHeader)
    .then(response => response.json())
        .then(resJson => {
                ViewModal.innerHTML=`
                <div class="col s12 m7">
                <h4 class="header">Informasi Detail</h4>
                <div class="card horizontal">
                     </div>
                        <div class="card-stacked">
                        <div class="card-content">
                            <h5>${resJson.name}</h5>
                                <p>
                                    Id          : ${resJson.id} <br> 
                                    Name        : ${resJson.name} <br>                                    
                                    Temperamen  : ${resJson.temperament} <br>
                                    Deskripsi   : ${resJson.description} 
                                </p>
                        </div>
                        
                        <div class="modal-footer">
                        <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
                        </div> ` ;
        }).catch(err => {
            console.error(err);
    })
}


function loadPage(page) {
    switch (page) {
        case "categories":
            getListCategories();
            break;
        case "breeds":
            getListBreeds();
            break;        
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
    // getListBreeds();

    document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
        elm.addEventListener("click", evt => {
            let sideNav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sideNav).close();
            page = evt.target.getAttribute("href").substr(1);
            loadPage(page);
        })
    })
    var page = window.location.hash.substr(1);
    if (page === "" || page === "!") page = "categories";
    var modal = document.querySelectorAll('.modal');
    M.Modal.init(modal);
    loadPage(page);

});

