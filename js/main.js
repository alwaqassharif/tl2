(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        dots: false,
        loop: true,
        center: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });
    
})(jQuery);

(function () {

  const title = document.title;
  const description = document.querySelector('meta[name="description"]')?.content || "";
  const url = window.location.href;

  const image = document.querySelector("img")?.src || "";

  let faqs = [];
  document.querySelectorAll("h3").forEach(q => {
    let answer = q.nextElementSibling;
    if(answer && answer.tagName === "P"){
      faqs.push({
        "@type": "Question",
        "name": q.innerText,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": answer.innerText
        }
      });
    }
  });

  const isBlog = document.querySelector("article");

  if(isBlog){
    addSchema({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": title,
      "description": description,
      "image": image,
      "author": {
        "@type": "Person",
        "name": "GPost"
      },
      "publisher": {
        "@type": "Organization",
        "name": "GPost",
        "logo": {
          "@type": "ImageObject",
          "url": "https://gpost.store/img/logo.png"
        }
      },
      "mainEntityOfPage": url
    });
  }

  if(faqs.length > 0){
    addSchema({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs
    });
  }

  addSchema({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://gpost.store"
    },{
      "@type": "ListItem",
      "position": 2,
      "name": title
    }]
  });

  addSchema({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "GPost",
    "url": "https://gpost.store",
    "logo": "https://gpost.store/img/logo.png"
  });

  addSchema({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://gpost.store",
    "name": "GPost"
  });

  function addSchema(data){
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
  }

})();
