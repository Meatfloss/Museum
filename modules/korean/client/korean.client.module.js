(function (app) {
  'use strict';

  app.registerModule('korean', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('korean.admin', ['core.admin']);
  app.registerModule('korean.admin.routes', ['core.admin.routes']);
  app.registerModule('korean.services');
  app.registerModule('korean.routes', ['ui.router', 'core.routes', 'articles.services']);
}(ApplicationConfiguration));
