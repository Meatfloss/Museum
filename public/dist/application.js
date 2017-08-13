(function (window) {
  'use strict';

  var applicationModuleName = 'mean';

  var service = {
    applicationModuleName: applicationModuleName,
    applicationModuleVendorDependencies: ['ngResource', 'ngAnimate', 'ngMessages', 'ui.router', 'ui.bootstrap', 'angularFileUpload', 'pascalprecht.translate'],
    registerModule: registerModule
  };

  window.ApplicationConfiguration = service;

  // Add a new vertical module
  function registerModule(moduleName, dependencies) {
    // Create angular module
    angular.module(moduleName, dependencies || []);

    // Add the module to the AngularJS configuration file
    angular.module(applicationModuleName).requires.push(moduleName);
  }
}(window));

(function (app) {
  'use strict';

  // Start by defining the main module and adding the module dependencies
  angular
    .module(app.applicationModuleName, app.applicationModuleVendorDependencies);

  // Setting HTML5 Location Mode
  angular
    .module(app.applicationModuleName)
    .config(bootstrapConfig);

  function bootstrapConfig($locationProvider, $httpProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');

    $httpProvider.interceptors.push('authInterceptor');
  }

  bootstrapConfig.$inject = ['$locationProvider', '$httpProvider'];

  // Then define the init function for starting up the application
  angular.element(document).ready(init);

  function init() {
    // Fixing facebook bug with redirect
    if (window.location.hash && window.location.hash === '#_=_') {
      if (window.history && history.pushState) {
        window.history.pushState('', document.title, window.location.pathname);
      } else {
        // Prevent scrolling by storing the page's current scroll offset
        var scroll = {
          top: document.body.scrollTop,
          left: document.body.scrollLeft
        };
        window.location.hash = '';
        // Restore the scroll offset, should be flicker free
        document.body.scrollTop = scroll.top;
        document.body.scrollLeft = scroll.left;
      }
    }

    // Then init the app
    angular.bootstrap(document, [app.applicationModuleName]);
  }
}(ApplicationConfiguration));

(function (app) {
  'use strict';

  app.registerModule('about', ['core']);
  app.registerModule('about.routes', ['ui.router', 'core.routes']);
}(ApplicationConfiguration));

(function (app) {
  'use strict';

  app.registerModule('articles', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('articles.admin', ['core.admin']);
  app.registerModule('articles.admin.routes', ['core.admin.routes']);
  app.registerModule('articles.services');
  app.registerModule('articles.routes', ['ui.router', 'core.routes', 'articles.services']);
}(ApplicationConfiguration));

(function (app) {
  'use strict';

  app.registerModule('authors', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('authors.admin', ['core.admin']);
  app.registerModule('authors.admin.routes', ['core.admin.routes']);
  app.registerModule('authors.services');
  app.registerModule('authors.routes', ['ui.router', 'core.routes', 'articles.services']);
}(ApplicationConfiguration));

(function (app) {
  'use strict';

  app.registerModule('bronzes', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('bronzes.admin', ['core.admin']);
  app.registerModule('bronzes.admin.routes', ['core.admin.routes']);
  app.registerModule('bronzes.services');
  app.registerModule('bronzes.routes', ['ui.router', 'core.routes', 'articles.services']);
}(ApplicationConfiguration));

(function (app) {
  'use strict';

  app.registerModule('chat', ['core']);
  app.registerModule('chat.routes', ['ui.router', 'core.routes']);
}(ApplicationConfiguration));

(function (app) {
  'use strict';

  app.registerModule('contact', ['core']);
  app.registerModule('contact.routes', ['ui.router', 'core.routes']);
}(ApplicationConfiguration));

(function (app) {
  'use strict';

  app.registerModule('core');
  app.registerModule('core.routes', ['ui.router']);
  app.registerModule('core.admin', ['core']);
  app.registerModule('core.admin.routes', ['ui.router']);
}(ApplicationConfiguration));

(function (app) {
  'use strict';

  app.registerModule('enamels', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('enamels.admin', ['core.admin']);
  app.registerModule('enamels.admin.routes', ['core.admin.routes']);
  app.registerModule('enamels.services');
  app.registerModule('enamels.routes', ['ui.router', 'core.routes', 'articles.services']);
}(ApplicationConfiguration));

(function (app) {
  'use strict';

  app.registerModule('exhibitions', ['core']);
  app.registerModule('exhibitions.routes', ['ui.router', 'core.routes']);
}(ApplicationConfiguration));

(function (app) {
  'use strict';

  app.registerModule('familles', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('familles.admin', ['core.admin']);
  app.registerModule('familles.admin.routes', ['core.admin.routes']);
  app.registerModule('familles.services');
  app.registerModule('familles.routes', ['ui.router', 'core.routes', 'articles.services']);
}(ApplicationConfiguration));

(function (app) {
  'use strict';

  app.registerModule('paintings', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('paintings.admin', ['core.admin']);
  app.registerModule('paintings.admin.routes', ['core.admin.routes']);
  app.registerModule('paintings.services');
  app.registerModule('paintings.routes', ['ui.router', 'core.routes', 'articles.services']);
}(ApplicationConfiguration));

(function (app) {
  'use strict';

  app.registerModule('teapots', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('teapots.admin', ['core.admin']);
  app.registerModule('teapots.admin.routes', ['core.admin.routes']);
  app.registerModule('teapots.services');
  app.registerModule('teapots.routes', ['ui.router', 'core.routes', 'articles.services']);
}(ApplicationConfiguration));

(function (app) {
  'use strict';

  app.registerModule('users');
  app.registerModule('users.admin');
  app.registerModule('users.admin.routes', ['ui.router', 'core.routes', 'users.admin.services']);
  app.registerModule('users.admin.services');
  app.registerModule('users.routes', ['ui.router', 'core.routes']);
  app.registerModule('users.services');
}(ApplicationConfiguration));

(function () {
  'use strict';

  angular
    .module('about')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'About',
      state: 'about',
      roles: ['*'],
      position: 1
    });
  }
}());

(function () {
  'use strict';

  angular
    .module('about.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('about', {
        url: '/about',
        templateUrl: 'modules/about/client/views/about.client.view.html',
        controller: 'AboutController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'About'
        }
      });
  }
}());

(function () {
  'use strict';

  angular
    .module('about')
    .controller('AboutController', AboutController);

  AboutController.$inject = ['$scope', '$state', 'Authentication'];

  function AboutController($scope, $state, Authentication) {
    var vm = this;

    init();

    function init() {

    }
  }
}());

(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('articles.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Articles',
      state: 'admin.articles.list'
    });
  }
}());

(function () {
  'use strict';

  angular
    .module('articles.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.articles', {
        abstract: true,
        url: '/articles',
        template: '<ui-view/>'
      })
      .state('admin.articles.list', {
        url: '',
        templateUrl: 'modules/articles/client/views/admin/list-articles.client.view.html',
        controller: 'ArticlesListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.articles.create', {
        url: '/create',
        templateUrl: 'modules/articles/client/views/admin/form-article.client.view.html',
        controller: 'ArticlesController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          articleResolve: newArticle
        }
      })
      .state('admin.articles.edit', {
        url: '/:articleId/edit',
        templateUrl: 'modules/articles/client/views/admin/form-article.client.view.html',
        controller: 'ArticlesController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          articleResolve: getArticle
        }
      });
  }

  getArticle.$inject = ['$stateParams', 'ArticlesService'];

  function getArticle($stateParams, ArticlesService) {
    return ArticlesService.get({
      articleId: $stateParams.articleId
    }).$promise;
  }

  newArticle.$inject = ['ArticlesService'];

  function newArticle(ArticlesService) {
    return new ArticlesService();
  }
}());

(function () {
  'use strict';

  angular
    .module('articles')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Articles',
      state: 'articles',
      type: 'dropdown',
      roles: ['*'],
      position: 4
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'articles', {
      title: 'List Articles',
      state: 'articles.list',
      roles: ['*']
    });

    //     // Add the dropdown list item
    // menuService.addSubMenuItem('topbar', 'articles', {
    //   title: 'List Articles',
    //   state: 'articles.list',
    //   roles: ['*']
    // });
  }
}());

(function () {
  'use strict';

  angular
    .module('articles.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('articles', {
        abstract: true,
        url: '/articles',
        template: '<ui-view/>'
      })
      .state('articles.list', {
        url: '',
        templateUrl: 'modules/articles/client/views/list-articles.client.view.html',
        controller: 'ArticlesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Articles List'
        }
      })
      .state('articles.view', {
        url: '/:articleId',
        templateUrl: 'modules/articles/client/views/view-article.client.view.html',
        controller: 'ArticlesController',
        controllerAs: 'vm',
        resolve: {
          articleResolve: getArticle
        },
        data: {
          pageTitle: 'Article {{ articleResolve.title }}'
        }
      });
  }

  getArticle.$inject = ['$stateParams', 'ArticlesService'];

  function getArticle($stateParams, ArticlesService) {
    return ArticlesService.get({
      articleId: $stateParams.articleId
    }).$promise;
  }
}());

(function () {
  'use strict';

  angular
    .module('articles.admin')
    .controller('ArticlesController', ArticlesController);

  ArticlesController.$inject = ['$scope', '$state', '$window', 'articleResolve', 'Authentication'];

  function ArticlesController($scope, $state, $window, article, Authentication) {
    var vm = this;

    vm.article = article;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Article
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.article.$remove($state.go('admin.articles.list'));
      }
    }

    // Save Article
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.articleForm');
        return false;
      }

      // Create a new article, or update the current instance
      vm.article.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.articles.list'); // should we send the User to the list or the updated Article's view?
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('articles.admin')
    .controller('ArticlesListController', ArticlesListController);

  ArticlesListController.$inject = ['ArticlesService'];

  function ArticlesListController(ArticlesService) {
    var vm = this;

    vm.articles = ArticlesService.query();
  }
}());

(function () {
  'use strict';

  angular
    .module('articles')
    .controller('ArticlesController', ArticlesController);

  ArticlesController.$inject = ['$scope', 'articleResolve', 'Authentication'];

  function ArticlesController($scope, article, Authentication) {
    var vm = this;

    vm.article = article;
    vm.authentication = Authentication;
    vm.error = null;

  }
}());

(function () {
  'use strict';

  angular
    .module('articles')
    .controller('ArticlesListController', ArticlesListController);

  ArticlesListController.$inject = ['ArticlesService'];

  function ArticlesListController(ArticlesService) {
    var vm = this;

    vm.articles = ArticlesService.query();
  }
}());

(function () {
  'use strict';

  angular
    .module('articles.services')
    .factory('ArticlesService', ArticlesService);

  ArticlesService.$inject = ['$resource'];

  function ArticlesService($resource) {
    var Article = $resource('api/articles/:articleId', {
      articleId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Article.prototype, {
      createOrUpdate: function () {
        var article = this;
        return createOrUpdate(article);
      }
    });

    return Article;

    function createOrUpdate(article) {
      if (article._id) {
        return article.$update(onSuccess, onError);
      } else {
        return article.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(article) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      console.log(error);
    }
  }
}());

(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('authors.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Authors',
      state: 'admin.authors.list'
    });
  }
}());

(function () {
  'use strict';

  angular
    .module('authors.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.authors', {
        abstract: true,
        url: '/authors',
        template: '<ui-view/>'
      })
      .state('admin.authors.list', {
        url: '',
        templateUrl: 'modules/authors/client/views/admin/list-authors.client.view.html',
        controller: 'AuthorsListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.authors.create', {
        url: '/create',
        templateUrl: 'modules/authors/client/views/admin/form-author.client.view.html',
        controller: 'AuthorsController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          authorResolve: newAuthor
        }
      })
      .state('admin.authors.edit', {
        url: '/:authorId/edit',
        templateUrl: 'modules/authors/client/views/admin/form-author.client.view.html',
        controller: 'AuthorsController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          authorResolve: getAuthor
        }
      });
  }

  getAuthor.$inject = ['$stateParams', 'AuthorsService'];

  function getAuthor($stateParams, AuthorsService) {
    return AuthorsService.get({
      authorId: $stateParams.authorId
    }).$promise;
  }

  newAuthor.$inject = ['AuthorsService'];

  function newAuthor(AuthorsService) {
    return new AuthorsService();
  }
}());

(function () {
  'use strict';

  angular
    .module('authors.admin')
    .controller('AuthorsController', AuthorsController);

  AuthorsController.$inject = ['$scope', '$state', '$window', 'authorResolve', 'Authentication'];

  function AuthorsController($scope, $state, $window, author, Authentication) {
    var vm = this;

    vm.author = author;
    vm.authentication = Authentication;
    vm.dynasties = ['Pre Tang', 'Tang', 'Yuan', 'Ming', 'Qing', 'Modern'];

    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    vm.minvalue = 1;
    vm.maxvalue = 10;

    // Remove existing Author
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.author.$remove($state.go('admin.authors.list'));
      }
    }

    // Save Author
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.authorForm');
        return false;
      }

      // Create a new auhtor, or update the current instance
      vm.author.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.authors.list'); // should we send the User to the list or the updated Author's view?
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('authors')
    .controller('AuthorsListController', AuthorsListController);

  AuthorsListController.$inject = ['AuthorsService'];

  function AuthorsListController(AuthorsService) {
    var vm = this;
    vm.authors = AuthorsService.query();
  }
}());

(function () {
  'use strict';

  angular
    .module('authors.services')
    .factory('AuthorsService', AuthorsService);

  AuthorsService.$inject = ['$resource'];

  function AuthorsService($resource) {
    var Author = $resource('api/authors/:authorId', {
      authorId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Author.prototype, {
      createOrUpdate: function () {
        var author = this;
        return createOrUpdate(author);
      }
    });

    return Author;

    function createOrUpdate(author) {
      if (author._id) {
        return author.$update(onSuccess, onError);
      } else {
        return author.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(author) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      console.log(error);
    }
  }
}());

(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('bronzes.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Bronzes',
      state: 'admin.bronzes.list'
    });
  }
}());

