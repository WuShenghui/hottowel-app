(function() {
  'use strict';

  angular
    .module('app.widgets')
    .run(templateCache)
    .directive('menuLink', menuLink);

  templateCache.$inject = ['$templateCache'];
  
  function templateCache($templateCache) {
    $templateCache.put('partials/menu-link.tmpl.html',
        '<md-button ng-class="{\'{{menu.icon}}\' : true}" \n' +
        '  ui-sref-active="active" ui-sref="{{menu.state}}" ng-click="focusMenu()">\n' +
        '  {{menu | humanizeDoc}}\n' +
        '  <span class="md-visually-hidden "\n' +
        '    ng-if="isSelected()">\n' +
        '    current page\n' +
        '  </span>\n' +
        '</md-button>\n' +
        '');
  }
  
  function menuLink() {
      // Usage:
      //
      // Creates:
      //
      var directive = {
          templateUrl: 'partials/menu-link.tmpl.html',
          link: link,
          scope: {
            menu: '='
          }
      };
      return directive;
      
      function link(scope, element, attrs) {
          var controller = element.parent().controller();
  
          scope.focusMenu = function () {
          // set flag to be used later when
          // $locationChangeSuccess calls openPage()
          controller.autoFocusContent = true;
      }
    }
  }

})();