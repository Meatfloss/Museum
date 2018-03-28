(function (app) {
  'use strict';

  app.registerModule('qijia', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('qijia.admin', ['core.admin']);
  app.registerModule('qijia.admin.routes', ['core.admin.routes']);
  app.registerModule('qijia.services');
  app.registerModule('qijia.routes', ['ui.router', 'core.routes', 'articles.services']);
}(ApplicationConfiguration));
