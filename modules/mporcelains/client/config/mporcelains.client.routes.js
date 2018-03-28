(function () {
  'use strict';

  angular
    .module('mporcelains.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('mporcelains', {
        abstract: true,
        url: '/mporcelains',
        template: '<ui-view/>'
      })
      .state('mporcelains.landing', {
        url: '/landing',
        templateUrl: 'modules/mporcelains/client/views/landing-mporcelains.client.view.html',
        controller: 'MporcelainsLandingController',
        controllerAs: 'vm',
        resolve: {
          dynastyResolve: getDynasties
        },
        data: {
          pageTitle: 'Ming Dynasty Porcelains List'
        }
      })
      .state('mporcelains.list', {
        url: '',
        templateUrl: 'modules/mporcelains/client/views/list-mporcelains.client.view.html',
        controller: 'MporcelainsListController',
        controllerAs: 'vm',
        resolve: {
          mporcelainsListResolve: getMporcelainsList
        },
        data: {
          pageTitle: 'Ming Dynasty Porcelains List'
        }
      })
      .state('mporcelains.list-with-param', {
        url: '/:dynasty/:category',
        templateUrl: 'modules/mporcelains/client/views/list-mporcelains.client.view.html',
        controller: 'MporcelainsListController',
        controllerAs: 'vm',
        resolve: {
          mporcelainsListResolve: getMporcelainsList
        },
        data: {
          pageTitle: 'Ming Dynasty Porcelains List'
        }
      })
      .state('mporcelains.view', {
        url: '/:mporcelainsId',
        templateUrl: 'modules/mporcelains/client/views/view-mporcelains.client.view.html',
        controller: 'MporcelainsController',
        controllerAs: 'vm',
        resolve: {
          mporcelainsResolve: getMporcelains
        },
        data: {
          pageTitle: 'Painting {{ mporcelainsResolve.title }}'
        }
      });
  }

  getMporcelains.$inject = ['$stateParams', 'MporcelainsService'];
  function getMporcelains($stateParams, MporcelainsService) {
    return MporcelainsService.get({
      mporcelainsId: $stateParams.mporcelainsId
    }).$promise;
  }

  // getAllMporcelains.$inject = ['$stateParams', 'MporcelainsService'];
  // function getAllMporcelains($stateParams, MporcelainsService, MporcelainsListService) {
  //   return MporcelainsService.query().$promise;
  // }

  getMporcelainsList.$inject = ['$stateParams', 'MporcelainsListService'];
  function getMporcelainsList($stateParams, MporcelainsListService) {
    return MporcelainsListService.filteredList({
      dynasty: $stateParams.dynasty,
      category: $stateParams.category
    }).$promise;
  }

  getDynasties.$inject = ['$stateParams', 'MporcelainsDynastyService'];
  function getDynasties($stateParams, MporcelainsService) {
    return MporcelainsService;
  }
}());
