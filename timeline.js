const root = document.getElementById("root");
const heigher = 120;

const heigherS = 50; // yukarıya olan yükseklik px
const scale = 90; // 
const node = 20; // düğüm uzunluğu
const vertex = 4; // ağ genişliği 
root.style.setProperty('--heigher', `${heigher + 4}px`);
root.style.setProperty('--vertex', `${vertex}px`);
root.style.setProperty('--scale', `${scale}%`);
root.style.setProperty('--node', `${node}px`);

const years = ["2023", "2024", "2025"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const d = new Date();
let now = `${years.indexOf(d.getFullYear().toString())}_${d.getMonth()}`
let agent = {
    "1_4":{ "title": "18 Mayıs 2024 ta sınav", "contents": ["29 Nisan 2024 17.30a son başvuru"] }
}

const createSpace = () => {
    for (let i = 0; i < years.length; i++) {
        const timeline = document.createElement("div");
        timeline.classList.add("timeline", i % 2 ? "reversedtimeline" : i == years.length - 1 ? "deadtimeline" : "none");

        timeline.style.bottom = -heigherS - i * heigher + "px";

        root.appendChild(timeline);
    }
}

const addSpace = () => {
    // let cursor = [0,0];
    for (let i = 0; i < years.length; i++) {
        for (let ii = 0; ii < months.length; ii++) {
            const time = document.createElement("div");
            time.classList.add("time");
            time.style.setProperty('--content', `\'${years[i]} ${months[ii]}\'`)
            if(`${i}_${ii}` == now){
                time.style.setProperty('--col', `#b100e6`)
            }
            if(agent[`${i}_${ii}`]){
                time.style.setProperty('--col', `#00ff4c`)
                
                sendMe = `${years[i]} ${months[ii]}${ agent[`${i}_${ii}`]["title"] }`
                agent[`${i}_${ii}`]["contents"].forEach(e => {sendMe+=e;});
                time.style.setProperty('--contentED', `\'${sendMe}\'`);
            }
            
            time.style.bottom = `calc(${(vertex - node) / 2}px - ${heigherS}px - ${i * heigher}px)`;
            if (i % 2)
                time.style.right = `calc( ( -${(100 - scale) / 2}%  - ${node / 2}px +  ${ii * 9.090909}%))`;
            else
                time.style.left = `calc( ( ${(100 - scale) / 2}%  - ${node / 2}px +  ${ii * 9.090909}%))`;

            root.appendChild(time);
        }
    }
}

createSpace()
addSpace()