(function (app) {
  'use strict';

  app.registerModule('about', ['core']);
  app.registerModule('about.routes', ['ui.router', 'core.routes']);
}(ApplicationConfiguration));
