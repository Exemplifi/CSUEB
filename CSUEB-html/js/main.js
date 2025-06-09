
// import "../scss/styles.scss";

// // Import Swiper JS and CSS
// import Swiper from "swiper";
// import "../node_modules/swiper/css"; // Core CSS
// import "../node_modules/swiper/navigation"; // Optional if you need navigation arrows
// import "../node_modules/swiper/pagination"; // Optional if you need pagination dots



document.addEventListener("DOMContentLoaded", () => {

  



    // Testimonial Slider
    var testimonialslider = new Swiper(".testimonial-slider", {
      spaceBetween: 30,
      effect: "fade",
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  
  
    // Header
    const menuBtn = document.querySelector('.menu-btn');
    const menuBtnMobile = document.getElementById('menuToggleMobile');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.overlay-header');
    const closeBtn = document.querySelector('.close-btn'); // optional
    const closeBtnMobile = document.querySelector('.close-btn-mobile'); // optional
    const body = document.body;
    const header = document.querySelector('.main-header');

    // Open Sidebar
    function openSidebar() {
      sidebar.classList.add('active');
      overlay.classList.add('show');
      body.classList.add('sidebar-open', 'no-scroll');
    }

    // Close Sidebar
    function closeSidebar() {
      sidebar.classList.remove('active');
      overlay.classList.remove('show');
      body.classList.remove('sidebar-open', 'no-scroll');
    }

    // Add event listeners
    if (menuBtn) menuBtn.addEventListener('click', openSidebar);
    if (menuBtnMobile) menuBtnMobile.addEventListener('click', openSidebar);
    if (overlay) overlay.addEventListener('click', closeSidebar);
    if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
    if (closeBtnMobile) closeBtnMobile.addEventListener('click', closeSidebar);

    // Scroll Event - Add class on header when scrolled
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        header.classList.add('header-color');
      } else {
        header.classList.remove('header-color');
      }
    });

  // Scroll Event - Add class on header when scrolled up 
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop && scrollTop > 10) {
        // Scrolling down
        header.classList.add('upwards');
      } else {
        // Scrolling up
        header.classList.remove('upwards');
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
    // Header End

    
  
    
  // image-gallery-slider
  var swiperimagegallery = new Swiper(".image-gallery-slider", {
    slidesPerView: 1.2,
    spaceBetween: 4,
    breakpoints: {
      640: {
        slidesPerView: 2.1,
        spaceBetween: 4,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 4,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 4,
      },
      1280: {
        slidesPerView: 5,
        spaceBetween: 4,
      },
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next.swiper-button-next-new",
      prevEl: ".swiper-button-prev.swiper-button-prev-new",
    },
  });

  

   // inner-hero-slider
   var swiperinnerhero = new Swiper(".hero-full-swiper", {
      slidesPerView: 1,
      spaceBetween: 10,
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        // dynamicBullets: true,
      },
      navigation: {
        nextEl: ".swiper-button-next.swiper-btn",
        prevEl: ".swiper-button-prev.swiper-btn",
      },
  });

   // Icon and text Slider
   var swipericon = new Swiper(".text-icon-slider", {
    slidesPerView: 1.2,
    spaceBetween: 20,
    breakpoints: {
      640: {
        slidesPerView: 2.1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next.swiper-button-next-new",
      prevEl: ".swiper-button-prev.swiper-button-prev-new",
    },
  });

    var swiper = new Swiper(".bright-future-swiper", {
        slidesPerView: 3,
        spaceBetween: 20,
        breakpoints: {
            100: { slidesPerView: 1.2 },
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3 },
        }
    });

     // Hero Slider
    const slideCount = document.querySelectorAll('.hero-slider .swiper-slide').length;
    const hasMultipleSlides = slideCount > 1;
    // Show/hide arrows based on the number of slides
    if (!hasMultipleSlides) {
        document.querySelector('.swiper-button-group').style.display = 'none';
    }
    const swiperhero = new Swiper(".hero-slider", {
        navigation: hasMultipleSlides ? {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
        } : false,
    });



    // Signle  Slider
    var swiperSlider = new Swiper(".main-img-slider", {
      loop: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
    });

   


    
   
   
});
  


