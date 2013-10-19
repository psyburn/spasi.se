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
      'click .btn-send': 'onButtonSendClick',
      'click .btn-close': 'onButtonCloseClick'
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    onButtonSendClick: function() {
      var text = this.$('.text-report').val();
      this.trigger('report:add', this.model, text);
    },

    sent: function() {
      this.$('.btn-send').hide();
      this.$('.sent').show();
    },

    onButtonCloseClick: function() {
      app.hideActiveView();
    }

  });

  return ReportView;
});