(function () {
  'use strict';

  angular
    .module('bronzes.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.bronzes', {
        abstract: true,
        url: '/bronzes',
        template: '<ui-view/>'
      })
      .state('admin.bronzes.list', {
        url: '',
        templateUrl: 'modules/bronzes/client/views/admin/list-bronzes.client.view.html',
        controller: 'BronzesListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.bronzes.create', {
        url: '/create',
        templateUrl: 'modules/bronzes/client/views/admin/form-bronze.client.view.html',
        controller: 'BronzesController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          bronzeResolve: newPainting
        }
      })
      .state('admin.bronzes.edit', {
        url: '/:bronzeId/edit',
        templateUrl: 'modules/bronzes/client/views/admin/form-bronze.client.view.html',
        controller: 'BronzesController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          bronzeResolve: getPainting
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'BronzesService'];

  function getPainting($stateParams, BronzesService) {
    return BronzesService.get({
      bronzeId: $stateParams.bronzeId
    }).$promise;
  }

  newPainting.$inject = ['BronzesService'];

  function newPainting(BronzesService) {
    return new BronzesService();
  }
}());

(function () {
  'use strict';

  angular
    .module('bronzes')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {

  }
}());

(function () {
  'use strict';

  angular
    .module('bronzes.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('bronzes', {
        abstract: true,
        url: '/bronzes',
        template: '<ui-view/>'
      })
      .state('bronzes.list', {
        url: '',
        templateUrl: 'modules/bronzes/client/views/list-bronzes.client.view.html',
        controller: 'BronzesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Bronzes List'
        }
      })
      .state('bronzes.view', {
        url: '/:bronzeId',
        templateUrl: 'modules/bronzes/client/views/view-bronze.client.view.html',
        controller: 'BronzesController',
        controllerAs: 'vm',
        resolve: {
          bronzeResolve: getPainting
        },
        data: {
          pageTitle: 'Painting {{ bronzeResolve.title }}'
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'BronzesService'];

  function getPainting($stateParams, BronzesService) {
    return BronzesService.get({
      bronzeId: $stateParams.bronzeId
    }).$promise;
  }
}());

(function () {
  'use strict';

  angular
    .module('bronzes.admin')
    .controller('BronzesController', BronzesController);

  BronzesController.$inject = ['$scope', '$timeout', '$state', '$window', 'bronzeResolve', 'Authentication', 'FileUploader'];

  function BronzesController($scope, $timeout, $state, $window, bronze, Authentication, FileUploader) {
    var vm = this;

    vm.bronze = bronze;
    vm.authentication = Authentication;
    vm.types = ['Bronze Type 1', 'Bronze Type 2'];
    vm.dynasties = ['Xia', 'Shang', 'Zhou', 'Qin', 'Han', 'Three Kindoms', 'Sui', 'Tang', 'Yuan', 'Ming', 'Qing', 'Modern'];

    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.imageURL = vm.bronze.imageURL;
    vm.uploadProfilePicture = uploadProfilePicture;

    vm.cancelUpload = cancelUpload;
    // Create file uploader instance
    vm.uploader = new FileUploader({
      url: 'api/bronze/picture',
      alias: 'newPicture',
      bronze: vm.bronze,
      onAfterAddingFile: onAfterAddingFile,
      onSuccessItem: onSuccessItem,
      onErrorItem: onErrorItem
    });

    vm.uploader.onBeforeUploadItem = onBeforeUploadItem;
    // Set file uploader image filter
    vm.uploader.filters.push({
      name: 'imageFilter',
      fn: function (item, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    });

    // add bronze data
    function onBeforeUploadItem(item) {
      item.formData.push({ bronzeId: vm.bronze._id });
      // console.log(item);
    }
    // Called after the user selected a new picture file
    function onAfterAddingFile(fileItem) {
      if ($window.FileReader) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(fileItem._file);

        fileReader.onload = function (fileReaderEvent) {
          $timeout(function () {
            vm.imageURL = fileReaderEvent.target.result;
          }, 0);
        };
      }
    }

    // Called after the user has successfully uploaded a new picture
    function onSuccessItem(fileItem, response, status, headers) {
      // Show success message
      vm.success = true;

      // Populate user object
      vm.user = Authentication.user = response;

      // Clear upload buttons
      cancelUpload();
    }

    // Called after the user has failed to uploaded a new picture
    function onErrorItem(fileItem, response, status, headers) {
      // Clear upload buttons
      cancelUpload();

      // Show error message
      vm.error = response.message;
    }

    // Change user profile picture
    function uploadProfilePicture() {
      // Clear messages
      vm.success = vm.error = null;

      // Start upload
      vm.uploader.uploadAll();
    }

    // Cancel the upload process
    function cancelUpload() {
      vm.uploader.clearQueue();
      vm.imageURL = vm.bronze.imageURL;
    }

    // Remove existing Bronze
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.bronze.$remove($state.go('admin.bronzes.list'));
      }
    }

    // Save Bronze
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.bronzeForm');
        return false;
      }

      // Create a new bronze, or update the current instance
      vm.bronze.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.bronzes.list'); // should we send the User to the list or the updated Bronze's view?
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('bronzes.admin')
    .controller('BronzesListController', BronzesListController);

  BronzesListController.$inject = ['$filter', 'BronzesService'];

  function BronzesListController($filter, BronzesService) {
    var vm = this;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;

    BronzesService.query(function (data) {
      vm.bronzes = data;
      vm.buildPager();
      // update dropdown list
      vm.dynastyList = _.map(_.uniqBy(vm.bronzes, 'dynasty'), 'dynasty');
      vm.dynastyList.unshift('All');
      vm.selectedDynasty = 'All';
    });

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 12;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.bronzes, { $: vm.search });
      if (vm.selectedDynasty && vm.selectedDynasty !== 'All') {
        vm.filteredItems = _.filter(vm.filteredItems, { dynasty: vm.selectedDynasty });
      }
      vm.filterLength = vm.filteredItems.length;
      var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
      var end = begin + vm.itemsPerPage;
      vm.pagedItems = vm.filteredItems.slice(begin, end);
    }

    function pageChanged() {
      vm.figureOutItemsToDisplay();
    }

    vm.updateForDynasty = function () {
      vm.figureOutItemsToDisplay();
    };
  }
}());

(function () {
  'use strict';

  angular
    .module('bronzes')
    .controller('BronzesController', BronzesController);

  BronzesController.$inject = ['$scope', 'bronzeResolve', 'authorsResolve', 'Authentication'];

  function BronzesController($scope, bronze, authors, Authentication) {
    var vm = this;

    vm.bronze = bronze;
    vm.authentication = Authentication;
    vm.authors = authors;
    vm.error = null;

  }
}());

(function () {
  'use strict';

  angular
    .module('bronzes')
    .controller('BronzesListController', BronzesListController);

  BronzesListController.$inject = ['$filter', 'BronzesService', 'authorsResolve'];

  function BronzesListController($filter, BronzesService, authors) {
    var vm = this;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;

    BronzesService.query(function (data) {
      vm.bronzes = data;
      vm.buildPager();
    });

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 12;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.bronzes, { $: vm.search });
      if (vm.selectedDynasty && vm.selectedDynasty !== 'All') {
        vm.filteredItems = _.filter(vm.filteredItems, { author: { dynasty: vm.selectedDynasty } });
      }
      if (vm.selectedAuthor && vm.selectedAuthor !== 'All') {
        vm.filteredItems = _.filter(vm.filteredItems, { author: { name: vm.selectedAuthor } });
      }
      vm.filterLength = vm.filteredItems.length;
      var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
      var end = begin + vm.itemsPerPage;
      vm.pagedItems = vm.filteredItems.slice(begin, end);
    }

    function pageChanged() {
      vm.figureOutItemsToDisplay();
    }
    // update dropdown list
    vm.authors = authors;
    vm.authorList = _.map(authors, 'name');
    vm.dynastyList = _.map(_.uniqBy(authors, 'dynasty'), 'dynasty');
    vm.authorList.unshift('All');
    vm.dynastyList.unshift('All');
    vm.selectedDynasty = 'All';
    vm.selectedAuthor = 'All';


    vm.updateForDynasty = function () {
      var filteredAuthors = vm.selectedDynasty === 'All' ? authors : _.filter(authors, { dynasty: vm.selectedDynasty });
      vm.authorList = _.map(filteredAuthors, 'name');
      vm.authorList.unshift('All');
      vm.selectedAuthor = 'All';
      // update list
      vm.figureOutItemsToDisplay();
    };

    vm.updateForAuthor = function () {
      vm.figureOutItemsToDisplay();
    };
  }
}());

(function () {
  'use strict';

  angular
    .module('bronzes.services')
    .factory('BronzesService', BronzesService);

  BronzesService.$inject = ['$resource'];

  function BronzesService($resource) {
    var Bronze = $resource('api/bronzes/:bronzeId', {
      bronzeId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Bronze.prototype, {
      createOrUpdate: function () {
        var bronze = this;
        return createOrUpdate(bronze);
      }
    });

    return Bronze;

    function createOrUpdate(bronze) {
      if (bronze._id) {
        return bronze.$update(onSuccess, onError);
      } else {
        return bronze.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(bronze) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      console.log(error);
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('chat')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items hide chat
    // menuService.addMenuItem('topbar', {
    //   title: 'Chat',
    //   state: 'chat'
    // });
  }
}());

(function () {
  'use strict';

  angular
    .module('chat.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('chat', {
        url: '/chat',
        templateUrl: 'modules/chat/client/views/chat.client.view.html',
        controller: 'ChatController',
        controllerAs: 'vm',
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Chat'
        }
      });
  }
}());

(function () {
  'use strict';

  angular
    .module('chat')
    .controller('ChatController', ChatController);

  ChatController.$inject = ['$scope', '$state', 'Authentication', 'Socket'];

  function ChatController($scope, $state, Authentication, Socket) {
    var vm = this;

    vm.messages = [];
    vm.messageText = '';
    vm.sendMessage = sendMessage;

    init();

    function init() {
      // If user is not signed in then redirect back home
      if (!Authentication.user) {
        $state.go('home');
      }

      // Make sure the Socket is connected
      if (!Socket.socket) {
        Socket.connect();
      }

      // Add an event listener to the 'chatMessage' event
      Socket.on('chatMessage', function (message) {
        vm.messages.unshift(message);
      });

      // Remove the event listener when the controller instance is destroyed
      $scope.$on('$destroy', function () {
        Socket.removeListener('chatMessage');
      });
    }

    // Create a controller method for sending messages
    function sendMessage() {
      // Create a new message object
      var message = {
        text: vm.messageText
      };

      // Emit a 'chatMessage' message event
      Socket.emit('chatMessage', message);

      // Clear the message text
      vm.messageText = '';
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('contact')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Contact',
      state: 'contact',
      roles: ['*'],
      position: 5
    });
  }
}());

(function () {
  'use strict';

  angular
    .module('contact.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('contact', {
        url: '/contact',
        templateUrl: 'modules/contact/client/views/contact.client.view.html',
        controller: 'ContactController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Contact'
        }
      });
  }
}());

(function () {
  'use strict';

  angular
    .module('contact')
    .controller('ContactController', ContactController);

  ContactController.$inject = ['$scope', '$state', 'Authentication'];

  function ContactController($scope, $state, Authentication) {
    var vm = this;

    init();

    function init() {

    }
  }
}());

(function () {
  'use strict';

  angular
    .module('core.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Admin',
      state: 'admin',
      type: 'dropdown',
      roles: ['admin']
    });
  }
}());

(function () {
  'use strict';

  angular
    .module('core.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin', {
        abstract: true,
        url: '/admin',
        template: '<ui-view/>',
        data: {
          roles: ['admin']
        }
      });
  }
}());

(function () {
  'use strict';

  angular
    .module('core')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenu('account', {
      roles: ['user']
    });

    menuService.addMenuItem('account', {
      title: '',
      state: 'settings',
      type: 'dropdown',
      roles: ['user']
    });

    menuService.addSubMenuItem('account', 'settings', {
      title: 'Edit Profile',
      state: 'settings.profile'
    });

    menuService.addSubMenuItem('account', 'settings', {
      title: 'Edit Profile Picture',
      state: 'settings.picture'
    });

    menuService.addSubMenuItem('account', 'settings', {
      title: 'Change Password',
      state: 'settings.password'
    });

    menuService.addSubMenuItem('account', 'settings', {
      title: 'Manage Social Accounts',
      state: 'settings.accounts'
    });
  }
}());

