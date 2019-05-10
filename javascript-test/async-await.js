const sleep = (time) => new Promise((resolve ) => {
    setTimeout(resolve, time);
});

(async () => {
    for(var i = 0; i < 5; i++) {
        await sleep(1000);
        console.log(i);
    }
    await sleep(1000);
    console.log(i);
})();