const batteryLevel = document.getElementById("batteryLevel")
const timestamp = document.getElementById("timestamp") // todo change here

browser.runtime.sendMessage({ command: "getBatteryStatus" }).then((res)=>{
    batteryLevel.innerText = res.batteryLevel.toString();
    timestamp.innerText = res.timestamp;
})

// browser.runtime.onMessage.addListener((allof)=>{
//     console.log(allof)
// })

