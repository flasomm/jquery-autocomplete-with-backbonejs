(function() {
   'use strict';

   // Require.js allows us to configure shortcut alias
   require.config({
      paths: {
         jquery: 'vendor/jquery-1.9.1.min',
         underscore: 'vendor/underscore-min',
         backbone: 'vendor/backbone-min',
         autocomplete: 'vendor/jquery.backbone.widgets',
         text: 'vendor/text'
      },
      // The shim config allows us to configure dependencies for
      // scripts that do not call define() to register a module
      shim: {
         jquery: {
            exports: "$"
         },
         underscore: {
            exports: '_'
         },
         backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
         },
         autocomplete: {
            deps: ['jquery'],
            exports: 'autocomplete'
         }
      }
   });

   require([
      'backbone', 
      'app/city_view',
      'app/city_model',
      'autocomplete'
   ], function(Backbone, CityView, City) {
      // init app
      var cityView = new CityView({model: new City()});
      Backbone.history.start();
   });

}());
