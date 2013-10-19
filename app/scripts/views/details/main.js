define([
  'app'
], function(
  app
) {
  'use strict';

  var Details = Backbone.View.extend({
    className: 'details-view',
    template: app.fetchTemplate('details/main'),

    events: {},

    render: function() {
      this.model.set('phone', '123891283123');
      this.model.set('address', 'Slavka Krautzeka 40 Rijeka');
      this.model.set('description', 'Blaksdj aklsd alksdm aklsdm aksdm aklsdm as,d amskld asmnd ');
      this.model.set('working_hours', {
        "start": [0, 0, 0, 0, 0, 0, 0],
        "end": [24, 24, 24, 24, 24, 24, 24]
      });
      this.$el.html(this.template({
        item: this.model.toJSON()
      }));
      this.$('.gallery').scooch();
      return this;
    }

  });

  return Details;
});