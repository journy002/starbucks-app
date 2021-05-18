// header 상단 input 기능 구현
const searchEl = document.querySelector('.search');
const searchForm = document.querySelector('.search-form');
const searchInputEl = searchEl.querySelector('input');

searchEl.addEventListener('click', function() {
    searchInputEl.focus();
});

searchInputEl.addEventListener('focus', function() {
    searchEl.classList.add('focused');
    searchInputEl.setAttribute('placeholder', '통합검색');
});

searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    searchInputEl.value = '';
    console.log('submit');
});

// input에 focus가 해제되면 placeholder 제거를 위해 'blur'설정
searchInputEl.addEventListener('blur', function() {
    searchEl.classList.remove('focused');
    searchInputEl.setAttribute('placeholder', '');
});

// scroll시 배지 나타나고 사라지게 하기
const badgeEl = document.querySelector('header .badges');
// 스크롤시 함수 수십개가 실행되는데
// lodash에서 제공하는 throttle() 기능을 이용하여 300(0.3초)부하를 시켜 부하를 막는다
// throttle()은 scroll 사용시 매우 빈번하게 사용됨.
// _.throttle(함수,시간)
window.addEventListener('scroll', _.throttle(function(){
    if(window.scrollY > 500) {
        // 배지 숨기기
        // gsap.to(요소, 지속시간, 옵션);
        gsap.to(badgeEl, .6, {
            display: 'none',
            opacity: 0
        });
    } else {
        // 배지 보이기
        gsap.to(badgeEl, .6, {
            display: 'block',
            opacity: 1
        })
    }
},300));


// visual image,text 순차적으로 나타나게 만들기
const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function(fadeEl, index) {
    // gsap.to(요소, 지속시간, 옵션);
    gsap.to(fadeEl, 1, {
        delay: (index + 1) * .7, // 0.7 1.4 2.1 2.8
        opacity: 1,
    });
});

// new Swiper(선택자, 옵션)
new Swiper('.notice-line .swiper-container', {
    direction: 'vertical',
    autoplay: true,
    loop: false
});

new Swiper('.promotion .swiper-container', {
    slidesPerView : 3, // 한번에 보여줄 슬라이드 개수
    spaceBetween: 10, // 슬라이드 사이 여백
    centeredSlides: true, // 첫번째 슬아이드가 가운데서 보이기
    loop:true, // 반복재생
    autoplay: {
        delay: 5000
    },
    pagination: {
        el: '.promotion .swiper-pagination', // 페이지 번호 요소 선택자
        clickable: true, // 사용자의 페이지 번호 요소 제어 가능 여부
    },
    navigation: {
        prevEl: '.promotion .swiper-prev',
        nextEl: '.promotion .swiper-next'
    }
});

const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false // 처음엔 화면에 잘보이기 때문에 false로 지정

promotionToggleBtn.addEventListener('click', function() {
    isHidePromotion = !isHidePromotion // !isHidePromotion: true
    if(isHidePromotion) {
        //숨김 처리
        promotionEl.classList.add('hide');
    } else {
        // 보임 처리
        promotionEl.classList.remove('hide');
    }
});

// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
    // `.toFixed()`를 통해 반환된 문자 데이터를,
    // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
    return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

// img 둥둥 뜨는 애니매이션 만들기
function floatingObject(selector, delay, size) {
    gsap.to(
        selector, // 선택자
        random(1.5, 2.5), // 애니매이션 동작 시간
        { // 옵션
        y: 20,
        repeat: -1, // 무한
        yoyo: true, // 애니매이션이 한번 진행되고 다시 돌아오는 옵션
        ease: Power1.easeInOut,
        delay: random(0, delay)
    });
};

floatingObject('.floating1', 1, 15); // css 선택자 선택
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);


const spyEls = document.querySelectorAll('.section.scroll-spy');
spyEls.forEach(function(spyEl) {
    new ScrollMagic
        .Scene({
            triggerElement: spyEl,
            triggerHook: .8, // javascript가 뷰포트 0.8부분에서 setClassToggle을 실행 시켜주기위해 hook을 걸어준다
        })
        .setClassToggle()
        .addTo();
});