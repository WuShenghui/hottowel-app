(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('SidebarController', SidebarController);

    SidebarController.$inject = ['$state', 'routerHelper', 'menuService'];
    /* @ngInject */
    function SidebarController($state, routerHelper, menuService) {
        var vm = this;
        var states = routerHelper.getStates();
        vm.isCurrent = isCurrent;
        
        vm.navRoutes = menuService;
        vm.isOpen = isOpen;
        vm.toggleOpen = toggleOpen;
        vm.autoFocusContent = false;

        vm.status = {
          isFirstOpen: true,
          isFirstDisabled: false
        };

        activate();

        function activate() { getNavRoutes(); }

        function getNavRoutes() {
            states.filter(function(r) {
                if (r.settings) {
                    if (r.settings.menuGroup) {
                        var length = vm.navRoutes.menuGroups.length;
                        for (var index = 0; index < length; index++) {
                            if (vm.navRoutes.menuGroups[index].name && vm.navRoutes.menuGroups[index].name == r.settings.menuGroup) {
                                vm.navRoutes.menuGroups[index].menus.push(menuService.newMenuGroupItem(r));
                                return;
                            }
                        }                        
                        vm.navRoutes.menuGroups.push(menuService.newMenuGroups(r));                                                   
                    } else {
                        vm.navRoutes.menuGroups.push(menuService.newMenu(r));
                    }
                }       
            });
        }

        function isCurrent(route) {
            if (!route.title || !$state.current || !$state.current.title) {
                return '';
            }
            var menuName = route.title;
            return $state.current.title.substr(0, menuName.length) === menuName ? 'current' : '';
        }

        function isOpen(menuGroup) {
          return menuService.isMenuGroupSelected(menuGroup);
        }

        function toggleOpen(menuGroup) {
          menuService.toggleSelectMenuGroup(menuGroup);
        }
    }
})();
