(function () {
  'use strict';

  angular
    .module('jade.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.jade', {
        abstract: true,
        url: '/jade',
        template: '<ui-view/>'
      })
      .state('admin.jade.list', {
        url: '',
        templateUrl: 'modules/jade/client/views/admin/list-jade.client.view.html',
        controller: 'JadeAdminListController',
        controllerAs: 'vm',
        resolve: {
          jadeListResolve: getJadeList
        },
        data: {
          roles: ['admin']
        }
      })
      .state('admin.jade.create', {
        url: '/create',
        templateUrl: 'modules/jade/client/views/admin/form-jade.client.view.html',
        controller: 'JadeAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          jadeResolve: newJade,
          dynastyResolve: getDynasties
        }
      })
      .state('admin.jade.edit', {
        url: '/:jadeId/edit',
        templateUrl: 'modules/jade/client/views/admin/form-jade.client.view.html',
        controller: 'JadeAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          jadeResolve: getJade,
          dynastyResolve: getDynasties
        }
      })
      .state('admin.jade.list-with-param', {
        url: '/:dynasty/:category',
        templateUrl: 'modules/jade/client/views/admin/list-jade.client.view.html',
        controller: 'JadeAdminListController',
        controllerAs: 'vm',
        resolve: {
          jadeListResolve: getJadeList
        },
        data: {
          pageTitle: 'Jade List'
        }
      });
  }

  getJade.$inject = ['$stateParams', 'JadeService'];
  function getJade($stateParams, JadeService) {
    return JadeService.get({
      jadeId: $stateParams.jadeId
    }).$promise;
  }

  getJadeList.$inject = ['$stateParams', 'JadeListService'];
  function getJadeList($stateParams, JadeListService) {
    return JadeListService.filteredList({
      dynasty: $stateParams.dynasty,
      category: $stateParams.category
    }).$promise;
  }

  newJade.$inject = ['JadeService'];
  function newJade(JadeService) {
    return new JadeService();
  }

  getDynasties.$inject = ['$stateParams', 'JadeDynastyService'];
  function getDynasties($stateParams, JadeService) {
    return JadeService;
  }
}());
