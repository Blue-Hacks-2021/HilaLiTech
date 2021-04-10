let map;
let isRescuer = false;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: { lat: 14.64907, lng: 121.104973 },
		zoom: 13.5,
	});

	if (!isRescuer) {
		civilMode();
	} else if (isRescuer) {
		rescuerMode();
	}
}

function setFocus(location) {
	map.setCenter(location);
	map.setZoom(15);
}

function setMarker(location) {
	const marker = new google.maps.Marker({
		position: location,
		map: map,
	});
	marker.setMap(map);
}

function setMarkerEvac(location) {
	const marker = new google.maps.Marker({
		position: location,
		map: map,
		icon: 'media/markers/evac.png',
	});
	marker.setMap(map);
}

function setMarkerCritical(location) {
	const marker = new google.maps.Marker({
		position: location,
		map: map,
		icon: 'media/markers/critical.png',
	});
	marker.setMap(map);
}

function setMarkerHigh(location) {
	const marker = new google.maps.Marker({
		position: location,
		map: map,
		icon: 'media/markers/high.png',
	});
	marker.setMap(map);
}

function setMarkerMedium(location) {
	const marker = new google.maps.Marker({
		position: location,
		map: map,
		icon: 'media/markers/medium.png',
	});
	marker.setMap(map);
}

function setMarkerLow(location) {
	const marker = new google.maps.Marker({
		position: location,
		map: map,
		icon: 'media/markers/low.png',
	});
	marker.setMap(map);
}

function removeMarker(markerR) {
	markerR.setMap(null);
}

const userLocation = {
	coordinates: null,
	setCoordinate: function () {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				const pos = {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				};
				this.coordinates = { ...pos };
			});
		} else {
			// Browser doesn't support Geolocation
			alert('Geolocation Not Supported');
		}
	},
};

// Author: Kiza
// Author Link: https://auth.geeksforgeeks.org/user/Kiza
// Source Link: https://www.geeksforgeeks.org/how-to-get-city-name-by-using-geolocation/
function getCity(coordinates) {
	var xhr = new XMLHttpRequest();
	var lat = coordinates.lat;
	var lng = coordinates.lng;

	// Paste your LocationIQ token below.
	xhr.open(
		'GET',
		`https://us1.locationiq.com/v1/reverse.php?key=AIzaSyBsqVNQlUvCNTJ3R-92My0BdCs4cZYyXvI&lat=${lat}&lon=${lng}&format=json`,
		true
	);
	xhr.send();
	xhr.onreadystatechange = processRequest;
	xhr.addEventListener('readystatechange', processRequest, false);

	function processRequest(e) {
		if (xhr.readyState == 4 && xhr.status == 200) {
			var response = JSON.parse(xhr.responseText);
			var city = response.address.city;
			console.log(city);
			return;
		}
	}
}
