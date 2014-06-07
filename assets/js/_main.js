/*! Plugin options and other jQuery stuff */

// FitVids options
$(function() {
	$("article").fitVids();
});

// Table of Contents toggle
$(function() {
  $(".toc h3").click(function () {
    $("#drawer").toggleClass("hidden");
  });
});

// Add lightbox class to all image links
$("a[href$='.jpg'],a[href$='.png'],a[href$='.gif']").addClass("image-popup");

// Magnific-Popup options
$(document).ready(function() {
  $('.image-popup').magnificPopup({
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">Image #%curr%</a> could not be loaded.'
    },
    removalDelay: 300, // Delay in milliseconds before popup is removed
    // Class that is added to body when popup is open. 
    // make it unique to apply your CSS animations just to this exact popup
    mainClass: 'mfp-fade'
  });

  $('body').on('click', 'a', function() {
      var href = $(this).attr('href');
      ga('send', 'event', 'anchor', 'click', href, {
          'hitCallback': function () {
              document.location = href;
          }
      });
  });

  // icon hover
  $('a > i.fa').parent().hover(function() { $('i.fa', this).toggleClass('hover'); });
  // header links
  $('h1[id],h2[id],h3[id],h4[id],h5[id]').wrapInner('<span class="header"></span>').prepend('<span class="hash">#</span>').wrap('a').parents('a').each(function(d){var id=$('h1,h2,h3,h4,h5', this).attr('id');$(this).attr('href','#'+id).addClass('id-hash').contents().filter(function(){return this.nodeType===3;}).remove();$(this).hover(function(){$('span', this).toggleClass('hover');});});
});
