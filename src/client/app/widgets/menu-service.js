(function () {
  'use strict';

  angular
    .module('app.widgets')
    .factory('menuService', menuService);

  menuService.$inject = ['$location']
  function menuService ($location) {
    var service = {
      menuGroups: getMenuGroups(),
      newMenu: newMenu,
      newMenuGroups: newMenuGroups,
      newMenuGroupItem: newMenuGroupItem,
      toggleSelectMenuGroup: toggleSelectMenuGroup,
      isMenuGroupSelected: isMenuGroupSelected,
      selectPage: selectPage
    };

  return service;

  // //////////////

  function getMenuGroups () {
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
     menus:[
         {
             name: navRoute.title,
             nav: navRoute.nav,
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
     nav: navRoute.nav,
     state: navRoute.settings.state,
     icon: navRoute.settings.icon,
     type: navRoute.settings.type
   };
 }

  function toggleSelectMenuGroup (menuGroup) {
    self.openedMenuGroup = (self.openedMenuGroup === menuGroup ? null : menuGroup);
  }

  function isMenuGroupSelected (menuGroup) {
    return self.openedMenuGroup === menuGroup;
  }

  function selectPage (menuGroup, page) {
    page && page.url && $location.path(page.url);
    self.currentMenuGroup = menuGroup;
    self.currentPage = page;
  }

  function sortByHumanName (a, b) {
    return (a.humanName < b.humanName) ? -1 :
      (a.humanName > b.humanName) ? 1 : 0;
  }
  
  }
})();
