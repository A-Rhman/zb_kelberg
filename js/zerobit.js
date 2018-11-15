$(document).ready(function(){

  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
    
   } else {
    $(".katalog_links a").hover(function() {
      $(this).parent().addClass('fadeit');
      $(this).addClass('nofade');
    }, function() {
      $(this).parent().removeClass('fadeit');
      $(this).removeClass('nofade');
    });
   }

  // Add slideDown animation to Bootstrap dropdown when expanding.
  $('.dropdown').on('show.bs.dropdown', function () {
    $(this).find('.dropdown-menu').first().stop(true, true).slideDown(250);
  });

  // Add slideUp animation to Bootstrap dropdown when collapsing.
  $('.dropdown').on('hide.bs.dropdown', function () {
    $(this).find('.dropdown-menu').first().stop(true, true).slideUp(200);
  });

  $('.top_search').on("click", (function (e) {
    $(this).addClass("mini");
    e.stopPropagation();
  }));

  $(document).on("click", function (e) {
    var txt = $(".top_search input[type=text]");
    if ($(e.target).is(".top_search") === false && txt.val().length == 0) {
      $(".top_search").removeClass("mini");
      txt.removeClass("error");
    }
  });

  $("#search_btn").click(function (e) {
    var txt = $(".top_search input[type=text]");
    if (txt.val().length == 0) {
      e.preventDefault();
      txt.addClass("error");
    }
  });





// Home Slider Functions

var homeowl = $("#home_carousel"),sliderspeed = 50, counter, tick, progbar, autoslide = false,
calch = $("#home_carousel").find(".slide_img").has("img").outerHeight();

  $("#home_carousel").find(".slide_info").each(function(){
    $(this).prepend("<div class=progbar></div>");
  });

/*
  $(".owl-nav .button").on( "click", function(){
    console.log(autoslide);
    autoslide = true;
  });
*/
homeowl.on('initialized.owl.carousel', function(event) {
  slidnr(event);
  homeowl.removeClass("fallback");
});

  homeowl.on('initialized.owl.carousel resized.owl.carousel', function(event) {
    setheight();
    vidheight();
  });

  //Add silder pagenation
  function slidnr(eve){
    var slides = eve.item.count;
    homeowl.find('.owl-item').each(function(){
      $(this).find(".slide_info").prepend("<div class='slide_numb'><span>" + ($(this).index() +1) + "</span>/" + slides + "</div>");
    });
  }

  //Set slider nav btns height
  function setheight(){
    calch = $("#home_carousel").find(".slide_img").has("img").outerHeight();
    setTimeout(
      function(){
        homeowl.find(".gray_bg, .owl-next, .owl-prev").css("height" , calch+"px");
      }, 12);
  }

  //repaire video height 
  function vidheight(){
    if($(window).width() <= 578){
      $(".owl-video-wrapper").each(function(){
        $(this).parent().css("height", calch);
      });
    }
  }

  // Setting up timeout | progress bar speed.
  function start(eve) {
    if (autoslide) {return false;}
    counter = 0;
    elem = eve.item.index;
    elemcount = eve.item.count;
    currentSlide = homeowl.find('.owl-item').eq(elem);
    progbar = currentSlide.find(".progbar");
    progbar.css({width: 0});

    tick = setInterval(function(){interval(progbar,elem,elemcount)}, sliderspeed);
  }

  // Play Progress Bar after Pause (drag/click)
  function proceedbar(eve) {
    if (counter == 0) {return false;}
    elem = eve.item.index;
    elemcount = eve.item.count;
    currentSlide = homeowl.find('.owl-item').eq(elem);
    progbar = currentSlide.find(".progbar");

    tick = setInterval(function(){interval(progbar,elem,elemcount)}, sliderspeed);
  }

  // Filling up the progress bar and move to next slide after.
  function interval(progbar,elem,elemcount) {
      counter++;
      progbar.css({width: counter+"%"});
      if (counter == 100) {
        clearbar(elem);
        if (elemcount == elem + 1){
          homeowl.trigger('to.owl.carousel', 0);
        }else{
          homeowl.trigger('to.owl.carousel', elem + 1);
        }
      }
  }

  // Reset progress bar to zero.
  function clearbar(elem){
    clearInterval(tick);
    currentSlide = homeowl.find('.owl-item').eq(elem);
    currentSlide.find(".progbar").css({width: 0});
  }

  homeowl.on('change.owl.carousel', function(event) {
        var elem = event.item.index;
        clearbar(elem);
        var currentSlide = homeowl.find('.owl-item').eq(elem);
        if (currentSlide.find('iframe').length !== 0){
          currentSlide.find('iframe').remove();
        }
        
  });

  homeowl.on('changed.owl.carousel', function(event) {
      start(event);
  });

  homeowl.on('play.owl.video', function(event) {
        var elem = event.item.index;
        clearbar(elem);
      });

  homeowl.on('drag.owl.carousel', function(event) {
        clearInterval(tick);
      });

  homeowl.on('dragged.owl.carousel', function(event) {
        proceedbar(event);
      });
  


homeowl.owlCarousel({
  items: 1,
  margin:15,
  nav: true,
  navText: ["<i class='far fa-arrow-left'></i>","<i class='far fa-arrow-right'></i>"],
  video: true,
  dots: false,
  videoHeight: calch,
});


}); // End of document ready


