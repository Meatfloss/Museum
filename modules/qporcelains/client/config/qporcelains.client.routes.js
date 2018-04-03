(function () {
  'use strict';

  angular
    .module('qporcelains.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('qporcelains', {
        abstract: true,
        url: '/qporcelains',
        template: '<ui-view/>'
      })
      .state('qporcelains.landing', {
        url: '/landing',
        templateUrl: 'modules/qporcelains/client/views/landing-qporcelains.client.view.html',
        controller: 'QporcelainsLandingController',
        controllerAs: 'vm',
        resolve: {
          dynastyResolve: getDynasties
        },
        data: {
          pageTitle: 'Qing Dynasty Porcelain List'
        }
      })
      .state('qporcelains.list', {
        url: '',
        templateUrl: 'modules/qporcelains/client/views/list-qporcelains.client.view.html',
        controller: 'QporcelainsListController',
        controllerAs: 'vm',
        resolve: {
          qporcelainsListResolve: getQporcelainsList
        },
        data: {
          pageTitle: 'Qing Dynasty Porcelain List'
        }
      })
      .state('qporcelains.list-with-param', {
        url: '/:dynasty/:category',
        templateUrl: 'modules/qporcelains/client/views/list-qporcelains.client.view.html',
        controller: 'QporcelainsListController',
        controllerAs: 'vm',
        resolve: {
          qporcelainsListResolve: getQporcelainsList
        },
        data: {
          pageTitle: 'Qing Dynasty Porcelain List'
        }
      })
      .state('qporcelains.view', {
        url: '/:qporcelainsId',
        templateUrl: 'modules/qporcelains/client/views/view-qporcelains.client.view.html',
        controller: 'QporcelainsController',
        controllerAs: 'vm',
        resolve: {
          qporcelainsResolve: getQporcelains
        },
        data: {
          pageTitle: 'Painting {{ qporcelainsResolve.title }}'
        }
      });
  }

  getQporcelains.$inject = ['$stateParams', 'QporcelainsService'];
  function getQporcelains($stateParams, QporcelainsService) {
    return QporcelainsService.get({
      qporcelainsId: $stateParams.qporcelainsId
    }).$promise;
  }

  // getAllQporcelains.$inject = ['$stateParams', 'QporcelainsService'];
  // function getAllQporcelains($stateParams, QporcelainsService, QporcelainsListService) {
  //   return QporcelainsService.query().$promise;
  // }

  getQporcelainsList.$inject = ['$stateParams', 'QporcelainsListService'];
  function getQporcelainsList($stateParams, QporcelainsListService) {
    return QporcelainsListService.filteredList({
      dynasty: $stateParams.dynasty,
      category: $stateParams.category
    }).$promise;
  }

  getDynasties.$inject = ['$stateParams', 'QporcelainsDynastyService'];
  function getDynasties($stateParams, QporcelainsService) {
    return QporcelainsService;
  }
}());