(function () {
  'use strict';

  angular
    .module('core')
    .run(routeFilter);

  routeFilter.$inject = ['$rootScope', '$state', 'Authentication'];

  function routeFilter($rootScope, $state, Authentication) {
    $rootScope.$on('$stateChangeStart', stateChangeStart);
    $rootScope.$on('$stateChangeSuccess', stateChangeSuccess);

    function stateChangeStart(event, toState, toParams, fromState, fromParams) {
      // Check authentication before changing state
      if (toState.data && toState.data.roles && toState.data.roles.length > 0) {
        var allowed = false;

        for (var i = 0, roles = toState.data.roles; i < roles.length; i++) {
          if ((roles[i] === 'guest') || (Authentication.user && Authentication.user.roles !== undefined && Authentication.user.roles.indexOf(roles[i]) !== -1)) {
            allowed = true;
            break;
          }
        }

        if (!allowed) {
          event.preventDefault();
          if (Authentication.user !== undefined && typeof Authentication.user === 'object') {
            $state.transitionTo('forbidden');
          } else {
            $state.go('authentication.signin').then(function () {
              // Record previous state
              storePreviousState(toState, toParams);
            });
          }
        }
      }
    }

    function stateChangeSuccess(event, toState, toParams, fromState, fromParams) {
      // Record previous state
      storePreviousState(fromState, fromParams);
    }

    // Store previous state
    function storePreviousState(state, params) {
      // only store this state if it shouldn't be ignored
      if (!state.data || !state.data.ignoreState) {
        $state.previous = {
          state: state,
          params: params,
          href: $state.href(state, params)
        };
      }
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('core.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function routeConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.rule(function ($injector, $location) {
      var path = $location.path();
      var hasTrailingSlash = path.length > 1 && path[path.length - 1] === '/';

      if (hasTrailingSlash) {
        // if last character is a slash, return the same url without the slash
        var newPath = path.substr(0, path.length - 1);
        $location.replace().path(newPath);
      }
    });

    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise(function ($injector, $location) {
      $injector.get('$state').transitionTo('not-found', null, {
        location: false
      });
    });

    $stateProvider
      .state('home', {
        url: '/',
        views: {
          'homeHeader': {
            templateUrl: 'modules/core/client/views/homeHeader.client.view.html',
            controller: 'HomeController',
            controllerAs: 'vm'
          },
          '': {
            templateUrl: 'modules/core/client/views/home.client.view.html',
            controller: 'HomeController',
            controllerAs: 'vm'
          }
        }
      })
      .state('not-found', {
        url: '/not-found',
        templateUrl: 'modules/core/client/views/404.client.view.html',
        data: {
          ignoreState: true,
          pageTitle: 'Not-Found'
        }
      })
      .state('bad-request', {
        url: '/bad-request',
        templateUrl: 'modules/core/client/views/400.client.view.html',
        data: {
          ignoreState: true,
          pageTitle: 'Bad-Request'
        }
      })
      .state('forbidden', {
        url: '/forbidden',
        templateUrl: 'modules/core/client/views/403.client.view.html',
        data: {
          ignoreState: true,
          pageTitle: 'Forbidden'
        }
      });
  }
}());

(function () {
  'use strict';

  angular.module('core').config(['$translateProvider', function ($translateProvider) {
    // add translation tables
    var translationsEN = {
      CompanyName: 'Sai Yang Tang',
      HomePrefaceTitle: 'Words from Kwong Lam, the Founder',
      HomePrefaceParagraph1: 'For decades, Sai Yang Tang has always been called by collectors in New York as a mysterious “Overseas Summer Palace”. Now, this mysterious, deeply-closed curtain is being rolled up with the establishment of the Kwong Lam (Sai Yang Tang) Online Museum of Art. With the onset of the glorious era of the Chinese nation, it is hoped that www.kwonglammuseumofart.org will help carry forward the fine traditions and pass them onto future generations by making public the secret treasures of Sai Yang Tang, handing down glorious chapters of the ancient culture and civilization of the Chinese nation.',
      HomePrefaceParagraph2: 'In an on-going collection project that has spanned two different centuries, we at Sai Yang Tang have been searching for Chinese treasures scattered in the West and purchased some of them at hefty prices for secret collection. Our collected treasures include a calligraphic work by Wang Xizhi (Jin dynasty); General Pei’s Poetry Scroll by Yan Zhenqing (Tang dynasty); Manjianghong Verse Scroll by Yue Fei (Southern Song dynasty); 南宋 龚开《骏骨图》真迹 Horses???, an orignal painting by Gong Kai (Southern Song dynasty); 《送子天皇图》Donating the Son to the Emperor???, a painting by Wu Daozi (Tang dynasty),《陵烟阁二十四功臣像》the Lingyange Portraits of 24 Officials with Meritorious Service (Tang dynasty) and calligraphy in Shoujin style and birds-and- flower paintings by Emperor Song Huizong (Song dynasty).宋徽宗《瘦金体书法、花鸟画》',
      HomePrefaceParagraph3: 'Our collections bronze wares range from the Xia, Shang, Zhou dynasties to the Tang dynasty. Pottery wares and porcelain from famous kilns throughout history and various arts and crafts run the whole gauntlet. That they all have the good fortune of being displayed before the eyes of my countrymen and other friends alike in celebration of the cultural renaissance of the Chinese nation—this is my decades-old aspiration and the purpose of founding Sai Yang Tang. What great joy I would derive by making a humble and modest contribution to the culture and civilization of China ─ my motherland!',
      HomePrefaceParagraph4: 'Lin Ji-Guang Yu Shiyang book in the morning of 2015-4-27',
      AboutTitile: 'About Kwong Lum',
      AboutParagraph1: 'Kwong Lum started collecting ancient Chinese artwork as a nine-year-old in Hong Kong under the guidance of his art teacher, Ding Yanyong, himself hailed as leading figure in the renewal of the ancient China tradition for modern expression and a fervent collector, who taught him Chinese painting, calligraphy and most of all, the appraisal and collection of Chinese antiques. Thus began his Sai Yang Tang Collection. ',
      AboutParagraph2: 'As a renowned Chinese artist, scholar and collector, Lum has immensely enlarged the volume of his collection by adding in ancient masters’ painting and calligraphy, bronzes, sculpture and porcelain ware of different dynasties, purchased throughout the world at auctions or from private collectors. Today, his Sai Yang Tang Collection in the United States, boasting of its invaluable art treasures of ancient China, enjoys a far-reaching reputation of “A Smaller-Sized Overseas Palace Museum.” In 1999, a Kwong Lum National Art Treasure Exhibition was held by Asian Cultural Center in New York, commemorating the 50th Anniversary on the formation of Sai Yang Tang Collection. ',
      AboutParagraph3: 'China’s CCTV “National Treasure Archives” program has made a special trip to New York to interview Lum and they documented four television episodes in the CCTV broadcast.',
      AboutParagraph4: 'In 2012, Guangdong Government built a museum named “Kwong Lum Art Museum” at Jiangmen City. The museum opened in 2014 and houses Lum’s Paintings and treasures of Sai Yang Tang’s Collection. ',
      AboutParagraph5: 'Lum will be launching his On-Line Museum and hold series of Exhibitions of his Collection. The first will be on Ancient and Gilt Bronzes, with over one hundred Bronze pieces. This collection starts from the Qijia Culture at the end of the third millennium B.C., and Erlitou period up to Han Dynasty. Highlighted by rare and prestigious bronze objects with technical excellence, unsurpassed refinement, signifying political power, devout spiritual beliefs, and exalted social status.',
      VARIABLE_REPLACEMENT: '{{name}}',
      BUTTON_LANG_ZH: 'Chinese',
      BUTTON_LANG_EN: 'English'
    };

    var translationsZH = {
      CompanyName: '世阳堂',
      HomePrefaceTitle: '林缉光(世阳堂) 艺术网络博物馆成立感言',
      HomePrefaceParagraph1: '＂世阳堂＂​​在美国纽约数十年来一直被收藏家们称为神秘的＂海外小故宫＂，现在开始卷起神秘深闭的帘幕，成立＂林缉光 ​​(世阳堂) 艺术网络博物馆＂。 www.kwonglammuseumofart.org 在＂中华盛世＂即将到来的时候，希能乘先启后，将世阳堂的秘藏公之于世, 为中华民族的古文化与文明，传递辉煌的篇章。',
      HomePrefaceParagraph2: '＂世阳堂＂​​横夸两个世纪的收藏岁月中，并在海外一直追寻流落在西方的中华国宝，以高价收购而秘藏之，例如: 晋 王羲之《丧乱帖》、唐 颜真卿《裴将军诗卷》、南宋 岳飞《满江红词​​卷》、南宋 龚开《骏骨图》真迹、唐 吴道子《送子天皇图》真迹、唐《陵烟阁二十四功臣像》、宋徽宗《瘦金体书法、花鸟画》等。青铜器从夏、商、周以至唐代。历代名窑瓷器、杂相等应有尽有,若然幸展现于国人面前，以庆祝中华文化复兴，此是我数十年之心愿与＂世阳堂＂​​之宗旨。能为我的祖国中华民族文化与文明尽微薄之力，岂不乐哉！',
      HomePrefaceParagraph3: '',
      HomePrefaceParagraph4: '林緝光 書於世陽堂中 2015-4-27 晨三時',
      AboutTitile: '关于林缉光',
      AboutParagraph1: '林緝光先生在美國紐約建立的世陽堂數十年來被收藏家們譽為海外小故宮，但真正看到世陽堂藏品的人並不多。羊年伊始，林緝光先生開始將數十年的秘藏在世陽堂畫廊公開展覽並置於網絡上，成立“紐約林緝光世陽堂藝術網絡博物館”，供天下之愛惜中華文物之人士研究和鑑賞。這次公開展覽並上網的第一組展品為一百件國寶級青銅器。值此機遇，華美人文學會於3月14日（週六）下午二時至四時假世陽堂畫廊舉辦講座，特邀林緝光先生做專題講座，講述中國從五千年前的齊家文化和二裡頭文化期直至兩千年前的漢代青銅器，并解釋本次世陽堂展出的青銅器藏品，使其知曉於世。同時，林先生也將講述他六十多年來對青銅器的收藏與鑒證經驗，與聽眾分享他的研究成果和心得。',
      AboutParagraph2: '在這次展出的一百件珍品中，夏朝的青銅人面獸身像代表着華夏在四千年前亦有如埃及那樣的人面獸身像存世，可能因為氣候的風吹雨打而湮沒了。商代青銅器存世以鼎為最多，在商後期還有人面方鼎以及人面盉等傳世，同時以動物造型的青銅器如象尊、虎食人尊、鳥食人尊等。西周與東周的青銅器在這次展覽中也有不少，春秋戰國的青銅在“世陽堂”的藏品中獨特，神奇與精美。存世稀有的秦代完整一套的青銅金銀錯編鐘為這次展覽的亮點之一。對於唐代的鎮國三劍（神龍執法劍、玉龍劍與尚方寶劍）也是這次展覽之精華。',
      AboutParagraph3: '如今集書畫家丶詩人丶收藏家於一身，堪稱“美國紐約文藝界領袖式風雲人物”的林緝光先生，出生於澳門氹仔。他自10歲始便致力于中國藝術品的收藏，迄今已近半個世 紀之久。他幼年跟藝術大師和古代藝術品收藏鑒賞大家丁衍庸先生學習書法丶繪畫丶古典文學以及古代藝術品鑒定技術，在十幾嵗時便已擁有了自己初具規模的“世陽堂”藝術品珍藏，其中的稀世瑰寶包括北宋大師黃庭堅所書的蘇轼詞作《念奴嬌•赤壁懷古》手 卷丶清初大畫家石濤與八大山人的山水力作和一套商王武丁之玉玺及骨玺。',
      AboutParagraph4: '如今，林緝光建於紐約市的“世陽堂”古代藝術珍藏與畫廊因其價值連城的各類國寶級藏品而被譽爲“海外小故宮”，其珍藏大可同北京和台北的故宮一比短長。各類“超級國寶”中有帝堯的玄圭，商王武丁的十枚骨制令玺，張旭和吳道子共同創作的書畫長卷，由唐太宗親自爲贊、閻立本所畫的《淩煙閣》二十四功臣像，宋徽宗的《禦鷹圖》大中堂，北宋黃庭堅的“大江東去”書法長卷，米芾的雲 山，唐代武則天的石雕頭像，同北京故宮的藏品相配的宋朝紫檀蓮花寶座以及中國古代如柴、汝、官、哥、定等諸大名窯的精美珍瓷，不一而足。民族英雄文天祥的曠世之作《過零丁洋詩》的原跡也為林先生收藏。',
      AboutParagraph5: '2012年廣東江門市建立了一座以林緝光先生命名的博物館，將林先生珍藏的諸多燦爛國寶展現在億萬國人面前。中央電視臺“國寶檔案”節目曾專程來紐約采訪林緝光先生，制成四集電視片在中央電視臺播放。',
      'About': '关于林缉光',
      'Exhibitions': '展览',
      'Contact': '联系',
      'Collections': '藏品',
      'Articles': '鉴赏文章',
      'Paintings': '书画',
      'Bronzes': '青铜器',
      'Zisha Teapots': '紫砂壶',
      'Famille Rose': '粉彩',
      'Famille Rose Enamel': '珐琅彩',
      'Statues': '雕像',
      'Others': '其他',
      'Coming Soon': '待定',
      'Edit Profile': '编辑账号',
      'Edit Profile Picture': '编辑账号图片',
      'Change Password': '修改密码',
      'Manage Social Accounts': '管理社交账号',
      'Sign Up': '注册',
      'Sign In': '登录',
      'Sign Out': '登出',
      'Dynasty': '朝代',
      'Type': '种类',
      'Width': '宽度',
      'Height': '高度',
      'Length': '长度',
      'Name': '名字',
      'Description': '描述',
      'Author': '作者',
      'Mark': '题款',
      'Top Diameter': '口径',
      'Bottom Diameter': '足径',
      'Xia': '夏',
      'Shang': '商',
      'Zhou': '周',
      'Qin': '秦',
      'Han': '汉',
      'Three Kindoms': '三国',
      'Sui': '隋',
      'Pre Tang': '前唐',
      'Tang': '唐',
      'Yuan': '元',
      'Ming': '明',
      'Qing': '清',
      'Modern': '现代',
      'All': '全部',
      'Sign in using your social accounts': '使用社交账户登录',
      'Or with your account': '或者您自己的账户',
      'Username': '用户名',
      'Password': '密码',
      'Username is required.': '请输入用户名',
      'Password is required.': '请输入密码',
      'or': '或',
      'Forgot your password?': '忘记密码了？',
      'Or sign up using your email': '或者用您的邮箱注册',
      'First Name': '名字',
      'First name is required.': '请输入名字',
      'Last Name': '姓氏',
      'Last name is required.': '请输入姓氏',
      'Email': '邮件',
      'Email address is required.': '请输入邮箱',
      'Email address is invalid.': '邮箱地址不符合要求',
      'Password Requirements': '密码要求',
      'The password must be at least 10 characters long.': '密码长度至少10个字母',
      'The password must contain at least one lowercase letter.': '密码至少包含一个小写字母',
      'The password must contain at least one uppercase letter.': '密码至少包含一个大写字母',
      'The password must contain at least one special character.': '密码至少包含一个特殊字符',
      'The password must contain at least one number.': '密码至少包含一个数字',
      'Please enter a passphrase or password with 10 or more characters, numbers, lowercase, uppercase, and special characters.': '请确保输入的密码长度在10个或以上，必须包含数字，大写字母，小写字母以及特殊字符',
      'Save Profile': '保存账户信息',
      'Profile Saved Successfully': '账户信息更新成功',
      'Select Image': '选择图片',
      'Upload': '上传',
      'Cancel': '取消',
      'Current Password': '当前密码',
      'New Password': '新密码',
      'Enter a new password.': '填写新密码',
      'Your current password is required.': '请填写当前密码',
      'Verify Password': '确认密码',
      'Verify your new password.': '确认您新的密码',
      'Passwords do not match.': '密码不匹配',
      'Save Password': '保存密码',
      'Password Changed Successfully': '密码修改成功',
      'Settings': '账户设置',
      'Restore your password': '找回您的密码',
      'Enter your account username.': '请输入您的用户名',
      'Enter a username.': '请输入一个用户名',
      'Submit': '提交',
      'Password reset is invalid': '密码重置失败',
      'Ask for a new password reset': '再次申请密码重置',
      'Password successfully reset': '密码重置成功',
      'Continue to home page': '返回主页',
      'Reset your password': '重置您的密码',
      'Enter the password again to verify.': '请再次输入密码以确认',
      'Update Password': '修改密码',
      VARIABLE_REPLACEMENT: '{{namezh}}',
      BUTTON_LANG_ZH: '中文',
      BUTTON_LANG_EN: '英文'
    };
    $translateProvider.translations('en', translationsEN);
    $translateProvider.translations('zh', translationsZH);
    $translateProvider.preferredLanguage('en');
    $translateProvider.fallbackLanguage('en');
  }]);
}());

