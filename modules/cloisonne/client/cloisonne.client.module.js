(function (app) {
  'use strict';

  app.registerModule('cloisonne', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('cloisonne.admin', ['core.admin']);
  app.registerModule('cloisonne.admin.routes', ['core.admin.routes']);
  app.registerModule('cloisonne.services');
  app.registerModule('cloisonne.routes', ['ui.router', 'core.routes', 'articles.services']);
}(ApplicationConfiguration));
