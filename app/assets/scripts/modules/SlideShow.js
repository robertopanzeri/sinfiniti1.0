import Swiper from 'swiper';

class SlideShow {
    constructor() {
        this.sliderContainer = document.getElementsByClassName('swiper-container');
        this.activateSlider();
    }
    activateSlider() {
        var mySwiper = new Swiper(this.sliderContainer, {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
    }
}

export default SlideShow;