(function () {
  'use strict';

  angular.module('core').controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$translate', '$scope', '$state', 'Authentication', 'menuService'];

  function HeaderController($translate, $scope, $state, Authentication, menuService) {
    var vm = this;

    vm.accountMenu = menuService.getMenu('account').items[0];
    vm.authentication = Authentication;
    vm.isCollapsed = false;
    vm.menu = menuService.getMenu('topbar');

    $scope.$on('$stateChangeSuccess', stateChangeSuccess);

    function stateChangeSuccess() {
      // Collapsing the menu after navigation
      vm.isCollapsed = false;
    }
    $scope.changeLanguage = function (langKey) {
      $translate.use(langKey);
    };
  }
}());

(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  function HomeController() {
    var vm = this;
  }
}());

(function () {
  'use strict';

  angular.module('core')
    .directive('pageTitle', pageTitle);

  pageTitle.$inject = ['$rootScope', '$interpolate', '$state'];

  function pageTitle($rootScope, $interpolate, $state) {
    var directive = {
      restrict: 'A',
      link: link
    };

    return directive;

    function link(scope, element) {
      $rootScope.$on('$stateChangeSuccess', listener);

      function listener(event, toState) {
        var applicationCoreTitle = 'Sai Yang Tang',
          separeteBy = ' - ';
        if (toState.data && toState.data.pageTitle) {
          var stateTitle = $interpolate(toState.data.pageTitle)($state.$current.locals.globals);
          element.html(applicationCoreTitle + separeteBy + stateTitle);
        } else {
          element.html(applicationCoreTitle);
        }
      }
    }
  }
}());

(function () {
  'use strict';

  // https://gist.github.com/rhutchison/c8c14946e88a1c8f9216

  angular
    .module('core')
    .directive('showErrors', showErrors);

  showErrors.$inject = ['$timeout', '$interpolate'];

  function showErrors($timeout, $interpolate) {
    var directive = {
      restrict: 'A',
      require: '^form',
      compile: compile
    };

    return directive;

    function compile(elem, attrs) {
      if (attrs.showErrors.indexOf('skipFormGroupCheck') === -1) {
        if (!(elem.hasClass('form-group') || elem.hasClass('input-group'))) {
          throw new Error('show-errors element does not have the \'form-group\' or \'input-group\' class');
        }
      }

      return linkFn;

      function linkFn(scope, el, attrs, formCtrl) {
        var inputEl,
          inputName,
          inputNgEl,
          options,
          showSuccess,
          initCheck = false,
          showValidationMessages = false;

        options = scope.$eval(attrs.showErrors) || {};
        showSuccess = options.showSuccess || false;
        inputEl = el[0].querySelector('.form-control[name]') || el[0].querySelector('[name]');
        inputNgEl = angular.element(inputEl);
        inputName = $interpolate(inputNgEl.attr('name') || '')(scope);

        if (!inputName) {
          throw new Error('show-errors element has no child input elements with a \'name\' attribute class');
        }

        scope.$watch(function () {
          return formCtrl[inputName] && formCtrl[inputName].$invalid;
        }, toggleClasses);

        scope.$on('show-errors-check-validity', checkValidity);
        scope.$on('show-errors-reset', reset);

        function checkValidity(event, name) {
          if (angular.isUndefined(name) || formCtrl.$name === name) {
            initCheck = true;
            showValidationMessages = true;

            return toggleClasses(formCtrl[inputName].$invalid);
          }
        }

        function reset(event, name) {
          if (angular.isUndefined(name) || formCtrl.$name === name) {
            return $timeout(function () {
              el.removeClass('has-error');
              el.removeClass('has-success');
              showValidationMessages = false;
            }, 0, false);
          }
        }

        function toggleClasses(invalid) {
          el.toggleClass('has-error', showValidationMessages && invalid);

          if (showSuccess) {
            return el.toggleClass('has-success', showValidationMessages && !invalid);
          }
        }
      }
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('core')
    .factory('authInterceptor', authInterceptor);

  authInterceptor.$inject = ['$q', '$injector', 'Authentication'];

  function authInterceptor($q, $injector, Authentication) {
    var service = {
      responseError: responseError
    };

    return service;

    function responseError(rejection) {
      if (!rejection.config.ignoreAuthModule) {
        switch (rejection.status) {
          case 401:
            // Deauthenticate the global user
            Authentication.user = null;
            $injector.get('$state').transitionTo('authentication.signin');
            break;
          case 403:
            $injector.get('$state').transitionTo('forbidden');
            break;
        }
      }
      // otherwise, default behaviour
      return $q.reject(rejection);
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('core')
    .factory('menuService', menuService);

  function menuService() {
    var shouldRender;
    var service = {
      addMenu: addMenu,
      addMenuItem: addMenuItem,
      addSubMenuItem: addSubMenuItem,
      defaultRoles: ['user', 'admin'],
      getMenu: getMenu,
      menus: {},
      removeMenu: removeMenu,
      removeMenuItem: removeMenuItem,
      removeSubMenuItem: removeSubMenuItem,
      validateMenuExistence: validateMenuExistence
    };

    init();

    return service;

    // Add new menu object by menu id
    function addMenu(menuId, options) {
      options = options || {};

      // Create the new menu
      service.menus[menuId] = {
        roles: options.roles || service.defaultRoles,
        items: options.items || [],
        shouldRender: shouldRender
      };

      // Return the menu object
      return service.menus[menuId];
    }

    // Add menu item object
    function addMenuItem(menuId, options) {
      options = options || {};

      // Validate that the menu exists
      service.validateMenuExistence(menuId);

      // Push new menu item
      service.menus[menuId].items.push({
        title: options.title || '',
        state: options.state || '',
        type: options.type || 'item',
        class: options.class,
        roles: ((options.roles === null || typeof options.roles === 'undefined') ? service.defaultRoles : options.roles),
        position: options.position || 0,
        items: [],
        shouldRender: shouldRender
      });

      // Add submenu items
      if (options.items) {
        for (var i in options.items) {
          if (options.items.hasOwnProperty(i)) {
            service.addSubMenuItem(menuId, options.state, options.items[i]);
          }
        }
      }

      // Return the menu object
      return service.menus[menuId];
    }

    // Add submenu item object
    function addSubMenuItem(menuId, parentItemState, options) {
      options = options || {};

      // Validate that the menu exists
      service.validateMenuExistence(menuId);

      // Search for menu item
      for (var itemIndex in service.menus[menuId].items) {
        if (service.menus[menuId].items[itemIndex].state === parentItemState) {
          // Push new submenu item
          service.menus[menuId].items[itemIndex].items.push({
            title: options.title || '',
            state: options.state || '',
            params: options.params || {},
            roles: ((options.roles === null || typeof options.roles === 'undefined') ? service.menus[menuId].items[itemIndex].roles : options.roles),
            position: options.position || 0,
            shouldRender: shouldRender
          });
        }
      }

      // Return the menu object
      return service.menus[menuId];
    }

    // Get the menu object by menu id
    function getMenu(menuId) {
      // Validate that the menu exists
      service.validateMenuExistence(menuId);

      // Return the menu object
      return service.menus[menuId];
    }

    function init() {
      // A private function for rendering decision
      shouldRender = function (user) {
        if (this.roles.indexOf('*') !== -1) {
          return true;
        } else {
          if (!user) {
            return false;
          }

          for (var userRoleIndex in user.roles) {
            if (user.roles.hasOwnProperty(userRoleIndex)) {
              for (var roleIndex in this.roles) {
                if (this.roles.hasOwnProperty(roleIndex) && this.roles[roleIndex] === user.roles[userRoleIndex]) {
                  return true;
                }
              }
            }
          }
        }

        return false;
      };

      // Adding the topbar menu
      addMenu('topbar', {
        roles: ['*']
      });
    }

    // Remove existing menu object by menu id
    function removeMenu(menuId) {
      // Validate that the menu exists
      service.validateMenuExistence(menuId);

      delete service.menus[menuId];
    }

    // Remove existing menu object by menu id
    function removeMenuItem(menuId, menuItemState) {
      // Validate that the menu exists
      service.validateMenuExistence(menuId);

      // Search for menu item to remove
      for (var itemIndex in service.menus[menuId].items) {
        if (service.menus[menuId].items.hasOwnProperty(itemIndex) && service.menus[menuId].items[itemIndex].state === menuItemState) {
          service.menus[menuId].items.splice(itemIndex, 1);
        }
      }

      // Return the menu object
      return service.menus[menuId];
    }

    // Remove existing menu object by menu id
    function removeSubMenuItem(menuId, submenuItemState) {
      // Validate that the menu exists
      service.validateMenuExistence(menuId);

      // Search for menu item to remove
      for (var itemIndex in service.menus[menuId].items) {
        if (this.menus[menuId].items.hasOwnProperty(itemIndex)) {
          for (var subitemIndex in service.menus[menuId].items[itemIndex].items) {
            if (this.menus[menuId].items[itemIndex].items.hasOwnProperty(subitemIndex) && service.menus[menuId].items[itemIndex].items[subitemIndex].state === submenuItemState) {
              service.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
            }
          }
        }
      }

      // Return the menu object
      return service.menus[menuId];
    }

    // Validate menu existance
    function validateMenuExistence(menuId) {
      if (menuId && menuId.length) {
        if (service.menus[menuId]) {
          return true;
        } else {
          throw new Error('Menu does not exist');
        }
      } else {
        throw new Error('MenuId was not provided');
      }
    }
  }
}());

(function () {
  'use strict';

  // Create the Socket.io wrapper service
  angular
    .module('core')
    .factory('Socket', Socket);

  Socket.$inject = ['Authentication', '$state', '$timeout'];

  function Socket(Authentication, $state, $timeout) {
    var service = {
      connect: connect,
      emit: emit,
      on: on,
      removeListener: removeListener,
      socket: null
    };

    connect();

    return service;

    // Connect to Socket.io server
    function connect() {
      // Connect only when authenticated
      if (Authentication.user) {
        service.socket = io();
      }
    }

    // Wrap the Socket.io 'emit' method
    function emit(eventName, data) {
      if (service.socket) {
        service.socket.emit(eventName, data);
      }
    }

    // Wrap the Socket.io 'on' method
    function on(eventName, callback) {
      if (service.socket) {
        service.socket.on(eventName, function (data) {
          $timeout(function () {
            callback(data);
          });
        });
      }
    }

    // Wrap the Socket.io 'removeListener' method
    function removeListener(eventName) {
      if (service.socket) {
        service.socket.removeListener(eventName);
      }
    }
  }
}());

(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('enamels.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Enamels',
      state: 'admin.enamels.list'
    });
  }
}());

(function () {
  'use strict';

  angular
    .module('enamels.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.enamels', {
        abstract: true,
        url: '/enamels',
        template: '<ui-view/>'
      })
      .state('admin.enamels.list', {
        url: '',
        templateUrl: 'modules/enamels/client/views/admin/list-enamels.client.view.html',
        controller: 'EnamelsListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.enamels.create', {
        url: '/create',
        templateUrl: 'modules/enamels/client/views/admin/form-enamel.client.view.html',
        controller: 'EnamelsController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          enamelResolve: newPainting
        }
      })
      .state('admin.enamels.edit', {
        url: '/:enamelId/edit',
        templateUrl: 'modules/enamels/client/views/admin/form-enamel.client.view.html',
        controller: 'EnamelsController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          enamelResolve: getPainting
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'EnamelsService'];

  function getPainting($stateParams, EnamelsService) {
    return EnamelsService.get({
      enamelId: $stateParams.enamelId
    }).$promise;
  }

  newPainting.$inject = ['EnamelsService'];

  function newPainting(EnamelsService) {
    return new EnamelsService();
  }
}());

(function () {
  'use strict';

  angular
    .module('enamels')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {

  }
}());

(function () {
  'use strict';

  angular
    .module('enamels.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('enamels', {
        abstract: true,
        url: '/enamels',
        template: '<ui-view/>'
      })
      .state('enamels.list', {
        url: '',
        templateUrl: 'modules/enamels/client/views/list-enamels.client.view.html',
        controller: 'EnamelsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Enamels List'
        }
      })
      .state('enamels.view', {
        url: '/:enamelId',
        templateUrl: 'modules/enamels/client/views/view-enamel.client.view.html',
        controller: 'EnamelsController',
        controllerAs: 'vm',
        resolve: {
          enamelResolve: getPainting
        },
        data: {
          pageTitle: 'Painting {{ enamelResolve.title }}'
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'EnamelsService'];

  function getPainting($stateParams, EnamelsService) {
    return EnamelsService.get({
      enamelId: $stateParams.enamelId
    }).$promise;
  }
}());

(function () {
  'use strict';

  angular
    .module('enamels.admin')
    .controller('EnamelsController', EnamelsController);

  EnamelsController.$inject = ['$scope', '$timeout', '$state', '$window', 'enamelResolve', 'Authentication', 'FileUploader'];

  function EnamelsController($scope, $timeout, $state, $window, enamel, Authentication, FileUploader) {
    var vm = this;

    vm.enamel = enamel;
    vm.authentication = Authentication;
    vm.dynasties = ['Xia', 'Shang', 'Zhou', 'Qin', 'Han', 'Three Kindoms', 'Sui', 'Tang', 'Yuan', 'Ming', 'Qing', 'Modern'];

    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.imageURL = vm.enamel.imageURL;
    vm.uploadProfilePicture = uploadProfilePicture;

    vm.cancelUpload = cancelUpload;
    // Create file uploader instance
    vm.uploader = new FileUploader({
      url: 'api/enamel/picture',
      alias: 'newPicture',
      enamel: vm.enamel,
      onAfterAddingFile: onAfterAddingFile,
      onSuccessItem: onSuccessItem,
      onErrorItem: onErrorItem
    });

    vm.uploader.onBeforeUploadItem = onBeforeUploadItem;
    // Set file uploader image filter
    vm.uploader.filters.push({
      name: 'imageFilter',
      fn: function (item, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    });

    // add enamel data
    function onBeforeUploadItem(item) {
      item.formData.push({ enamelId: vm.enamel._id });
      // console.log(item);
    }
    // Called after the user selected a new picture file
    function onAfterAddingFile(fileItem) {
      if ($window.FileReader) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(fileItem._file);

        fileReader.onload = function (fileReaderEvent) {
          $timeout(function () {
            vm.imageURL = fileReaderEvent.target.result;
          }, 0);
        };
      }
    }

    // Called after the user has successfully uploaded a new picture
    function onSuccessItem(fileItem, response, status, headers) {
      // Show success message
      vm.success = true;

      // Populate user object
      vm.user = Authentication.user = response;

      // Clear upload buttons
      cancelUpload();
    }

    // Called after the user has failed to uploaded a new picture
    function onErrorItem(fileItem, response, status, headers) {
      // Clear upload buttons
      cancelUpload();

      // Show error message
      vm.error = response.message;
    }

    // Change user profile picture
    function uploadProfilePicture() {
      // Clear messages
      vm.success = vm.error = null;

      // Start upload
      vm.uploader.uploadAll();
    }

    // Cancel the upload process
    function cancelUpload() {
      vm.uploader.clearQueue();
      vm.imageURL = vm.enamel.imageURL;
    }

    // Remove existing Enamel
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.enamel.$remove($state.go('admin.enamels.list'));
      }
    }

    // Save Enamel
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.enamelForm');
        return false;
      }

      // Create a new enamel, or update the current instance
      vm.enamel.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.enamels.list'); // should we send the User to the list or the updated Enamel's view?
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('enamels.admin')
    .controller('EnamelsListController', EnamelsListController);

  EnamelsListController.$inject = ['$filter', 'EnamelsService'];

  function EnamelsListController($filter, EnamelsService) {
    var vm = this;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;

    EnamelsService.query(function (data) {
      vm.enamels = data;
      vm.buildPager();
      // update dropdown list
      vm.dynastyList = _.map(_.uniqBy(vm.enamels, 'dynasty'), 'dynasty');
      vm.dynastyList.unshift('All');
      vm.selectedDynasty = 'All';
    });

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 12;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.enamels, { $: vm.search });
      if (vm.selectedDynasty && vm.selectedDynasty !== 'All') {
        vm.filteredItems = _.filter(vm.filteredItems, { dynasty: vm.selectedDynasty });
      }
      vm.filterLength = vm.filteredItems.length;
      var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
      var end = begin + vm.itemsPerPage;
      vm.pagedItems = vm.filteredItems.slice(begin, end);
    }

    function pageChanged() {
      vm.figureOutItemsToDisplay();
    }

    vm.updateForDynasty = function () {
      vm.figureOutItemsToDisplay();
    };
  }
}());

