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
        {location: {lat: 42.022881, lng: -93.610062}},
        {location: {lat: 42.022881, lng: -93.610062}},
        {location: {lat: 42.022881, lng: -93.610062}},
        {location: {lat: 42.022881, lng: -93.610062}},
        {location: {lat: 42.022881, lng: -93.610062}},
        {location: {lat: 42.022881, lng: -93.610062}}];

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

function testResults(form) {
    var x1 = (parseInt(form.grliv.value) - 1503.656062)/496.325715;
    var x2 = (parseInt(form.overall_qual.value) - 6.079106) /1.345843;
    var x3 = (parseInt(form.year.value) - 1970.811694)/30.548764;
    var x4 = (parseInt(form.totalbsmt.value) - 1041.688736)/401.989910;
    var x5 = (parseInt(form.sf1.value)- 425.522786)/424.610229;
    var x6 = (parseInt(form.overall_cond.value) - 5.583835)/1.104122;
    var x7 = (parseInt(form.mszoning.value) - 0.006879)/0.082688;
    var x8 = (parseInt(form.garage.value) - 469.956148)/208.514669;
    var x9 = (parseInt(form.fireplaces.value) - 0.608770)/0.636653;
    var x10 = (parseInt(form.pconc.value) - 0.447979)/0.497500;


    // console.log(form.totalbsmt.value);
    console.log(x1, x2, x3, x4, x5, x6, x7, x8, x9, x10);

    //(input - mean)/sd

    var c1 = 0.13175142;
    var c2 = 0.09435117;
    var c3 = 0.07946046;
    var c4 = 0.06444939;
    var c5 = 0.03267284;
    var c6 = 0.06919398;
    var c7 = -0.03910227;
    var c8 = 0.0584185;
    var c9 = 0.03550599;
    var c10 = 0.03217456;

    var y = Math.exp(x1*c1 + x2*c2 + x3*c3 + x4*c4 + x5*c5 + x6*c6 + x7*c7 + x8*c8 + x9*c9 + x10*c10 + 12.02018355);

    document.getElementById("result").value = "$" + y.toLocaleString();

}
