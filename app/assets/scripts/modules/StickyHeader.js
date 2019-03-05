import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';
import zenscroll from 'zenscroll';

class StickyHeader {
    constructor() {
        this.lazyLoaded = document.getElementsByClassName('lazyload');
        this.lazyLoadedArr = Array.from(this.lazyLoaded);

        this.pageSections = document.getElementsByClassName('page-section');
        this.pageSectionsArr = Array.from(this.pageSections);

        this.headerLinks = document.getElementsByClassName('site-header__primary-nav')[0].getElementsByTagName('a');
        this.headerLinksArr = Array.from(this.headerLinks);

        this.createPageSectionWaypoints();

        zenscroll.setup(null, 96);
        
        var that = this;
        setTimeout(function () {that.refreshWaypoints();}, 500) ;
    }

    refreshWaypoints() { // When lazy loaded items are loaded, waypoints have to be recalculated
        this.lazyLoadedArr.forEach(function (currentValue) {
            currentValue.onload = Waypoint.refreshAll(); // It refreshes ALL waypoints of the window, even if declared in other modules, so no need to repeat this code anywhere else
        });
    }

    createPageSectionWaypoints() {
        var that = this;
        this.pageSectionsArr.forEach(function (currentValue) {
            new Waypoint({
                element: currentValue,
                handler: function (direction) {
                    if (direction == "down") {
                        var matchingHeaderLink = currentValue.getAttribute("data-matching-link");
                        that.headerLinksArr.forEach(function (currentLink) {
                            currentLink.classList.remove("is-current-link");
                            currentLink.blur();
                        });
                        document.getElementById(matchingHeaderLink).classList.add("is-current-link");
                    }
                },
                offset: 190
            });
            new Waypoint({
                element: currentValue,
                handler: function (direction) {
                    if (direction == "up") {
                        var matchingHeaderLink = currentValue.getAttribute("data-matching-link");
                        that.headerLinksArr.forEach(function (currentValue) {
                            currentValue.classList.remove("is-current-link");
                            currentValue.blur();
                        });
                        document.getElementById(matchingHeaderLink).classList.add("is-current-link");
                    }
                },
                offset: 95
            });
        });
    }
}

export default StickyHeader;