(function () {
  'use strict';

  angular
    .module('enamels')
    .controller('EnamelsController', EnamelsController);

  EnamelsController.$inject = ['$scope', 'enamelResolve', 'authorsResolve', 'Authentication'];

  function EnamelsController($scope, enamel, authors, Authentication) {
    var vm = this;

    vm.enamel = enamel;
    vm.authentication = Authentication;
    vm.authors = authors;
    vm.error = null;

  }
}());

(function () {
  'use strict';

  angular
    .module('enamels')
    .controller('EnamelsListController', EnamelsListController);

  EnamelsListController.$inject = ['$filter', 'EnamelsService', 'authorsResolve'];

  function EnamelsListController($filter, EnamelsService, authors) {
    var vm = this;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;

    EnamelsService.query(function (data) {
      vm.enamels = data;
      vm.buildPager();
    });

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 12;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.enamels, { $: vm.search });
      if (vm.selectedDynasty && vm.selectedDynasty !== 'All') {
        vm.filteredItems = _.filter(vm.filteredItems, { author: { dynasty: vm.selectedDynasty } });
      }
      if (vm.selectedAuthor && vm.selectedAuthor !== 'All') {
        vm.filteredItems = _.filter(vm.filteredItems, { author: { name: vm.selectedAuthor } });
      }
      vm.filterLength = vm.filteredItems.length;
      var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
      var end = begin + vm.itemsPerPage;
      vm.pagedItems = vm.filteredItems.slice(begin, end);
    }

    function pageChanged() {
      vm.figureOutItemsToDisplay();
    }
    // update dropdown list
    vm.authors = authors;
    vm.authorList = _.map(authors, 'name');
    vm.dynastyList = _.map(_.uniqBy(authors, 'dynasty'), 'dynasty');
    vm.authorList.unshift('All');
    vm.dynastyList.unshift('All');
    vm.selectedDynasty = 'All';
    vm.selectedAuthor = 'All';


    vm.updateForDynasty = function () {
      var filteredAuthors = vm.selectedDynasty === 'All' ? authors : _.filter(authors, { dynasty: vm.selectedDynasty });
      vm.authorList = _.map(filteredAuthors, 'name');
      vm.authorList.unshift('All');
      vm.selectedAuthor = 'All';
      // update list
      vm.figureOutItemsToDisplay();
    };

    vm.updateForAuthor = function () {
      vm.figureOutItemsToDisplay();
    };
  }
}());

(function () {
  'use strict';

  angular
    .module('enamels.services')
    .factory('EnamelsService', EnamelsService);

  EnamelsService.$inject = ['$resource'];

  function EnamelsService($resource) {
    var Enamel = $resource('api/enamels/:enamelId', {
      enamelId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Enamel.prototype, {
      createOrUpdate: function () {
        var enamel = this;
        return createOrUpdate(enamel);
      }
    });

    return Enamel;

    function createOrUpdate(enamel) {
      if (enamel._id) {
        return enamel.$update(onSuccess, onError);
      } else {
        return enamel.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(enamel) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      console.log(error);
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('exhibitions')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Exhibitions',
      state: 'exhibitions',
      roles: ['*'],
      position: 2
    });
  }
}());

(function () {
  'use strict';

  angular
    .module('exhibitions.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('exhibitions', {
        url: '/exhibitions',
        templateUrl: 'modules/exhibitions/client/views/exhibitions.client.view.html',
        controller: 'ExhibitionsController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Exhibitions'
        }
      });
  }
}());

(function () {
  'use strict';

  angular
    .module('exhibitions')
    .controller('ExhibitionsController', ExhibitionsController);

  ExhibitionsController.$inject = ['$scope', '$state', 'Authentication'];

  function ExhibitionsController($scope, $state, Authentication) {
    var vm = this;

    init();

    function init() {

    }
  }
}());

(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('familles.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Familles',
      state: 'admin.familles.list'
    });
  }
}());

(function () {
  'use strict';

  angular
    .module('familles.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.familles', {
        abstract: true,
        url: '/familles',
        template: '<ui-view/>'
      })
      .state('admin.familles.list', {
        url: '',
        templateUrl: 'modules/familles/client/views/admin/list-familles.client.view.html',
        controller: 'FamillesListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.familles.create', {
        url: '/create',
        templateUrl: 'modules/familles/client/views/admin/form-famille.client.view.html',
        controller: 'FamillesController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          familleResolve: newPainting
        }
      })
      .state('admin.familles.edit', {
        url: '/:familleId/edit',
        templateUrl: 'modules/familles/client/views/admin/form-famille.client.view.html',
        controller: 'FamillesController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          familleResolve: getPainting
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'FamillesService'];

  function getPainting($stateParams, FamillesService) {
    return FamillesService.get({
      familleId: $stateParams.familleId
    }).$promise;
  }

  newPainting.$inject = ['FamillesService'];

  function newPainting(FamillesService) {
    return new FamillesService();
  }
}());

(function () {
  'use strict';

  angular
    .module('familles')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {

  }
}());

(function () {
  'use strict';

  angular
    .module('familles.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('familles', {
        abstract: true,
        url: '/familles',
        template: '<ui-view/>'
      })
      .state('familles.list', {
        url: '',
        templateUrl: 'modules/familles/client/views/list-familles.client.view.html',
        controller: 'FamillesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Familles List'
        }
      })
      .state('familles.view', {
        url: '/:familleId',
        templateUrl: 'modules/familles/client/views/view-famille.client.view.html',
        controller: 'FamillesController',
        controllerAs: 'vm',
        resolve: {
          familleResolve: getPainting
        },
        data: {
          pageTitle: 'Painting {{ familleResolve.title }}'
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'FamillesService'];

  function getPainting($stateParams, FamillesService) {
    return FamillesService.get({
      familleId: $stateParams.familleId
    }).$promise;
  }
}());

(function () {
  'use strict';

  angular
    .module('familles.admin')
    .controller('FamillesController', FamillesController);

  FamillesController.$inject = ['$scope', '$timeout', '$state', '$window', 'familleResolve', 'Authentication', 'FileUploader'];

  function FamillesController($scope, $timeout, $state, $window, famille, Authentication, FileUploader) {
    var vm = this;

    vm.famille = famille;
    vm.authentication = Authentication;
    vm.dynasties = ['Xia', 'Shang', 'Zhou', 'Qin', 'Han', 'Three Kindoms', 'Sui', 'Tang', 'Yuan', 'Ming', 'Qing', 'Modern'];

    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.imageURL = vm.famille.imageURL;
    vm.uploadProfilePicture = uploadProfilePicture;

    vm.cancelUpload = cancelUpload;
    // Create file uploader instance
    vm.uploader = new FileUploader({
      url: 'api/famille/picture',
      alias: 'newPicture',
      famille: vm.famille,
      onAfterAddingFile: onAfterAddingFile,
      onSuccessItem: onSuccessItem,
      onErrorItem: onErrorItem
    });

    vm.uploader.onBeforeUploadItem = onBeforeUploadItem;
    // Set file uploader image filter
    vm.uploader.filters.push({
      name: 'imageFilter',
      fn: function (item, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    });

    // add famille data
    function onBeforeUploadItem(item) {
      item.formData.push({ familleId: vm.famille._id });
      // console.log(item);
    }
    // Called after the user selected a new picture file
    function onAfterAddingFile(fileItem) {
      if ($window.FileReader) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(fileItem._file);

        fileReader.onload = function (fileReaderEvent) {
          $timeout(function () {
            vm.imageURL = fileReaderEvent.target.result;
          }, 0);
        };
      }
    }

    // Called after the user has successfully uploaded a new picture
    function onSuccessItem(fileItem, response, status, headers) {
      // Show success message
      vm.success = true;

      // Populate user object
      vm.user = Authentication.user = response;

      // Clear upload buttons
      cancelUpload();
    }

    // Called after the user has failed to uploaded a new picture
    function onErrorItem(fileItem, response, status, headers) {
      // Clear upload buttons
      cancelUpload();

      // Show error message
      vm.error = response.message;
    }

    // Change user profile picture
    function uploadProfilePicture() {
      // Clear messages
      vm.success = vm.error = null;

      // Start upload
      vm.uploader.uploadAll();
    }

    // Cancel the upload process
    function cancelUpload() {
      vm.uploader.clearQueue();
      vm.imageURL = vm.famille.imageURL;
    }

    // Remove existing Famille
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.famille.$remove($state.go('admin.familles.list'));
      }
    }

    // Save Famille
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.familleForm');
        return false;
      }

      // Create a new famille, or update the current instance
      vm.famille.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.familles.list'); // should we send the User to the list or the updated Famille's view?
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('familles.admin')
    .controller('FamillesListController', FamillesListController);

  FamillesListController.$inject = ['$filter', 'FamillesService'];

  function FamillesListController($filter, FamillesService) {
    var vm = this;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;

    FamillesService.query(function (data) {
      vm.familles = data;
      vm.buildPager();
      // update dropdown list
      vm.dynastyList = _.map(_.uniqBy(vm.familles, 'dynasty'), 'dynasty');
      vm.dynastyList.unshift('All');
      vm.selectedDynasty = 'All';
    });

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 12;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.familles, { $: vm.search });
      if (vm.selectedDynasty && vm.selectedDynasty !== 'All') {
        vm.filteredItems = _.filter(vm.filteredItems, { dynasty: vm.selectedDynasty });
      }
      vm.filterLength = vm.filteredItems.length;
      var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
      var end = begin + vm.itemsPerPage;
      vm.pagedItems = vm.filteredItems.slice(begin, end);
    }

    function pageChanged() {
      vm.figureOutItemsToDisplay();
    }

    vm.updateForDynasty = function () {
      vm.figureOutItemsToDisplay();
    };
  }
}());

