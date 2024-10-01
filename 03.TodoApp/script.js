const list = document.getElementById('list');
const createBtn = document.getElementById('create-btn');

// todo 데이터를 배열에 넣고, 이 데이터를 이용해 화면에 요소 리스트들을 하나씩 생성
let todos = [];

createBtn.addEventListener('click', createNewTodo);

function createNewTodo() {
    // 새로운 item 객체 생성
    const item = {
        id : new Date().getTime(), //유니크한 숫자 나옴
        text : '',                 // todo 내용
        complete : false           // todo 완료 여부(미완 : false)
    }

    // 배열의 처음에 새로운 아이템을 추가
    todos.unshift(item);


    // 요소 생성하기 (화면에 보이게끔)
    const {itemEl, inputEl, editBtnEl, removeBtnEl} = createTodoElement(item);

    // 리스트 요소 안에 방금 생성한 아이템 요소 추가 (맨위로 추가됨)
    list.prepend(itemEl); // pre(앞에) + append(더한다)

    // disabled 속성 제거
    inputEl.removeAttribute('disabled');

    // input 요소에 focus => 아이템 생성하자마자 text 입력 가능
    inputEl.focus();

    saveToLocalStorage();
}

function createTodoElement(item) {
    const itemEl = document.createElement('div'); // div 요소 생성
    itemEl.classList.add('item'); // div 요소에 class = 'item' 부여

    const checkboxEl = document.createElement('input'); // input 요소 생성
    checkboxEl.type = 'checkbox'; // input 요소에 type = 'checkbox' 부여
    checkboxEl.checked = item.complete;

    if(item.complete) {
        itemEl.classList.add('complete');
    }

    const inputEl = document.createElement('input');
    inputEl.type = 'text';
    inputEl.value = item.text;
    inputEl.setAttribute('disabled',''); //disabled 상태면 작성 불가, disabled 없으면 작성 가능.

    const actionsEl = document.createElement('div');
    actionsEl.classList.add('actions');

    const editBtnEl = document.createElement('button');
    editBtnEl.classList.add('material-icons');
    editBtnEl.innerText = 'edit';

    const removeBtnEl = document.createElement('button');
    removeBtnEl.classList.add('material-icons', 'remove-btn');
    removeBtnEl.innerText = 'remove_circles';

    actionsEl.append(editBtnEl);
    actionsEl.append(removeBtnEl);

    itemEl.append(checkboxEl);
    itemEl.append(inputEl);
    itemEl.append(actionsEl);

    checkboxEl.addEventListener('change', () => {
        item.complete = checkboxEl.checked;

        if (item.complete) {
            itemEl.classList.add('complete');
        } else {
            itemEl.classList.remove('complete');
        }

        saveToLocalStorage();
    });

    inputEl.addEventListener('input', () => {
        item.text = inputEl.value;
    });

    inputEl.addEventListener("blur", () => {
		inputEl.setAttribute("disabled", "");

		saveToLocalStorage();
	});

	editBtnEl.addEventListener("click", () => {
		inputEl.removeAttribute("disabled");
		inputEl.focus();
	});

	removeBtnEl.addEventListener("click", () => {
		todos = todos.filter(t => t.id != item.id);
		itemEl.remove();

		saveToLocalStorage();
	});

    return {itemEl, inputEl, editBtnEl, removeBtnEl}
}

function displayTodos() {
	loadFromLocalStorage();

	for (let i = 0; i < todos.length; i++) {
		const item = todos[i];

		const { itemEl } = createTodoElement(item);

		list.append(itemEl);
	}
}

displayTodos();

function saveToLocalStorage() {
	const data = JSON.stringify(todos);

	localStorage.setItem("my_todos", data);
}

function loadFromLocalStorage() {
	const data = localStorage.getItem("my_todos");

	if (data) {
		todos = JSON.parse(data);
	}
}