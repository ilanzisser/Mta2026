

console.log( "Starting program....");
let i = 1;
setInterval( () => { console.log( `In timeout: ${++i}` ) }, 1000 )
console.log( "Ending program....");