var PUBLIC_KEY = "4e889731a6f6e7083f41c8f77f72c4b0";
var ts = "1520257765";
var hash = "686e766732c14884f699646d8cfb6f0e";
var limit = 25;

/*var nbComicsAffiche=0; //on déclare une variable globale*/
// todo : add characters in modal popup (http://getbootstrap.com/docs/4.0/components/modal/)

function getCharacters(){
	 $("#search-load").show();
	    $("#search-badge").text("");

	    var dates = $("#slider").slider('getValue');
	    //var url = "https://gateway.marvel.com:443/v1/public/comics?apikey=" + PUBLIC_KEY + "&hash=" + hash + "&ts=" + ts;
  		  var url = "https://gateway.marvel.com:443/v1/public/comics/"+ idComic +"/characters?apikey=" + PUBLIC_KEY + "&hash=" + hash + "&ts=" + ts;

	    var filter = "&format=magazine&dateRange=" + dates[0] + "-01-01%2C" + dates[1] + "-12-31&limit=" + limit;

	    $.getJSON( url + filter )
	        .done(function(data) {
	            $("#search-load").hide();
	            $("#search-badge").html(data.data.count + " / " + data.data.total);
	            $("#attribution").html(data.attributionHTML);
	            
	            displayComics(data.data.results); 
	            displayPagination(data.data.count, data.data.total, limit);
	          
	        })
	        .fail(function(err){
	            $("#search-load").hide();
	            $("#search-badge").text("Erreur !");
	            console.log(err);
	        });
}

function displayCharacters(characters){
    //$("#result").html("");
    for(var i=0; i < characters.length; i++) {
        var imgSrc = characters[i].thumbnail.path + "/standard_xlarge." + characters[i].thumbnail.extension;
        var html = "<li class='characters'>"
        html += "<img class='thumb' src='" + imgSrc + "'>";
        html += "<span class='title'>" + characters[i].title + "</span>";
        html += "</li>"
        $("#result").append(html);
    }
}

function getComics() {

    $("#search-load").show();
    $("#search-badge").text("");

    var dates = $("#slider").slider('getValue');
    var url = "https://gateway.marvel.com:443/v1/public/comics?apikey=" + PUBLIC_KEY + "&hash=" + hash + "&ts=" + ts;
    var filter = "&format=magazine&dateRange=" + dates[0] + "-01-01%2C" + dates[1] + "-12-31&limit=" + limit;

    $.getJSON( url + filter )
        .done(function(data) {
            $("#search-load").hide();
            $("#search-badge").html(data.data.count + " / " + data.data.total);
            $("#attribution").html(data.attributionHTML);
            
            displayComics(data.data.results); 
            displayPagination(data.data.count, data.data.total, limit);
          
        })
        .fail(function(err){
            $("#search-load").hide();
            $("#search-badge").text("Erreur !");
            console.log(err);
        });
};


function displayComics(comics) { //on rajoute en parametre le numéro de page pour commencer a i=25 si la page est la 2em
    $("#result").html("");
    for(var i=0 /*nbComicsAffiche*/; i < comics.length; i++) {
        var imgSrc = comics[i].thumbnail.path + "/standard_xlarge." + comics[i].thumbnail.extension;
        var html = "<li class='comics'>"
        html += "<a href='characterView.html' target='_blank'><img class='thumb' src='" + imgSrc + "'></a>";
        html += "<span class='title'>" + comics[i].title + "</span>";
        html += "<a href = 'characterView.html?idComic=" + comics[i].id   + "'>VOIR</a>";
        html += "</li>"
        $("#result").append(html);
    }
}


function displayPagination(count, total, limit) {

    var pg = $("nav ul.pagination");
    pg.empty();
    var html = "";

    if (total > limit) {
        nb_page = Math.ceil(total / count);
        for(var i=1; i <= nb_page; i++) {
            html += "<li class=\"page-item\"><a id=\"page" + i + "\" class=\"page-link\" href=\"#\">" + i + "</a></li>";
            //todo
            
            /*document.getElementById("page" + i).onclick = function() {
            	nbComicsAffiche = (i - 1) * 25; //si la page est 1 on fait (1-1)*25 = 0 pour commencer a 0 qui est le premier élément du ta
            	displayComics(data.data.results);           
            };*/
        }
    }
        pg.html(html);
}


$(document).ready(function() {


    var mySlider = $("#slider").slider();

    $( "#search" ).click(function() {
        getComics();
        getCharacters();
    });

});

function $_GET(param) {
	var vars = {};
	window.location.href.replace( location.hash, '' ).replace( 
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if ( param ) {
		return vars[param] ? vars[param] : null;	
	}
	return vars;
}
