console.log("start")
function batteryStatus() {
    let port = browser.runtime.connectNative("com.battery")

    port.onMessage.addListener((res)=>{
        console.log("okay, res=",res)
    })

    port.postMessage({ command: "run" });
}
batteryStatus()