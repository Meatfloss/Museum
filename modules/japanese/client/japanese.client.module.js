(function (app) {
  'use strict';

  app.registerModule('japanese', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('japanese.admin', ['core.admin']);
  app.registerModule('japanese.admin.routes', ['core.admin.routes']);
  app.registerModule('japanese.services');
  app.registerModule('japanese.routes', ['ui.router', 'core.routes', 'articles.services']);
}(ApplicationConfiguration));
