const batteryLevel = document.getElementById("batteryLevel")
const timestamp = document.getElementById("timestamp") // todo change here

browser.runtime.sendMessage({ command: "getBatteryStatus" }).then((res)=>{
    console.log(res) // todo first made app of python with sys.stdout.buffer.flash() make debug
    // after that continue to apply all to frontend...

    // batteryLevel.innerText = res.batteryLevel.toString;
    // timestamp.innerText = res.timestamp;
})

// browser.runtime.onMessage.addListener((allof)=>{
//     console.log(allof)
// })

