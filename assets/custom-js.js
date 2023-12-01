$(document).ready(function() {
  AOS.init({
    duration: 1200
  });
  jQuery('.top-category,.tt-homeslider,.topoffer').wrapAll('<div class="slider-banner"><div class="container"><div class="slider-banner-content"></div></div></div>');
  jQuery('.ttservices,.slider-banner').wrapAll('<div class="tt-serviceslider"></div>');
  /*--------------- Scroll to top js -------------------*/
  jQuery("#GotoTop").on('click',function () {
    jQuery("html, body").animate({
      scrollTop: 0
    }, '1000');
    return false;
  });
  /*-------------------- END ------------------*/
  jQuery('.nav-toggle').click(function(event) {
    jQuery(this).toggleClass('active');
    event.stopPropagation();
    jQuery(' #tt-megamenu .tt-mega_menu').slideToggle("2000");
    jQuery('body').toggleClass("open-header");
  });
  jQuery("#tt-megamenu .tt-mega_menu").on("click", function(event) {
    event.stopPropagation();
    jQuery(this).removeClass('active');
  });	
  jQuery("#accessibleNav li.menu-item-depth-0").hover(
    function () {
      jQuery('body').addClass("menu-open");
    },
    function () {
      jQuery('body').removeClass("menu-open");
    }
  );
  /*-------------------- Filter toggle ------------------*/
  jQuery(".filter-toggle").on("click" , function(e){
    e.preventDefault();
    jQuery(this).toggleClass("active");
    jQuery(".filter-toggle-wrap").slideToggle("is-visible");
  })
  /*-------------------- END ------------------*/
  jQuery('.product-single__thumbs img').on('click', function () {
    var src = jQuery(this).attr('src');
    if (src != '') {
      jQuery(this).closest('.product-wrapper').find('img.grid-view-item__image').first().attr('src', src);
    }
    jQuery(this).parent('.grid-item').addClass('open').siblings('.grid-item').removeClass('open');
  });
  /*-------------------- video -------------------*/
  var p = jQuery(".popup_overlay");
  jQuery("#popup_toggle").click(function() {
    jQuery("body").addClass("popup-toggle");
    p.css("display", "block");
  });
  p.click(function(event) {
    e = event || window.event;
    if (e.target == this) {
      jQuery(p).css("display", "none");
      jQuery('body').removeClass('popup-toggle'); 
    }
  });
  jQuery(".popup_close,.homeslider ul.slick-slider .slick-arrow").click(function() {
    p.css("display", "none");
    jQuery('body').removeClass('popup-toggle'); 
  });
  //video popup
  function toggleVideo(state) {
    // if state == 'hide', hide. Else: show video
    var div = document.getElementById("popupVid");
    var iframe = div.getElementsByTagName("iframe")[0].contentWindow;
    //div.style.display = state == 'hide' ? 'none' : '';
    func = state == "hide" ? "pauseVideo" : "playVideo";
    iframe.postMessage(
      '{"event":"command","func":"' + func + '","args":""}',
      "*"
    );
  }
  jQuery("#popup_toggle, .homeslider ul.slick-slider .slick-arrow").click(function() {
    p.css("visibility", "visible").css("opacity", "1");
  });
  p.click(function(event) {
    e = event || window.event;
    if (e.target == this) {
      jQuery(p)
      .css("visibility", "hidden")
      .css("opacity", "0");
      toggleVideo("hide");
    }
  });
  jQuery(".popup_close").click(function() {
    p.css("visibility", "hidden").css("opacity", "0");
    toggleVideo("hide");
  });

  /*------  video cms------*/
  var p1 = jQuery(".about-videoblock .popup_overlay");
  jQuery(".about-videoblock #popup_toggle").click(function() {
    jQuery("body").addClass("popup-toggle1");
    p1.css("display", "block");

  });
  p1.click(function(event) {
    e = event || window.event;
    if (e.target == this) {
      jQuery(p1).css("display", "none");
      jQuery('body').removeClass('popup-toggle1'); 
    }
  });
  jQuery(".about-videoblock .popup_close").click(function() {
    p1.css("display", "none");
    jQuery('body').removeClass('popup-toggle1'); 
  });

  //video popup
  function toggleVideo1(state) {
    // if state == 'hide', hide. Else: show video
    var div = document.getElementById("popupVid");
    var iframe = div.getElementsByTagName("iframe")[0].contentWindow;
    //div.style.display = state == 'hide' ? 'none' : '';
    func = state == "hide" ? "pauseVideo" : "playVideo";
    iframe.postMessage(
      '{"event":"command","func":"' + func + '","args":""}',
      "*"
    );
  }
  jQuery(".about-videoblock #popup_toggle").click(function() {
    p1.css("visibility", "visible").css("opacity", "1");
  });
  p1.click(function(event) {
    e = event || window.event;
    if (e.target == this) {
      jQuery(p1)
      .css("visibility", "hidden")
      .css("opacity", "0");
      toggleVideo1("hide");
    }
  });
  jQuery(".about-videoblock .popup_close").click(function() {
    p1.css("visibility", "hidden").css("opacity", "0");
    toggleVideo1("hide");
  });
  /*------------------------- Checkout button --------------------*/
  jQuery(".shopify-payment-button .shopify-payment-button__button").prepend( jQuery("<i class='mdi mdi-cart-outline'></i>"));
  /*----------------------------------------------*/
  if(jQuery('.header_1 .wrapper-wrap').hasClass('logo_center'))  {
    jQuery('body').addClass('logo_center');
  }
  var w_width = $(window).width();
  $('.slider-content-main-wrap').css('width',w_width);
  if($('.site-header').hasClass('header_transaparent')){
    $('body.template-index').addClass('header_transaparent')
  }

  var img_id = jQuery('.product-single__thumbs .slick-active.slick-current').find('.product-single__thumb').data('id');
  if(jQuery('.product-lightbox-btn').hasClass(img_id)){
    jQuery('.product-lightbox-btn.'+img_id).show();
  }
  /*----------------------- filter ----------------------*/
  jQuery(".filter-left").on("click" , function(e){
    e.preventDefault();
    jQuery(this).toggleClass("active");
    jQuery(".off-canvas.position-left").addClass("is-open");
    jQuery(".js-off-canvas-overlay.is-overlay-fixed").addClass("is-visible is-closable");
  });
  jQuery(".filter-right").on("click" , function(e){
    e.preventDefault();
    jQuery(this).toggleClass("active");
    jQuery(".off-canvas.position-right").addClass("is-open");
    jQuery(".js-off-canvas-overlay.is-overlay-fixed").addClass("is-visible is-closable");
  });
  jQuery(".off-canvas .sidebar_close").on("click" , function(e){
    e.preventDefault();
    jQuery(".off-canvas.position-left").removeClass("is-open");
    jQuery(".off-canvas.position-right").removeClass("is-open");
    jQuery(".js-off-canvas-overlay.is-overlay-fixed").removeClass("is-visible is-closable");
  });
  jQuery(".is-overlay-fixed").on("click" , function(e){
    e.preventDefault();
    jQuery(".filter-left").trigger('click');
    jQuery(".filter-right").trigger('click');
    jQuery(".off-canvas.position-left").removeClass("is-open");
    jQuery(".off-canvas.position-right").removeClass("is-open");
    jQuery(".js-off-canvas-overlay.is-overlay-fixed").removeClass("is-visible is-closable");
  });
  $('.product-360-button a').magnificPopup({
    type: 'inline',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    disableOn: false,
    preloader: false,
    fixedContentPos: false,
    callbacks: {
      open: function() {
        $(window).resize()
      }
    }
  });
  countDownIni('.flip-countdown,.js-flip-countdown'); 
  /*--------------- popup Video ---------------------*/
  $('.popup-video').magnificPopup({
    disableOn: 300,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
  });
  if ($('a.product-lightbox-btn').length > 0 || $('a.product-video-popup').length > 0) {
    $('.product-single__photos .gallery,.design_2 .product-img').magnificPopup({
      delegate: 'a', // child items selector, by clicking on it popup will open
      type: 'image',
      tLoading: '<div class="please-wait dark"><span></span><span></span><span></span></div>',
      removalDelay: 300,
      closeOnContentClick: true,
      gallery: {
        enabled: true,
        navigateByImgClick: false,
        preload: [0, 1]
      },
      image: {
        verticalFit: false,
        tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
      },
      callbacks: {
        beforeOpen: function() {
          var productVideo = $('.product-video-popup').attr('href');
          if (productVideo) {
            this.st.mainClass = 'has-product-video';
            var galeryPopup = $.magnificPopup.instance;
            galeryPopup.items.push({
              src: productVideo,
              type: 'iframe'
            });
            galeryPopup.updateItemHTML();
          }
        },
        open: function() {}
      }
    });
  }
  $('.design_3 .product-img,.design_5 .pro_img').magnificPopup({
    delegate: 'a', // child items selector, by clicking on it popup will open
    type: 'image',
    tLoading: '<div class="please-wait dark"><span></span><span></span><span></span></div>',
    removalDelay: 300,
    closeOnContentClick: true,
    gallery: {
      enabled: true,
      navigateByImgClick: false,
      preload: [0, 1]
    },
    image: {
      verticalFit: false,
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
    },
    callbacks: {
      beforeOpen: function() {
        var productVideo = $('.product-video-popup').attr('href');
        if (productVideo) {
          this.st.mainClass = 'has-product-video';
          var galeryPopup = $.magnificPopup.instance;
          galeryPopup.items.push({
            src: productVideo,
            type: 'iframe'
          });
          galeryPopup.updateItemHTML();
        }
      },
      open: function() {}
    }
  });
  $('body').on('click', '.product-lightbox-btn', function(e) {
    $('.product-wrapper-owlslider').find('.owl-item.active a').click();
    e.preventDefault();
  });
  $('.product-layouts .qtyplus').on('click', function(e) {
    e.preventDefault();
    var input_val = jQuery(this).parents('.qty-box-set').find('.quantity');
    var currentVal = parseInt(jQuery(this).parents('.qty-box-set').find('.quantity').val());
    if (!isNaN(currentVal)) {
      jQuery(this).parents('.qty-box-set').find('.quantity').val(currentVal + 1)
    } else {
      jQuery(this).parents('.qty-box-set').find('.quantity').val(1)
    }
  });
  $(".product-layouts .qtyminus").on('click', function(e) {
    e.preventDefault();
    var input_val = jQuery(this).parents('.qty-box-set').find('.quantity');
    var currentVal = parseInt(jQuery(this).parents('.qty-box-set').find('.quantity').val());
    if (!isNaN(currentVal) && currentVal > 1) {
      jQuery(this).closest('.qty-box-set').find('.quantity').val(currentVal - 1)
    } else {
      jQuery(this).closest('.qty-box-set').find('.quantity').val(1)
    }
  });
  /*---------------- END ------------------*/
  $("#navToggle").on('click',function(e) {
    jQuery(this).next('.Site-navigation').slideToggle(500);
  });
  $(".menu_toggle_wrap #navToggle").on('click',function(e) {
    jQuery(this).parent().next('.Site-navigation').slideToggle(500);
  });

  jQuery("body.footer_style_1 .footer_toggle").on("click" , function(e){
    jQuery('#shopify-section-footer-model-1').addClass('toggle-footer'); 
    jQuery("body").addClass("footer1-open");
    e.preventDefault();
  });

  jQuery("body.footer_style_1 .footer_close_toggle").on("click" , function(e){ 
    jQuery('#shopify-section-footer-model-1').removeClass('toggle-footer');
    jQuery("body").removeClass("footer1-open");
    e.preventDefault();
  });
  /*-------------- Search js ----------------*/
  jQuery(".site-header__search.search-full .serach_icon").on('click',function(e){
    e.preventDefault();
    jQuery(this).toggleClass('active'); 
    jQuery('body').toggleClass('search_full_active'); 
    jQuery( ".search-full-screen" ).slideToggle( "slow" );
    jQuery('.full-search-wrapper').addClass('search-overlap');
    jQuery('.myaccount  .dropdown-toggle').removeClass("open");
    jQuery( '.myaccount  .customer_account' ).slideUp( "fast" );  
    jQuery('.site-header .site-header_cart_link').removeClass("active");
    jQuery( ".fixed-cart-wrap" ).removeClass('active');
    jQuery(".search-bar > input").focus();
    jQuery('body').toggleClass('search_toggle'); 
    jQuery('body').removeClass('account-toggle');
    jQuery('body').removeClass('cart_toggle');
  });
  jQuery(".site-header__search.search-full .close-search").on('click',function(){
    jQuery('.site-header__search.search-full .serach_icon').removeClass('active');
    jQuery('.full-search-wrapper').removeClass('search-overlap');  
    jQuery('.full-search-wrapper').removeClass('search-overlap');  
    jQuery('.header_3 .search-full-screen').removeClass('active');
    jQuery('body').removeClass('search_full_active');
    jQuery('body').removeClass('search_toggle'); 
    jQuery( ".search-full-screen" ).slideUp( "slow" );
  });

  jQuery(".site-header__search:not(.search-full) .serach_icon").on('click',function(){    
    jQuery( ".search_wrapper" ).slideToggle( "fast" );
    jQuery( ".search-bar > input" ).focus();
    jQuery(this).toggleClass('active');
    jQuery('body').toggleClass('search_toggle');
    jQuery('.site-header .site-header_cart_link').removeClass("active");
    jQuery('.myaccount  .dropdown-toggle').removeClass("open");  
    jQuery( '.myaccount  .customer_account').slideUp( "fast" );   
    jQuery( ".fixed-cart-wrap" ).removeClass('active');
    jQuery('body').removeClass('account-toggle');
    jQuery('body').removeClass('cart_toggle');
  });
  /*-------------------- Myaccount -----------------*/
  jQuery(".myaccount  span.dropdown-toggle").on('click',function(event){   
    event.preventDefault();
    jQuery( ".customer_account" ).slideToggle( "fast" );
    jQuery(this).toggleClass('open');
    jQuery('body').toggleClass('account-toggle');
    jQuery('body').removeClass('currency-open');
    jQuery('body').removeClass('language-open');
    jQuery('.site-header .site-header_cart_link').removeClass("active");    
    jQuery( ".fixed-cart-wrap" ).removeClass('active');
    jQuery( ".currencies.flag-dropdown-menu" ).slideUp( "fast" );
    jQuery( ".header_language .disclosure-list" ).slideUp( "fast" ); 
    jQuery('body').removeClass('search_toggle'); 
    jQuery('body').removeClass('cart_toggle');
  });

  jQuery(".header_language .disclosure__toggle").on("click", function (event) {     
    event.preventDefault();
    jQuery(".customer_account").stop();    
    jQuery('body').toggleClass('language-open');
    jQuery('body').removeClass('currency-open');
    jQuery( "body" ).removeClass( 'myaccount_active' );
    jQuery('body').removeClass('cart_active');
    jQuery('.currency_wrapper').removeClass('active');
    jQuery( ".disclosure-list" ).slideToggle( "fast" );
    jQuery(this).toggleClass('active');  
    jQuery( ".customer_account" ).slideUp( "fast" );
    jQuery( ".currencies.flag-dropdown-menu" ).slideUp( "fast" );
    jQuery( ".fixed-cart-wrap" ).removeClass('active');
  });

  $(".header_currency .currency_wrapper.dropdown-toggle").on("click", function (event) {     
    event.preventDefault();
    //jQuery(".customer_account").stop(); 
    jQuery('body').toggleClass('currency-open');
    jQuery('body').removeClass('language-open');
    jQuery( "body" ).removeClass( 'myaccount_active' );
    jQuery('body').removeClass('cart_active');
    jQuery('.disclosure__toggle').removeClass('active');
    jQuery( ".currencies.flag-dropdown-menu" ).slideToggle( "fast" );
    $(this).toggleClass('active'); 
    jQuery( ".customer_account" ).slideUp( "fast" );
    jQuery( ".header_language .disclosure-list" ).slideUp( "fast" ); 
    jQuery( ".fixed-cart-wrap" ).removeClass('active');
  });
  /*-------------------- END -----------------*/

  $('.product-single').each(function(){
    var $desc = $(this).find('.product-information .progress');
    var $qty = $(this).find('.quantity');
    var $pbar = $(this).find('.progress-bar');
    var $progress = $desc;
    var $progressBar = $pbar;
    var $quantity = $qty.html();
    console.log($quantity);
    var currentWidth = parseInt($progressBar.css('width'));
    var allowedWidth = parseInt($progress.css('width'));
    var addedWidth = currentWidth + parseInt($quantity);
    if (addedWidth > allowedWidth) {
      addedWidth = allowedWidth;
    }
    var progress = (addedWidth / allowedWidth) * 100;
    $progressBar.animate({width: progress + '%' }, 100);
  });

  var gallery = $(".slider-mobile-gutter .product-grid");
  gallery.owlCarousel({
    items : 6 , //10 items above 1000px browser width
    dots: false,
    loop: false,
    nav: true,
    rewind:false,
    autoplay:false,
    responsive: {
      100: {
        items: 1
      },
      315: {
        items: 2
      },
      600: {
        items: 3
      },
      992: {
        items: 4
      },
      1300: {
        items: 6
      },
    }
  });

  var brandsowl = $("body:not(.rtl) .tt-brand_slider");
  var  brandsowlrtl = $("body.rtl .tt-brand_slider");
  brandsowl.owlCarousel({
    items : 6 , //10 items above 1000px browser width
    dots: false,
    rewind:false,
    autoplay:true,
    autoplayHoverPause:true,
    nav: true,
    loop: false,
    responsive: {
      100: {
        items: 2
      },
      320: {
        items: 2
      },
      544: {
        items: 3
      },
      992: {
        items: 4
      },
      1200: {
        items: 6
      }
    }
  });
  brandsowlrtl.owlCarousel({
    items : 6 , //10 items above 1000px browser width
    dots: false,
    rewind:false,
    autoplay:true,
    autoplayHoverPause:true,
    nav: true,
    loop: false,
    responsive: {
      100: {
        items: 2
      },
      320: {
        items: 2
      },
      544: {
        items: 3
      },
      992: {
        items: 4
      },
      1200: {
        items: 6
      }
    }
  });
  $(".brands_next").click(function(){
    brandsowl.trigger('owl.next');
  });
  $(".brands_prev").click(function(){
    brandsowl.trigger('owl.prev');
  });
  $(".brands_next").click(function(){
    brandsowlrtl.trigger('owl.next');
  });
  $(".brands_prev").click(function(){
    brandsowlrtl.trigger('owl.prev');
  });

  var p_col = jQuery('.slider-specialproduct').data('col');
  if(jQuery("body").hasClass('disable_menutoggle')){
    $('body.disable_menutoggle .slider-specialproduct').owlCarousel({
      items : p_col, //10 items above 1000px browser width
      nav : true,
      dots : false,
      responsive: {
        100: {
          items: 1
        }, 
        319: {
          items: 2
        },
        751: {
          items: 3
        },
        1200: {
          items: 4
        },
        1300: {
          items: 5
        },
        1530: {
          items: p_col
        }
      },
    });
  }else{
    $('body .slider-specialproduct').owlCarousel({
      items : p_col, //10 items above 1000px browser width
      nav : true,
      dots : false,
      responsive: {
        100: {
          items: 1
        }, 
        319: {
          items: 2
        },
        751: {
          items: 3
        },
        1200: {
          items: 4
        },
        1300: {
          items: 5
        },
        1530: {
          items: p_col
        }
      },
    });
  }
  $('.slider-specialproduct .product-wrapper').each(function(){
    var $desc = $(this).find('.product-description .progress');
    var $qty = $(this).find('.quantity');
    var $pbar = $(this).find('.progress-bar');
    var $progress = $desc;
    var $progressBar = $pbar;
    var $quantity = $qty.html();
    console.log($quantity);
    var currentWidth = parseInt($progressBar.css('width'));
    var allowedWidth = parseInt($progress.css('width'));
    var addedWidth = currentWidth + parseInt($quantity);
    if (addedWidth > allowedWidth) {
      addedWidth = allowedWidth;
    }
    var progress = (addedWidth / allowedWidth) * 100;
    $progressBar.animate({width: progress + '%' }, 100);
  });  
  /*-------------------------gallery------------------*/
  var banner = $(".product-thumb .slider-nav");
  banner.owlCarousel({
    items : 1 , //10 items above 1000px browser width
    dots: false,
    loop: true,
    nav: true,
    rewind:true,
    autoplay:true,
    autoplayHoverPause: true,
    responsive: {
      100: {
        items: 1
      },
      481: {
        items: 1
      },
      992: {
        items: 1
      },
      1200: {
        items: 1
      },
      1300: {
        items: 1
      }
    }
  });     

  //cmsblockbanner
  $('.cmsblockbanner .ttbanner-wrap').owlCarousel({
    items :3, //1 items above 1000px browser width
    nav : false,
    dots : false,
    loop: false,
    autoplay:false,
    responsive: {
      992: {
        items: 3
      },
      544: {
        items: 2
      },
      320: {
        items: 1
      },
      100: {
        items: 1
      }
    }
  });

  $('.block_content .cmsofferblock').owlCarousel({
    items :7, //1 items above 1000px browser width
    nav : false,
    dots : false,
    loop: false,
    autoplay:false,
    responsive: {
      992: {
        items: 7
      },
      544: {
        items: 2
      },
      320: {
        items: 1
      },
      100: {
        items: 1
      }
    }
  });

  $('body #footer-services .block_content').owlCarousel({
    items :4, //1 items above 1000px browser width
    nav : false,
    dots : true,
    loop: false,
    autoplay:false,
    rewindNav:true,
    responsive: {
      1200: {
        items: 4
      },
      700: {
        items: 3
      },
      481: {
        items: 2
      },
      100: {
        items: 1
      }
    }
  });
  $('body #ttcmsservices .block_content').owlCarousel({
    items :3, //1 items above 1000px browser width
    nav : false,
    dots : true,
    loop: false,
    autoplay:false,
    rewindNav:true,
    responsive: {
      1200: {
        items: 3
      },
      700: {
        items: 2
      },
      481: {
        items: 2
      },
      100: {
        items: 1
      }
    }
  });

  $('.right-banner .rightbanner-block').owlCarousel({
    items : 1, //1 items above 1000px browser width
    nav : true,
    dots : false,
    loop: false,
    autoplay:false,
    autoplayHoverPause:true,
    responsive: {
      100: {
        items: 1
      }
    }
  });
  $('body .about-services .block_content').owlCarousel({
    items :3, //1 items above 1000px browser width
    nav : false,
    dots : true,
    loop: false,
    autoplay:false,
    rewindNav:true,
    responsive: {
      1200: {
        items: 3
      },
      992: {
        items: 3
      },
      481: {
        items: 2
      },
      100: {
        items: 1
      }
    }
  });
  $('body .about-blog').owlCarousel({
    items :3, //1 items above 1000px browser width
    nav : false,
    dots : true,
    loop: false,
    autoplay:false,
    rewindNav:true,
    responsive: {
      1200: {
        items: 3
      },
      992: {
        items: 3
      },
      481: {
        items: 2
      },
      100: {
        items: 1
      }
    }
  });

  $('body:not(.rtl) #tt-megamenu .list_product_menu_content').owlCarousel({
    items : 3, //1 items above 1000px browser width
    nav : false,
    autoPlay:true,
    autoplaySpeed:1000,
    stopOnHover: false,
    loop: false,
    dots : true,
    responsive: {
      768: {
        items: 3
      },
      360: {
        items: 2
      },
      100: {
        items: 1
      }
    }
  });
  $('body.rtl #tt-megamenu .list_product_menu_content').owlCarousel({
    items : 3, //1 items above 1000px browser width
    nav : true,
    autoPlay:true,
    autoplaySpeed:1000,
    rtl: true,
    stopOnHover: false,
    loop: false,
    dots : true,
    responsive: {
      768: {
        items: 3
      },
      360: {
        items: 2
      },
      100: {
        items: 1
      }
    }
  });

  $(".full_gallery_slider.owl-carousel").on("changed.owl.carousel",function(e){
    var element = e.target; // DOM element, in this example .owl-carousel
    var items = e.item.count; // Number of items
    var item = e.relatedTarget.relative(e.item.index) + 1; 

    $(element).parent().find('.num').html(item + "/" + items)
  }),

    $('body:not(.rtl) .full_gallery_slider.owl-carousel').owlCarousel({
    loop:true,
    startPosition:0,
    center: true,
    dots:true,
    items:1,
    lazyLoad: true,
    nav:false,
    responsive:{
      100:{
        items:1
      },
      767:{
        items:1
      },
      991:{
        items:3
      },
      1199:{
        items:3
      },
      1299:{
        items:3
      }
    }
  });
  $('body.rtl .full_gallery_slider.owl-carousel').owlCarousel({
    stagePadding: 200,
    loop:true,
    startPosition:0,
    center: true,
    dots:true,
    items:1,
    rtl:true,
    lazyLoad: true,
    nav:false,
    responsive:{
      0:{
        items:1,
        stagePadding: 60
      },
      600:{
        items:1,
        stagePadding: 150
      },
      768:{
        items:1,
        stagePadding: 180
      },
      868:{
        items:1,
        stagePadding: 250
      },
      1800:{
        items:1,
        stagePadding: 300
      }
    }
  });

  $('body:not(.rtl) .tt-testimonial-wrap .testimonials_wrap').owlCarousel({
    items: 1, //1 items above 1000px browser width
    nav: true,
    navText: [
      "<i class='mdi mdi-chevron-left'></i>",
      "<i class='mdi mdi-chevron-right'></i>"
    ],
    dots: true,
    loop: false,
    autoplay: false,
    autoplayHoverPause: true,
    responsive: {
      1279: {
        items: 1
      },
      1250: {
        items: 1
      },
      600: {
        items: 1
      }
    }
  });
  $('body.rtl .tt-testimonial-wrap .testimonials_wrap').owlCarousel({
    items: 1, //1 items above 1000px browser width
    nav: true,
    navText: [
      "<i class='mdi mdi-chevron-left'></i>",
      "<i class='mdi mdi-chevron-right'></i>"
    ],
    rtl: true,
    dots: true,
    autoplay: false,
    loop: false,
    autoplayHoverPause: true,
    responsive: {
      1279: {
        items: 1
      },
      1250: {
        items: 1
      },
      600: {
        items: 1
      }
    }
  });
  $('.slider-specialproduct .product-wrapper,.product-single').each(function(){
    var $desc = $(this).find('.product-wrapper .progress');
    var $qty = $(this).find('.quantity');
    var $pbar = $(this).find('.progress-bar');
    var $progress = $desc;
    var $progressBar = $pbar;
    var $quantity = $qty.html();
    var currentWidth = parseInt($progressBar.css('width'));
    var allowedWidth = parseInt($progress.css('width'));
    var addedWidth = currentWidth + parseInt($quantity);
    if (addedWidth > allowedWidth) {
      addedWidth = allowedWidth;
    }
    var progress = (addedWidth / allowedWidth) * 100;
    $progressBar.animate({width: progress + '%' }, 100);
  });  
  var p_col = jQuery('.slider-bestproduct').data('col');
  $('body .slider-bestproduct').owlCarousel({
    items : p_col, //10 items above 1000px browser width
    nav : true,
    autoplay:false,
    autoplaySpeed:1500,	
    dots : false,
    responsive: {
      100: {
        items: 1
      },
      620: {
        items: 2
      },
      1200: {
        items: 3
      },
      1460: {
        items: 3
      },
      1700: {
        items: p_col
      }
    }
  });
  $('.slider-bestproduct-wrap').each(function () { 
    if($(this).find('.owl-nav').hasClass('disabled')){
      $(this).find('.customNavigation').hide();
    }else{
      $(this).find('.customNavigation').show();
    }
  });
  $(".slider-bestproduct-wrap .customNavigation .next").click(function(){
    var wrap = $(this).closest('.slider-bestproduct-wrap');
    $(wrap).find('.slider-bestproduct').trigger('next.owl');
  });
  $(".slider-bestproduct-wrap .customNavigation .prev").click(function(){
    var wrap = $(this).closest('.slider-bestproduct-wrap');
    $(wrap).find('.slider-bestproduct').trigger('prev.owl');
  });
  $('.category_feature').owlCarousel({             
    items: 3,
    nav : true,
    dots : false,
    autoplay:false,
    autoplayTimeout: 4000,
    loop:true,
    rtl:false,
    responsive: {
      100: {
        items: 1
      },
      560: {
        items: 2
      },
      768: {
        items: 2
      },
      992: {
        items: 2
      },
      1200: {
        items: 2
      }
    }
  });
  $('body:not(.rtl) .category_feature1').owlCarousel({             
    items: 5,
    nav : false,
    dots : false,
    autoplay:true,
    loop:true,
    rtl:false,
    autoplayHoverPause: false,
    lazyLoad: true,
    smartSpeed: 1000,
    autoplayTimeout: 3000,
    responsive: {
      100: {
        items: 1
      },
      320: {
        items: 2
      },
      481: {
        items: 3
      },
      768: {
        items: 4
      },
      1300: {
        items: 5
      }
    }
  });
  $('body.rtl .category_feature1').owlCarousel({
    items: 5,
    nav : false,
    dots : false,
    autoplay:true,
    loop:true,
    rtl:false,
    autoplayHoverPause: false,
    lazyLoad: true,
    smartSpeed: 1000,
    autoplayTimeout: 3000,
    responsive: {
      100: {
        items: 1
      },
      320: {
        items: 2
      },
      481: {
        items: 3
      },
      768: {
        items: 4
      },
      1300: {
        items: 5
      }
    }
  });
  $('body:not(.rtl) .widget_top_rated_products .top-products').owlCarousel({
    items : 1, //1 items above 1000px browser width
    nav : true,
    dots : true,
    loop: false,
    autoplay:true,
    rtl:false,
    responsive: {
      1279: {
        items: 1
      },
      600: {
        items: 1
      }
    }
  });
  $('body.rtl .widget_top_rated_products .top-products').owlCarousel({
    items : 1, //1 items above 1000px browser width
    nav : true,
    dots : true,
    loop: false,
    autoplay:true,				
    rtl:true,
    responsive: {
      1279: {
        items: 1
      },
      600: {
        items: 1
      }
    }
  });
  jQuery(".spr-summary-actions-newreview").on('click',function(e) {
    e.preventDefault();
    jQuery(".spr-content").slideToggle( "slow" );
  });

  $(".pro_btn.quick-view-wrap > a,.pro_btn.add_tocart form > a,.pro_btn.add-to-compare .add-in-compare-js").click(function(){$(this).addClass("loading");setTimeout(function(){$(".pro_btn.quick-view-wrap > a,.pro_btn.add_tocart form > a, .pro_btn.add-to-compare .add-in-compare-js").removeClass("loading")},2000)});

  $('.headerbanner-close').on("click", function(){
    $('.ttcmstopbanner').slideToggle( "slow", function() {
    });
    jQuery('body').addClass('headerbanner-close');
  });
  if($('body:not(.template-index) .site-header .toggle_menu').hasClass('current-close')) {
    $('.tt-mega_menu').slideUp("2000");
  }
  $('.toggle_menu').click(function() {
    if($(this).hasClass('default-open') && $(window).width() < 992){
      if($(this).hasClass('current-close')) {
        $(this).addClass("current-open");
        $('body').addClass("menu-current-open");
        $(this).removeClass("current-close");
        $('.tt-mega_menu').slideToggle("2000");
      } else {
        $(this).removeClass("default-open");
        $(this).addClass("current-open");
        $('body').addClass("menu-current-open");
        $(this).removeClass("current-close");
        $('.tt-mega_menu').slideToggle("2000");
      }    
    }else if($(this).hasClass('default-open')){
      if($(this).hasClass('current-close')) {
        $(this).addClass("current-open");
        $('body').addClass("menu-current-open");
        $(this).removeClass("current-close");
        $('.tt-mega_menu').slideToggle("2000");
      } else if($(this).hasClass('current-open')) {
        $(this).addClass("current-close");
        $(this).removeClass("current-open");
        $('body').removeClass("menu-current-open");
        $('.tt-mega_menu').slideToggle("2000");
      }
    }
    else{
      if($(this).hasClass('current-open')) {
        $(this).addClass("current-close");
        $('body').removeClass("menu-current-open");
        $(this).removeClass("current-open");
        $('.tt-mega_menu').slideToggle("2000");
      } else{
        $(this).addClass("current-open");
        $(this).removeClass("current-close");
        $('body').addClass("menu-current-open");
        $('.tt-mega_menu').slideToggle("2000");
      }
    }
    if($(this).hasClass('default-open') && !$('.sticky_header').hasClass('fixed')) {
      $(this).addClass("current-close");
      $(this).removeClass("default-open");
      $('.tt-mega_menu').slideToggle("2000");
    }	
    if($(this).hasClass('default-open') && $('.sticky_header').hasClass('fixed')) {
      $(this).addClass("current-open");
      $('body').addClass("menu-current-open");
      $(this).removeClass("default-open");
      $('.tt-mega_menu').slideDown("2000");
    }
  });

  var gallery = $("#cmsgallery .image-content");
  gallery.owlCarousel({
    items : 5 , //10 items above 1000px browser width
    dots: false,
    loop: false,
    nav: true,
    rewind:false,
    autoplay:false,
    responsive: {
      100: {
        items: 1
      },
      315: {
        items: 2
      },
      600: {
        items: 3
      },
      992: {
        items: 4
      },
      1300: {
        items: 5
      },
    }
  });
  var prevScrollpos = window.pageYOffset;
  window.onscroll = function(e) {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      document.getElementById("header-sticky").style.top = "0";
    } 
    else if ( $('body').hasClass('account-toggle') || $('body').hasClass('menu_hover') || $('body').hasClass('cart_toggle') || $('body').hasClass('search_toggle') || $('body').hasClass('menu-current-open')) {
      document.getElementById("header-sticky").style.top = "0";
      e.stopPropagation();
    }
    else {
      document.getElementById("header-sticky").style.top = "-120px";
    }
    prevScrollpos = currentScrollPos;
  }

  jQuery('.product-thumb .grid-view-item__links').each(function(){  	    
    jQuery(this).hoverdir();   
  });

});
/*------------------------ END ------------------------*/
function moremenu() { 
  if(jQuery(document).width()<=1199){
    var max_elem = 3;  
  }
  else
  {
    var max_elem = 5;      
  }
  var items = $("#accessibleNav > li");
  var surplus = items.slice(max_elem, items.length);
  surplus.wrapAll('<li class="more_menu site-nav--has-dropdown menu-item-depth-0"><ul class="top-link sub-nav__dropdown sub-menu mobile-nav__sublist">');
  jQuery('.more_menu').prepend('<a href="#" class="level-top topmega-menu-link">More</a>');
  jQuery('.more_menu').mouseover(function(){
    jQuery(this).children('ul').addClass('shown-link');
    jQuery('body').addClass('menu-open');
  })
  jQuery('.more_menu').mouseout(function(){
    jQuery(this).children('ul').removeClass('shown-link');
    jQuery('body').removeClass('menu-open');      
  });
  $("#accessibleNav").css('display', 'inlink-block');
}
jQuery(document).ready(function(){
  moremenu();
});

