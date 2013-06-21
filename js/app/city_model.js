define([
   'backbone'
], function(Backbone) {
   'use strict';

   var City = Backbone.Model.extend({
      idAttribute: "id",

      defaults: {
         label: '',
         value: '',
         infos: ''
      },

      label: function () {
         return this.get("label");
      },
      value: function () {
         return this.get("id");
      },
      infos: function () {
         return this.get("infos");
      }      
   });

   return City;

});

