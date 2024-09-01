
browser.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if(msg["command"] == "getBatteryStatus"){
        return new Promise(async (resolve)=>{
            port = getBatteryStatus()
            port.onMessage.addListener((res) => {
                port.disconnect();
                console.log(res)
                resolve(res)
            });
        })
    }
});

function getBatteryStatus() {
    const port = browser.runtime.connectNative("com.battery");
    port.postMessage({ command: "getBatteryStatus" });
    
    port.onDisconnect.addListener((p) => {
        if (browser.runtime.lastError)            
            throw new Error(`Disconnected due to error: ${browser.runtime.lastError.message}`);

        console.log("Port disconnected");
    });
    
    return port
}