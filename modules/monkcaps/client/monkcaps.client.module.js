
(function (app) {
  'use strict';

  app.registerModule('monkcaps', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('monkcaps.admin', ['core.admin']);
  app.registerModule('monkcaps.admin.routes', ['core.admin.routes']);
  app.registerModule('monkcaps.services');
  app.registerModule('monkcaps.routes', ['ui.router', 'core.routes', 'articles.services']);
}(ApplicationConfiguration));
