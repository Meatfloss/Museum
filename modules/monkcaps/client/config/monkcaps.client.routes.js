(function () {
  'use strict';

  angular
    .module('monkcaps.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('monkcaps', {
        abstract: true,
        url: '/monkcaps',
        template: '<ui-view/>'
      })
      .state('monkcaps.landing', {
        url: '/landing',
        templateUrl: 'modules/monkcaps/client/views/landing-monkcaps.client.view.html',
        controller: 'MonkcapsLandingController',
        controllerAs: 'vm',
        resolve: {
          dynastyResolve: getDynasties
        },
        data: {
          pageTitle: 'Monkcaps Ewers List'
        }
      })
      .state('monkcaps.list', {
        url: '',
        templateUrl: 'modules/monkcaps/client/views/list-monkcaps.client.view.html',
        controller: 'MonkcapsListController',
        controllerAs: 'vm',
        resolve: {
          monkcapListResolve: getMonkcapList
        },
        data: {
          pageTitle: 'Monkcaps List'
        }
      })
      .state('monkcaps.list-with-param', {
        url: '/:dynasty/:category',
        templateUrl: 'modules/monkcaps/client/views/list-monkcaps.client.view.html',
        controller: 'MonkcapsListController',
        controllerAs: 'vm',
        resolve: {
          monkcapListResolve: getMonkcapList
        },
        data: {
          pageTitle: 'Monkcaps List'
        }
      })
      .state('monkcaps.view', {
        url: '/:monkcapId',
        templateUrl: 'modules/monkcaps/client/views/view-monkcap.client.view.html',
        controller: 'MonkcapsController',
        controllerAs: 'vm',
        resolve: {
          monkcapResolve: getMonkcap
        },
        data: {
          pageTitle: 'Painting {{ monkcapResolve.title }}'
        }
      });
  }

  getMonkcap.$inject = ['$stateParams', 'MonkcapsService'];
  function getMonkcap($stateParams, MonkcapsService) {
    return MonkcapsService.get({
      monkcapId: $stateParams.monkcapId
    }).$promise;
  }

  // getAllMonkcaps.$inject = ['$stateParams', 'MonkcapsService'];
  // function getAllMonkcaps($stateParams, MonkcapsService, MonkcapsListService) {
  //   return MonkcapsService.query().$promise;
  // }

  getMonkcapList.$inject = ['$stateParams', 'MonkcapsListService'];
  function getMonkcapList($stateParams, MonkcapsListService) {
    return MonkcapsListService.filteredList({
      dynasty: $stateParams.dynasty,
      category: $stateParams.category
    }).$promise;
  }

  getDynasties.$inject = ['$stateParams', 'MonkcapDynastyService'];
  function getDynasties($stateParams, MonkcapsService) {
    return MonkcapsService;
  }
}());
