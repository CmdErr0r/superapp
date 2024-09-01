console.log("start")
function batteryStatus() {
    let port = browser.runtime.connectNative("com.example.battery")

    port.onMessage.addListener((res)=>{
        console.log("okay, res=",res)
    })
}
batteryStatus()