
browser.runtime.onMessage.addListener((msg, sender, sendResponse)=>{
    if(msg["command"] == "getBatteryStatus") {
        data = getBatteryStatus()
        console.log(data)

        if (data){
            return new Promise((resolve)=>{
                resolve({ data })
            })
        }
    }
})

function getBatteryStatus() {
    const port = browser.runtime.connectNative("com.battery");
    port.postMessage({ command: "getBatteryStatus" });

    port.onMessage.addListener((res) => {
        port.disconnect();
        
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
