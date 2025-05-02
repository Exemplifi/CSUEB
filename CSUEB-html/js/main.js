
// import "../scss/styles.scss";

// // Import Swiper JS and CSS
// import Swiper from "swiper";
// import "../node_modules/swiper/css"; // Core CSS
// import "../node_modules/swiper/navigation"; // Optional if you need navigation arrows
// import "../node_modules/swiper/pagination"; // Optional if you need pagination dots

// Initialize your Swiper
// const swiper = new Swiper(".bright-future-swiper", {
//   slidesPerView: 3,
//   spaceBetween: 30,
//   breakpoints: {
//     768: { slidesPerView: 2 },
//     576: { slidesPerView: 1 }
//   }
// });

document.addEventListener("DOMContentLoaded", () => {

    var swiper = new Swiper(".bright-future-swiper", {
        slidesPerView: 3,
        spaceBetween: 20,
        breakpoints: {
            100: { slidesPerView: 1.2 },
            768: { slidesPerView: 2.2 },
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

    // Header End
   
});
  