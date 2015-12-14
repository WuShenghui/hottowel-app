(function() {
  'use strict';

  angular
    .module('app.widgets')
    .run(templateCache)
    .config(config)
    .directive('menuToggle', menuToggle);

  config.$inject = ['$mdThemingProvider'];
  templateCache.$inject = ['$templateCache'];
  menuToggle.$inject = ['$timeout'];
  
  function templateCache($templateCache) {
    $templateCache.put('partials/menu-toggle.tmpl.html',
        '<md-button class="md-button-toggle" ng-class="{\'toggled\' : isOpen()}"\n' +
        '  ng-click="toggle()"\n' +
        '  aria-controls="docs-menu-{{menu.name | nospace}}"\n' +
        '  flex layout="row"\n' +
        '  aria-expanded="{{isOpen()}}">\n' +
        '  {{menu.name}}\n' +
        '  <md-icon md-font-set="fa fa-chevron-down" class="md-toggle-icon" ng-class="{\'toggled\' : isOpen()}"></md-icon>' +
        '</md-button>\n' +
        '<ul ng-show="isOpen()" id="docs-menu-{{menu.name | nospace}}" class="menu-toggle-list">\n' +
        '  <li ng-repeat="page in menu.menus">\n' +
        '    <menu-link menu="page"></menu-link>\n' +
        '  </li>\n' +
        '</ul>\n' +
        '');
  }
  
  function config($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('light-blue', {
          'default': '300'
        })
        .accentPalette('deep-orange', {
          'default': '500'
        });
  }
  
  function menuToggle($timeout) {
    // Usage:
    //
    // Creates:
    //
    var directive = {
        templateUrl: 'partials/menu-toggle.tmpl.html',
        link: link,
        scope: {
          menu: '='
        }
    };
    return directive;
    
    function link(scope, element, attrs) {
        var controller = element.parent().controller();

          scope.isOpen = function () {
            return controller.isOpen(scope.menu);
          };
          scope.toggle = function () {
            controller.toggleOpen(scope.menu);
          };
          
          var parentNode = element[0].parentNode.parentNode.parentNode;
          if (parentNode.classList.contains('parent-list-item')) {
            var heading = parentNode.querySelector('h2');
            element[0].firstChild.setAttribute('aria-describedby', heading.id);
          }
    }
  }
})();