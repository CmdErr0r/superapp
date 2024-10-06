// ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
mounths = ["Jan", "Feb", "March", "April", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

class Calander {
  constructor(dates) {
    this.dates = dates;
    this.now = new Date();
  }
    
  create_calander(d) {
    const yearmonths = [31,d.getFullYear() % 4 == 0 ? 29 : 28,31,30,31,30,31,31,30,31,30,31]
    const istht = this.now.getMonth() == d.getMonth() && this.now.getFullYear() == d.getFullYear()
    const calander = document.createElement("div");
    
    let calanderInfo = document.createElement("div");
    calanderInfo.classList.add("calander-info"); 
  
    let h2 = document.createElement('h2');
    h2.innerText= d.getFullYear() + " " + mounths[d.getMonth()];
    calanderInfo.appendChild(h2);
  
    // let calanderArrow = document.createElement("div");
    // calanderArrow.classList.add("calander-arrow"); 
    
    // let days = document.createElement("div");
    // days.innerText="days";
    // let months = document.createElement("div");
    // months.innerText="months";
    // let years = document.createElement("div");
    // years.innerText="years";
    
    // let left = document.createElement("div");
    // let right = document.createElement("div");
    // let year = document.createElement("div");
    // left.innerText = "<";
    // right.innerText = ">";
    // left.classList.add("arrow")
    // right.classList.add("arrow")
    // year.innerText = d.getFullYear();
    
    // calanderArrow.appendChild(left);
    // calanderArrow.appendChild(year);
    // calanderArrow.appendChild(right);
    
    // calanderInfo.appendChild(days);
    // calanderInfo.appendChild(months);
    // calanderInfo.appendChild(years);
    // calanderInfo.appendChild(calanderArrow);
    
    let calanderContent = document.createElement("div");
    calanderContent.classList.add("calander-content");
    ['s', 'm', 't', 'w', 't', 'f', 's'].forEach(e=>{
        let li = document.createElement("li");
        li.innerText = e.toUpperCase();
        li.className = "day"
        calanderContent.append(li);
    });
    
    let w = ((d.getDay()+(-d.getDate()+1))%7+7)%7 // 1 of month's weekday 0=sunday
    console.log(-w)

    let k=-1;
    let t = yearmonths[(d.getMonth()+k) + yearmonths.length * (d.getMonth()+k<0) ] + -w;

    for(let i=0; i < 6; i++) {
      for(let ii=0; ii < 7; ii++) {
        if(++t > yearmonths[(d.getMonth()+k) + yearmonths.length * (d.getMonth()+k<0) ]) {
          k++;
          t=1;
        }
    
        let li = document.createElement("li");
        if (k!=0)
          li.className = 'date'+k;
        else if(istht && t == d.getDate())
          li.className = 'todate';
        li.innerText = (t);
  
        calanderContent.appendChild(li);
      }
    }
    
    calander.appendChild(calanderInfo);
    calander.appendChild(calanderContent);
  
    return calander;
  }
  
  timeCounter(div) {
    for(let d=0; d<this.dates.length; d++){
      let deadline = this.dates[d];
      let allMonthUntilDeadline = (deadline.getFullYear() - this.now.getFullYear()) * 12 + (deadline.getMonth() - this.now.getMonth())
      // todo add for years and weeks to
      
      for(let dd=0;dd < allMonthUntilDeadline; dd++){
        let nm = new Date(this.now.getFullYear(), this.now.getMonth()+dd)
        const c = this.create_calander(nm);
        div.appendChild(c);
      }

      return div
      // console.log(deadline, nm)
    }
  }
}