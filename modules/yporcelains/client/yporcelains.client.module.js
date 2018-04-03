(function (app) {
  'use strict';

  app.registerModule('yporcelains', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('yporcelains.admin', ['core.admin']);
  app.registerModule('yporcelains.admin.routes', ['core.admin.routes']);
  app.registerModule('yporcelains.services');
  app.registerModule('yporcelains.routes', ['ui.router', 'core.routes', 'articles.services']);
}(ApplicationConfiguration));
