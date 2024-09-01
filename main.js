/**
 * timer for web returns timeout - spend time 
 * @param {Int} secs, seconds for timeout
 * @returns {Int}, 
 */
function* timer(secs) {
    time = setInterval(() => {
        secs-=1
        if (!secs) clearInterval(time)
        
        yield secs
    }, 1000)
}


const storage = new Storage();

const jsonData = { "hel": "lo" };
storage.save(jsonData);

storage.load().then(data => {
if (data) {
    console.log('Loaded data:', data);
}
});

