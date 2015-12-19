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

function saveApparts(){
	localStorage.setItem('apparts', JSON.stringify(apparts));
	location.reload();
} 

function saveVente(){
	if(apparts==null)
		return;
	var photos = {document.getElementById("pic1").value, document.getElementById("pic2").value, document.getElementById("pic3").value};
	var appart= new Appart(
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
			('<div class="petit-conteneur">');
				('<section class="box">');
					('<a href="annonce.jsp?idAppart="'+ apt.id'"><div id ="slider" class="image">');
					var photos =apt.photos;
					('<ul>');
					$.each (photos, function(j, pho){
						("<li><img src=\""+pho+"\" alt=\"\" /></li>");
					});
					("</ul>");
					("</a></div>");
					("<p id=\"prix\">"+ (int) apt.prix +" &euro; </p>");
					("<header>");
						("<h3>Description</h3>");
					("</header>");
					("<p>"+ apt.desc() +"</p>");
					("<p>"+ apt.adresse() +"</p>");														
					("<footer>");
					("<a href = \"annonce.jsp?idAppart="+ apt.id()+"\" class=\"button alt\"> Voir l'annonce </a>");
					out.println("</footer>");
				out.println("</section>");
			out.println("</div>");
			nbAppartMaxRow++;
			if(nbAppartMaxRow==3){
				nbAppartMaxRow=0;
				out.println("</div>");
				out.println("<div class=\"row\">");
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
