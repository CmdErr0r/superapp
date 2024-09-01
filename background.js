
browser.runtime.onMessage.addListener((msg, sender, sendResponse)=>{
    console.log("msg")
    console.log(msg)
    console.log(sender)


    // console.log("c",command,"d", data);
    // if (command==getBatteryStatus){
    //     getBatteryStatus();
    //     new Permissions()
    //     // return 
    // }
});

function getBatteryStatus() {
    const port = browser.runtime.connectNative("com.battery");
    port.postMessage({ command: "getBatteryStatus" });

    port.onMessage.addListener((res) => {
        port.disconnect();
        
        if (!res.success)
            return
        
        browser.tabs.query({ active:true, currentWindow:true }).then((tabs)=>{
            browser.tabs.sendMessage(tabs[0].id, { command:"BatteryStatus", data:res })
        })

    });

    port.onDisconnect.addListener((p) => {
        if (browser.runtime.lastError){
            console.error(`Disconnected due to error: ${browser.runtime.lastError.message}`);
            return
        }

        console.log("Port disconnected");
    });
}
