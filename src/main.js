'use strict';

// ✅ Header에 페이지 아래로 스크롤 시 다크 스타일링 적용

// getBoundingClientRect() 대신 offsetHeight 사용 가능. 단 offsetHeight은 소수점까지는 높이를 알려주지 않음

/* 풀어서 쓴 것
const headerRect = header.getBoundingClientRect();
console.log(headerRect);
const headerHeight = headerRect.height; */

const header = document.querySelector('.header');
const headerHeight = header.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
  if (window.scrollY > headerHeight) {
    header.classList.add('header--dark');
  } else {
    header.classList.remove('header--dark');
  }
});

/* ---------------------------------------------------- */

// ✅ Home 섹션을 아래로 스크롤 시 투명하게 처리함
// y가 0일때는 opacity 1 , y가 홈화면 높이에 완전히 닿았을때는 opacity 0
// 홈화면 높이 구하기

const home = document.querySelector('.home__container');
const homeHeight = home.offsetHeight;
// const homeHeight = home.getBoundingClientRect().height;

// 인라인 스타일을 이용해서 직접적으로 opacity 설정
// 왜냐면, 스크롤되는 순간마다 정밀하게 opacity값을 설정해야했기 때문에
document.addEventListener('scroll', () => {
  console.log(1 - window.scrollY / homeHeight);
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

/* ---------------------------------------------------- */

const arrowUp = document.querySelector('.arrow-up');

// ✅ Arrow up버튼을 아래로 스크롤 시 투명하게 처리함
// 홈이 절반정도 내려가면 위 버튼이 생기고 다시 스크롤 올리면 버튼 사라짐)

// 요소에 class를 추가하고 제거하면서 스타일링 변화 (좀 더 많은 걸 해야하면 class로)
/* document.addEventListener('scroll', () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUp.classList.add('arrow-up__on');
  } else {
    arrowUp.classList.remove('arrow-up__on');
  }
}); */

// 인라인 스타일을 이용해서 직접적으로 opacity 설정
document.addEventListener('scroll', () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUp.style.opacity = 1;
  } else {
    arrowUp.style.opacity = 0;
  }
});

// 정밀하게 지정하지 않아도 되어 클래스 지정, 인라인 둘 다 가능

/* ---------------------------------------------------- */

// ✅ Navbar 토글버튼 클릭 처리
// 화면이 작아지면 메뉴가 사라지면서 토글버튼 나타남 CSS로 처리함

const navbarMenu = document.querySelector('.header__menu');
const navbarToggle = document.querySelector('.header__toggle');

navbarToggle.addEventListener('click', () => {
  navbarMenu.classList.toggle('open');
});

/* ---------------------------------------------------- */

// ✅ Navbar 메뉴 클릭 시 메뉴를 자동으로 닫아줌
// 각 메뉴 클릭 시 페이지로 이동은 CSS로 처리함

navbarMenu.addEventListener('click', () => {
  navbarMenu.classList.remove('open');
});
