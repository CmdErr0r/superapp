
browser.runtime.onMessage.addListener((msg, sender, sendResponse)=>{
    if(msg["command"] == "getBatteryStatus"){
        port = getBatteryStatus()
        port.onMessage.addListener((res) => {
            port.disconnect();
            console.log(res)
            if (!res.success)
                throw new Error("Error accourated on app type")
            
            return new Promise((resolve)=>{
                resolve({ data: res, success: true })
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