(function (app) {
  'use strict';

  app.registerModule('enamels', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('enamels.admin', ['core.admin']);
  app.registerModule('enamels.admin.routes', ['core.admin.routes']);
  app.registerModule('enamels.services');
  app.registerModule('enamels.routes', ['ui.router', 'core.routes', 'articles.services']);
}(ApplicationConfiguration));
