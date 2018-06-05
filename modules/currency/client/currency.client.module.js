(function (app) {
  'use strict';

  app.registerModule('currency', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('currency.admin', ['core.admin']);
  app.registerModule('currency.admin.routes', ['core.admin.routes']);
  app.registerModule('currency.services');
  app.registerModule('currency.routes', ['ui.router', 'core.routes', 'articles.services']);
}(ApplicationConfiguration));
