console.log("Starting program....");
let i = 0;
const id = setInterval(() => { console.log(`In timeout: ${++i}`); if (i >= 10)
    clearInterval(id); }, 1000);
console.log("Ending program....");
//# sourceMappingURL=index.js.map