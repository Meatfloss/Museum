(function (app) {
  'use strict';

  app.registerModule('paintings', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('paintings.admin', ['core.admin']);
  app.registerModule('paintings.admin.routes', ['core.admin.routes']);
  app.registerModule('paintings.services');
  app.registerModule('paintings.routes', ['ui.router', 'core.routes', 'articles.services']);
}(ApplicationConfiguration));
