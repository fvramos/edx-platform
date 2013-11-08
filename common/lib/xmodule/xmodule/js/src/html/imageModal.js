$(function() {
  
  // Set up on page load
  $("a.modal-content").each(function() {
    var smallImageObject = $(this).children();
    var largeImageSRC = $(this).attr('href');
    
    // if contents of zoomable link is image and large image link exists: setup modal
    if (smallImageObject.is('img') && largeImageSRC) {
      var smallImageHTML = $(this).html();
      var largeImageALT = smallImageObject.attr('alt');
      var largeImageHTML = '<img alt="' + largeImageALT + ', ' + gettext("Large") + '" src="' + largeImageSRC + '" />';
      $(this).replaceWith(_.template($("#image-modal-tpl").text(), {smallImage: smallImageHTML, largeImage: largeImageHTML}));
    }
  });
  $('.modal-image-img-wrapper img').each(function() {
    var draggie = new Draggabilly(this, {containment: true});
    draggie.disable();
    $(this).closest('.modal-image').data("draggie", draggie);
  });

  // Opening and closing image modal on clicks
  $(".modal-image-link").click(function() {
    $(this).siblings(".modal-image").addClass('fit-to-screen');
    $('html').addClass('modal-open');
  });
  
  // variable to detect when modal is being "hovered".
  // Done this way as jquery doesn't support the :hover psudo-selector as expected.
  var imageModalImageHover = false;
  $(".modal-image-content img, .modal-image-content .modal-image-ui-icons.zoom").hover(function() {
    imageModalImageHover = true;
  }, function() {
    imageModalImageHover = false;
  });
  
  //Define function to close modal
  function closeModal(imageModal) {
    imageModal.removeClass('fit-to-screen').removeClass('zoomed');
    var currentDraggie = imageModal.data("draggie");
    currentDraggie.disable();
    $('html').removeClass('modal-open');
  }
  
  // Click outside of modal to close it.
  $(".modal-image").click(function() {
    if (!imageModalImageHover){
      closeModal($(this));
    }
  });
  
  // Click close icon to close modal.
  $(".modal-image-content .modal-image-ui-icon.remove").click(function() {
    closeModal($(this).closest(".modal-image"));
  });

  // zooming image in modal and allow it to be dragged
  // Make sure it always starts zero position for below calcs to work
  $(".modal-image-content .modal-image-ui-icons.zoom .modal-image-ui-icon").click(function() {
    if (!$(this).hasClass('disabled')) {
      var mask = $(this).closest(".modal-image-content");
      
      var imageModal = $(this).closest(".modal-image");
      var img = $(this).closest(".modal-image").find("img");
      var currentDraggie = imageModal.data("draggie");
      
      if ($(this).hasClass('zoom-in')) {
        imageModal.removeClass('fit-to-screen').addClass('zoomed');
        
        var imgWidth   = img.width();
        var imgHeight  = img.height();
        
        var imgContainerOffsetLeft = imgWidth - mask.width();
        var imgContainerOffsetTop = imgHeight - mask.height();
        var imgContainerWidth = imgWidth + imgContainerOffsetLeft;
        var imgContainerHeight = imgHeight + imgContainerOffsetTop;
        
        img.parent().css({left: -imgContainerOffsetLeft, top: -imgContainerOffsetTop, width: imgContainerWidth, height: imgContainerHeight});
        img.css({top: imgContainerOffsetTop / 2, left: imgContainerOffsetLeft / 2});
        
        currentDraggie.enable();
        
      } else if ($(this).hasClass('zoom-out')) {
        imageModal.removeClass('zoomed').addClass('fit-to-screen');
        
        currentDraggie.disable();
      }
      
      $(".modal-image-content .modal-image-ui-icons.zoom .modal-image-ui-icon").toggleClass('disabled');
    }
  });
});