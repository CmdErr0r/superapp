
browser.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if(msg["command"] == "getBatteryStatus"){
        return new Promise(async (resolve)=>{
            port = getBatteryStatus()
            port.onMessage.addListener((res) => {
                port.disconnect();
                resolve(res)
            });
        })
    }
});

// browser.tabs.query({ active:true, currentWindow:true }).then((tabs)=>{
//     browser.tabs.sendMessage(tabs[0].id, { command:"", data:data })
// })


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