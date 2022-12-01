export function roll (sides, dice, rolls) {
    var results = [];
    
    for (let i = 0; i < rolls; i++) {
        var num = 0;
        for (let j = 0; j < dice; j++) {
            num = num + Math.floor(Math.random() * sides) + 1;
        }
        results.push(num);
    }

    const output = {
        "sides" : sides,
        "dice" : dice,
        "rolls" : rolls,
        "results" : results
    }
    console.log(JSON.stringify(output));
}
