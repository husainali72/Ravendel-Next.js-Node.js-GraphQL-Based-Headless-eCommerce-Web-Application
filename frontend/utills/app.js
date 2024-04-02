/* eslint-disable no-undef */
export function OpenNav() {
   var open = document.getElementById('openNav');
   var menu = document.getElementById('navigation');
   var close = document.getElementById('closeNav');
   var list = document.getElementById('list');
   open.style.display = "none";
   menu.style.width = "50%";
   menu.style.height = "100vh";
   close.style.display = "block";
   close.style.right = "40px";
   list.classList.add('list');
}
export function CloseNav() {
   var open = document.getElementById('openNav');
   var menu = document.getElementById('navigation');
   var close = document.getElementById('closeNav');
   open.style.display = "block";
   menu.style.width = "0";
   menu.style.height = "0";
   close.style.display = "block";
   close.style.right = "-100px";
   list.classList.remove('list');
}
export function OpenMenu() {
   var up = document.getElementById('menuUp');
   var down = document.getElementById('menuDown');
   var menu = document.getElementById('item-menu');
   up.style.display = "block";
   down.style.display = "none";
   menu.style.height = "auto";
   menu.style.padding = "20px 30px";
}
export function CloseMenu() {
   var up = document.getElementById('menuUp');
   var down = document.getElementById('menuDown');
   var menu = document.getElementById('item-menu');
   up.style.display = "none";
   down.style.display = "block";
   menu.style.height = "0";
   menu.style.padding = "0px 30px";
}
export function OpenSortMenu() {
   var up = document.getElementById('menuUp2');
   var down = document.getElementById('menuDown2');
   var menu = document.getElementById('sort-menu');
   up.style.display = "block";
   down.style.display = "none";
   menu.style.height = "auto";
   menu.style.padding = "20px 15px";
}
export function CloseSortMenu() {
   var up = document.getElementById('menuUp2');
   var down = document.getElementById('menuDown2');
   var menu = document.getElementById('sort-menu');
   up.style.display = "none";
   down.style.display = "block";
   menu.style.height = "0";
   menu.style.padding = "0px 30px";
}