(function () {
  'use strict';

  angular
    .module('familles')
    .controller('FamillesController', FamillesController);

  FamillesController.$inject = ['$scope', 'familleResolve', 'authorsResolve', 'Authentication'];

  function FamillesController($scope, famille, authors, Authentication) {
    var vm = this;

    vm.famille = famille;
    vm.authentication = Authentication;
    vm.authors = authors;
    vm.error = null;

  }
}());

(function () {
  'use strict';

  angular
    .module('familles')
    .controller('FamillesListController', FamillesListController);

  FamillesListController.$inject = ['$filter', 'FamillesService', 'authorsResolve'];

  function FamillesListController($filter, FamillesService, authors) {
    var vm = this;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;

    FamillesService.query(function (data) {
      vm.familles = data;
      vm.buildPager();
    });

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 12;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.familles, { $: vm.search });
      if (vm.selectedDynasty && vm.selectedDynasty !== 'All') {
        vm.filteredItems = _.filter(vm.filteredItems, { author: { dynasty: vm.selectedDynasty } });
      }
      if (vm.selectedAuthor && vm.selectedAuthor !== 'All') {
        vm.filteredItems = _.filter(vm.filteredItems, { author: { name: vm.selectedAuthor } });
      }
      vm.filterLength = vm.filteredItems.length;
      var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
      var end = begin + vm.itemsPerPage;
      vm.pagedItems = vm.filteredItems.slice(begin, end);
    }

    function pageChanged() {
      vm.figureOutItemsToDisplay();
    }
    // update dropdown list
    vm.authors = authors;
    vm.authorList = _.map(authors, 'name');
    vm.dynastyList = _.map(_.uniqBy(authors, 'dynasty'), 'dynasty');
    vm.authorList.unshift('All');
    vm.dynastyList.unshift('All');
    vm.selectedDynasty = 'All';
    vm.selectedAuthor = 'All';


    vm.updateForDynasty = function () {
      var filteredAuthors = vm.selectedDynasty === 'All' ? authors : _.filter(authors, { dynasty: vm.selectedDynasty });
      vm.authorList = _.map(filteredAuthors, 'name');
      vm.authorList.unshift('All');
      vm.selectedAuthor = 'All';
      // update list
      vm.figureOutItemsToDisplay();
    };

    vm.updateForAuthor = function () {
      vm.figureOutItemsToDisplay();
    };
  }
}());

(function () {
  'use strict';

  angular
    .module('familles.services')
    .factory('FamillesService', FamillesService);

  FamillesService.$inject = ['$resource'];

  function FamillesService($resource) {
    var Famille = $resource('api/familles/:familleId', {
      familleId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Famille.prototype, {
      createOrUpdate: function () {
        var famille = this;
        return createOrUpdate(famille);
      }
    });

    return Famille;

    function createOrUpdate(famille) {
      if (famille._id) {
        return famille.$update(onSuccess, onError);
      } else {
        return famille.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(famille) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      console.log(error);
    }
  }
}());

(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('paintings.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Paintings',
      state: 'admin.paintings.list'
    });
  }
}());

(function () {
  'use strict';

  angular
    .module('paintings.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.paintings', {
        abstract: true,
        url: '/paintings',
        template: '<ui-view/>'
      })
      .state('admin.paintings.list', {
        url: '',
        templateUrl: 'modules/paintings/client/views/admin/list-paintings.client.view.html',
        controller: 'PaintingsListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          authorsResolve: getAuthors
        }
      })
      .state('admin.paintings.create', {
        url: '/create',
        templateUrl: 'modules/paintings/client/views/admin/form-painting.client.view.html',
        controller: 'PaintingsController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          paintingResolve: newPainting,
          authorsResolve: getAuthors
        }
      })
      .state('admin.paintings.edit', {
        url: '/:paintingId/edit',
        templateUrl: 'modules/paintings/client/views/admin/form-painting.client.view.html',
        controller: 'PaintingsController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          paintingResolve: getPainting,
          authorsResolve: getAuthors
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'PaintingsService'];

  function getPainting($stateParams, PaintingsService) {
    return PaintingsService.get({
      paintingId: $stateParams.paintingId
    }).$promise;
  }

  getAuthors.$inject = ['$stateParams', 'AuthorsService'];

  function getAuthors($stateParams, AuthorsService) {
    return AuthorsService.query().$promise;
  }

  newPainting.$inject = ['PaintingsService'];

  function newPainting(PaintingsService) {
    return new PaintingsService();
  }
}());

(function () {
  'use strict';

  angular
    .module('paintings')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Collections',
      state: 'paintings',
      type: 'dropdown',
      roles: ['*'],
      position: 3
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'paintings', {
      title: 'Paintings',
      state: 'paintings.list',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'paintings', {
      title: 'Bronzes',
      state: 'bronzes.list',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'paintings', {
      title: 'Zisha Teapots',
      state: 'teapots.list',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'paintings', {
      title: 'Famille Rose',
      state: 'familles.list',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'paintings', {
      title: 'Famille Rose Enamel',
      state: 'enamels.list',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'paintings', {
      title: 'Statues',
      state: 'paintings.list',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'paintings', {
      title: 'Others',
      state: 'paintings.list',
      roles: ['*']
    });
  }
}());

(function () {
  'use strict';

  angular
    .module('paintings.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('paintings', {
        abstract: true,
        url: '/paintings',
        template: '<ui-view/>'
      })
      .state('paintings.list', {
        url: '',
        templateUrl: 'modules/paintings/client/views/list-paintings.client.view.html',
        controller: 'PaintingsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Paintings List'
        },
        resolve: {
          authorsResolve: getAuthors
        }
      })
      .state('paintings.view', {
        url: '/:paintingId',
        templateUrl: 'modules/paintings/client/views/view-painting.client.view.html',
        controller: 'PaintingsController',
        controllerAs: 'vm',
        resolve: {
          paintingResolve: getPainting,
          authorsResolve: getAuthors
        },
        data: {
          pageTitle: 'Painting {{ paintingResolve.title }}'
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'PaintingsService'];

  function getPainting($stateParams, PaintingsService) {
    return PaintingsService.get({
      paintingId: $stateParams.paintingId
    }).$promise;
  }


  getAuthors.$inject = ['$stateParams', 'AuthorsService'];

  function getAuthors($stateParams, AuthorsService) {
    return AuthorsService.query().$promise;
  }
}());

(function () {
  'use strict';

  angular
    .module('paintings.admin')
    .controller('PaintingsListController', PaintingsListController);

  PaintingsListController.$inject = ['$filter', 'PaintingsService', 'authorsResolve'];

  function PaintingsListController($filter, PaintingsService, authors) {
    var vm = this;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;

    PaintingsService.query(function (data) {
      vm.paintings = data;
      vm.buildPager();
    });

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 12;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.paintings, { $: vm.search });
      if (vm.selectedDynasty && vm.selectedDynasty !== 'All') {
        vm.filteredItems = _.filter(vm.filteredItems, { author: { dynasty: vm.selectedDynasty } });
      }
      if (vm.selectedAuthor && vm.selectedAuthor !== 'All') {
        vm.filteredItems = _.filter(vm.filteredItems, { author: { name: vm.selectedAuthor } });
      }
      vm.filterLength = vm.filteredItems.length;
      var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
      var end = begin + vm.itemsPerPage;
      vm.pagedItems = vm.filteredItems.slice(begin, end);
    }

    function pageChanged() {
      vm.figureOutItemsToDisplay();
    }

    // update dropdown list
    vm.authors = authors;
    vm.authorList = _.map(authors, 'name');
    vm.dynastyList = _.map(_.uniqBy(authors, 'dynasty'), 'dynasty');
    vm.authorList.unshift('All');
    vm.dynastyList.unshift('All');
    vm.selectedDynasty = 'All';
    vm.selectedAuthor = 'All';


    vm.updateForDynasty = function () {
      var filteredAuthors = vm.selectedDynasty === 'All' ? authors : _.filter(authors, { dynasty: vm.selectedDynasty });
      vm.authorList = _.map(filteredAuthors, 'name');
      vm.authorList.unshift('All');
      vm.selectedAuthor = 'All';
      // update list
      vm.figureOutItemsToDisplay();
    };

    vm.updateForAuthor = function () {
      vm.figureOutItemsToDisplay();
    };

  }
}());

(function () {
  'use strict';

  angular
    .module('paintings.admin')
    .controller('PaintingsController', PaintingsController);

  PaintingsController.$inject = ['$scope', '$timeout', '$state', '$window', 'paintingResolve', 'authorsResolve', 'Authentication', 'FileUploader'];

  function PaintingsController($scope, $timeout, $state, $window, painting, authors, Authentication, FileUploader) {
    var vm = this;

    vm.painting = painting;
    vm.authentication = Authentication;
    vm.authors = authors;
    vm.painting.author = vm.painting.author && chooseDropDown(vm.painting.author, authors, 'name');
    vm.types = ['Album, Ink on Paper', 'Hanging Scroll, Ink and Color on Paper'];

    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.imageURL = vm.painting.imageURL;
    vm.uploadProfilePicture = uploadProfilePicture;

    vm.cancelUpload = cancelUpload;
    // Create file uploader instance
    vm.uploader = new FileUploader({
      url: 'api/painting/picture',
      alias: 'newPicture',
      painting: vm.painting,
      onAfterAddingFile: onAfterAddingFile,
      onSuccessItem: onSuccessItem,
      onErrorItem: onErrorItem
    });

    vm.uploader.onBeforeUploadItem = onBeforeUploadItem;
    // Set file uploader image filter
    vm.uploader.filters.push({
      name: 'imageFilter',
      fn: function (item, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    });

    // add painting data
    function onBeforeUploadItem(item) {
      item.formData.push({ paintingId: vm.painting._id });
      // console.log(item);
    }
    // Called after the user selected a new picture file
    function onAfterAddingFile(fileItem) {
      if ($window.FileReader) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(fileItem._file);

        fileReader.onload = function (fileReaderEvent) {
          $timeout(function () {
            vm.imageURL = fileReaderEvent.target.result;
          }, 0);
        };
      }
    }

    // Called after the user has successfully uploaded a new picture
    function onSuccessItem(fileItem, response, status, headers) {
      // Show success message
      vm.success = true;

      // Populate user object
      vm.user = Authentication.user = response;

      // Clear upload buttons
      cancelUpload();
    }

    // Called after the user has failed to uploaded a new picture
    function onErrorItem(fileItem, response, status, headers) {
      // Clear upload buttons
      cancelUpload();

      // Show error message
      vm.error = response.message;
    }

    // Change user profile picture
    function uploadProfilePicture() {
      // Clear messages
      vm.success = vm.error = null;

      // Start upload
      vm.uploader.uploadAll();
    }

    // Cancel the upload process
    function cancelUpload() {
      vm.uploader.clearQueue();
      vm.imageURL = vm.painting.imageURL;
    }

    // select for dropdownlist
    function chooseDropDown(item, list, field) {
      if (list && list.length > 0) {
        for (var i = 0; i < list.length; i++) {
          if (list[i][field] === item[field]) {
            return list[i];
          }
        }
      }
    }

    // Remove existing Painting
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.painting.$remove($state.go('admin.paintings.list'));
      }
    }

    // Save Painting
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.paintingForm');
        return false;
      }

      // Create a new painting, or update the current instance
      vm.painting.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.paintings.list'); // should we send the User to the list or the updated Painting's view?
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('paintings')
    .controller('PaintingsListController', PaintingsListController);

  PaintingsListController.$inject = ['$filter', 'PaintingsService', 'authorsResolve'];

  function PaintingsListController($filter, PaintingsService, authors) {
    var vm = this;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;

    PaintingsService.query(function (data) {
      vm.paintings = data;
      vm.buildPager();
    });

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 12;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.paintings, { $: vm.search });
      if (vm.selectedDynasty && vm.selectedDynasty !== 'All') {
        vm.filteredItems = _.filter(vm.filteredItems, { author: { dynasty: vm.selectedDynasty } });
      }
      if (vm.selectedAuthor && vm.selectedAuthor !== 'All') {
        vm.filteredItems = _.filter(vm.filteredItems, { author: { name: vm.selectedAuthor } });
      }
      vm.filterLength = vm.filteredItems.length;
      var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
      var end = begin + vm.itemsPerPage;
      vm.pagedItems = vm.filteredItems.slice(begin, end);
    }

    function pageChanged() {
      vm.figureOutItemsToDisplay();
    }
    // update dropdown list
    vm.authors = authors;
    vm.authorList = _.map(authors, 'name');
    vm.dynastyList = _.map(_.uniqBy(authors, 'dynasty'), 'dynasty');
    vm.authorList.unshift('All');
    vm.dynastyList.unshift('All');
    vm.selectedDynasty = 'All';
    vm.selectedAuthor = 'All';


    vm.updateForDynasty = function () {
      var filteredAuthors = vm.selectedDynasty === 'All' ? authors : _.filter(authors, { dynasty: vm.selectedDynasty });
      vm.authorList = _.map(filteredAuthors, 'name');
      vm.authorList.unshift('All');
      vm.selectedAuthor = 'All';
      // update list
      vm.figureOutItemsToDisplay();
    };

    vm.updateForAuthor = function () {
      vm.figureOutItemsToDisplay();
    };

    vm.firstText = 'Firstt';
  }
}());

(function () {
  'use strict';

  angular
    .module('paintings')
    .controller('PaintingsController', PaintingsController);

  PaintingsController.$inject = ['$scope', 'paintingResolve', 'authorsResolve', 'Authentication'];

  function PaintingsController($scope, painting, authors, Authentication) {
    var vm = this;

    vm.painting = painting;
    vm.authentication = Authentication;
    vm.authors = authors;
    vm.error = null;

  }
}());

