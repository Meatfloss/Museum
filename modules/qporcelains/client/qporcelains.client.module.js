(function (app) {
  'use strict';

  app.registerModule('qporcelains', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('qporcelains.admin', ['core.admin']);
  app.registerModule('qporcelains.admin.routes', ['core.admin.routes']);
  app.registerModule('qporcelains.services');
  app.registerModule('qporcelains.routes', ['ui.router', 'core.routes', 'articles.services']);
}(ApplicationConfiguration));
