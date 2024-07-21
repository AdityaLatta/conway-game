let canvas = document.getElementById("myCanvas");
let nxt = document.getElementById("nxt");
let start = document.getElementById("start");
let stop = document.getElementById("stop");

canvas.width = 600;
canvas.height = 600;

let ctx = canvas.getContext('2d');

ctx.rect(0, 0, 600, 600);
ctx.fillStyle = "gray";
ctx.fill();

ctx.beginPath();

let cellWidth = canvas.width / 30;
let cellHeight = canvas.height / 30;

for (let x = cellWidth; x < canvas.width; x += cellWidth) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
}

for (let y = cellHeight; y < canvas.height; y += cellHeight) {
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
}

ctx.strokeStyle = 'white'
ctx.stroke();

let arr = new Array(30).fill(null).map(() => new Array(30).fill(0));

canvas.addEventListener('click', (e) => {
    let rect = canvas.getBoundingClientRect();
    let x = Math.floor((e.clientX - rect.left) / cellWidth) * cellWidth;
    let y = Math.floor((e.clientY - rect.top) / cellHeight) * cellHeight;



    let row = Math.floor((e.clientY - rect.top) / cellHeight);
    let column = Math.floor((e.clientX - rect.left) / cellWidth);


    if (arr[row][column] == 0) {
        ctx.fillStyle = "yellow";
        ctx.fillRect(x + 1, y + 1, cellWidth - 2, cellHeight - 2);
        arr[row][column] = 1;
    } else {
        ctx.fillStyle = "gray";
        ctx.fillRect(x + 1, y + 1, cellWidth - 2, cellHeight - 2);
        arr[row][column] = 0;
    }

})

function getNeighbours(arr, i, j, n) {
    if (i == 0 && j == 0) {
        return arr[i][j + 1] + arr[i + 1][j] + arr[i + 1][j + 1];
    }
    if (i == 0 && j == n - 1) {
        return arr[i][j - 1] + arr[i + 1][j] + arr[i + 1][j - 1];
    }
    if (i == n - 1 && j == 0) {
        return arr[i][j + 1] + arr[i - 1][j] + arr[i - 1][j + 1];
    }
    if (i == n - 1 && j == n - 1) {
        return arr[i][j - 1] + arr[i - 1][j] + arr[i - 1][j - 1];
    }

    if (i == 0) {
        return (
            arr[i][j - 1] +
            arr[i][j + 1] +
            arr[i + 1][j] +
            arr[i + 1][j - 1] +
            arr[i + 1][j + 1]
        );
    }
    if (i == n - 1) {
        return (
            arr[i][j - 1] +
            arr[i][j + 1] +
            arr[i - 1][j] +
            arr[i - 1][j - 1] +
            arr[i - 1][j + 1]
        );
    }
    if (j == 0) {
        return (
            arr[i - 1][j] +
            arr[i - 1][j + 1] +
            arr[i][j + 1] +
            arr[i + 1][j] +
            arr[i + 1][j + 1]
        );
    }
    if (j == n - 1) {
        return (
            arr[i - 1][j] +
            arr[i - 1][j - 1] +
            arr[i][j - 1] +
            arr[i + 1][j] +
            arr[i + 1][j - 1]
        );
    }

    let left = arr[i][j - 1] || 0;
    let right = arr[i][j + 1] || 0;
    let top = arr[i - 1][j] || 0;
    let bottom = arr[i + 1][j] || 0;
    let topleft = arr[i - 1][j - 1] || 0;
    let topright = arr[i - 1][j + 1] || 0;
    let bottomleft = arr[i + 1][j - 1] || 0;
    let bottomright = arr[i + 1][j + 1] || 0;

    let ans =
        top + bottom + left + right + topleft + topright + bottomleft + bottomright;

    return ans;
}
function cgl(arr, n) {
    let ansArr = new Array(n).fill(null).map(() => new Array(n).fill(0));

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            let total = getNeighbours(arr, i, j, n);
            if (total == 3) {
                ansArr[i][j] = 1;
            }
            if (total == 2 && arr[i][j] == 1) {
                ansArr[i][j] = 1;
            }
            if (total == 3 && arr[i][j] == 1) {
                ansArr[i][j] = 1;
            }
        }
    }

    return ansArr;
}

function fillRect(ansarr) {
    for (let i in ansarr) {
        for (let j in ansarr) {
            let x = i * cellWidth;
            let y = j * cellHeight;

            if (ansarr[i][j] == 1) {
                ctx.fillStyle = "yellow";
                ctx.fillRect(y + 1, x + 1, cellWidth - 2, cellHeight - 2);
            } else {
                ctx.fillStyle = "gray";
                ctx.fillRect(y + 1, x + 1, cellWidth - 2, cellHeight - 2);
            }
        }
    }
}

nxt.addEventListener('click', () => {
    let ans = cgl(arr, 30);
    arr = [...ans];
    fillRect(ans, 30);
})

let id = null;

let starter = () => {
    clearInterval(id);
    id = setInterval(() => {        
        let ans = cgl(arr, 30);
        arr = [...ans];
        fillRect(ans, 30)
    }, 1000);

}

let stoper = () => {
    clearInterval(id);
}

start.addEventListener('click', starter);

stop.addEventListener('click', stoper)