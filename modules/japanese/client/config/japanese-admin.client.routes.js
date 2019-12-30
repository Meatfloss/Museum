(function () {
  'use strict';

  angular
    .module('japanese.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.japanese', {
        abstract: true,
        url: '/japanese',
        template: '<ui-view/>'
      })
      .state('admin.japanese.list', {
        url: '',
        templateUrl: 'modules/japanese/client/views/admin/list-japanese.client.view.html',
        controller: 'JapaneseAdminListController',
        controllerAs: 'vm',
        resolve: {
          japaneseListResolve: getJapaneseList
        },
        data: {
          roles: ['admin']
        }
      })
      .state('admin.japanese.create', {
        url: '/create',
        templateUrl: 'modules/japanese/client/views/admin/form-japanese.client.view.html',
        controller: 'JapaneseAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          japaneseResolve: newJapanese,
          dynastyResolve: getDynasties
        }
      })
      .state('admin.japanese.edit', {
        url: '/:japaneseId/edit',
        templateUrl: 'modules/japanese/client/views/admin/form-japanese.client.view.html',
        controller: 'JapaneseAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          japaneseResolve: getJapanese,
          dynastyResolve: getDynasties
        }
      })
      .state('admin.japanese.list-with-param', {
        url: '/:dynasty/:category',
        templateUrl: 'modules/japanese/client/views/admin/list-japanese.client.view.html',
        controller: 'JapaneseAdminListController',
        controllerAs: 'vm',
        resolve: {
          japaneseListResolve: getJapaneseList
        },
        data: {
          pageTitle: 'Japanese Art Collection'
        }
      });
  }

  getJapanese.$inject = ['$stateParams', 'JapaneseService'];
  function getJapanese($stateParams, JapaneseService) {
    return JapaneseService.get({
      japaneseId: $stateParams.japaneseId
    }).$promise;
  }

  getJapaneseList.$inject = ['$stateParams', 'JapaneseListService'];
  function getJapaneseList($stateParams, JapaneseListService) {
    return JapaneseListService.filteredList({
      dynasty: $stateParams.dynasty,
      category: $stateParams.category
    }).$promise;
  }

  newJapanese.$inject = ['JapaneseService'];
  function newJapanese(JapaneseService) {
    return new JapaneseService();
  }

  getDynasties.$inject = ['$stateParams', 'JapaneseDynastyService'];
  function getDynasties($stateParams, JapaneseService) {
    return JapaneseService;
  }
}());
