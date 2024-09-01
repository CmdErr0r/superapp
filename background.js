
browser.runtime.onMessage.addListener((msg, sender, sendResponse)=>{
    if(msg["command"] == "getBatteryStatus") {
        const port = browser.runtime.connectNative("com.battery");

        port.postMessage({ command: "getBatteryStatus" });

        port.onMessage.addListener((res) => {
            port.disconnect();
            
            if (!res.success)
                throw new Error("Error accourated on app type")

            // return the battery, timestemp, etc // todo
            return new Promise((resolve)=>{
                resolve({ data: res, success: true })
            })
        });
    
        port.onDisconnect.addListener((p) => {
            if (browser.runtime.lastError)            
                throw new Error(`Disconnected due to error: ${browser.runtime.lastError.message}`);
    
            console.log("Port disconnected");
        });
    }
})