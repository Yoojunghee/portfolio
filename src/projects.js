'use strict';

// 카테고리 버튼이 클릭이 되면
// 클릭 된 카테고리가 갖고 있는 타입에 따라서
// All를 선택할 건지 프론엔드 백엔드를 선택할 건지
// 이 카테고리 타입에 따라서 프로젝트마다 고유한 것을 갖고 있을거니 그 정보들을 토대로 선택된 카테고리 타입에 맞는 걸 필터링

// 프로젝트 필터링 관련 로직 처리
// 필터해야하는 기준점

/* 
querySelector : 선택자에 해당하는 요소중에 찾은 것중에 제일 첫 번째 아이템만 리턴
querySelectorAll : 해당 선택자에 매칭되는 모든 요소들을 배열로 반환

*/

const categories = document.querySelector('.categories');
const projects = document.querySelectorAll('.project');
const projectsContainer = document.querySelector('.projects');
categories.addEventListener('click', (event) => {
  console.log(event); // categories전체 목록 묶음 이벤트 안에는 카테고리들의 각각의 목록(all, font-end..) 총 네가지
  const filter = event.target.dataset.category; // all, font-end.. 네가지
  if (filter == null) {
    return;
  }

  // Active 메뉴를 재설정
  const active = document.querySelector('.category--selected');
  console.log(active);
  active.classList.remove('category--selected');
  event.target.classList.add('category--selected');

  // 프로젝트 필터링
  projects.forEach((project) => {
    // projects : 프로젝트들의 전체
    console.log(project.dataset.type); // 프로젝트 전체 리스트 나옴
    if (filter === 'all' || filter === project.dataset.type) {
      // 카테고리와 타입이 같아야함
      project.style.display = 'block';
    } else {
      project.style.display = 'none';
    }
  });

  // 콜백 함수에 들어있는 코드들은 모든 내용들이 다 코드가 수행이 되고 나서 그 다음에 브라우저에 한 번에 업데이트 됨
  // 실제로 콜백함수가 다 끝나야 브라우저가 업데이트 됨
  // anim-out의 클래스가 지정되면서 애니메이션 시작 될 것임
  // setTimeout 수행이 되면서 250ms 이후에 클래스 제거

  // 필터링 전에 메뉴 클릭 시 project들이 담겨 있는 부모 ul의 projects를 잠시 사라졌다 나타나는 애니메이션 효과 (다음 메뉴 다오기 전)
  projectsContainer.classList.add('anim-out');
  // 애니메이션 효과 준 거 다시 되돌려주기
  setTimeout(() => {
    // 콜백 함수 실행
    projectsContainer.classList.remove('anim-out');
  }, 250);
});