/*************** Only in product view page - BEGAIN */

$(document).ready(function(){

$(".prod_item").find(".read_more, .prod_img img").on("click", function(e){
    e.preventDefault();
    var prod_link= $(this).parents('.prod_item').find('a').attr("href");
    //console.log(prod_link);
    window.location.href = prod_link;
});


var prodowl = $("#prod_slider");
var prod_calch = prodowl.find(".slide_img").has("img").outerHeight();

//repaire video height 
function prod_vidheight(){
  if($(window).width() <= 578){
    $(".owl-video-wrapper").each(function(){
      $(this).parent().css("height", prod_calch);
    });
  }
}

prodowl.on('resized.owl.carousel', function(event) {
  prod_vidheight();
});
prodowl.on('initialized.owl.carousel', function(event) {
  prodowl.parent().prepend("<div class='slide_numb'></div>");
  prodslidnr(event);
  prodowl.removeClass("fallback");
  prod_vidheight();
});
prodowl.on('changed.owl.carousel', function(event) {
  prodslidnr(event);
});
prodowl.on('change.owl.carousel', function(event) {
  var currentSlide = prodowl.find('.owl-item').eq(event.item.index);
  if (currentSlide.find('iframe').length !== 0){
    currentSlide.find('iframe').remove();
  }
});

function videoOnTop(){
  prodowl.parent().addClass('videoOnTop');
} 
function videoToBack(){
  prodowl.parent().removeClass('videoOnTop');
} 

  //Add silder pagenation
  function prodslidnr(eve){
    slides = eve.item.count;
    actv_slide = eve.item.index + 1;
    prodowl.parent().find(".slide_numb").html('<span>'+ actv_slide + "</span>/" + slides + "");
  }


prodowl.owlCarousel({
  items: 1,
  margin:15,
  nav: true,
  navText: ["<i class='far fa-arrow-left'></i>","<i class='far fa-arrow-right'></i>"],
  video: true,
  dots: false,
  videoHeight: prod_calch,
  onPlayVideo: videoOnTop,
  onStopVideo: videoToBack
});


$('#product_details').lightGallery({
  selector: '.conf_img a'
});

$('#ref_gallery').lightGallery({
  selector: 'a',
  thumbnail:true
});


$('.conf_img a, .thumbs a').each(function(){
  $(this).append('<div class="maximize_effect"><i class="far fa-search"></i></div>');
});


ref_gallery();


}); // End of document ready


var ref_gallery = function(){
  var thumbs = $('.thumbs');
  var vis_child = thumbs.children(':visible').length;
  var all_child = thumbs.children().length;
  
  //Reset thumbnails and remove any existing numbering
  thumbs.find("a.more_imgs").removeClass('more_imgs').find('.maximize_effect').html('<i class="far fa-search"></i>');

  if ((all_child) && (all_child != vis_child)){
    thumbs.find('a').eq(vis_child - 1).addClass('more_imgs').find('.maximize_effect').html('+' + String(all_child - vis_child));
  }

}



$(window).on('resize', function(){
  ref_gallery();
});


/*************** Only in product view page - END */


/*************** Only in contact page - BEGAIN */
$(document).ready(function(){

  $('#vmap').vectorMap({ 
    map: 'world_en',
    backgroundColor: '#807f83',
    borderColor: '#807f83',
    borderOpacity: 0.5,
    borderWidth: 1,
    color: '#f2f2f2',
    enableZoom: true,
    hoverColor: '#F78E1E',
    hoverOpacity: null,
    normalizeFunction: 'linear',
    scaleColors: ['#b6d6ff', '#005ace'],
    selectedColor: '#F78E1E',
    selectedRegions: null,
    showTooltip: true,
  });


});
/*************** Only in contact page - END */




function svgasimg() {
  return document.implementation.hasFeature(
    "http://www.w3.org/TR/SVG11/feature#Image", "1.1");
}

if (!svgasimg()) {
  var e = document.getElementsByTagName("img");
  if (!e.length) {
    e = document.getElementsByTagName("IMG");
  }
  for (var i = 0, n = e.length; i < n; i++) {
    var img = e[i],
      src = img.getAttribute("src");
    if (src.match(/svgz?$/)) {
      /* URL ends in svg or svgz */
      img.setAttribute("src",
        img.getAttribute("data-fallback"));
    }
  }
}