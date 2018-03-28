'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Mporcelains Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/mporcelains',
      permissions: '*'
    }, {
      resources: '/api/mporcelains/:dynasty/:category',
      permissions: ['get']
    }, {
      resources: '/api/mporcelains/:mporcelainsId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/mporcelains',
      permissions: ['get']
    }, {
      resources: '/api/mporcelains/:dynasty/:category',
      permissions: ['get']
    }, {
      resources: '/api/mporcelains/:mporcelainsId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/mporcelains',
      permissions: ['get']
    }, {
      resources: '/api/mporcelains/:dynasty/:category',
      permissions: ['get']
    }, {
      resources: '/api/mporcelains/:mporcelainsId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Mporcelains Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an paint is being processed and the current user created it then allow any manipulation
  if (req.mporcelains && req.user && req.mporcelains.user && req.mporcelains.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
