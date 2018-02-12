(function (app) {
  'use strict';

  app.registerModule('ceramics', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('ceramics.admin', ['core.admin']);
  app.registerModule('ceramics.admin.routes', ['core.admin.routes']);
  app.registerModule('ceramics.services');
  app.registerModule('ceramics.routes', ['ui.router', 'core.routes', 'articles.services']);
}(ApplicationConfiguration));