jQuery(window).scroll(function () {
  if(jQuery(document).height() > jQuery(window).height()){
    var scroll = jQuery(window).scrollTop();
    if (scroll > 100) {
      jQuery("#GotoTop").fadeIn();
    } else {
      jQuery("#GotoTop").fadeOut();
    }
  }
});
function responsiveMenu(){
  if(jQuery(window).width() < 992) {
    jQuery('.sub-nav__dropdown').css('display','none');    
    $('#accessibleNav').appendTo('#tt-megamenu .tt_menus_ul');
    $('.topcat_content').appendTo('#tt-megamenu .tt_menus_ul');
    $('.bottom_header_1 .offer-content').insertAfter('#tt-megamenu .tt_menus_ul');
    $('.bottom_header_2 .bottom-right-div .offer-content').insertAfter('#tt-megamenu .tt_menus_ul');
    $('.header_1 .main-header .right-link-icon').insertBefore('.header_1_wrapper .main-header .site-header__search');
    $('.header_3 .right-link-icon').insertAfter('.header_3_wrapper .main-header .header_logo_wrap');
    $('.header_1 .bottom_header_1 .ttresponsive_menu').insertBefore('.header_1 .main-header .header_logo_wrap');
    $('.header_2 .ttresponsive_menu').insertBefore('.header_2 .header_logo_wrap');
    $('.header_3 .ttresponsive_menu').insertBefore('.header_3 .header_logo_wrap');
    $('.header_2 .myaccount').prependTo('.header_2_wrapper .right-link-icon');
    $('.header_2 .bottom_header_2 .container .site-header__search').insertAfter('.header_2 .main-header .container .right-link-icon');
    $('.header_1 .main-header .wishlist-icon-div').appendTo('.header_1_wrapper .main-header .myaccount .customer_account ul');
    $('.header_1 .main-header .compare-icon-div').appendTo('.header_1_wrapper .main-header .myaccount .customer_account ul');
    $('.header_2  .wishlist-icon-div').appendTo('.header_2_wrapper  .myaccount .customer_account ul');
    $('.header_2 .compare-icon-div').appendTo('.header_2_wrapper  .myaccount .customer_account ul');
    $('.header_3  .wishlist-icon-div').appendTo('.header_3_wrapper  .myaccount .customer_account ul');
    $('.header_3 .compare-icon-div').appendTo('.header_3_wrapper  .myaccount .customer_account ul');
  }
  else { 
    $('.topcat_content').prependTo('.index-section.top-category');
    $('.header_1 .ttresponsive_menu').prependTo('.header_1 .bottom_header_1 .container');
    $('.header_2 .ttresponsive_menu').prependTo('.header_2 .bottom_header_2 .container');
    $('.header_3 .ttresponsive_menu').appendTo('.header_3 .main-header .container');
    $('.header_1 #tt-megamenu .tt_menus_ul #accessibleNav').insertAfter('.header_1 .ttresponsive_menu');
    $('.header_2 #tt-megamenu .tt_menus_ul #accessibleNav').insertAfter('.header_2 .header_logo_wrap');
    $('.header_3 #tt-megamenu .tt_menus_ul #accessibleNav').prependTo('.bottom_header_3 .container');
    $('.header_1 #tt-megamenu .offer-content').prependTo('.bottom_header_1 .container');
    $('.header_2 #tt-megamenu .offer-content').appendTo('.bottom_header_2 .bottom-right-div');
    $('.header_1 .main-header .right-link-icon').insertAfter('.header_1_wrapper .main-header .site-header__search');
    $('.header_3 .right-link-icon').appendTo('.header_3_wrapper .bottom_header_3 .container');
    $('.header_2 .myaccount').insertBefore('.header_2 .offer-content');
    $('.header_2 .main-header .container .site-header__search').insertBefore('.header_2 .bottom-right-div');
    $('.header_1 .main-header .myaccount .customer_account ul .compare-icon-div').insertBefore('.header_1_wrapper .main-header .myaccount');
    $('.header_1 .main-header .myaccount .customer_account ul .wishlist-icon-div').prependTo('.header_1_wrapper .main-header .right-link-icon');
    $('.header_2 .myaccount .customer_account ul .compare-icon-div').prependTo('.header_2_wrapper .bottom-right-div');
    $('.header_2 .myaccount .customer_account ul .wishlist-icon-div').insertBefore('.header_2_wrapper .myaccount');
    $('.header_3 .myaccount .customer_account ul .compare-icon-div').insertBefore('.header_3_wrapper .myaccount');
    $('.header_3 .myaccount .customer_account ul .wishlist-icon-div').prependTo('.header_3_wrapper .right-link-icon');
  }
}
jQuery(document).ready(function() {
  responsiveMenu();

  jQuery(".product-write-review").on('click',function(e) {
    e.preventDefault();
    $('a[href=\'#tab-2\']').trigger('click');
    jQuery('html, body').animate({
      scrollTop: jQuery(".product_tab_wrapper").offset().top-150
    }, 1000);
  });
});

