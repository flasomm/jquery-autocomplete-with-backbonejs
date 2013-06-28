define([           
   'backbone',   
   'app/city_model'
], function(Backbone, City) {
   'use strict';

   var CitiesCollection = Backbone.Collection.extend({
      model: City,
      url: "http://api.geonames.org/searchJSON",
                     
		initialize: function () {},

      // override backbone synch to force a jsonp call
      sync: function(method, model, options) {
         var params = _.extend({
            url: this.url,
            type: 'GET',
            dataType: 'jsonp',
            data: {
               featureClass: "P",                 
               style: "full",
               maxRows: 15,
               name_startsWith: $('input[name=city]').val(),
               username: "physalix"
            }
         }, options);

         return $.ajax(params);
      },

      parse: function(response) {
         var city = {};  
         var self = this;
         
         $.map(response.geonames, function(item) {
            city.id              = item.geonameId;
            city.name            = item.name;
            city.region          = item.adminName1;
            city.country         = item.countryName;
            city.continentCode   = item.continentCode;
            city.geonameId       = item.geonameId;
            city.countryCode     = item.countryCode;
            city.latitude        = item.lat;
            city.longitude       = item.lng;
            city.population      = item.population;
            city.population      = item.population;
            city.timezone        = item.timezone.timeZoneId;
            city.timezone_dst    = item.timezone.dstOffset;
            city.timezone_gmt    = item.timezone.timezone_gmt;
            city.label           = item.name + (item.adminName1 ? ", " + item.adminName1 : "") + ", " + item.countryName;
            city.infos           = "{\"continent_code\": \"" + item.continentCode + "\", \"country_code\": \"" + item.countryCode + "\", \"country_name\": \"" + item.countryName + "\", \"region\": \"" + item.adminName1 + "\", \"latitude\": " + item.lat + ", \"longitude\": " + item.lng + ", \"name\": \"" + item.name + "\", \"lower_name\": \"" + item.name.toLowerCase() + "\", \"population\": " + item.population + ", \"timezone\": \"" + item.timezone.timeZoneId + "\", \"timezone_dst\": " + item.timezone.dstOffset + ", \"timezone_gmt\": " + item.timezone.gmtOffset + ", \"geonameid\": \"" + item.geonameId + "\" }";

            self.push(city);
         });
                              
         return this.models;
      }

   });

   return CitiesCollection;


});
