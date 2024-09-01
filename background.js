
browser.runtime.onMessage.addListener(async (msg, sender, sendResponse)=>{
    if(msg["command"] == "getBatteryStatus"){
        res = await getBatteryStatus()
        console.log(res)
        if (res) {
            return new Promise((resolve)=>{
                resolve({ data: res, success: true })
            })
        }
    }
});

async function getBatteryStatus() {
    const port = browser.runtime.connectNative("com.battery");
    port.postMessage({ command: "getBatteryStatus" });

    await port.onMessage.addListener((res) => {
        port.disconnect();
        
        if (!res.success)
            throw new Error("Error accourated on app type")
        
        return res
    });

    port.onDisconnect.addListener((p) => {
        if (browser.runtime.lastError)            
            throw new Error(`Disconnected due to error: ${browser.runtime.lastError.message}`);

        console.log("Port disconnected");
    });
}
