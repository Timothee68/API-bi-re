let urls = [
    "https://api.punkapi.com/v2/beers?page=1&per_page=80",
    "https://api.punkapi.com/v2/beers?page=2&per_page=80",
    "https://api.punkapi.com/v2/beers?page=3&per_page=80",
    "https://api.punkapi.com/v2/beers?page=4&per_page=80",
    "https://api.punkapi.com/v2/beers?page=5&per_page=80"
    ]
    // création d'une fonction de génération d'une Promise d'un JSON en y entrant un tableau d'URL
    // rappel : une promise en js permet de réaliser des traitements de façon asynchrone. 
    // Une promesse représente une valeur qui peut être disponible maintenant, dans le futur voir jamais
    // les "await" sont justement du à la fonction qui est async
    async function generation(urls){
    
    const bieres = await Promise.all(urls.map(async url => {
        const resp = await fetch(url);
        return resp.json();
      }));
    return bieres;
    }
    
    // recherche des bières avec taux d'alcool compris entre abvMin et abvMax, 80 résultats maximum
    function rechercherParABV(abvMin, abvMax){
        bieresABVMin = generation(["https://api.punkapi.com/v2/beers?abv_gt="+abvMin+"&per_page=80"]);
    
        killTheChildren(document.getElementById("list-de-card")); // destruction des élements précedents dans l'affichage de la recherche
    
        bieresABVMin.then(bieresAvecMin => {
            bieresAvecMin.forEach(page => {
                page.forEach(biere =>{
                    if(biere.abv <= abvMax){
                        afficherCard(biere);
                    }
    
            })
            } 
        )});
    }
    //recherche des taux d'alcool compris entre
    // <5
    // 6 et 10
    // 11 et 20 
    // > 20
    function rechercheEntre0Et5(){
        rechercherParABV(0,5);
    }
    
    function rechercheEntre5Et10(){
        rechercherParABV(5,10);
    }
    
    function rechercheEntre10Et20(){
        rechercherParABV(11,20);
    }
    
    function rechercheEntre20Et99(){
        rechercherParABV(20,99);
    }
    // recherche des bières avec EBC (classification des bières en fonction de leur couleur) 
    //compris entre ebcMin et ebcMax, 80 résultats maximum
    function rechercherParEBC(ebcMin, ebcMax){
        bieresEBCMin = generation(["https://api.punkapi.com/v2/beers?ebc_gt="+ebcMin+"&per_page=80"]);
    
        killTheChildren(document.getElementById("list-de-card")); // destruction des élements précedents dans l'affichage de la recherche
    
        bieresEBCMin.then(bieresAvecMin => {
            bieresAvecMin.forEach(page => {
                page.forEach(biere =>{
                    if(biere.ebc <= ebcMax){
                        afficherCard(biere);
                    }
            })
            } 
        )});
    }
    // recherche des bières par couleurs
    // blonde = 6 à 15
    // ambree = 15 à 30
    // rousse = 30 à 60
    // brune = 60 à 120
    // noire = 120+
    function rechercherBlonde(){
        rechercherParEBC(6,15);
    }
    function rechercherAmbree(){
        rechercherParEBC(15, 30);
    }
    function rechercherRousse(){
        rechercherParEBC(30, 60);
    }
    function rechercherBrune(){
        rechercherParEBC(60, 120);
    }
    function rechercherNoire(){
        rechercherParEBC(120, 999);
    }
    
    
    // fonction pour rechercher par nom de bière 
    function rechercherParNom(){
    
        killTheChildren(document.getElementById("list-de-card")); // destruction des élements précedents dans l'affichage de la recherche
    
        bieresAvecNom = generation(["https://api.punkapi.com/v2/beers?beer_name="+document.getElementById("search-box").value])
        bieresAvecNom.then(bieres => {
            console.log(bieres);
            bieres.forEach(element => {
                console.log(element);
                element.forEach(e => {
                    console.log(e);
                    afficherCard(e);
                })
            });
        });
    }
    
    //  fonction pour supprimer la dernière recherche et éviter que toutes les recherches s'affichent à la suite 
    function killTheChildren(parent){
        while(parent.firstChild != null){
            parent.removeChild(parent.firstChild);
        }
    }
    
    
    // Ces trois lignes de code permettent de récupérer les infos de la box de recherche html
    // et donc de déclancher avec ce contenu la fontction rechercherParNom
    const searchBox = document.getElementById("search-box");
    const searchButton = document.getElementById("search-button");
    searchButton.addEventListener("click", ()=>rechercherParNom());
    
    // utiliser une col interne à l'image pour la centrer
    function afficherCard(biere){
    // création de la card
    const divCard = document.createElement("div");
    divCard.className="card d-flex align-items-center";
    divCard.style = "width: 22rem;";
    
    // création de la figure
    const fig = document.createElement("figure");
    fig.className = "w-25";
    divCard.appendChild(fig);
    
    // création de l'image
    const img = new Image();
    img.src= biere.image_url;
    img.className = "card-img-top";
    img.alt = "...";
    fig.appendChild(img);
    
    // création du card-body
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
    
    // création du titre
    const titreCard = document.createElement("h5");
    titreCard.innerHTML=biere.name;
    titreCard.className = "card-title";
    cardBody.appendChild(titreCard);
    
    // création du paragraphe
    const paragraphe = document.createElement("p");
    paragraphe.className = "card-text";
    paragraphe.innerHTML = biere.tagline;
    cardBody.appendChild(paragraphe);
    
    // injection du card body dans la card
    divCard.appendChild(cardBody);
    
    // création de l'ul
    const ul = document.createElement("ul");
    ul.className = "list-group list-group-flush";
    
    // et des li
    const li1 = document.createElement("li");
    li1.className = "list-group-item";
    const li2 = document.createElement("li");
    li2.className = "list-group-item";
    const li3 = document.createElement("li");
    li3.className = "list-group-item";
    const li4 = document.createElement("li");
    li4.className = "list-group-item";
    
    li1.innerHTML = "taux d'alcool : "+biere.abv;
    li2.innerHTML = "Echelle de couleur : "+biere.ebc;
    li3.innerHTML = "description : "+biere.description;
    li4.innerHTML = "Brewers tips : "+biere.brewers_tips;
    
    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);
    ul.appendChild(li4);
    
    divCard.appendChild(ul);
    const col = document.createElement("div");
    col.className = "col mt-5 mb-3";
    col.appendChild(divCard);
    document.getElementById("list-de-card").appendChild(col);
    }
    
    // fonction qui affiche 40 bieres par page selectionnée en paramêtre. on utilise ici la fonction generation créée en amont
    // On utilise l'url de l'api avec la variable page. pageBiere sera utilisée par la fonction pagination. 
    function pageBiere(page)
    {
        killTheChildren(document.getElementById("list-de-card"));
        promesseDePages = generation(["https://api.punkapi.com/v2/beers?page="+page+"&per_page=40"]).then( (pages) => {
            pages[0].forEach(biere => {
                afficherCard(biere);
            }) 
        })
    }
    // pagination permet d'afficher les pages de bières par click sur le numéro de la page. 
    function pagination(){
    
        const tableauPage = document.getElementsByClassName("page-item");
        // pour le bouton précdédent
        tableauPage[0].addEventListener("click", ()=>{
            if(numeroPage>1){
                numeroPage--;
                pageBiere(numeroPage);
            }
        })
        for(let i=1; i<tableauPage.length-1; i++){// pour ne pas prendre en compte le previous et le next
            tableauPage[i].addEventListener("click", ()=>{pageBiere(i);
            numeroPage = i;})
        }
        // pour le bouton suivant
        tableauPage[tableauPage.length-1].addEventListener("click", ()=>{
            if(numeroPage<tableauPage.length-2){
                numeroPage++;
                pageBiere(numeroPage);
            }
        });
    }
    pagination();
    