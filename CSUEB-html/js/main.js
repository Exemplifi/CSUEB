
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


    var swiperSlider = new Swiper(".main-single-slider", {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
    });
   
});
  