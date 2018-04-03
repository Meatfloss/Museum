(function (app) {
  'use strict';

  app.registerModule('sword', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('sword.admin', ['core.admin']);
  app.registerModule('sword.admin.routes', ['core.admin.routes']);
  app.registerModule('sword.services');
  app.registerModule('sword.routes', ['ui.router', 'core.routes', 'articles.services']);
}(ApplicationConfiguration));
