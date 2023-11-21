'use strict';

/* 1. 사용자가 스크롤링 하면 사용자가 바라보고있는 섹션에 해당하는 메뉴 아이템을 자동으로 활성화
현재 보여지고 있는 섹션별로 active 메뉴 설정
2. 아이템을 클릭하면 스르륵 스크롤링 되도록 만들어 봄. 화살표 버튼도 마찬가지
mdn 문서 보고 섹션에 보이고 안보이고를 감지해서 메뉴를 활성 */

// 구현 계획
// 1. 모든 섹션 요소들과 메뉴 아이템들을 가지고 온다.
// 2. IntersectionObserver를 사용해서 모든 섹션들을 관찰해야 한다.
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다.
// 보여지는 섹션:
// - 다수의 섹션이 동시에 보여진다면, 가장 첫 번째 섹션을 선택
// - 마지막 contact 섹션이 보여진다면, 그러면 가장 마지막 섹션을 선택

//------------------------------------------------

// #id 로 연결되어있으니 각각의 문자열 id를 갖고 옴
const sectionIds = [
  '#home',
  '#about',
  '#skills',
  '#work',
  '#testimonial',
  '#contact',
];
// 각 section
const sections = sectionIds.map((id) => document.querySelector(id));
// 각 navmenu
const navItems = sectionIds.map((id) =>
  document.querySelector(`[href = '${id}']`)
);
// 3.에서 할 일 : 불리언을 담을 수 있는 섹션
// 현재 섹션들이 보여지고 있는지 아닌지를 간직 할 수 있는 배열
// 기본적으로 모든 요소들은 보여지고 있지 않다 라고 false라고 설정 해줌
const visibleSections = sectionIds.map(() => false);
let activeNavItem = navItems[0];

//------------------------------------------------

const options = {
  rootMargin: '-20% 0px 0px 0px',
  threshold: [0, 0.98], // 처음 진입했을 때 나갔을 때 호출 받음
};
const observer = new IntersectionObserver(observerCallback, options);

//------------------------------------------------

// ➡ 위에서 observer를 만들었으면 무엇을 할건지 실제로 관찰해 라고 명령해줘야 함
sections.forEach((section) => observer.observe(section));

//------------------------------------------------

// 여기 안에서 전달 된 entries를 갖고 ⬆
function observerCallback(entries) {
  let selectLastOne; // flag 변수 : true인지 아닌지를 간직할 수 있는 말
  entries.forEach((entry) => {
    const index = sectionIds.indexOf(`#${entry.target.id}`);
    // console.log(index); // 0,1,2,3,4,5
    // console.log(entry.target.id); // home ...
    // index를 찾을 것임
    // sectionIds 있는(id를 갖고 있는 배열중에) 현재 진입한 entry에 관련된 인덱스가 어떤건지 파악
    // 섹션 id중에 id #키를 사용해서 현재 진입한 entry에 target이 갖고 있는 id 요소에 해당하는 인덱스 찾기
    visibleSections[index] = entry.isIntersecting;
    // 요소들이 변경될 때마다 모든 entries를 forEach를 통해서 어떤 entry가 보여지는지 안보여지는지가 관찰 됨
    selectLastOne =
      index === sectionIds.length - 1 && // -1 를 해주는 이유 : 5번이 마지막 섹션
      entry.isIntersecting &&
      entry.intersectionRatio >= 0.95;
  });
  // console.log(visibleSections);
  // console.log('무조건 라스트 섹션!!', selectLastOne);

  const navIndex = selectLastOne
    ? sectionIds.length - 1
    : findFirstIntersecting(visibleSections);
  selectNavItem(navIndex);
}

// 다수의 섹션이 동시에 보여진다면, 가장 첫 번째 섹션을 선택
function findFirstIntersecting(intersections) {
  const index = intersections.indexOf(true);
  return index >= 0 ? index : 0; // ~ 라면 index 아니면 기본값 0 지정
}

// navItem을 선택하는 부분 별도의 함수로 만듦
function selectNavItem(index) {
  const navItem = navItems[index];
  if (!navItem) return;
  activeNavItem.classList.remove('active');
  activeNavItem = navItem;
  activeNavItem.classList.add('active');
}
