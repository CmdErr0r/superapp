browser.newtab.override({
    url: "newtab.html"
})


document.addEventListener('DomContentLoader', ()=>{
    console.log("nag:",nagivator,"and", 'getBattery' in nagivator)
})

console.log(1)