define([
   'app/cities_collection',
   'text!app/cities.html'
], function(CitiesCollection, citiesTpl) {
   'use strict';

   var CityView = Backbone.View.extend({
      el: '#page',
      template: _.template(citiesTpl),

      events: {
         'focus #c2_city':    'citiesAutocomplete',
         'keydown #c2_city':  'invokefetch'
      },

      initialize: function() {
         this.citiesCollection = new CitiesCollection();
         this.render();
      },

      render: function() {
         this.$el.html(this.template(this.model.toJSON()));
         return this;
      },

      invokefetch : function() {
         this.citiesCollection.fetch();
         $("#c2_city").unbind( "keydown", this.invokefetch);
      },

      citiesAutocomplete: function () {
         var self = this;

      	$('#c2_city').autocomplete({
      		collection: self.citiesCollection,
      		attr: 'label',
      		noCase: true,
      		onselect: self.autocompleteSelect,
      		ul_class: 'autocomplete shadow',
      		ul_css: {'z-index':1234},
      		max_results: 15
      	});
      },

      autocompleteSelect: function(model) {
         $('#c2_city').val(model.label());
         $('#c2_cityinfos').val(model.infos());
      }

   });

   return CityView;
});
