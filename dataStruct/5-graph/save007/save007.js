let vertexArr = [
    {
        x:0,
        y:0
    },
    {
        x:1,
        y:1
    },
    {
        x:2,
        y:1
    },
    {
        x:1,
        y:2
    },
    {
        x:0,
        y:2
    },
    {
        x:-1,
        y:2
    },
    {
        x:-2,
        y:2
    },
    {
        x:-1,
        y:-3
    },
    {
        x:-3,
        y:1
    },
    {
        x:-4,
        y:0
    },
    {
        x:-1,
        y:-4
    },
    {
        x:4,
        y:-1
    },
    {
        x:-2,
        y:-4
    },



];
let visited = [];
vertexArr.forEach(e => {
    visited.push(false);
})
function isSafe (i) {
    let e = vertexArr[i];
    return Math.abs(e.x)>=4 || Math.abs(e.y) >= 4;
}
function jump(i, j) {
    let e1 = vertexArr[i];
    let e2 = vertexArr[j];
    let x =  Math.abs(e1.x - e2.x);
    let y = Math.abs(e1.y - e2.y);
    return Math.sqrt(x*x+y*y) <= Math.sqrt(2);
}
function save (i) {
    visited[i] = true;
    let answer = 'no';
    if(isSafe(i)) {
        answer = 'yes';
    } else {
        for (let x = 0; x < vertexArr.length; x++) {
            if(i !== x && !visited[x] && jump(i, x))  {
                console.dir(vertexArr[x]);
                answer = save(x);
            }
            if (answer === 'yes')
                break;
        }
    }
    return answer;
}
console.log(save(0));