// Gallery Start
const html = document.querySelector('html');
html.setAttribute('data-bs-theme', 'dark');

document.addEventListener('DOMContentLoaded', () => {
  // --- Create LightBox
  const galleryGrid = document.querySelector(".gallery-grid");
  const links = galleryGrid.querySelectorAll("a");
  const imgs = galleryGrid.querySelectorAll("img");
  const lightboxModal = document.getElementById("lightbox-modal");
  const bsModal = new bootstrap.Modal(lightboxModal);
  const modalBody = lightboxModal.querySelector(".lightbox-content");

  function createCaption (caption) {
    return `<div class="carousel-caption d-none d-md-block">
        <h5 class="m-0">${caption}</h5>
      </div>`;
  }

  function createIndicators (img) {
    let markup = "", i, len;

    const countSlides = links.length;
    const parentCol = img.closest('.swiper-slide');
    const curIndex = [...parentCol.parentElement.children].indexOf(parentCol);

    for (i = 0, len = countSlides; i < len; i++) {
      markup += `
        <button type="button" data-bs-target="#lightboxCarousel"
          data-bs-slide-to="${i}"
          ${i === curIndex ? 'class="active" aria-current="true"' : ''}
          aria-label="Slide ${i + 1}">
        </button>`;
    }

    return markup;
  }

  function createSlides (img) {
    let markup = "";
    const currentImgSrc = img.closest('.gallery-item').getAttribute("href");

    for (const img of imgs) {
      const imgSrc = img.closest('.gallery-item').getAttribute("href");
      const imgAlt = img.getAttribute("alt");

      markup += `
        <div class="carousel-item${currentImgSrc === imgSrc ? " active" : ""}">
          <img class="d-block img-fluid w-100" src=${imgSrc} alt="${imgAlt}">
          ${imgAlt ? createCaption(imgAlt) : ""}
        </div>`;
    }

    return markup;
  }

  function createCarousel (img) {
    const markup = `
      <!-- Lightbox Carousel -->
      <div id="lightboxCarousel" class="carousel slide carousel-fade" data-bs-ride="true">
        <!-- Indicators/dots -->
        <div class="carousel-indicators">
          ${createIndicators(img)}
        </div>
        <!-- Wrapper for Slides -->
        <div class="carousel-inner justify-content-center mx-auto">
          ${createSlides(img)}
        </div>
        <!-- Controls/icons -->
        <button class="carousel-control-prev" type="button" data-bs-target="#lightboxCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#lightboxCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      `;

    modalBody.innerHTML = markup;
  }

  for (const link of links) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const currentImg = link.querySelector("img");
      const lightboxCarousel = document.getElementById("lightboxCarousel");

      if (lightboxCarousel) {
        const parentCol = link.closest('.swiper-slide');
        const index = [...parentCol.parentElement.children].indexOf(parentCol);

        const bsCarousel = new bootstrap.Carousel(lightboxCarousel);
        bsCarousel.to(index);
      } else {
        createCarousel(currentImg);
      }

      bsModal.show();
    });
  }

  // --- Support Fullscreen
  const fsEnlarge = document.querySelector(".btn-fullscreen-enlarge");
  const fsExit = document.querySelector(".btn-fullscreen-exit");

  function enterFS () {
    lightboxModal.requestFullscreen().then({}).catch(err => {
      alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
    });
    fsEnlarge.classList.toggle("d-none");
    fsExit.classList.toggle("d-none");
  }

  function exitFS () {
    document.exitFullscreen();
    fsExit.classList.toggle("d-none");
    fsEnlarge.classList.toggle("d-none");
  }

  fsEnlarge.addEventListener("click", (e) => {
    e.preventDefault();
    enterFS();
  });

  fsExit.addEventListener("click", (e) => {
    e.preventDefault();
    exitFS();
  });
})
// Gallery End