jQuery(window).resize(function() {
  responsiveMenu();
  var w_width = $(window).width();
  $('.slider-content-main-wrap').css('width',w_width);
});


function height(){
  var maxHeight = $(".design_2 .product-block .image,.design_1 .product-single__thumbs a.product-single__thumbnail img,.design_3 .product-single__thumbs a.product-single__thumbnail img,.design_4 .product-single__thumbs a.product-single__thumbnail img,.design_5 .product-block .image").height();
  $(".design_2 .product-block .extra-video,.design_1 .product-single__thumbs a.product-single__thumbnail.extra-video img,.design_3 .product-single__thumbs a.product-single__thumbnail.extra-video img,.design_4 .product-single__thumbs a.product-single__thumbnail.extra-video img,.design_5 .product-block .extra-video").height(maxHeight);
  $(".design_2 .product-block .video,.design_1 .product-single__thumbs a.product-single__thumbnail.video img,.design_3 .product-single__thumbs a.product-single__thumbnail.video img,.design_4 .product-single__thumbs a.product-single__thumbnail.video img,.design_5 .product-block .video").height(maxHeight);
  $(".design_2 .product-block .model,.design_1 .product-single__thumbs a.product-single__thumbnail.model img,.design_3 .product-single__thumbs a.product-single__thumbnail.model img,.design_4 .product-single__thumbs a.product-single__thumbnail.model img,.design_5 .product-block .model").height(maxHeight);
}
$(document).ready(function(){height();});
$(window).resize(function(){height();});
$(window).scroll(function() {height();});

