(function () {
  'use strict';

  angular
    .module('qporcelains.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.qporcelains', {
        abstract: true,
        url: '/qporcelains',
        template: '<ui-view/>'
      })
      .state('admin.qporcelains.list', {
        url: '',
        templateUrl: 'modules/qporcelains/client/views/admin/list-qporcelains.client.view.html',
        controller: 'QporcelainsAdminListController',
        controllerAs: 'vm',
        resolve: {
          qporcelainsListResolve: getQporcelainsList
        },
        data: {
          roles: ['admin']
        }
      })
      .state('admin.qporcelains.create', {
        url: '/create',
        templateUrl: 'modules/qporcelains/client/views/admin/form-qporcelains.client.view.html',
        controller: 'QporcelainsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          qporcelainsResolve: newQporcelains,
          dynastyResolve: getDynasties
        }
      })
      .state('admin.qporcelains.edit', {
        url: '/:qporcelainsId/edit',
        templateUrl: 'modules/qporcelains/client/views/admin/form-qporcelains.client.view.html',
        controller: 'QporcelainsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          qporcelainsResolve: getQporcelains,
          dynastyResolve: getDynasties
        }
      })
      .state('admin.qporcelains.list-with-param', {
        url: '/:dynasty/:category',
        templateUrl: 'modules/qporcelains/client/views/admin/list-qporcelains.client.view.html',
        controller: 'QporcelainsAdminListController',
        controllerAs: 'vm',
        resolve: {
          qporcelainsListResolve: getQporcelainsList
        },
        data: {
          pageTitle: 'Qing Dynasty Porcelain'
        }
      });
  }

  getQporcelains.$inject = ['$stateParams', 'QporcelainsService'];
  function getQporcelains($stateParams, QporcelainsService) {
    return QporcelainsService.get({
      qporcelainsId: $stateParams.qporcelainsId
    }).$promise;
  }

  getQporcelainsList.$inject = ['$stateParams', 'QporcelainsListService'];
  function getQporcelainsList($stateParams, QporcelainsListService) {
    return QporcelainsListService.filteredList({
      dynasty: $stateParams.dynasty,
      category: $stateParams.category
    }).$promise;
  }

  newQporcelains.$inject = ['QporcelainsService'];
  function newQporcelains(QporcelainsService) {
    return new QporcelainsService();
  }

  getDynasties.$inject = ['$stateParams', 'QporcelainsDynastyService'];
  function getDynasties($stateParams, QporcelainsService) {
    return QporcelainsService;
  }
}());
