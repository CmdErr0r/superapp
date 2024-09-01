const frame = document.getElementById("main");
function page(pageNum) {
    pageNum = parseInt(pageNum) >= frame.children.length ? 0:parseInt(pageNum);

    for (let i = 0; i < frame.children.length; i++)
        frame.children[i].className = ""

    frame.children[pageNum].className = "activate";
    localStorage.setItem("page", pageNum);
}

page(localStorage.getItem("page") || 0);
const root = document.getElementById("root").children;

for (let i = 0; i < root.length; i++) {
    root[i].addEventListener("click", () => {
        page(i)
    })
}

/**
 * Calender
 */
const c = new Calender();

c.setHead();
c.set();



/**
 * todo - term
 */
const termList = document.getElementsByClassName("term-list")[0];
document.getElementById("addTodo").addEventListener("click", async () => {
    const termData = document.getElementsByClassName("todo-search")[0];
    const data = JSON.stringify({ data: termData.value });

    const url = `data:text/json,${data}`;
    await browser.runtime.sendMessage({ action: "setBookmark", url }).then(()=>{
        add2Todo(true);
    })
})

const adds = document.getElementsByClassName("addition-panel")[0];
document.getElementById("addPanel").addEventListener("click", () => {
    adds.classList.toggle("addition-panel-next");
})


async function add2Todo(last) {
    if(last == 2){
        while (termList.firstChild) {
            termList.removeChild(termList.firstChild);
        }
    }

    // fix the time problem with additon only the parent 

    await browser.runtime.sendMessage({ action: "getBookmark" }).then((data) => {
        for (let i = 0; i < data.length; i++) {
            const e = document.createElement("div");

            const ee = document.createElement("p");
            ee.innerText = data[i].data;

            const eee = document.createElement("button");
            const eeee = document.createElement("img");
            eeee.src = "public/bin.svg";
            eee.appendChild(eeee);
            eee.onclick = () => {
                delTodo(data[i].id, index = i)
            }

            e.appendChild(ee);
            e.appendChild(eee);
            termList.appendChild(e);
        }
    });
}


add2Todo();

function delTodo(id) {
    browser.runtime.sendMessage({ action: "deleteBookmark" , id})   
}