// per caricare la prima pagina
function loadIndex()
{
			// Top Navbar 
	var pageOpening = '<div data-page="index" class="page">'  
					+   '<div class="navbar">'
					+		'<div class="navbar-inner">'
					+			'<div class="center">sportAparma</div>'
					+		'</div>'
					+	'</div>'
						
						// Search Bar with "searchbar-init" class for auto initialization
					+	'<form id="searchbar-form" class="searchbar searchbar-init" data-custom-search="true" >'
					+		'<div class="searchbar-input">'
					+			'<input id="searchbar-input" type="search" placeholder="cerca societa\' sportiva" />'
					+			'<a href="#" class="searchbar-clear"></a>'
					+		'</div>'
					+		'<a href="#" class="searchbar-search">Cerca</a>'
					+	'</form>'
						
						//Search Bar overlay
					+	'<div class="searchbar-overlay"></div>'
 
					+   '<div class="page-content contacts-content">'
					+  		'<div id="sportCarousel" style="padding-top:20px;">';
					
	var pageClosing =  		'</div>' 
					+   '</div>' 
					+ '</div>';

	var dynList = '';
	// contenuto dinamico della nuova pagina	
	for (var i = 0; i < 2; i++)
	{
		dynList += '<div class="sportContainer" id="test'+i+'">'
				+		'Ciao '+i
				+  '</div>';
	}
	
	// con questo comando si carica il contenuto appena creato
	mainView.router.load(
	{
	  content: pageOpening + dynList + pageClosing
	});
	
	
	// evento lanciato quando l'utente avvia la ricerca schiacciando sul pulsante "cerca"
	$$('.searchbar-search').on('click', function() 
	{
		var text = $$('#searchbar-input').val();
		searchAll(text);
	});
	
	// evento lanciato quando l'utente avvia la ricerca da tastiera
	$$('#searchbar-form').on('submit', function() 
	{
		var text = $$('#searchbar-input').val();
		searchAll(text);
	});
	
	// evento lanciato quando l'utente schiaccia su uno sport
	$$('.sportContainer').on('click', function() 
	{
		var text = $$(this).attr('id');
		var sportChosen = searchSport(text);
		if (sportChosen != null && sportChosen != undefined)
		{
			loadSportList(sportChosen);
		}
	});
	
	// ricerca da lanciare quando siamo sicuri che l'utente sta cercando uno sport
	// ovvero quando clicca su uno sport
	function searchSport(id)
	{
		for (var i = 0; i < associazioni.length; i++)
		{
			if (associazioni[i].id == id)
			{
				return associazioni[i];
			}
		}
		
		myApp.alert("nessun risultato per "+id);
		return null;
	}
}