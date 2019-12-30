(function () {
  'use strict';

  angular
    .module('japanese.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('japanese', {
        abstract: true,
        url: '/japanese',
        template: '<ui-view/>'
      })
      .state('japanese.landing', {
        url: '/landing',
        templateUrl: 'modules/japanese/client/views/landing-japanese.client.view.html',
        controller: 'JapaneseLandingController',
        controllerAs: 'vm',
        resolve: {
          dynastyResolve: getDynasties
        },
        data: {
          pageTitle: 'Japanese Art Collection List'
        }
      })
      .state('japanese.list', {
        url: '',
        templateUrl: 'modules/japanese/client/views/list-japanese.client.view.html',
        controller: 'JapaneseListController',
        controllerAs: 'vm',
        resolve: {
          japaneseListResolve: getJapaneseList
        },
        data: {
          pageTitle: 'Japanese Art Collection List'
        }
      })
      .state('japanese.list-with-param', {
        url: '/:dynasty/:category',
        templateUrl: 'modules/japanese/client/views/list-japanese.client.view.html',
        controller: 'JapaneseListController',
        controllerAs: 'vm',
        resolve: {
          japaneseListResolve: getJapaneseList
        },
        data: {
          pageTitle: 'Japanese Art Collection List'
        }
      })
      .state('japanese.view', {
        url: '/:japaneseId',
        templateUrl: 'modules/japanese/client/views/view-japanese.client.view.html',
        controller: 'JapaneseController',
        controllerAs: 'vm',
        resolve: {
          japaneseResolve: getJapanese
        },
        data: {
          pageTitle: 'Painting {{ japaneseResolve.title }}'
        }
      });
  }

  getJapanese.$inject = ['$stateParams', 'JapaneseService'];
  function getJapanese($stateParams, JapaneseService) {
    return JapaneseService.get({
      japaneseId: $stateParams.japaneseId
    }).$promise;
  }

  // getAllJapanese.$inject = ['$stateParams', 'JapaneseService'];
  // function getAllJapanese($stateParams, JapaneseService, JapaneseListService) {
  //   return JapaneseService.query().$promise;
  // }

  getJapaneseList.$inject = ['$stateParams', 'JapaneseListService'];
  function getJapaneseList($stateParams, JapaneseListService) {
    return JapaneseListService.filteredList({
      dynasty: $stateParams.dynasty,
      category: $stateParams.category
    }).$promise;
  }

  getDynasties.$inject = ['$stateParams', 'JapaneseDynastyService'];
  function getDynasties($stateParams, JapaneseService) {
    return JapaneseService;
  }
}());
