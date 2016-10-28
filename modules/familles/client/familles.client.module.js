(function (app) {
  'use strict';

  app.registerModule('familles', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('familles.admin', ['core.admin']);
  app.registerModule('familles.admin.routes', ['core.admin.routes']);
  app.registerModule('familles.services');
  app.registerModule('familles.routes', ['ui.router', 'core.routes', 'articles.services']);
}(ApplicationConfiguration));
