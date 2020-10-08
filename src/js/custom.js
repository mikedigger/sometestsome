// burger btn
// let burger = document.querySelector('.burger--js');
// let popup_main = document.querySelector('.popup--js');
// let popup_inner = document.querySelector('.popup__inner');
// let body = document.querySelector('body');

// burger.addEventListener('click', function () {
//     popup_main.classList.toggle('active');
//     this.classList.toggle('active');
//     body.classList.toggle('noscroll');
// });

// popup_main.addEventListener('click', function (e) {
//     // e.preventDefault();
//     // if (!popup_main) return;
//     if (e.target == popup_inner) return;
//     popup_main.classList.remove('active');
//     burger.classList.remove('active');
// });

// // sticky header
// // When the user scrolls the page, execute myFunction
// window.onscroll = function () {
//     myFunction();
// };
// let header = document.querySelector('.js--header');
// let offsetTop = header.offsetTop;
// function myFunction() {
//     if (window.pageYOffset > offsetTop) {
//         header.classList.add('header--sticky');
//     } else {
//         header.classList.remove('header--sticky');
//     }
// }

//overlay

// document.addEventListener('mousedown', function (e) {
//   /**
//   * Проверяем было ли нажатие над .hystmodal__wrap,
//   * и отмечаем это в свойстве this._overlayChecker
//   */
//   if (!e.target.classList.contains('popup__inner')) return;
//   this._overlayChecker = true;
// }.bind(this));

// document.addEventListener('mouseup', function (e) {
//   /**
//   * Проверяем было ли отпускание мыши над .hystmodal__wrap,
//   * и если нажатие тоже было на нём, то закрываем окно
//   * и обнуляем this._overlayChecker в любом случае
//   */
//   if (this._overlayChecker && e.target.classList.contains('popup__inner')) {
//       e.preventDefault();
//       !this._overlayChecker;
//       this.close();
//       return;
//   }
//   this._overlayChecker = false;
// }.bind(this));

import $ from 'jquery';
const jquery = require('jquery');

let $status = $('.slider__count');
let $slickElement = $('.slider__container');

$slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
    var i = (currentSlide ? currentSlide : 0) + 1;
    $status.text(i + ' - ' + slick.slideCount);
});

$(document).ready(function () {
    $slickElement.slick({
        accessibility: false,
        appendArrows: 'slider__count',
        prevArrow: $('.slider__prev'),
        nextArrow: $('.slider__next'),
        autoplaySpeed: 8000,
        fade: true,
        autoplay: true,
        infinite: true,
        // slidesToShow: 1,
        // slidesToScroll: 1,
    });
});
