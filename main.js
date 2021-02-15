const x = Array(9);
let name = document.getElementsByClassName('text')[0];
let player = name.value;

window.onload = () => {
    document.getElementsByClassName('user')[0].innerHTML = `<div>${localStorage.getItem('userName')}:${localStorage.getItem('userStat')}</div>`;
    document.getElementsByClassName('comp')[0].innerHTML = `<div>Computer:${localStorage.getItem('compStat')}</div>`;
    document.getElementsByClassName('draw')[0].innerHTML = `<div>Draws:${localStorage.getItem('drawStat')}</div>`;
}

function greet() {
    localStorage.setItem('userName', name.value);
    let player = document.getElementsByClassName('user')[0];
    player.innerHTML = `<div>${localStorage.getItem('userName')}:${localStorage.getItem('userStat')}</div>`;
}

function comp() {
    let id = Math.floor(Math.random() * 9);
    x[id] ? comp() : move(id, 'comp');
}

function checkEnd() {

    let points = {
        user: 0,
        comp: 0,
        draw: 0
    }

    if (
        x[0] == 'comp' && x[1] == 'comp' && x[2] == 'comp' ||
        x[3] == 'comp' && x[4] == 'comp' && x[5] == 'comp' ||
        x[6] == 'comp' && x[7] == 'comp' && x[8] == 'comp' ||
        x[0] == 'comp' && x[3] == 'comp' && x[6] == 'comp' ||
        x[1] == 'comp' && x[4] == 'comp' && x[7] == 'comp' ||
        x[2] == 'comp' && x[5] == 'comp' && x[8] == 'comp' ||
        x[0] == 'comp' && x[4] == 'comp' && x[8] == 'comp' ||
        x[2] == 'comp' && x[4] == 'comp' && x[6] == 'comp'
        ) {
        points.comp += 1;
        localStorage.setItem('compStat', JSON.stringify(points.comp));
        document.getElementsByClassName('comp')[0].innerHTML = `<div>Computer:${localStorage.getItem('compStat')}</div>`;
        alert('Победил компьютер!');
        return true;

    } else if (
        x[0] == 'player' && x[1] == 'player' && x[2] == 'player' ||
        x[3] == 'player' && x[4] == 'player' && x[5] == 'player' ||
        x[6] == 'player' && x[7] == 'player' && x[8] == 'player' ||
        x[0] == 'player' && x[3] == 'player' && x[6] == 'player' ||
        x[1] == 'player' && x[4] == 'player' && x[7] == 'player' ||
        x[2] == 'player' && x[5] == 'player' && x[8] == 'player' ||
        x[0] == 'player' && x[4] == 'player' && x[8] == 'player' ||
        x[2] == 'player' && x[4] == 'player' && x[6] == 'player'
    ) {
        points.user += 1;
        localStorage.setItem('userStat', points.user);
        document.getElementsByClassName('user')[0].innerHTML = `<div>${localStorage.getItem('userName')}:${localStorage.getItem('userStat')}</div>`;
        alert('Победил ' + `${localStorage.getItem('userName')}` + '!');
        return true;

    } else if (x[0] && x[1] && x[2] && x[3] && x[4] && x[5] && x[6] && x[7] && x[8]) {
        points.draw += 1;
        localStorage.setItem('drawStat', JSON.stringify(points.draw));
        document.getElementsByClassName('draw')[0].innerHTML = `<div>Draws:${localStorage.getItem('drawStat')}</div>`;
        alert('Ничья!');
        return true;
    }
}


function move(id, role) {
    if (x[id]) return false;
    x[id] = role;

    document.getElementById(id).className = 'cell ' + role;

    !checkEnd() ? (role == 'player') ? comp() : null : setTimeout(restart, 1000);
}

function restart() {
    if(confirm('Сыграем ещё?')) {
        location.reload();
    }
}

