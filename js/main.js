/*global $, jQuery, alert*/
$(document).ready(function () {

    'use strict';

    $("#menu-toggle").click(function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });

    var trigger = $('.hamburger'),
        overlay = $('.overlay'),
        isClosed = false;

    trigger.click(function () {
        hamburger_cross();
    });

    function hamburger_cross() {

        if (isClosed == true) {
            overlay.hide();
            trigger.removeClass('is-open');
            trigger.addClass('is-closed');
            isClosed = false;
        } else {
            overlay.show();
            trigger.removeClass('is-closed');
            trigger.addClass('is-open');
            isClosed = true;
        }
    }

    // ========================================================================= //
    //  Typed Js
    // ========================================================================= //

    var typed = $(".typed");

    $(function () {
        typed.typed({
            strings: [
                "Cleaning",
                "Integration",
                "Processing",
                "Analytics",
                "Science"
            ],
            typeSpeed: 100,
            loop: true
        });
    });


    var panorama = [];
    var viewer = [];


    var locations = [{location: {lat: 42.022881, lng: -93.610062}},
        {location: {lat: 42.026086, lng: -93.609412}},
        {location: {lat: 42.045608, lng: -93.644685}},
        {location: {lat: -33.867386, lng: 151.195767}},
        {location: {lat: -33.867386, lng: 151.195767}},
        {location: {lat: -33.867386, lng: 151.195767}},
        {location: {lat: -33.867386, lng: 151.195767}},
        {location: {lat: -33.867386, lng: 151.195767}},
        {location: {lat: -33.867386, lng: 151.195767}}];

    var streetviewService = new google.maps.StreetViewService;

    function initialize() {

        var randInt = Math.floor(Math.random() * 4);

        streetviewService.getPanorama(
            locations[randInt],
            function (result, status) {
                if (status === 'OK') {
                    $('.pano-container').each(function (index) {
                        panorama[index] = new PANOLENS.GoogleStreetviewPanorama(result.location.pano);
                        viewer[index] = new PANOLENS.Viewer({container: $(this)[0]});
                        viewer[index].add(panorama[index]);
                        viewer[index].OrbitControls.noZoom = true;

                        viewer[index].addUpdateCallback(function () {
                            viewer[index].panorama.rotation.y -= 0.001;
                        });


                    });

                }
            });
    }

    initialize();

    $('#blogCarousel').carousel({
        interval: 3000
    });


});
