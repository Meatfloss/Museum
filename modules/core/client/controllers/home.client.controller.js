(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  function HomeController() {
    var vm = this;

    vm.myInterval = 3000;
    vm.noWrapSlides = false;
    vm.active = 0;
    var slides = vm.slides = [];
    var currIndex = 0;

    vm.addSlide = function (index) {
      slides.push({
        image: 'modules/core/client/img/home-slide' + index + '.jpg',
        imageMobile: 'modules/core/client/img/home-slide-mobile' + index + '.jpg',
        text: ['Nice image', 'Awesome photograph', 'That is so cool', 'I love that', 'number 5'][slides.length % 5],
        id: currIndex++
      });
    };

    for (var i = 0; i < 5; i++) {
      vm.addSlide(i + 1);
    }
  }
}());
