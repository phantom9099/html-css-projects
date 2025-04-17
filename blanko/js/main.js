const header = document.querySelector(".header");
const nav = document.querySelector(".nav");
const burger = document.querySelector(".burger");
const navLink = document.querySelectorAll(".nav__link");


burger.addEventListener("click", function() {
    burger.classList.toggle("burger_active");
    nav.classList.toggle("nav_active");
    if (burger.classList.contains("burger_active")) {
        navLink.forEach(el => {
            el.addEventListener("click", function() {
                burger.classList.remove("burger_active");
                nav.classList.remove("nav_active");
                enableScroll();
            })
        });
        header.classList.add("header_active")
        nav.style.paddingTop = header.offsetHeight + "px";
        disableScroll();
    } else {
        nav.style.paddingTop = "";
        setTimeout(() => {}, 300);
        header.classList.remove("header_active");
        enableScroll();
    }
});


const disableScroll = () => {
    const fixBlocks = document ? .querySelectorAll('.fixed-block');
    const pagePosition = window.scrollY;
    const paddingOffset = `${(window.innerWidth - document.body.offsetWidth)
        }px`;

    document.documentElement.style.scrollBehavior = 'none';
    fixBlocks.forEach(el => {
        el.style.paddingRight = paddingOffset;
    });
    document.body.style.paddingRight = paddingOffset;
    document.body.classList.add('dis-scroll');
    document.body.dataset.position = pagePosition;
    document.body.style.top = `-${pagePosition} px`;
}

const enableScroll = () => {
    const fixBlocks = document ? .querySelectorAll('.fixed-block');
    const pagePosition = parseInt(document.body.dataset.position, 10);
    fixBlocks.forEach(el => {
        el.style.paddingRight = '0px';
    });
    document.body.style.paddingRight = '0px';

    document.body.style.top = 'auto';
    document.body.classList.remove('dis-scroll');
    window.scroll({
        top: pagePosition,
        left: 0
    });
    document.body.removeAttribute('data-position');
}


const mediaQueryMinWidth_992 = window.matchMedia('(min-width: 992px)');
mediaQueryMinWidth_992.addEventListener("change", (e) => {
    if (e.matches) {
        nav.style.paddingTop = "";
        enableScroll()
        return true;
    } else {
        if (burger.classList.contains("burger_active")) {
            disableScroll()
        }
        nav.style.paddingTop = header.offsetHeight + "px";
    }
    return false;
});

const swiper = new Swiper('.druk__slider', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});