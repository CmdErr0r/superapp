
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

function getBatteryStatus() {
    const port = browser.runtime.connectNative("com.battery");
    port.postMessage({ command: "getBatteryStatus" });

    port.onMessage.addListener((res) => {
        port.disconnect();
        
        console.log("res")
        console.log(res)

        if (!res.success)
            throw new Error("Error accourated on app type")
        
        return res
        
        // browser.tabs.query({ active:true, currentWindow:true }).then((tabs)=>{
        //     browser.tabs.sendMessage(tabs[0].id, { command:"BatteryStatus", data:res })
        // })

    });

    port.onDisconnect.addListener((p) => {
        if (browser.runtime.lastError)            
            throw new Error(`Disconnected due to error: ${browser.runtime.lastError.message}`);

        console.log("Port disconnected");
    });
}