function productcartsticky() {
  if (jQuery(window).width() > 319) {
    if (jQuery(this).scrollTop() > 550) {
      jQuery('.add-to-cart-sticky').addClass("fixed");

    } else {
      jQuery('.add-to-cart-sticky').removeClass("fixed");
    }
  } else {
    jQuery('.add-to-cart-sticky').removeClass("fixed");
  }
}
$(document).ready(function() {
  productcartsticky();
});
jQuery(window).resize(function() {
  productcartsticky();
});
jQuery(window).scroll(function() {
  productcartsticky();
});
function footerToggle() {
  if(jQuery( window ).width() < 992) {   
    jQuery('.left-sidebar.sidebar').insertAfter('.collection_wrapper');
    jQuery('.sidebar .collection_sidebar .sidebar-block').insertAfter('.filter-wrapper');
    jQuery(".right-sidebar.sidebar .widget > h4,.left-sidebar.sidebar .widget > h4,.blog-section .sidebar .widget > h4").addClass( "toggle" );
    jQuery(".right-sidebar.sidebar .widget,.left-sidebar.sidebar .widget,.blog-section .sidebar .widget").children(':nth-child(2)').css( 'display', 'none' );
    jQuery(".right-sidebar.sidebar .widget.active,.left-sidebar.sidebar .widget.active,.blog-section .sidebar .widget.active").children(':nth-child(2)').css( 'display', 'block' );
    jQuery(".right-sidebar.sidebar .widget > h4.toggle,.left-sidebar.sidebar .widget > h4.toggle,.blog-section .sidebar .widget > h4.toggle").unbind("click");
    jQuery(".right-sidebar.sidebar .widget > h4.toggle,.left-sidebar.sidebar .widget > h4.toggle,.blog-section .sidebar .widget > h4.toggle").on('click',function() {
      jQuery(this).parent().toggleClass('active').children(':nth-child(2)').slideToggle( "fast" );
    });   
    jQuery(".collection_right .sidebar-block .widget > h4,.collection_left .sidebar-block .widget > h4,.filter-toggle-wrap .sidebar-block .widget > h4").addClass( "toggle" );
    jQuery(".collection_right .sidebar-block .widget,.collection_left .sidebar-block .widget,.filter-toggle-wrap .sidebar-block .widget ").children(':nth-child(2)').css( 'display', 'none' );
    jQuery(".collection_right .sidebar-block .widget.active,.collection_left .sidebar-block .widget.active,.filter-toggle-wrap .sidebar-block .widget.active").children(':nth-child(2)').css( 'display', 'block' );
    jQuery(".collection_right .sidebar-block .widget > h4.toggle,.collection_left .sidebar-block .widget > h4.toggle,.filter-toggle-wrap .sidebar-block .widget > h4.toggle").unbind("click");
    jQuery(".collection_right .sidebar-block .widget > h4.toggle,.collection_left .sidebar-block .widget > h4.toggle,.filter-toggle-wrap .sidebar-block .widget > h4.toggle").on('click',function() {
      jQuery(this).parent().toggleClass('active').children(':nth-child(2)').slideToggle( "fast" );
    });  
  }else{
    jQuery('.sidebar-block').prependTo('.collection_sidebar');
    jQuery('.left-sidebar.sidebar').insertBefore('.collection_wrapper');
    jQuery(".sidebar .widget > h4,.sidebar-block .widget > h4").unbind("click");
    jQuery(".sidebar .widget > h4,.sidebar-block .widget > h4").removeClass( "toggle" );
    jQuery(".sidebar .widget,.sidebar-block .widget").children(':nth-child(2)').css( 'display', 'block' );
  }
}
jQuery(document).ready(function() {
  footerToggle();
});
jQuery(window).resize(function() {
  footerToggle();
});

