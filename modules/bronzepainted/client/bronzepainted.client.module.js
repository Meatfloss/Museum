(function (app) {
  'use strict';

  app.registerModule('bronzepainted', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('bronzepainted.admin', ['core.admin']);
  app.registerModule('bronzepainted.admin.routes', ['core.admin.routes']);
  app.registerModule('bronzepainted.services');
  app.registerModule('bronzepainted.routes', ['ui.router', 'core.routes', 'articles.services']);
}(ApplicationConfiguration));
