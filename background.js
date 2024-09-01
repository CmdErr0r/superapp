
browser.runtime.onMessage.addListener((msg, sender, sendResponse)=>{
    if(msg["command"] == "getBatteryStatus"){
        port = getBatteryStatus()
        port.onMessage.addListener((res) => {
            port.disconnect();
            return new Promise((resolve)=>{
                console.log("resed",res)
                resolve(res)
            })
        });
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