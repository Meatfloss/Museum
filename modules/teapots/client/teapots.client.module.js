(function (app) {
  'use strict';

  app.registerModule('teapots', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('teapots.admin', ['core.admin']);
  app.registerModule('teapots.admin.routes', ['core.admin.routes']);
  app.registerModule('teapots.services');
  app.registerModule('teapots.routes', ['ui.router', 'core.routes', 'articles.services']);
}(ApplicationConfiguration));
