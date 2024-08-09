const calander = document.querySelector(".calander");
const d = new Date()
const yearmonths = [31,d.getFullYear() % 4 == 0 ? 29 : 28,31,30,31,30,31,31,30,31,30,31]

let calanderInfo = document.createElement("div");
calanderInfo.classList.add("calander-info"); 
let calanderArrow = document.createElement("div");
calanderArrow.classList.add("calander-arrow"); 

let days = document.createElement("div");
days.innerText="days";
let months = document.createElement("div");
months.innerText="months";
let years = document.createElement("div");
years.innerText="years";

let left = document.createElement("div");
let right = document.createElement("div");
let year = document.createElement("div");
left.innerText = "<";
right.innerText = ">";
left.classList.add("arrow")
right.classList.add("arrow")
year.innerText = d.getFullYear();

calanderArrow.appendChild(left);
calanderArrow.appendChild(year);
calanderArrow.appendChild(right);

calanderInfo.appendChild(days);
calanderInfo.appendChild(months);
calanderInfo.appendChild(years);
calanderInfo.appendChild(calanderArrow);


let calanderContent = document.createElement("div");
calanderContent.classList.add("calander-content");

let ul = document.createElement("ul");
["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].forEach(e=>{
    let li = document.createElement("li");
    li.innerText = e;
    li.style = "color:#868686;";
    ul.appendChild(li);
});
calanderContent.appendChild(ul);

w = (d.getDate() - d.getDay())
w = w - (parseInt(w/7)+1)*7
k=-1
t = yearmonths[d.getMonth()+k] + w-1

for(let i=0; i < 6; i++) {
  let ul = document.createElement("ul");
  for(let ii=0; ii < 7; ii++) {
    if(++t > yearmonths[d.getMonth()+k]) {
      k++;
      t=1;
    }

    let li = document.createElement("li");
    li.style = k==0 ? "color:#000;" : "color:#868686;";
    li.innerText = (t);
    ul.appendChild(li);
  }
  calanderContent.appendChild(ul);
}

calander.appendChild(calanderInfo);
calander.appendChild(calanderContent);


