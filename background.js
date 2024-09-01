console.log("Extension started");

// Function to connect and communicate with native app
function getBatteryStatus() {
    // Connect to native app

    const port = browser.runtime.connectNative("com.battery");
    
    console.log("Port connected")
    
    
    port.postMessage({ command: "getBatteryStatus" });

    
    port.onMessage.addListener((res) => {
        port.disconnect();
        
        if (!res.success)
            return
        
        console.log(res.batteryLevel, res.timestamp, res)
    });

    // Handle disconnection and errors
    port.onDisconnect.addListener((p) => {
        if (browser.runtime.lastError) {
            console.error(`Disconnected due to error: ${browser.runtime.lastError.message}`);
        } else {
            console.log("Port disconnected");
        }
    });
}

// Example: Fetch battery status when extension starts
getBatteryStatus();

// Example: Fetch battery status every 30 minutes
setInterval(getBatteryStatus, 1 * 60 * 1000);