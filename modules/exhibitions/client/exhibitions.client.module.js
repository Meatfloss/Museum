(function (app) {
  'use strict';

  app.registerModule('exhibitions', ['core']);
  app.registerModule('exhibitions.routes', ['ui.router', 'core.routes']);
}(ApplicationConfiguration));
