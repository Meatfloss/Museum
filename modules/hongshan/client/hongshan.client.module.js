(function (app) {
  'use strict';

  app.registerModule('hongshan', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('hongshan.admin', ['core.admin']);
  app.registerModule('hongshan.admin.routes', ['core.admin.routes']);
  app.registerModule('hongshan.services');
  app.registerModule('hongshan.routes', ['ui.router', 'core.routes', 'articles.services']);
}(ApplicationConfiguration));