(function () {
  'use strict';

  angular
    .module('paintings.services')
    .factory('PaintingsService', PaintingsService);

  PaintingsService.$inject = ['$resource'];

  function PaintingsService($resource) {
    var Painting = $resource('api/paintings/:paintingId', {
      paintingId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Painting.prototype, {
      createOrUpdate: function () {
        var painting = this;
        return createOrUpdate(painting);
      }
    });

    return Painting;

    function createOrUpdate(painting) {
      if (painting._id) {
        return painting.$update(onSuccess, onError);
      } else {
        return painting.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(painting) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      console.log(error);
    }
  }
}());

(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('teapots.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Teapots',
      state: 'admin.teapots.list'
    });
  }
}());

(function () {
  'use strict';

  angular
    .module('teapots.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.teapots', {
        abstract: true,
        url: '/teapots',
        template: '<ui-view/>'
      })
      .state('admin.teapots.list', {
        url: '',
        templateUrl: 'modules/teapots/client/views/admin/list-teapots.client.view.html',
        controller: 'TeapotsListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.teapots.create', {
        url: '/create',
        templateUrl: 'modules/teapots/client/views/admin/form-teapot.client.view.html',
        controller: 'TeapotsController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          teapotResolve: newPainting
        }
      })
      .state('admin.teapots.edit', {
        url: '/:teapotId/edit',
        templateUrl: 'modules/teapots/client/views/admin/form-teapot.client.view.html',
        controller: 'TeapotsController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          teapotResolve: getPainting
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'TeapotsService'];

  function getPainting($stateParams, TeapotsService) {
    return TeapotsService.get({
      teapotId: $stateParams.teapotId
    }).$promise;
  }

  newPainting.$inject = ['TeapotsService'];

  function newPainting(TeapotsService) {
    return new TeapotsService();
  }
}());

(function () {
  'use strict';

  angular
    .module('teapots')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {

  }
}());

(function () {
  'use strict';

  angular
    .module('teapots.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('teapots', {
        abstract: true,
        url: '/teapots',
        template: '<ui-view/>'
      })
      .state('teapots.list', {
        url: '',
        templateUrl: 'modules/teapots/client/views/list-teapots.client.view.html',
        controller: 'TeapotsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Teapots List'
        }
      })
      .state('teapots.view', {
        url: '/:teapotId',
        templateUrl: 'modules/teapots/client/views/view-teapot.client.view.html',
        controller: 'TeapotsController',
        controllerAs: 'vm',
        resolve: {
          teapotResolve: getPainting
        },
        data: {
          pageTitle: 'Painting {{ teapotResolve.title }}'
        }
      });
  }

  getPainting.$inject = ['$stateParams', 'TeapotsService'];

  function getPainting($stateParams, TeapotsService) {
    return TeapotsService.get({
      teapotId: $stateParams.teapotId
    }).$promise;
  }
}());

(function () {
  'use strict';

  angular
    .module('teapots.admin')
    .controller('TeapotsListController', TeapotsListController);

  TeapotsListController.$inject = ['$filter', 'TeapotsService'];

  function TeapotsListController($filter, TeapotsService) {
    var vm = this;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;

    TeapotsService.query(function (data) {
      vm.teapots = data;
      vm.buildPager();
      // update dropdown list
      vm.dynastyList = _.map(_.uniqBy(vm.teapots, 'dynasty'), 'dynasty');
      vm.dynastyList.unshift('All');
      vm.selectedDynasty = 'All';
    });

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 12;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.teapots, { $: vm.search });
      if (vm.selectedDynasty && vm.selectedDynasty !== 'All') {
        vm.filteredItems = _.filter(vm.filteredItems, { dynasty: vm.selectedDynasty });
      }
      vm.filterLength = vm.filteredItems.length;
      var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
      var end = begin + vm.itemsPerPage;
      vm.pagedItems = vm.filteredItems.slice(begin, end);
    }

    function pageChanged() {
      vm.figureOutItemsToDisplay();
    }

    vm.updateForDynasty = function () {
      vm.figureOutItemsToDisplay();
    };
  }
}());

(function () {
  'use strict';

  angular
    .module('teapots.admin')
    .controller('TeapotsController', TeapotsController);

  TeapotsController.$inject = ['$scope', '$timeout', '$state', '$window', 'teapotResolve', 'Authentication', 'FileUploader'];

  function TeapotsController($scope, $timeout, $state, $window, teapot, Authentication, FileUploader) {
    var vm = this;

    vm.teapot = teapot;
    vm.authentication = Authentication;
    vm.types = ['Teapot Type 1', 'Teapot Type 2'];
    vm.dynasties = ['Xia', 'Shang', 'Zhou', 'Qin', 'Han', 'Three Kindoms', 'Sui', 'Tang', 'Yuan', 'Ming', 'Qing', 'Modern'];

    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.imageURL = vm.teapot.imageURL;
    vm.uploadProfilePicture = uploadProfilePicture;

    vm.cancelUpload = cancelUpload;
    // Create file uploader instance
    vm.uploader = new FileUploader({
      url: 'api/teapot/picture',
      alias: 'newPicture',
      teapot: vm.teapot,
      onAfterAddingFile: onAfterAddingFile,
      onSuccessItem: onSuccessItem,
      onErrorItem: onErrorItem
    });

    vm.uploader.onBeforeUploadItem = onBeforeUploadItem;
    // Set file uploader image filter
    vm.uploader.filters.push({
      name: 'imageFilter',
      fn: function (item, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    });

    // add teapot data
    function onBeforeUploadItem(item) {
      item.formData.push({ teapotId: vm.teapot._id });
      // console.log(item);
    }
    // Called after the user selected a new picture file
    function onAfterAddingFile(fileItem) {
      if ($window.FileReader) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(fileItem._file);

        fileReader.onload = function (fileReaderEvent) {
          $timeout(function () {
            vm.imageURL = fileReaderEvent.target.result;
          }, 0);
        };
      }
    }

    // Called after the user has successfully uploaded a new picture
    function onSuccessItem(fileItem, response, status, headers) {
      // Show success message
      vm.success = true;

      // Populate user object
      vm.user = Authentication.user = response;

      // Clear upload buttons
      cancelUpload();
    }

    // Called after the user has failed to uploaded a new picture
    function onErrorItem(fileItem, response, status, headers) {
      // Clear upload buttons
      cancelUpload();

      // Show error message
      vm.error = response.message;
    }

    // Change user profile picture
    function uploadProfilePicture() {
      // Clear messages
      vm.success = vm.error = null;

      // Start upload
      vm.uploader.uploadAll();
    }

    // Cancel the upload process
    function cancelUpload() {
      vm.uploader.clearQueue();
      vm.imageURL = vm.teapot.imageURL;
    }

    // Remove existing Teapot
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.teapot.$remove($state.go('admin.teapots.list'));
      }
    }

    // Save Teapot
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.teapotForm');
        return false;
      }

      // Create a new teapot, or update the current instance
      vm.teapot.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.teapots.list'); // should we send the User to the list or the updated Teapot's view?
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('teapots')
    .controller('TeapotsListController', TeapotsListController);

  TeapotsListController.$inject = ['$filter', 'TeapotsService', 'authorsResolve'];

  function TeapotsListController($filter, TeapotsService, authors) {
    var vm = this;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;

    TeapotsService.query(function (data) {
      vm.teapots = data;
      vm.buildPager();
    });

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 12;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.teapots, { $: vm.search });
      if (vm.selectedDynasty && vm.selectedDynasty !== 'All') {
        vm.filteredItems = _.filter(vm.filteredItems, { author: { dynasty: vm.selectedDynasty } });
      }
      if (vm.selectedAuthor && vm.selectedAuthor !== 'All') {
        vm.filteredItems = _.filter(vm.filteredItems, { author: { name: vm.selectedAuthor } });
      }
      vm.filterLength = vm.filteredItems.length;
      var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
      var end = begin + vm.itemsPerPage;
      vm.pagedItems = vm.filteredItems.slice(begin, end);
    }

    function pageChanged() {
      vm.figureOutItemsToDisplay();
    }
    // update dropdown list
    vm.authors = authors;
    vm.authorList = _.map(authors, 'name');
    vm.dynastyList = _.map(_.uniqBy(authors, 'dynasty'), 'dynasty');
    vm.authorList.unshift('All');
    vm.dynastyList.unshift('All');
    vm.selectedDynasty = 'All';
    vm.selectedAuthor = 'All';


    vm.updateForDynasty = function () {
      var filteredAuthors = vm.selectedDynasty === 'All' ? authors : _.filter(authors, { dynasty: vm.selectedDynasty });
      vm.authorList = _.map(filteredAuthors, 'name');
      vm.authorList.unshift('All');
      vm.selectedAuthor = 'All';
      // update list
      vm.figureOutItemsToDisplay();
    };

    vm.updateForAuthor = function () {
      vm.figureOutItemsToDisplay();
    };
  }
}());

(function () {
  'use strict';

  angular
    .module('teapots')
    .controller('TeapotsController', TeapotsController);

  TeapotsController.$inject = ['$scope', 'teapotResolve', 'authorsResolve', 'Authentication'];

  function TeapotsController($scope, teapot, authors, Authentication) {
    var vm = this;

    vm.teapot = teapot;
    vm.authentication = Authentication;
    vm.authors = authors;
    vm.error = null;

  }
}());

(function () {
  'use strict';

  angular
    .module('teapots.services')
    .factory('TeapotsService', TeapotsService);

  TeapotsService.$inject = ['$resource'];

  function TeapotsService($resource) {
    var Teapot = $resource('api/teapots/:teapotId', {
      teapotId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Teapot.prototype, {
      createOrUpdate: function () {
        var teapot = this;
        return createOrUpdate(teapot);
      }
    });

    return Teapot;

    function createOrUpdate(teapot) {
      if (teapot._id) {
        return teapot.$update(onSuccess, onError);
      } else {
        return teapot.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(teapot) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      console.log(error);
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('users.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  // Configuring the Users module
  function menuConfig(menuService) {
    menuService.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Users',
      state: 'admin.users'
    });
  }
}());

(function () {
  'use strict';

  // Setting up route
  angular
    .module('users.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.users', {
        url: '/users',
        templateUrl: 'modules/users/client/views/admin/list-users.client.view.html',
        controller: 'UserListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Users List'
        }
      })
      .state('admin.user', {
        url: '/users/:userId',
        templateUrl: 'modules/users/client/views/admin/view-user.client.view.html',
        controller: 'UserController',
        controllerAs: 'vm',
        resolve: {
          userResolve: getUser
        },
        data: {
          pageTitle: 'Edit {{ userResolve.displayName }}'
        }
      })
      .state('admin.user-edit', {
        url: '/users/:userId/edit',
        templateUrl: 'modules/users/client/views/admin/edit-user.client.view.html',
        controller: 'UserController',
        controllerAs: 'vm',
        resolve: {
          userResolve: getUser
        },
        data: {
          pageTitle: 'Edit User {{ userResolve.displayName }}'
        }
      });

    getUser.$inject = ['$stateParams', 'AdminService'];

    function getUser($stateParams, AdminService) {
      return AdminService.get({
        userId: $stateParams.userId
      }).$promise;
    }
  }
}());

(function () {
  'use strict';

  // Setting up route
  angular
    .module('users.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    // Users state routing
    $stateProvider
      .state('settings', {
        abstract: true,
        url: '/settings',
        templateUrl: 'modules/users/client/views/settings/settings.client.view.html',
        controller: 'SettingsController',
        controllerAs: 'vm',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('settings.profile', {
        url: '/profile',
        templateUrl: 'modules/users/client/views/settings/edit-profile.client.view.html',
        controller: 'EditProfileController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Settings'
        }
      })
      .state('settings.password', {
        url: '/password',
        templateUrl: 'modules/users/client/views/settings/change-password.client.view.html',
        controller: 'ChangePasswordController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Settings password'
        }
      })
      .state('settings.accounts', {
        url: '/accounts',
        templateUrl: 'modules/users/client/views/settings/manage-social-accounts.client.view.html',
        controller: 'SocialAccountsController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Settings accounts'
        }
      })
      .state('settings.picture', {
        url: '/picture',
        templateUrl: 'modules/users/client/views/settings/change-profile-picture.client.view.html',
        controller: 'ChangeProfilePictureController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Settings picture'
        }
      })
      .state('authentication', {
        abstract: true,
        url: '/authentication',
        templateUrl: 'modules/users/client/views/authentication/authentication.client.view.html',
        controller: 'AuthenticationController',
        controllerAs: 'vm'
      })
      .state('authentication.signup', {
        url: '/signup',
        templateUrl: 'modules/users/client/views/authentication/signup.client.view.html',
        controller: 'AuthenticationController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Signup'
        }
      })
      .state('authentication.signin', {
        url: '/signin?err',
        templateUrl: 'modules/users/client/views/authentication/signin.client.view.html',
        controller: 'AuthenticationController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Signin'
        }
      })
      .state('password', {
        abstract: true,
        url: '/password',
        template: '<ui-view/>'
      })
      .state('password.forgot', {
        url: '/forgot',
        templateUrl: 'modules/users/client/views/password/forgot-password.client.view.html',
        controller: 'PasswordController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Password forgot'
        }
      })
      .state('password.reset', {
        abstract: true,
        url: '/reset',
        template: '<ui-view/>'
      })
      .state('password.reset.invalid', {
        url: '/invalid',
        templateUrl: 'modules/users/client/views/password/reset-password-invalid.client.view.html',
        data: {
          pageTitle: 'Password reset invalid'
        }
      })
      .state('password.reset.success', {
        url: '/success',
        templateUrl: 'modules/users/client/views/password/reset-password-success.client.view.html',
        data: {
          pageTitle: 'Password reset success'
        }
      })
      .state('password.reset.form', {
        url: '/:token',
        templateUrl: 'modules/users/client/views/password/reset-password.client.view.html',
        controller: 'PasswordController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Password reset form'
        }
      });
  }
}());

