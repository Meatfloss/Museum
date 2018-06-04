(function (app) {
  'use strict';

  app.registerModule('lacquer', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('lacquer.admin', ['core.admin']);
  app.registerModule('lacquer.admin.routes', ['core.admin.routes']);
  app.registerModule('lacquer.services');
  app.registerModule('lacquer.routes', ['ui.router', 'core.routes', 'articles.services']);
}(ApplicationConfiguration));
