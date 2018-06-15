(function () {
  'use strict';

  angular
    .module('sculpture.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.sculpture', {
        abstract: true,
        url: '/sculpture',
        template: '<ui-view/>'
      })
      .state('admin.sculpture.list', {
        url: '',
        templateUrl: 'modules/sculpture/client/views/admin/list-sculpture.client.view.html',
        controller: 'SculptureAdminListController',
        controllerAs: 'vm',
        resolve: {
          sculptureListResolve: getSculptureList
        },
        data: {
          roles: ['admin']
        }
      })
      .state('admin.sculpture.create', {
        url: '/create',
        templateUrl: 'modules/sculpture/client/views/admin/form-sculpture.client.view.html',
        controller: 'SculptureAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          sculptureResolve: newSculpture,
          dynastyResolve: getDynasties
        }
      })
      .state('admin.sculpture.edit', {
        url: '/:sculptureId/edit',
        templateUrl: 'modules/sculpture/client/views/admin/form-sculpture.client.view.html',
        controller: 'SculptureAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          sculptureResolve: getSculpture,
          dynastyResolve: getDynasties
        }
      })
      .state('admin.sculpture.list-with-param', {
        url: '/:dynasty/:category',
        templateUrl: 'modules/sculpture/client/views/admin/list-sculpture.client.view.html',
        controller: 'SculptureAdminListController',
        controllerAs: 'vm',
        resolve: {
          sculptureListResolve: getSculptureList
        },
        data: {
          pageTitle: 'Sculpture List'
        }
      });
  }

  getSculpture.$inject = ['$stateParams', 'SculptureService'];
  function getSculpture($stateParams, SculptureService) {
    return SculptureService.get({
      sculptureId: $stateParams.sculptureId
    }).$promise;
  }

  getSculptureList.$inject = ['$stateParams', 'SculptureListService'];
  function getSculptureList($stateParams, SculptureListService) {
    return SculptureListService.filteredList({
      dynasty: $stateParams.dynasty,
      category: $stateParams.category
    }).$promise;
  }

  newSculpture.$inject = ['SculptureService'];
  function newSculpture(SculptureService) {
    return new SculptureService();
  }

  getDynasties.$inject = ['$stateParams', 'SculptureDynastyService'];
  function getDynasties($stateParams, SculptureService) {
    return SculptureService;
  }
}());
