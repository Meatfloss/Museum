(function (app) {
  'use strict';

  app.registerModule('crystal', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('crystal.admin', ['core.admin']);
  app.registerModule('crystal.admin.routes', ['core.admin.routes']);
  app.registerModule('crystal.services');
  app.registerModule('crystal.routes', ['ui.router', 'core.routes', 'articles.services']);
}(ApplicationConfiguration));