jQuery(window).load(function() {
  var h = $('.design_3 .product-wrapper-owlslider').height();
  $('.design_3 .product-information-inner.tt-scroll').css('min-height', h+"px");
});
jQuery(window).resize(function() {
  footerToggle();
  var h = $('.design_3 .product-wrapper-owlslider').height();
  $('.design_3 .product-information-inner.tt-scroll').css('min-height', h+"px");
});

function splitStr(string,seperator){
  return string.split(seperator);
}
function countDownIni(countdown) {
  $(countdown).each(function () {
    var countdown = $(this);
    var promoperiod;
    if (countdown.attr('data-promoperiod')) {
      promoperiod = new Date().getTime() + parseInt(countdown.attr('data-promoperiod'), 10);
    } else if (countdown.attr('data-countdown')) {
      promoperiod = countdown.attr('data-countdown');
    }
    if (Date.parse(promoperiod) - Date.parse(new Date()) > 0) {
      $(this).addClass('countdown-block');
      countdown.countdown(promoperiod, function (event) {
        // countdown.html(event.strftime('%-w weeks %-d days %Hh %Mm %Ss'));
        countdown.html(event.strftime('<span><span class="left-txt">Left</span><span>%D</span><span class="time-txt">Days</span></span>' + '<span><span>%H</span><span class="time-txt">Hrs</span></span>' + '<span><span>%M</span><span class="time-txt">Min</span></span>' + '<span><span class="second">%S</span><span class="time-txt">Sec</span></span>'));
      });
    }

  });
}
function hb_animated_contents() {
  $(".hb-animate-element:in-viewport").each(function (i) {
    var $this = $(this);
    if (!$this.hasClass('hb-in-viewport')) {
      setTimeout(function () {
        $this.addClass('hb-in-viewport');
      }, 180 * i);
    }
  });
}
$(window).scroll(function () {
  hb_animated_contents();
});
$(window).load(function () {
  hb_animated_contents();
});
function sidebarsticky() { 
  if ($(document).width() <= 1199) {
    jQuery('.left-sidebar.sidebar,.right-sidebar.sidebar,.collection_right,.collection_left').theiaStickySidebar({
      additionalMarginBottom: 30,
      additionalMarginTop: 30
    });
  } 
  else if ($(document).width() >= 1200) {
    jQuery('.left-sidebar.sidebar,.right-sidebar.sidebar,.collection_right,.collection_left').theiaStickySidebar({
      additionalMarginBottom: 30,
      additionalMarginTop: 130
    });
  }
}
jQuery(document).ready(function() {
  sidebarsticky();
});
jQuery(window).resize(function() {
  sidebarsticky();
});





