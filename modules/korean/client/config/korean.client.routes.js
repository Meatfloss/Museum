(function () {
  'use strict';

  angular
    .module('korean.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('korean', {
        abstract: true,
        url: '/korean',
        template: '<ui-view/>'
      })
      .state('korean.landing', {
        url: '/landing',
        templateUrl: 'modules/korean/client/views/landing-korean.client.view.html',
        controller: 'KoreanLandingController',
        controllerAs: 'vm',
        resolve: {
          dynastyResolve: getDynasties
        },
        data: {
          pageTitle: 'Korean Art Collection List'
        }
      })
      .state('korean.list', {
        url: '',
        templateUrl: 'modules/korean/client/views/list-korean.client.view.html',
        controller: 'KoreanListController',
        controllerAs: 'vm',
        resolve: {
          koreanListResolve: getKoreanList
        },
        data: {
          pageTitle: 'Korean Art Collection List'
        }
      })
      .state('korean.list-with-param', {
        url: '/:dynasty/:category',
        templateUrl: 'modules/korean/client/views/list-korean.client.view.html',
        controller: 'KoreanListController',
        controllerAs: 'vm',
        resolve: {
          koreanListResolve: getKoreanList
        },
        data: {
          pageTitle: 'Korean Art Collection List'
        }
      })
      .state('korean.view', {
        url: '/:koreanId',
        templateUrl: 'modules/korean/client/views/view-korean.client.view.html',
        controller: 'KoreanController',
        controllerAs: 'vm',
        resolve: {
          koreanResolve: getKorean
        },
        data: {
          pageTitle: 'Painting {{ koreanResolve.title }}'
        }
      });
  }

  getKorean.$inject = ['$stateParams', 'KoreanService'];
  function getKorean($stateParams, KoreanService) {
    return KoreanService.get({
      koreanId: $stateParams.koreanId
    }).$promise;
  }

  // getAllKorean.$inject = ['$stateParams', 'KoreanService'];
  // function getAllKorean($stateParams, KoreanService, KoreanListService) {
  //   return KoreanService.query().$promise;
  // }

  getKoreanList.$inject = ['$stateParams', 'KoreanListService'];
  function getKoreanList($stateParams, KoreanListService) {
    return KoreanListService.filteredList({
      dynasty: $stateParams.dynasty,
      category: $stateParams.category
    }).$promise;
  }

  getDynasties.$inject = ['$stateParams', 'KoreanDynastyService'];
  function getDynasties($stateParams, KoreanService) {
    return KoreanService;
  }
}());
