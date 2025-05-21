
// import "../scss/styles.scss";

// // Import Swiper JS and CSS
// import Swiper from "swiper";
// import "../node_modules/swiper/css"; // Core CSS
// import "../node_modules/swiper/navigation"; // Optional if you need navigation arrows
// import "../node_modules/swiper/pagination"; // Optional if you need pagination dots



document.addEventListener("DOMContentLoaded", () => {
  //Header On Scroll Script
  
  
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
    slidesPerView: 1.1,
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
  