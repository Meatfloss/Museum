(function () {
  'use strict';

  angular
    .module('korean.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.korean', {
        abstract: true,
        url: '/korean',
        template: '<ui-view/>'
      })
      .state('admin.korean.list', {
        url: '',
        templateUrl: 'modules/korean/client/views/admin/list-korean.client.view.html',
        controller: 'KoreanAdminListController',
        controllerAs: 'vm',
        resolve: {
          koreanListResolve: getKoreanList
        },
        data: {
          roles: ['admin']
        }
      })
      .state('admin.korean.create', {
        url: '/create',
        templateUrl: 'modules/korean/client/views/admin/form-korean.client.view.html',
        controller: 'KoreanAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          koreanResolve: newKorean,
          dynastyResolve: getDynasties
        }
      })
      .state('admin.korean.edit', {
        url: '/:koreanId/edit',
        templateUrl: 'modules/korean/client/views/admin/form-korean.client.view.html',
        controller: 'KoreanAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          koreanResolve: getKorean,
          dynastyResolve: getDynasties
        }
      })
      .state('admin.korean.list-with-param', {
        url: '/:dynasty/:category',
        templateUrl: 'modules/korean/client/views/admin/list-korean.client.view.html',
        controller: 'KoreanAdminListController',
        controllerAs: 'vm',
        resolve: {
          koreanListResolve: getKoreanList
        },
        data: {
          pageTitle: 'Korean Art Collection'
        }
      });
  }

  getKorean.$inject = ['$stateParams', 'KoreanService'];
  function getKorean($stateParams, KoreanService) {
    return KoreanService.get({
      koreanId: $stateParams.koreanId
    }).$promise;
  }

  getKoreanList.$inject = ['$stateParams', 'KoreanListService'];
  function getKoreanList($stateParams, KoreanListService) {
    return KoreanListService.filteredList({
      dynasty: $stateParams.dynasty,
      category: $stateParams.category
    }).$promise;
  }

  newKorean.$inject = ['KoreanService'];
  function newKorean(KoreanService) {
    return new KoreanService();
  }

  getDynasties.$inject = ['$stateParams', 'KoreanDynastyService'];
  function getDynasties($stateParams, KoreanService) {
    return KoreanService;
  }
}());
