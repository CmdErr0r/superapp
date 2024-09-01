browser.runtime.sendMessage({ command: "getBatteryStatus" }).then((res)=>{
    console.log(res)
})

// browser.runtime.onMessage.addListener((allof)=>{
//     console.log(allof)
// })

