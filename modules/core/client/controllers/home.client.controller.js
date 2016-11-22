(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  function HomeController() {
    var vm = this;

    vm.myInterval = 5000;
    vm.noWrapSlides = false;
    vm.active = 0;
    var slides = vm.slides = [];
    var currIndex = 0;

    vm.addSlide = function (index) {
      var newWidth = 600 + slides.length + 1;
      slides.push({
        image: 'modules/core/client/img/home-slide' + index + '.jpg',
        text: ['Nice image', 'Awesome photograph', 'That is so cool', 'I love that', 'number 5'][slides.length % 5],
        id: currIndex++
      });
    };

    for (var i = 0; i < 5; i++) {
      vm.addSlide(i + 1);
    }
  }
} ());
