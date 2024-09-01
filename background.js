function batteryStatus() {
    let port = browser.runtime.connectNative("com.example.battery")

    port.onMessage((res)=>{
        console.log("okay, res=",res)
    })
}
batteryStatus()