(function (app) {
  'use strict';

  app.registerModule('sculpture', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('sculpture.admin', ['core.admin']);
  app.registerModule('sculpture.admin.routes', ['core.admin.routes']);
  app.registerModule('sculpture.services');
  app.registerModule('sculpture.routes', ['ui.router', 'core.routes', 'articles.services']);
}(ApplicationConfiguration));
