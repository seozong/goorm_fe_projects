const appendTens = document.getElementById('tens');
const appendSeconds = document.getElementById('seconds');
const buttonStart = document.getElementById('button-start');
const buttonStop = document.getElementById('button-stop');
const buttonReset = document.getElementById('button-reset');

let seconds = 0;
let tens = 0; //10ms마다 1씩 증가, 100이 되면 sec을 1로 올림.
let interval;

buttonStart.onclick = function() {
    interval = setInterval(startTimer, 10); 
}

buttonStop.onclick = function () {
    clearInterval(interval);
}

buttonReset.onclick = function () {
    // 구동중일 땐 stop -> reset 될 수 있게끔
    clearInterval(interval);
    // reset
    seconds = 0;
    tens = 0;
    appendTens.innerText = 0;
    appendSeconds.innerText = 0;   
    }

function startTimer() {
    tens++;

    if (tens > 99) {
        // seconds 1 올리기
        seconds++;
        // appendSeconds에도 반영하기
        appendSeconds.innerText = seconds;
        // tens(값) , appendTens(HTML요소) => 0
        tens = 0;
        appendTens.innerText = 0;
    
    } else {
        appendTens.innerText = tens;
    }
}


//24.09.12 목
/*====FB====
start -> reset 할 때 일단 한번 정지된 후에 한번 더 누르면 리셋되는게 더 자연스러운 동작 같다.
근데 무작정 reset 안에 클릭이벤트 함수를 2개 중첩해서 넣게 되면
start가 아닌 stop 상태에서 reset을 누를 경우 한번 더 눌러야 하는 문제가 생긴다. (한번 누르면 똑같이 stop이 먹히기 때문.)

따라서,
(i)start에서 시작할 때
(ii)stop에서 시작할 때
두가지에 대한 reset 동작을 각각 만들어야 한다.
*/


