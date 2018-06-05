(function (app) {
  'use strict';

  app.registerModule('fourtreasure', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('fourtreasure.admin', ['core.admin']);
  app.registerModule('fourtreasure.admin.routes', ['core.admin.routes']);
  app.registerModule('fourtreasure.services');
  app.registerModule('fourtreasure.routes', ['ui.router', 'core.routes', 'articles.services']);
}(ApplicationConfiguration));
