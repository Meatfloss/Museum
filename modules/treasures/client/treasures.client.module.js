(function (app) {
  'use strict';

  app.registerModule('treasures', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('treasures.admin', ['core.admin']);
  app.registerModule('treasures.admin.routes', ['core.admin.routes']);
  app.registerModule('treasures.services');
  app.registerModule('treasures.routes', ['ui.router', 'core.routes', 'articles.services']);
}(ApplicationConfiguration));
