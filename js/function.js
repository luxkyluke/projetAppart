// JavaScript Document

var imgHeight;
var boxHeightMax=0;

function Appart(type, desc, prix, adresse, photos){
	//this.id = id;
	this.type = type;
	this.desc = desc;
	this.prix = prix;
	this.adresse = adresse;
	this.photos = photos;
}

function Apparts(studio, T1, T2, T3){
	this.studio=studio;
	this.T1=T1;
	this.T2=T2; 
	this.T3=T3;
}

var apparts;	
//var idAppart;

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
		recupApparts();

		/*var photos = {0 : "\\images\\appart\\studio1-1.jpg", 1 : "\\images\\appart\\studio1-2.jpg", 2 : "\\images\\appart\\studio1-3.jpg"};
		var appart= new Appart("studio", "super appart vu sur la mer tout ça", "50 000", "22 rue du roule", photos);
		apparts.studio.push(appart);
		saveApparts();*/
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
	//location.reload();
} 

function saveVente(){
	if(apparts==null)
		return;
	var photos = {0 : document.getElementById("pic1").value, 1 : document.getElementById("pic2").value, 2 : document.getElementById("pic3").value};
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
	if(apparts.length == 0)
		apparts=new Apparts(new Array(), new Array(), new Array(), new Array());
}

//COUCOU COUAVOUZZ !!

function affAppart(type){
	document.getElementById('main-conteneur').innerHTML="";
	$("#main-conteneur").append('<div id="block-main">');
		$("#block-main").append('<div class="conteneur">');
			$(".conteneur").append('<div class="large-conteneur">');
				$(".large-conteneur").append('<section id="section">');
	var apts = getAppart(type);	
	var nbAppartMaxRow=0;
	var row=0;
	var str = type.charAt(0).toUpperCase() + type.slice(1);
	$('#section').append('<header class="titre"> <h2> Nos '+ str +'s </h2></header>');
	if(apts == null || apts.length == 0){
		$('#section').append("Malheureusement aucun "+ type +"s n'est disponible à l'achat...");
	}
	else{
		$('#section').append('<div class="row" id ="row'+row+'">');
		$.each (apts, function(i, apt){
			$('#row'+row).append('<div class="petit-conteneur" id="pt-cont'+i+'">');
				$('#pt-cont'+i).append('<section class="box" id="box'+i+'">');
					$('#box'+i).append('<a href="javascript:affAnnonce('+i+')"><div id ="slider" class="image">');
						var photos =apt.photos;
						if(photos != null){
							var str="";
							var charge=false;
							var phos = new Array();
							var nbPh=0;
							var img;
							$.each (photos, function(j, pho){
								img = precharger_image('C:\\Users\\TonioDeMoreno\\Documents\\Pweb\\projet'+pho);
								    
							    img.onload = function()
							    {
							       $('#slider').append('<ul><li><img src="'+img.src+ '"</li></ul>');
							    }
								
							});
							/*$('#slider').append('<ul><li></li></ul>');
							$('#slider ul li').attr('C:\\Users\\TonioDeMoreno\\Documents\\Pweb\\projet', 'mon-image.jpg').load(function(){
							    $('body').append(this);
							});*/

							/*while(!charge){
								image.onload = function(){
									charge=true;
								}
							}*/
							//$.each (phos, function(j, p){
								//str+='<li>/></li>';
							//});
							
						}
				   		else
				   			$('#slider').append('<ul><li><img></li></ul>');                    
					//$('#box'+i).append("</div></a>");
					$('#box'+i).append("<p id=\"prix\">"+ apt.prix +" &euro; </p>");
					$('#box'+i).append("<header><h3>Description</h3></header>");
					$('#box'+i).append("<p>"+ apt.desc +"</p>");
					$('#box'+i).append("<p>"+ apt.adresse +"</p>");													
					$('#box'+i).append('<footer><a href="javascript:affAnnonce('+i+')" class=\"button alt\"> Voir l\'annonce </a></footer>');
				$('#pt-cont'+i).append("</section>");
			$('#row'+row).append("</div>");
			nbAppartMaxRow++;
			if(nbAppartMaxRow==3){
				nbAppartMaxRow=0;
				row++;
				$('#section').append('<div class="row" id ="row'+row+'">');
				/*$('#section').append("</div>");
				$('#section').append("<div class=\"row\">");*/
			}
		});
	}				
}

function precharger_image(url){
    var img = new Image();
    img.src=url;
    return img;
}

function getAppart(type){
	if(apparts == null)
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
