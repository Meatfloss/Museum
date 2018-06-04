(function (app) {
  'use strict';

  app.registerModule('goldsilver', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('goldsilver.admin', ['core.admin']);
  app.registerModule('goldsilver.admin.routes', ['core.admin.routes']);
  app.registerModule('goldsilver.services');
  app.registerModule('goldsilver.routes', ['ui.router', 'core.routes', 'articles.services']);
}(ApplicationConfiguration));
