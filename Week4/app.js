// DOM 요소 선택 
const todoInput = document.getElementById('todoInput');
const addBtn    = document.getElementById('addBtn');
const todoList  = document.getElementById('todoList');
const emptyMsg  = document.getElementById('emptyMsg');

// 할 일 목록 상태 배열 
let todos = []; // { id, text, done },
//let 사용 이유 : 배열 자체를 재할당하기 위해서임.

// 빈 상태 안내 문구 표시 여부 
function updateEmptyMsg() {
  emptyMsg.style.display = todos.length === 0 ? 'block' : 'none';
}
//

// 할 일 추가 
//ENTER 키나 엔터 누르면 실행됨.
function addTodo() {
  const text = todoInput.value.trim();  
  //문자열 앞뒤의 공백을 제거해서 입력된 문자열을 가져옴.
  if (!text) return; 
  //문자열 앞 뒤의 공백 제거.

  // 현재 시각을 이용해서 항목마다 고유 ID를 배치해줌.
  const newTodo = {
    id: Date.now(),  // 고유 ID
    text,
    done: false, // 완료되지 않은 상태이므로 false
  };

  todos.push(newTodo);
  todoInput.value = ''; // 입력창 초기화
  renderTodo(newTodo);
  updateEmptyMsg();
} 
/* 배열 맨 끝에 newTodo 객체 추가
  -> 입력창을 빈 문자열로 초기화하고 추가 후 입력창 비워짐
  -> 데이터를 받아 실제 HTML 요소를 만들어 화면에 호출
  -> 항목 추가 후 안내 문구 숨기게 업데이트.
*/

/* 할 일 항목 렌더링 
  - 새 HTML요소 메모리에 생성 후 생성한 li에 todo-item 클래스 추가하면 css 스타일 적용됨.
  - li 요소에 data-id 속성 저장해서 구분할때 사용.
*/
function renderTodo(todo) {
  const li = document.createElement('li');
  li.classList.add('todo-item');
  li.dataset.id = todo.id;

  // 체크박스 
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = todo.done;
  checkbox.addEventListener('change', () => toggleDone(todo.id, li, textSpan));

  // 텍스트
  const textSpan = document.createElement('span');
  textSpan.classList.add('todo-text');
  textSpan.textContent = todo.text;

  // 삭제 버튼
  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete-btn');
  deleteBtn.textContent = '삭제';
  deleteBtn.addEventListener('click', () => deleteTodo(todo.id, li));

  li.appendChild(checkbox); // 체크박스
  li.appendChild(textSpan); //텍스트
  li.appendChild(deleteBtn);  //삭제버튼

  // emptyMsg 바로 앞에 새 li을 삽입시킴.
  // insertBefore을 통해 emptyMsg가 항상 맨 아래에 유지되도록 함.
  todoList.insertBefore(li, emptyMsg);
}

/* 
완료 토글
- 토글할 항목의 고유 ID, 해당 항목의 DOM 요소, 텍스트 요소
- 조건을 만족하는 첫 번째 요소를 반환하게 하여 배열에서 id가 일치하는 항목을 찾음
  해당 id 항목 없으면 방어를 위해서 조기종료.
 */
function toggleDone(id, li, textSpan) {
  const todo = todos.find(t => t.id === id);
  if (!todo) return;

  // 현재 완료 상태를 반전시켜서 배열 data도 함께 업데이트됨.
  todo.done = !todo.done;
  li.classList.toggle('done', todo.done);
}

/* 
할일 삭제
- 조건을 만족하는 요소만 모아서 새 배열 반환 후 id가 다른 항목만 남겨놓고 삭제 대상은 제외시킴.
  즉 todos 배열에서 해당 항목이 제거됨. */
function deleteTodo(id, li) {
  todos = todos.filter(t => t.id !== id);
  li.remove();
  updateEmptyMsg(); //삭제 후 배열이 비었으면 안내문구 다시 보여줌.
}

// 이벤트 연결 - 버튼을 클릭하면 addTodo 함수 실행.
addBtn.addEventListener('click', addTodo);

// Enter 키로도 추가 가능하게 만듦.
todoInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTodo();
});

// 초기 렌더링 
updateEmptyMsg();
