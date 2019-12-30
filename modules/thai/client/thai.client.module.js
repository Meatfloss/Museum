(function (app) {
  'use strict';

  app.registerModule('thai', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('thai.admin', ['core.admin']);
  app.registerModule('thai.admin.routes', ['core.admin.routes']);
  app.registerModule('thai.services');
  app.registerModule('thai.routes', ['ui.router', 'core.routes', 'articles.services']);
}(ApplicationConfiguration));
