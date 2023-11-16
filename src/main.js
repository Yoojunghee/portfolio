// Header에 페이지 아래로 스크롤 시 다크 스타일링 적용

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

// Home 섹션을 아래로 스크롤 시 투명하게 처리함
// y가 0일때는 opacity 1 , y가 홈화면 높이에 완전히 닿았을때는 opacity 0
// 홈화면 높이 구하기

const home = document.querySelector('.home__container');
const homeHeight = home.offsetHeight;
// const homeHeight = home.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
  console.log(1 - window.scrollY / homeHeight);
  home.style.opacity = 1 - window.scrollY / homeHeight;
});
