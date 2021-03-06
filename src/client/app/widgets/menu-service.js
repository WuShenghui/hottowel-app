(function () {
    'use strict';

    angular
      .module('app.widgets')
      .factory('menuService', menuService);

    menuService.$inject = ['$location'];
    function menuService($location) {
        var self = window;
        var service = {
            menuGroups: getMenuGroups(),
            newMenu: newMenu,
            newMenuGroups: newMenuGroups,
            newMenuGroupItem: newMenuGroupItem,
            refreshMenuStatus: refreshMenuStatus,
            sortByName: sortByName,
            sortByType: sortByType,
            toggleSelectMenuGroup: toggleSelectMenuGroup,
            isMenuGroupSelected: isMenuGroupSelected
        };

        return service;

        // //////////////

        function getMenuGroups() {
            var menuGroups = [];

            return menuGroups;
        }

        function newMenu(navRoute) {
            return newMenuGroupItem(navRoute);
        }

        function newMenuGroups(navRoute) {
            return {
                name: navRoute.settings.menuGroup || navRoute.title,
                type: 'toggle',
                menus: [
                  {
                      name: navRoute.title,
                      nav: navRoute.settings.nav,
                      state: navRoute.settings.state,
                      icon: navRoute.settings.icon,
                      type: navRoute.settings.type
                  }
                ]
            };
        }

        function newMenuGroupItem(navRoute) {
            return {
                name: navRoute.title,
                nav: navRoute.settings.nav,
                state: navRoute.settings.state,
                icon: navRoute.settings.icon,
                type: navRoute.settings.type
            };
        }

        function toggleSelectMenuGroup(menuGroup, isRefresh) {
            self.openedMenuGroup = (self.openedMenuGroup === menuGroup && !isRefresh ?
                                    null :
                                    menuGroup);
        }

        function isMenuGroupSelected(menuGroup) {
            return self.openedMenuGroup === menuGroup;
        }

        function refreshMenuStatus(state) {
            if (state && state.settings && state.settings.menuGroup) {
                for (var index = 0; index < service.menuGroups.length; index++) {
                    if (state.settings.menuGroup === service.menuGroups[index].name) {
                        toggleSelectMenuGroup(service.menuGroups[index], true);
                        return;
                    }
                }

                toggleSelectMenuGroup(null);
            }
        }

        function sortByType(a, b) {
            return a.type === 'link' || b.type === 'link' ? 1 : 0;
        }

        function sortByName(a, b) {
            return (a.name < b.name) ? -1 :
              (a.name > b.name) ? 1 : 0;
        }

    }
})();
