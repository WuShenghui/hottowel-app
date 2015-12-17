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

        activate();

        function activate() { getNavRoutes(); }

        function getNavRoutes() {
            states.filter(function(r) {
                if (r.settings) {
                    if (r.settings.menuGroup) {
                        var length = vm.navRoutes.menuGroups.length;
                        var menuName = '';
                        for (var i = 0; i < length; i++) {
                            menuName = vm.navRoutes.menuGroups[i].name;
                            if (menuName && menuName === r.settings.menuGroup) {
                                var newMenu = menuService.newMenuGroupItem(r);
                                vm.navRoutes.menuGroups[i].menus.push(newMenu);
                                return;
                            }
                        }
                        vm.navRoutes.menuGroups.push(menuService.newMenuGroups(r));
                    } else {
                        vm.navRoutes.menuGroups.push(menuService.newMenu(r));
                    }

                    vm.navRoutes.menuGroups.sort(menuService.sortByType);
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
