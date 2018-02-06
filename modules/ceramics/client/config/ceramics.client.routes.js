(function () {
  'use strict';

  angular
    .module('ceramics.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('ceramics', {
        abstract: true,
        url: '/ceramics',
        template: '<ui-view/>'
      })
      .state('ceramics.landing', {
        url: '/landing',
        templateUrl: 'modules/ceramics/client/views/landing-ceramics.client.view.html',
        controller: 'CeramicsLandingController',
        controllerAs: 'vm',
        resolve: {
          dynastyResolve: getDynasties
        },
        data: {
          pageTitle: 'Ancient Ceramics List'
        }
      })
      .state('ceramics.list', {
        url: '',
        templateUrl: 'modules/ceramics/client/views/list-ceramics.client.view.html',
        controller: 'CeramicsListController',
        controllerAs: 'vm',
        resolve: {
          ceramicListResolve: getCeramicList
        },
        data: {
          pageTitle: 'Ceramics List'
        }
      })
      .state('ceramics.list-with-param', {
        url: '/:dynasty/:category',
        templateUrl: 'modules/ceramics/client/views/list-ceramics.client.view.html',
        controller: 'CeramicsListController',
        controllerAs: 'vm',
        resolve: {
          ceramicListResolve: getCeramicList
        },
        data: {
          pageTitle: 'Ceramics List'
        }
      })
      .state('ceramics.view', {
        url: '/:ceramicId',
        templateUrl: 'modules/ceramics/client/views/view-ceramic.client.view.html',
        controller: 'CeramicsController',
        controllerAs: 'vm',
        resolve: {
          ceramicResolve: getCeramic
        },
        data: {
          pageTitle: 'Painting {{ ceramicResolve.title }}'
        }
      });
  }

  getCeramic.$inject = ['$stateParams', 'CeramicsService'];
  function getCeramic($stateParams, CeramicsService) {
    return CeramicsService.get({
      ceramicId: $stateParams.ceramicId
    }).$promise;
  }

  getCeramicList.$inject = ['$stateParams', 'CeramicsService'];
  function getCeramicList($stateParams, CeramicsService) {
    return CeramicsService.filteredList({
      dynasty: $stateParams.dynasty,
      category: $stateParams.category
    }).$promise;
  }

  getDynasties.$inject = ['$stateParams', 'DynastyService'];
  function getDynasties($stateParams, CeramicsService) {
    return CeramicsService;
  }
}());
