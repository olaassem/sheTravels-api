

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
			let queryLatitude = results[0].geometry.location.lat();
			let queryLongitude = results[0].geometry.location.lng();
      let placeid = results[0].place_id;

      //Call api functions and pass lat and lng params through them
			initMap( queryLatitude, queryLongitude );
      getDetails( placeid );
      	//if invalid query input
    	} else {
    		console.log( status );
    	}
  	});
}

function fillInAddress(){
	let place = autocomplete.getPlace();
	codeAddress(document.getElementById('autocomplete').value);
}

function getDetails(placeid){
  $.getJSON( (`https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeid}&key=AIzaSyA6ECb06GHjgfRQjrOJKy6tQqScBimbFmA`))
	.done(function ( data ){
		console.log( data );
    let photoRef = data.result.photos[0].photo_reference;
    console.log(photoRef);
    getImg( photoRef );

    $('.locationInfo').html(`
      <p class="name">${data.result.name}</p>
      <p class="address">${data.result.formatted_address}</p>
      `)

      // <p class="country">${data.result.address_components[3].long_name}</p>


	}).fail(function ( status ){
		alert('getDetails function Ajax Call Failed!')
	});
}


function getImg(photoRef){
  console.log(photoRef);

    $('.locationImg').html(`
      <img src="https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&photoreference=${photoRef}&key=AIzaSyA6ECb06GHjgfRQjrOJKy6tQqScBimbFmA" alt="" />
      `)
}





//G O O G L E    M A P S    C O D E//

//  Google Maps Marker Icons
//const GOOGLE_MAPS_ENDPNT = 'https://maps.googleapis.com/maps/api/js';
//const GOOGLE_MAPS_API_KEY = 'AIzaSyA6ECb06GHjgfRQjrOJKy6tQqScBimbFmA';
//
//Create map
function initMap( lat, lng ){
	let location = {
		lat: parseFloat(lat),
		lng: parseFloat(lng)
	};

  console.log(location);

	//New map
	let map = new google.maps.Map(document.getElementById('map'),{
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

function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}