/* responsive accordian menu*/
jQuery(function() {
  var Accordion = function(el, multiple) {
    this.el = el || {};
    this.multiple = multiple || false;
    $('.cat-cnt').addClass('active');
    // Variables privadas
    var links = this.el.find('.cat-cnt .mobile-nav__sublist-trigger');
    // Evento
    links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
  }
  Accordion.prototype.dropdown = function(e) {
    e.preventDefault();
    var $el = e.data.el;
    $this = $(this),
      $next = $this.next();

    $next.slideToggle();
    $this.parent().toggleClass('open');

    if (!e.data.multiple) {
      $el.find('.tt_sub_menu_linklist').not($next).slideUp().parent().removeClass('open');
    };
  }	
  var accordion = new Accordion($('.topcat_content'), false);
});

jQuery(function() {
  var Accordion = function(el, multiple) {
    this.el = el || {};
    this.multiple = multiple || false;
    // Variables privadas
    var links = this.el.find('.menu-item-depth-0 .mobile-nav__sublist-trigger');
    // Evento
    links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown);
  }
  Accordion.prototype.dropdown = function(e) {
    var $el = e.data.el;
    $this = $(this),
      $next = $this.next();
    $next.slideToggle();
    $this.parent().toggleClass('open');
    if (!e.data.multiple) {
      $el.find('.menu-item-depth-0 .sub-nav__dropdown').not($next).slideUp().parent().removeClass('open');
    };
  }	
  var accordion = new Accordion($('#accessibleNav'), false);
});

