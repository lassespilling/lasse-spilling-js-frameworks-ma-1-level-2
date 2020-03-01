// jQuery
var jquery = require("jquery");
window.$ = window.jQuery = jquery;

// animation plugin
var transit = require("jquery.transit");

// Slider images and slider bg
const settings = {}
var sliderImg = $('.slider img'); // Slider
var bgImg = $('#bg img');
var blurAmount = $('.slider-container').attr('data-blur');
var addBlur = function(amount) {
    $(".bg-scroller").css({
        'filter': 'blur('+amount+'px)',
        '-webkit-filter': 'blur('+amount+'px)',
        '-moz-filter': 'blur('+amount+'px)',
        '-o-filter': 'blur('+amount+'px)',
        '-ms-filter': 'blur('+amount+'px)'
    });
}
if($('.slider-container').attr('data-settings')) {
    if($('.slider-container').attr('data-settings').toLowerCase().includes('blurbg')) {
        settings.blurbg = true;
    }
    if($('.slider-container').attr('data-settings').toLowerCase().includes('instructions')) {
        settings.instructions = true;
    }
    if($('.slider-container').attr('data-settings').toLowerCase().includes('controls')) {
        settings.controls = true;
    }
}


if(settings.blurbg == true) { // If bg is enabled
    var bg = `<div class="bg"><div class="bg-scroller"></div></div>`; // Bg element
    $(bg).insertAfter(".slider-container"); // Add bg element after slider
}
if(settings.instructions == true) { // If controls are enabled
    var instructions = `<div class="instructions">◀️ Prev 🔼 Fullscreen 🔽 Next ▶️</div>`; // Controls element
    $(instructions).insertBefore(".slider-container"); // Insert controls before slider
}


// Add img src, id, alt and classes
$.each(sliderImg, function(i, item) {
    if($(sliderImg[i])) { // if slider has img, load src
        if($(sliderImg[i]).attr("src") == '') { // if slider img src empty
            $(sliderImg[i]).attr("src",`https://unsplash.it/${(window.screen.width)}/${(window.screen.height)}?gravity=east?sig=${i}`); // Get dynamic of device size
        }
    }

    if($(bgImg[i]).attr('alt') == '') { // if alt attr is empty
        $(this).attr('alt','slide'+i); // Add 'slide + num' as alt
    }
    // $(sliderImg[i]).addClass('slide'); // Optional: add classes to slides
    // $(sliderImg[i]).attr("id","slide"+i); // Optional: add slide ids
});

// Fade in elements
$( window ).on( "load", function() { // On load
    if(settings.blurbg == true) { // If bg blur is on
        window.setTimeout(function(){ // + 500ms
            $(".bg").addClass('bg__loaded'); // Add load transition to bg
        }, 500);
        window.setTimeout(function(){
            if(blurAmount && $.isNumeric( blurAmount )) {
                addBlur(blurAmount);
            } else {
                addBlur(5);
            }
        }, 1400);
    }
    window.setTimeout(function(){
        $(".slider-container").addClass('loaded'); // Fade in slider
    }, 1500);
});

// Add keyboard navigation
$(document).keydown(function(e) { // On keydown, capture event
    switch(e.which) {
        case 37: // left
        $(".prev").click(); // Simulate controls click
        break;

        case 38: // up
        $(".slider-container").transition({ scale: 1 }); // Scale up img
        break;

        case 39: // right
        $(".next").click(); // Simulate controls click
        break;

        case 40: // down
        $(".slider-container").transition({ scale: 0.6 }); // Scale down img
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});

// CONTROLS
if(settings.controls) {
    var current = 1;
    var imgNumbers = '<div class="numbering"><span id="current">'+current+'</span> of '+$('.slider img').length+'</div>';
    var prev = `<a class="prev"><span>&#10094</span></a>`; // Prev element
    var next = `<a class="next"><span>&#10095;</span></a>`; // Next element
    var totalWidth = 0; // Total width
    $(".slider-container").append(prev,next,imgNumbers); // Add controls

    // Previous contols
    $(".prev").click(function() { // On click
        let width = $(window).width(); // Get window width
        let widthInPx = $(window).width(); + 'px'; // Add px to width
        
        if(totalWidth == 0) { // If width is 0
            totalWidth = ($('.slider img').length) * width - width; // Set totalwidth to (number of imgs * window width)
            $('.slider__roller').transition({ translate: `-${totalWidth}px`, delay: 200}, 0); // Transition to last img
            
            if(settings.blurbg == true) { // If blur BG is on
                $('.bg-scroller').transition({ translate: `-${totalWidth}px`, delay: 200}, 0); // Transition BG to last img
            }
            current = $('.slider img').length;
            $('#current').text(current);
        } else {
            totalWidth -= width; // Subtract one img width of totalwidth
            current --;
            $('#current').text(current);
            $('.slider__roller').transition({ translate: `+=${widthInPx}` }); // Transition to prev img
            if(settings.blurbg == true) { // If blur BG is on
                $('.bg-scroller').transition({ translate: `+=${widthInPx}` }); // Transition BG to prev img
            }
        }
    });

    // Next controls
    $(".next").click(function() { // on click
        let width = $(window).width(); // get window width
        let widthInPx = $(window).width(); + 'px'; // add px
        totalWidth += width; // Add width of one img to total width

        if(totalWidth >= ($('.slider img').length) * width) { // If on last image
            $('.slider__roller').transition({ translate: `0px`, delay: 200}, 0); // Reset transition to first img
            if(settings.blurbg == true) { // If blur BG is on
                $('.bg-scroller').transition({ translate: `0px`, delay: 200}, 0); // Transition BG to first img
            }
            totalWidth = 0; // Reset total width
            current = 1;
            $('#current').text(current);
        } else { // If not on last image
            $('.slider__roller').transition({ translate: `-=${widthInPx}` }); // Transition to next img
            current ++;
            $('#current').text(current);
            if(settings.blurbg == true) { // If blur BG is on
                $('.bg-scroller').transition({ translate: `-=${widthInPx}` });  // Transition BG to next img
            }
        }
    });
}

// Blur bg add images
if(settings.blurbg == true) {
    $( ".slider__roller img" ).clone().appendTo( ".bg-scroller" );
    $(".bg-scroller img").addClass('bg__img'); // Optional: add classes to images
} 