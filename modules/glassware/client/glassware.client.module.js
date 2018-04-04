(function (app) {
  'use strict';

  app.registerModule('glassware', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('glassware.admin', ['core.admin']);
  app.registerModule('glassware.admin.routes', ['core.admin.routes']);
  app.registerModule('glassware.services');
  app.registerModule('glassware.routes', ['ui.router', 'core.routes', 'articles.services']);
}(ApplicationConfiguration));
