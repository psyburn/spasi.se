define([
  'app'
], function(
  app
) {
  'use strict';

  var ReportView = Backbone.View.extend({
    className: 'report-view',
    template: app.fetchTemplate('report/main'),
    events: {
      'click .btn-send': 'onButtonSendClick'
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    onButtonSendClick: function() {
      var text = this.$('.text-report').html();
      console.log(text);
    }

  });

  return ReportView;
});