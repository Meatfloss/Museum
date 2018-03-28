(function (app) {
  'use strict';

  app.registerModule('mporcelains', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('mporcelains.admin', ['core.admin']);
  app.registerModule('mporcelains.admin.routes', ['core.admin.routes']);
  app.registerModule('mporcelains.services');
  app.registerModule('mporcelains.routes', ['ui.router', 'core.routes', 'articles.services']);
}(ApplicationConfiguration));
