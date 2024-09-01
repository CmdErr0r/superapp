console.log("Extension started");

// Function to connect and communicate with native app
function getBatteryStatus() {
    // Connect to native app
    const port = browser.runtime.connectNative("com.battery");

    // Send a message to native app
    port.postMessage({ command: "getBatteryStatus" });

    // Listen for messages from native app
    port.onMessage.addListener((response) => {
        if (response.success) {
            console.log(`Battery Level: ${response.batteryLevel}% at ${response.timestamp}`);
            // You can add additional logic here, e.g., update UI or notifications
        } else {
            console.error(`Error: ${response.error}`);
        }
        port.disconnect();
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