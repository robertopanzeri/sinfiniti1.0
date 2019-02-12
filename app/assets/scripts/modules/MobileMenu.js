class MobileMenu {
    constructor() {
       // selecting from the DOM
       this.menuIcon = document.getElementsByClassName('site-header__menu-icon');
       this.primaryNav = document.getElementsByClassName('site-header__primary-nav');
       // activating events handler
       this.events();
    }

    events() { //events handling
        this.menuIcon[0].onclick = this.toggleMenu.bind(this);
    }

    toggleMenu () { // defining functionality
        this.primaryNav[0].classList.toggle('site-header__primary-nav--is-visible');
        this.menuIcon[0].classList.toggle('site-header__menu-icon--close-x');
    }
}

export default MobileMenu;