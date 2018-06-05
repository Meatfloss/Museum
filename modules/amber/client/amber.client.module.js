(function (app) {
  'use strict';

  app.registerModule('amber', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('amber.admin', ['core.admin']);
  app.registerModule('amber.admin.routes', ['core.admin.routes']);
  app.registerModule('amber.services');
  app.registerModule('amber.routes', ['ui.router', 'core.routes', 'articles.services']);
}(ApplicationConfiguration));