jQuery(function() {
  if(!$('body').hasClass('fullnav-open'))  {
    var Accordion = function(el, multiple) {
      this.el = el || {};
      this.multiple = multiple || false;
      // Variables privadas
      var links = this.el.find('li.tt_mm_hassub .mobile-nav__sublist-trigger');
      // Evento
      links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown);
    }
    Accordion.prototype.dropdown = function(e) {
      var $el = e.data.el;
      $this = $(this),
        $next = $this.next();

      $next.slideToggle();
      $this.parent().toggleClass('open');

      if (!e.data.multiple) {
        $el.find('li.tt_mm_hassub > .tt_sub_menu_wrap').not($next).slideUp().parent().removeClass('open');
      };
    }	
    var accordion = new Accordion($('.tt_menus_ul'), false);
  }
});
jQuery(function() {
  var Accordions = function(el, multiple) {
    this.el = el || {};
    this.multiple = multiple || false;

    // Variables privadas
    var link = this.el.find('.toggle');
    // Evento
    link.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
  }
  Accordions.prototype.dropdown = function(e) {
    var $el = e.data.el;
    $this = $(this),
      $next = $this.next();

    $next.slideToggle();
    $this.parent().toggleClass('active');

    if (!e.data.multiple) {
      $el.find('.inline-list').not($next).slideUp().parent().removeClass('active');
    };
  }	
  var accordions = new Accordions($('.footer-column'), false);
});