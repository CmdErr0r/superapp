class Calender  {
    constructor(addMonth = 0) {
        this.d = new Date();
        this.monthCall = ["January", "February", "March", "April", "May", "Jun", "July", "August", "September", "October", "November", "December"];
        this.calenaderBody = document.getElementsByClassName("calender-body-list")[0];
      }

    
    set() {
        const months = [31, this.d.getFullYear() % 4 == 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        let monthT = -1;
        let gtz = this.d.getDay() - (this.d.getDate() % 7)
        let startup = months[this.d.getMonth() + monthT] - ((gtz + 7 * 2) % 7) + 1;

        for (let ii = 0; ii < 5; ii++) {
            const ee = document.createElement("div");

            for (let i = 0; i < 7; i++) {
                const e = document.createElement("li");

                if (startup == 1 + months[(this.d.getMonth() + monthT) % 12]) {
                    startup = 1;
                    monthT++;
                }

                if (monthT != 0) e.className = "des";

                e.innerText = startup;
                startup += 1;

                ee.appendChild(e);
            }

            this.calenaderBody.appendChild(ee);
        }

    }

    setHead() {
        document.getElementsByClassName("calender-head-month")[0].innerText = this.monthCall[this.d.getMonth()];
        document.getElementsByClassName("calender-head-year")[0].innerText = this.d.getFullYear();
    }
}