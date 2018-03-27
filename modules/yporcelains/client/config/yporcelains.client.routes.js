(function () {
  'use strict';

  angular
    .module('yporcelains.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('yporcelains', {
        abstract: true,
        url: '/yporcelains',
        template: '<ui-view/>'
      })
      .state('yporcelains.landing', {
        url: '/landing',
        templateUrl: 'modules/yporcelains/client/views/landing-yporcelains.client.view.html',
        controller: 'YporcelainsLandingController',
        controllerAs: 'vm',
        resolve: {
          dynastyResolve: getDynasties
        },
        data: {
          pageTitle: 'Ming Dynasty Porcelains List'
        }
      })
      .state('yporcelains.list', {
        url: '',
        templateUrl: 'modules/yporcelains/client/views/list-yporcelains.client.view.html',
        controller: 'YporcelainsListController',
        controllerAs: 'vm',
        resolve: {
          yporcelainsListResolve: getYporcelainsList
        },
        data: {
          pageTitle: 'Ming Dynasty Porcelains List'
        }
      })
      .state('yporcelains.list-with-param', {
        url: '/:dynasty/:category',
        templateUrl: 'modules/yporcelains/client/views/list-yporcelains.client.view.html',
        controller: 'YporcelainsListController',
        controllerAs: 'vm',
        resolve: {
          yporcelainsListResolve: getYporcelainsList
        },
        data: {
          pageTitle: 'Ming Dynasty Porcelains List'
        }
      })
      .state('yporcelains.view', {
        url: '/:yporcelainsId',
        templateUrl: 'modules/yporcelains/client/views/view-yporcelains.client.view.html',
        controller: 'YporcelainsController',
        controllerAs: 'vm',
        resolve: {
          yporcelainsResolve: getYporcelains
        },
        data: {
          pageTitle: 'Painting {{ yporcelainsResolve.title }}'
        }
      });
  }

  getYporcelains.$inject = ['$stateParams', 'YporcelainsService'];
  function getYporcelains($stateParams, YporcelainsService) {
    return YporcelainsService.get({
      yporcelainsId: $stateParams.yporcelainsId
    }).$promise;
  }

  // getAllYporcelains.$inject = ['$stateParams', 'YporcelainsService'];
  // function getAllYporcelains($stateParams, YporcelainsService, YporcelainsListService) {
  //   return YporcelainsService.query().$promise;
  // }

  getYporcelainsList.$inject = ['$stateParams', 'YporcelainsListService'];
  function getYporcelainsList($stateParams, YporcelainsListService) {
    return YporcelainsListService.filteredList({
      dynasty: $stateParams.dynasty,
      category: $stateParams.category
    }).$promise;
  }

  getDynasties.$inject = ['$stateParams', 'YporcelainsDynastyService'];
  function getDynasties($stateParams, YporcelainsService) {
    return YporcelainsService;
  }
}());
