const iconMenu = document.getElementById('icon-menu');
const mainMenu = document.getElementById('main-menu');

iconMenu.addEventListener('click', ()=>mainMenu.classList.toggle('menu--show'));

function redirigir() {
    window.location.href = "./servicios/servicios.html";
}

function Vercompra(){
    window.location.href = "./productos.html"
}