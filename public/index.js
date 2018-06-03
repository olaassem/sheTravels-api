//G O O G L E    P L A C E S    C O D E//

function initialize(){
   initAutocomplete();
}

let placeSearch;
let autocomplete;
let geocoder;

//Access the Google Maps API geocoding service
function initAutocomplete(){
	geocoder = new google.maps.Geocoder();
	autocomplete = new google.maps.places.Autocomplete(
    (document.getElementById('autocomplete')), {
    	types: ['geocode']
    });

    autocomplete.addListener('place_changed', fillInAddress);
}

//Get queried location place id & lat/long and declare as variables
function codeAddress(address){
	geocoder.geocode({
		'address': address
	}, function( results, status ){
		//if valid query input
		if (status === 'OK') {
			console.log(results);

			let queryLatitude = results[0].geometry.location.lat();
			let queryLongitude = results[0].geometry.location.lng();
      let placeid = results[0].place_id;
      console.log(placeid);

      getDetails(placeid);
      	//if invalid query input
    	} else {
    		console.log(status);
    	}
  	});
}

function fillInAddress(){
	let place = autocomplete.getPlace();
	codeAddress(document.getElementById('autocomplete').value);
}

function getDetails(placeid){
  console.log(`this is the ${placeid}!`);
  $.getJSON( (`https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeid}&key=AIzaSyA6ECb06GHjgfRQjrOJKy6tQqScBimbFmA`))
	.done(function ( data ){
		console.log( data )
	}).fail(function ( data ){
		alert('getdetials function Ajax Call Failed!')
	});
}



//G O O G L E    M A P S    C O D E//

//  Google Maps Marker Icons
//const GOOGLE_MAPS_ENDPNT = 'https://maps.googleapis.com/maps/api/js';
//const GOOGLE_MAPS_API_KEY = 'AIzaSyA6ECb06GHjgfRQjrOJKy6tQqScBimbFmA';

//Create map
function initMap( lat, lng, index ){
	let location ={
		lat: parseFloat(lat),
		lng: parseFloat(lng)
	};

	//New map
	let map = new google.maps.Map(document.getElementById('map' + index),{
		zoom: 15,
		center: location
	});
	//Location marker
	let marker = new google.maps.Marker({
		position: location,
		map: map,
		animation: google.maps.Animation.DROP
	});
}
