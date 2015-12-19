// JavaScript Document

var imgHeight;
var boxHeightMax=0;

function Appart(id, type, desc, prix, adresse, photos){
	this.id = id;
	this.type = type;
	this.desc = desc;
	this.prix = prix;
	this.adresse = adresse;
	this.photos = photos;
}

function Apparts(studio, T1, T2, T3){
	this.studio=studio;
	this.T1=T1:
	this.T2=T2; 
	this.T3=T3;
}

var apparts;	
var idAppart;

$(window).load(function(){
	//redimesion fenetre de l'image
	imgH = $("#slider ul li img").height();
	$(".box .image").css({height:imgH});
	
	imgHeight = $("#nexter ul li img").height();
	$(".main-conteneur .image").css({height:imgHeight});
});

$(document).ready(function(){
	$("#block-footer").load('footer.html');
	$("#block-header").load('header.html');

	if(typeof(Storage) !== "undefined") {
		recupAppart();
	}
	else 
		alert("Désolé, mais le Web Storage n'est pas suppoté");
	
});

//SLIDER
var interval;
$(function(){
	$("#slider:has(ul li:gt(1))").hover(
		function (){	
			setTimeout(function(){slideImg()}, 500);
			interval = setInterval(function (){slideImg()}, 4000); 
		}
		,function (){
			stopSlide(); 
	});
});

//NEXTER
$(function(){
	$("#nexter:has(ul li:gt(1))").click(function(){nextImg()});
});


function slideImg(){
	$("#slider ul:hover").animate({marginTop:-imgH}, 2000, function(){
		$(this).css({marginTop:0}).find("li:last").after($(this).find("li:first"));
	});	
}

function nextImg(){
	$("#nexter ul").animate({marginTop:-imgHeight}, 2000, function(){
		$(this).css({marginTop:0}).find("li:last").after($(this).find("li:first"));
	});	
}

function stopSlide(){
	clearInterval(interval);
}

// TRAITEMENT
function saveApparts(){
	localStorage.setItem('apparts', JSON.stringify(apparts));
	localStorage.setItem('idAppart', JSON.stringify(idAppart));
	location.reload();
} 

function saveVente(){
	if(apparts==null)
		return;
	var photos = {document.getElementById("pic1").value, document.getElementById("pic2").value, document.getElementById("pic3").value};
	var appart= new Appart(
						++idAppart,
						document.getElementById("type").value, 
						document.getElementById("desc").value, 
						document.getElementById("prix").value,
						document.getElementById("adresse").value,
						photos);
	if(document.getElementById("type").value == "studio")
		apparts.studio.push(appart);
	else if (document.getElementById("type").value == "T1")
		apparts.T1.push(appart);
	else if (document.getElementById("type").value == "T2")
		apparts.T2.push(appart);
	else if (document.getElementById("type").value == "T3")
		apparts.T3.push(appart);

	saveApparts();
	//reaffTaches();
}

function recupApparts(){
	apparts=JSON.parse(localStorage.getItem('apparts'));
	idAppart= JSON.parse(localStorage.getItem('idAppart'));
	if(apparts == null)
		apparts=new Apparts(NULL, NULL, NULL, NULL);
}

function affAppart(type){
	document.getElementById('main-conteneur').innerHTML="";	
	$("#main-conteneur").load("opensection.html");
	var apts = getAppart(type);	
	var nbAppartMaxRow=0;
	('<header class="titre"> Nod Bites </header>').appendTo($("main-conteneur"));
	if(apts == null || apts.isEmptyObject())
		("Malheureusement aucun "+ type +" n'est disponible a  l'achat...").appendTo($("#main-conteneur"));
	}
	else{
		$.each (apts, function(i, apt){
			('<div class="petit-conteneur">').appendTo($("#main-conteneur"));
				('<section class="box">').appendTo($("#main-conteneur"));
					('<a href="annonce.jsp?idAppart="'+ apt.id'"><div id ="slider" class="image">').appendTo($("#main-conteneur"));
					var photos =apt.photos;
					('<ul>').appendTo($("#main-conteneur"));
					$.each (photos, function(j, pho){
						("<li><img src=\""+pho+"\" alt=\"\" /></li>").appendTo($("#main-conteneur"));
					});
					("</ul>").appendTo($("#main-conteneur"));
					("</a></div>").appendTo($("#main-conteneur"));
					("<p id=\"prix\">"+ (int) apt.prix +" &euro; </p>").appendTo($("#main-conteneur"));
					("<header>").appendTo($("#main-conteneur"));
						("<h3>Description</h3>").appendTo($("#main-conteneur"));
					("</header>").appendTo($("#main-conteneur"));
					("<p>"+ apt.desc() +"</p>").appendTo($("#main-conteneur"));
					("<p>"+ apt.adresse() +"</p>").appendTo($("#main-conteneur"));														
					("<footer>").appendTo($("#main-conteneur"));
					("<a href = \"annonce.jsp?idAppart="+ apt.id+"\" class=\"button alt\"> Voir l'annonce </a>").appendTo($("#main-conteneur"));
					("</footer>").appendTo($("#main-conteneur"));
				("</section>").appendTo($("#main-conteneur"));
			("</div>").appendTo($("#main-conteneur"));
			nbAppartMaxRow++;
			if(nbAppartMaxRow==3){
				nbAppartMaxRow=0;
				("</div>").appendTo($("#main-conteneur"));
				("<div class=\"row\">").appendTo($("#main-conteneur"));
			}
		});
	}
}

function getAppart(type){
	if(apparts == NULL)
		return;
	if(type=="studio")
		return apparts.studio;
	if(type=="T1")
		return apparts.T1;
	if(type=="T2")
		return apparts.T2;
	if(type=="T3")
		return apparts.T3;
}
