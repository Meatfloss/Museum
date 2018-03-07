(function (app) {
  'use strict';

  app.registerModule('jade', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('jade.admin', ['core.admin']);
  app.registerModule('jade.admin.routes', ['core.admin.routes']);
  app.registerModule('jade.services');
  app.registerModule('jade.routes', ['ui.router', 'core.routes', 'articles.services']);
}(ApplicationConfiguration));
