class MobileMenu {
    constructor() {
       // selecting from the DOM
       this.menuIcon = document.getElementsByClassName('site-header__menu-icon');
       this.primaryNav = document.getElementsByClassName('site-header__primary-nav');
       this.primaryNavLink = this.primaryNav[0].getElementsByTagName('a');
       this.primaryNavLinkArr = Array.from(this.primaryNavLink);
       this.menuModal = document.getElementsByClassName('site-header__menu-modal');
       // activating events handler
       this.events();
    }

    events() { //events handling
        var that = this;
        this.menuIcon[0].onclick = this.toggleMenu.bind(this);
        this.primaryNavLinkArr.forEach(function(currentValue){
            currentValue.onclick = that.toggleMenu.bind(that);
        });
    }

    toggleMenu () { // defining functionality
        this.primaryNav[0].classList.toggle('site-header__primary-nav--is-visible');
        this.menuIcon[0].classList.toggle('site-header__menu-icon--close-x');
        this.menuModal[0].classList.toggle('site-header__menu-modal--is-visible');
    }
}

export default MobileMenu;