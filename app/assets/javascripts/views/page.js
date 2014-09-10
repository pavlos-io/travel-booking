define([
  'jquery',
  'underscore',
  'backbone'
],
function($, _, Backbone) {

  var $doc = $(document),
    $win = $(window);

  var getPointerEvent = function(event) {
    return event.originalEvent.targetTouches ? event.originalEvent.targetTouches[0] : event;
  };

  var PageView = Backbone.View.extend({

    events: {
      'click a[rel="external"]': 'openExternalWindow'
    },

    initialize: function() {
      this.initSubViews();
    },


    /*
      Initialize sub-views which are read via
      a 'data-controller' attribute on an element.
      Typically in this application this will always be
      on div#main
    */
    initSubViews: function() {
      var that = this;
      $('[data-controller]').each(function() {
        var controller = $(this).data('controller');
        var viewPath = 'views/' + controller;
        var el = $(this);
        require([viewPath], function(View) {
          var view = new View({el: el});
        });
      });
    },


  //-----------------------------------------------------------------------------

    openExternalWindow: function(e) {
      window.open($(e.currentTarget).attr('href'));
      e.preventDefault();
    }

  });


  return PageView;

});
