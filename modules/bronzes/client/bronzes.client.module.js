(function (app) {
  'use strict';

  app.registerModule('bronzes', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('bronzes.admin', ['core.admin']);
  app.registerModule('bronzes.admin.routes', ['core.admin.routes']);
  app.registerModule('bronzes.services');
  app.registerModule('bronzes.routes', ['ui.router', 'core.routes', 'articles.services']);
}(ApplicationConfiguration));
