function singleMap() {
    try {
        //   marker ------------------
        var myLatLng = {
            lng: $('#singleMap').data('longitude'),
            lat: $('#singleMap').data('latitude'),
        };
        //  map settings ------------------	
        var single_map = new google.maps.Map(document.getElementById('singleMap'), {
            zoom: 13,
            center: myLatLng,
            scrollwheel: false,
            zoomControl: false,
            fullscreenControl: false,
            mapTypeControl: false,
            scaleControl: false,
            panControl: false,
            navigationControl: false,
            streetViewControl: false,
            styles: [{
                    "featureType": "all",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                            "saturation": 36
                        },
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 40
                        }
                    ]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.text.stroke",
                    "stylers": [{
                            "visibility": "on"
                        },
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 16
                        }
                    ]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.icon",
                    "stylers": [{
                        "visibility": "off"
                    }]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry.fill",
                    "stylers": [{
                            "color": "#000000"
                        },
                        {
                            "lightness": 20
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                            "color": "#000000"
                        },
                        {
                            "lightness": 17
                        },
                        {
                            "weight": 1.2
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "geometry",
                    "stylers": [{
                            "color": "#000000"
                        },
                        {
                            "lightness": 20
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [{
                            "color": "#000000"
                        },
                        {
                            "lightness": 21
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [{
                            "color": "#000000"
                        },
                        {
                            "lightness": 17
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                            "color": "#000000"
                        },
                        {
                            "lightness": 29
                        },
                        {
                            "weight": 0.2
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry",
                    "stylers": [{
                            "color": "#000000"
                        },
                        {
                            "lightness": 18
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "geometry",
                    "stylers": [{
                            "color": "#000000"
                        },
                        {
                            "lightness": 16
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "geometry",
                    "stylers": [{
                            "color": "#000000"
                        },
                        {
                            "lightness": 19
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [{
                            "color": "#000000"
                        },
                        {
                            "lightness": 17
                        }
                    ]
                }
            ]
        });
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: single_map,
            draggable: false,
            title: 'Terraformer - Rua Vista, Centurion'
        });

        function changeMarkerPos(lat, lon) {
            myLatLng = new google.maps.LatLng(lat, lon)
            marker.setPosition(myLatLng);
            single_map.panTo(myLatLng);
        }
        $(".map-link").on("click", function(a) {
            a.preventDefault();
            $(".map-link").removeClass("ml_act");
            var tdInit = $(this).data('linklat');
            var tdInit2 = $(this).data('linklong');
            $(this).addClass("ml_act");
            changeMarkerPos(tdInit, tdInit2);
        });
        var scrollEnabling = $('.scrollContorl');
        $(scrollEnabling).click(function(e) {
            e.preventDefault();
            $(this).toggleClass("enabledsroll");

            if ($(this).is(".enabledsroll")) {
                single_map.setOptions({
                    'scrollwheel': true
                });
            } else {
                single_map.setOptions({
                    'scrollwheel': false
                });
            }
        });
        var zoomControlDiv = document.createElement('div');
        var zoomControl = new ZoomControl(zoomControlDiv, single_map);

        function ZoomControl(controlDiv, single_map) {
            zoomControlDiv.index = 1;
            single_map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(zoomControlDiv);
            controlDiv.style.padding = '5px';
            var controlWrapper = document.createElement('div');
            controlDiv.appendChild(controlWrapper);
            var zoomInButton = document.createElement('div');
            zoomInButton.className = "mapzoom-in";
            controlWrapper.appendChild(zoomInButton);
            var zoomOutButton = document.createElement('div');
            zoomOutButton.className = "mapzoom-out";
            controlWrapper.appendChild(zoomOutButton);
            google.maps.event.addDomListener(zoomInButton, 'click', function() {
                single_map.setZoom(single_map.getZoom() + 1);
            });
            google.maps.event.addDomListener(zoomOutButton, 'click', function() {
                single_map.setZoom(single_map.getZoom() - 1);
            });
        }
    } catch (error) {
        console.error('Error initializing Google Maps:', error);
        // Show a fallback message
        var mapContainer = document.getElementById('singleMap');
        if (mapContainer) {
            mapContainer.innerHTML = '<div style="padding: 20px; text-align: center; background: #f5f5f5; border-radius: 5px;"><p>Map temporarily unavailable. Please visit us at:<br><strong>Rua Vista, Centurion, 0187</strong></p><p><a href="https://maps.app.goo.gl/t6XP42MtGp4fox9k7" target="_blank" style="color: #007bff;">View on Google Maps</a></p></div>';
        }
    }
}
var single_map = document.getElementById('singleMap');
if (typeof(single_map) != 'undefined' && single_map != null) {
    // Check if Google Maps is loaded
    if (typeof google !== 'undefined' && google.maps) {
        google.maps.event.addDomListener(window, 'load', singleMap);
    } else {
        // If called from callback, run immediately
        if (document.readyState === 'complete') {
            singleMap();
        } else {
            window.addEventListener('load', singleMap);
        }
    }
}