(function () {
  'use strict';

  angular
    .module('users.admin')
    .controller('UserListController', UserListController);

  UserListController.$inject = ['$scope', '$filter', 'AdminService'];

  function UserListController($scope, $filter, AdminService) {
    var vm = this;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;

    AdminService.query(function (data) {
      vm.users = data;
      vm.buildPager();
    });

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 15;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.users, {
        $: vm.search
      });
      vm.filterLength = vm.filteredItems.length;
      var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
      var end = begin + vm.itemsPerPage;
      vm.pagedItems = vm.filteredItems.slice(begin, end);
    }

    function pageChanged() {
      vm.figureOutItemsToDisplay();
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('users.admin')
    .controller('UserController', UserController);

  UserController.$inject = ['$scope', '$state', '$window', 'Authentication', 'userResolve'];

  function UserController($scope, $state, $window, Authentication, user) {
    var vm = this;

    vm.authentication = Authentication;
    vm.user = user;
    vm.remove = remove;
    vm.update = update;

    function remove(user) {
      if ($window.confirm('Are you sure you want to delete this user?')) {
        if (user) {
          user.$remove();

          vm.users.splice(vm.users.indexOf(user), 1);
        } else {
          vm.user.$remove(function () {
            $state.go('admin.users');
          });
        }
      }
    }

    function update(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

        return false;
      }

      var user = vm.user;

      user.$update(function () {
        $state.go('admin.user', {
          userId: user._id
        });
      }, function (errorResponse) {
        vm.error = errorResponse.data.message;
      });
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('users')
    .controller('AuthenticationController', AuthenticationController);

  AuthenticationController.$inject = ['$scope', '$state', '$http', '$location', '$window', 'Authentication', 'PasswordValidator'];

  function AuthenticationController($scope, $state, $http, $location, $window, Authentication, PasswordValidator) {
    var vm = this;

    vm.authentication = Authentication;
    vm.getPopoverMsg = PasswordValidator.getPopoverMsg;
    vm.signup = signup;
    vm.signin = signin;
    vm.callOauthProvider = callOauthProvider;

    // Get an eventual error defined in the URL query string:
    vm.error = $location.search().err;

    // If user is signed in then redirect back home
    if (vm.authentication.user) {
      $location.path('/');
    }

    function signup(isValid) {
      vm.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

        return false;
      }

      $http.post('/api/auth/signup', vm.credentials).success(function (response) {
        // If successful we assign the response to the global user model
        vm.authentication.user = response;

        // And redirect to the previous or home page
        $state.go($state.previous.state.name || 'home', $state.previous.params);
      }).error(function (response) {
        vm.error = response.message;
      });
    }

    function signin(isValid) {
      vm.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

        return false;
      }

      $http.post('/api/auth/signin', vm.credentials).success(function (response) {
        // If successful we assign the response to the global user model
        vm.authentication.user = response;

        // And redirect to the previous or home page
        $state.go($state.previous.state.name || 'home', $state.previous.params);
      }).error(function (response) {
        vm.error = response.message;
      });
    }

    // OAuth provider request
    function callOauthProvider(url) {
      if ($state.previous && $state.previous.href) {
        url += '?redirect_to=' + encodeURIComponent($state.previous.href);
      }

      // Effectively call OAuth authentication route:
      $window.location.href = url;
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('users')
    .controller('PasswordController', PasswordController);

  PasswordController.$inject = ['$scope', '$stateParams', '$http', '$location', 'Authentication', 'PasswordValidator'];

  function PasswordController($scope, $stateParams, $http, $location, Authentication, PasswordValidator) {
    var vm = this;

    vm.resetUserPassword = resetUserPassword;
    vm.askForPasswordReset = askForPasswordReset;
    vm.authentication = Authentication;
    vm.getPopoverMsg = PasswordValidator.getPopoverMsg;

    // If user is signed in then redirect back home
    if (vm.authentication.user) {
      $location.path('/');
    }

    // Submit forgotten password account id
    function askForPasswordReset(isValid) {
      vm.success = vm.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.forgotPasswordForm');

        return false;
      }

      $http.post('/api/auth/forgot', vm.credentials).success(function (response) {
        // Show user success message and clear form
        vm.credentials = null;
        vm.success = response.message;

      }).error(function (response) {
        // Show user error message and clear form
        vm.credentials = null;
        vm.error = response.message;
      });
    }

    // Change user password
    function resetUserPassword(isValid) {
      vm.success = vm.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.resetPasswordForm');

        return false;
      }

      $http.post('/api/auth/reset/' + $stateParams.token, vm.passwordDetails).success(function (response) {
        // If successful show success message and clear form
        vm.passwordDetails = null;

        // Attach user profile
        Authentication.user = response;

        // And redirect to the index page
        $location.path('/password/reset/success');
      }).error(function (response) {
        vm.error = response.message;
      });
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('users')
    .controller('ChangePasswordController', ChangePasswordController);

  ChangePasswordController.$inject = ['$scope', '$http', 'Authentication', 'PasswordValidator'];

  function ChangePasswordController($scope, $http, Authentication, PasswordValidator) {
    var vm = this;

    vm.user = Authentication.user;
    vm.changeUserPassword = changeUserPassword;
    vm.getPopoverMsg = PasswordValidator.getPopoverMsg;

    // Change user password
    function changeUserPassword(isValid) {
      vm.success = vm.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.passwordForm');

        return false;
      }

      $http.post('/api/users/password', vm.passwordDetails).success(function (response) {
        // If successful show success message and clear form
        $scope.$broadcast('show-errors-reset', 'vm.passwordForm');
        vm.success = true;
        vm.passwordDetails = null;
      }).error(function (response) {
        vm.error = response.message;
      });
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('users')
    .controller('ChangeProfilePictureController', ChangeProfilePictureController);

  ChangeProfilePictureController.$inject = ['$scope', '$timeout', '$window', 'Authentication', 'FileUploader'];

  function ChangeProfilePictureController($scope, $timeout, $window, Authentication, FileUploader) {
    var vm = this;

    vm.user = Authentication.user;
    vm.imageURL = vm.user.profileImageURL;
    vm.uploadProfilePicture = uploadProfilePicture;

    vm.cancelUpload = cancelUpload;
    // Create file uploader instance
    vm.uploader = new FileUploader({
      url: 'api/users/picture',
      alias: 'newProfilePicture',
      onAfterAddingFile: onAfterAddingFile,
      onSuccessItem: onSuccessItem,
      onErrorItem: onErrorItem
    });

    // Set file uploader image filter
    vm.uploader.filters.push({
      name: 'imageFilter',
      fn: function (item, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    });

    // Called after the user selected a new picture file
    function onAfterAddingFile(fileItem) {
      if ($window.FileReader) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(fileItem._file);

        fileReader.onload = function (fileReaderEvent) {
          $timeout(function () {
            vm.imageURL = fileReaderEvent.target.result;
          }, 0);
        };
      }
    }

    // Called after the user has successfully uploaded a new picture
    function onSuccessItem(fileItem, response, status, headers) {
      // Show success message
      vm.success = true;

      // Populate user object
      vm.user = Authentication.user = response;

      // Clear upload buttons
      cancelUpload();
    }

    // Called after the user has failed to uploaded a new picture
    function onErrorItem(fileItem, response, status, headers) {
      // Clear upload buttons
      cancelUpload();

      // Show error message
      vm.error = response.message;
    }

    // Change user profile picture
    function uploadProfilePicture() {
      // Clear messages
      vm.success = vm.error = null;

      // Start upload
      vm.uploader.uploadAll();
    }

    // Cancel the upload process
    function cancelUpload() {
      vm.uploader.clearQueue();
      vm.imageURL = vm.user.profileImageURL;
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('users')
    .controller('EditProfileController', EditProfileController);

  EditProfileController.$inject = ['$scope', '$http', '$location', 'UsersService', 'Authentication'];

  function EditProfileController($scope, $http, $location, UsersService, Authentication) {
    var vm = this;

    vm.user = Authentication.user;
    vm.updateUserProfile = updateUserProfile;

    // Update a user profile
    function updateUserProfile(isValid) {
      vm.success = vm.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

        return false;
      }

      var user = new UsersService(vm.user);

      user.$update(function (response) {
        $scope.$broadcast('show-errors-reset', 'vm.userForm');

        vm.success = true;
        Authentication.user = response;
      }, function (response) {
        vm.error = response.data.message;
      });
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('users')
    .controller('SocialAccountsController', SocialAccountsController);

  SocialAccountsController.$inject = ['$scope', '$http', 'Authentication'];

  function SocialAccountsController($scope, $http, Authentication) {
    var vm = this;

    vm.user = Authentication.user;
    vm.hasConnectedAdditionalSocialAccounts = hasConnectedAdditionalSocialAccounts;
    vm.isConnectedSocialAccount = isConnectedSocialAccount;
    vm.removeUserSocialAccount = removeUserSocialAccount;

    // Check if there are additional accounts
    function hasConnectedAdditionalSocialAccounts() {
      return (vm.user.additionalProvidersData && Object.keys(vm.user.additionalProvidersData).length);
    }

    // Check if provider is already in use with current user
    function isConnectedSocialAccount(provider) {
      return vm.user.provider === provider || (vm.user.additionalProvidersData && vm.user.additionalProvidersData[provider]);
    }

    // Remove a user social account
    function removeUserSocialAccount(provider) {
      vm.success = vm.error = null;

      $http.delete('/api/users/accounts', {
        params: {
          provider: provider
        }
      }).success(function (response) {
        // If successful show success message and clear form
        vm.success = true;
        vm.user = Authentication.user = response;
      }).error(function (response) {
        vm.error = response.message;
      });
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('users')
    .controller('SettingsController', SettingsController);

  SettingsController.$inject = ['$scope', 'Authentication'];

  function SettingsController($scope, Authentication) {
    var vm = this;

    vm.user = Authentication.user;
  }
}());

(function () {
  'use strict';

  angular
    .module('users')
    .directive('passwordValidator', passwordValidator);

  passwordValidator.$inject = ['PasswordValidator'];

  function passwordValidator(PasswordValidator) {
    var directive = {
      require: 'ngModel',
      link: link
    };

    return directive;

    function link(scope, element, attrs, ngModel) {
      ngModel.$validators.requirements = function (password) {
        var status = true;
        if (password) {
          var result = PasswordValidator.getResult(password);
          var requirementsIdx = 0;

          // Requirements Meter - visual indicator for users
          var requirementsMeter = [{
            color: 'danger',
            progress: '20'
          }, {
            color: 'warning',
            progress: '40'
          }, {
            color: 'info',
            progress: '60'
          }, {
            color: 'primary',
            progress: '80'
          }, {
            color: 'success',
            progress: '100'
          }];

          if (result.errors.length < requirementsMeter.length) {
            requirementsIdx = requirementsMeter.length - result.errors.length - 1;
          }

          scope.requirementsColor = requirementsMeter[requirementsIdx].color;
          scope.requirementsProgress = requirementsMeter[requirementsIdx].progress;

          if (result.errors.length) {
            scope.getPopoverMsg = PasswordValidator.getPopoverMsg();
            scope.passwordErrors = result.errors;
            status = false;
          } else {
            scope.getPopoverMsg = '';
            scope.passwordErrors = [];
            status = true;
          }
        }
        return status;
      };
    }
  }
}());

(function () {
  'use strict';

  angular
    .module('users')
    .directive('passwordVerify', passwordVerify);

  function passwordVerify() {
    var directive = {
      require: 'ngModel',
      scope: {
        passwordVerify: '='
      },
      link: link
    };

    return directive;

    function link(scope, element, attrs, ngModel) {
      var status = true;
      scope.$watch(function () {
        var combined;
        if (scope.passwordVerify || ngModel) {
          combined = scope.passwordVerify + '_' + ngModel;
        }
        return combined;
      }, function (value) {
        if (value) {
          ngModel.$validators.passwordVerify = function (password) {
            var origin = scope.passwordVerify;
            return (origin === password);
          };
        }
      });
    }
  }
}());

(function () {
  'use strict';

  // Users directive used to force lowercase input
  angular
    .module('users')
    .directive('lowercase', lowercase);

  function lowercase() {
    var directive = {
      require: 'ngModel',
      link: link
    };

    return directive;

    function link(scope, element, attrs, modelCtrl) {
      modelCtrl.$parsers.push(function (input) {
        return input ? input.toLowerCase() : '';
      });
      element.css('text-transform', 'lowercase');
    }
  }
}());

(function () {
  'use strict';

  // Authentication service for user variables

  angular
    .module('users.services')
    .factory('Authentication', Authentication);

  Authentication.$inject = ['$window'];

  function Authentication($window) {
    var auth = {
      user: $window.user
    };

    return auth;
  }
}());

(function () {
  'use strict';

  // PasswordValidator service used for testing the password strength
  angular
    .module('users.services')
    .factory('PasswordValidator', PasswordValidator);

  PasswordValidator.$inject = ['$window'];

  function PasswordValidator($window) {
    var owaspPasswordStrengthTest = $window.owaspPasswordStrengthTest;

    var service = {
      getResult: getResult,
      getPopoverMsg: getPopoverMsg
    };

    return service;

    function getResult(password) {
      var result = owaspPasswordStrengthTest.test(password);
      return result;
    }

    function getPopoverMsg() {
      var popoverMsg = 'Please enter a passphrase or password with 10 or more characters, numbers, lowercase, uppercase, and special characters.';

      return popoverMsg;
    }
  }

}());

(function () {
  'use strict';

  // Users service used for communicating with the users REST endpoint
  angular
    .module('users.services')
    .factory('UsersService', UsersService);

  UsersService.$inject = ['$resource'];

  function UsersService($resource) {
    return $resource('api/users', {}, {
      update: {
        method: 'PUT'
      }
    });
  }

  // TODO this should be Users service
  angular
    .module('users.admin.services')
    .factory('AdminService', AdminService);

  AdminService.$inject = ['$resource'];

  function AdminService($resource) {
    return $resource('api/users/:userId', {
      userId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
