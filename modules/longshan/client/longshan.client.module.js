(function (app) {
  'use strict';

  app.registerModule('longshan', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('longshan.admin', ['core.admin']);
  app.registerModule('longshan.admin.routes', ['core.admin.routes']);
  app.registerModule('longshan.services');
  app.registerModule('longshan.routes', ['ui.router', 'core.routes', 'articles.services']);
}(ApplicationConfiguration));
