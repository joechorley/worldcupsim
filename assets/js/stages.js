const matchTemplate = {
    0:{
        id: 0,
        score: 0,
        goals:[],
        penalties: 0,
    },
    1: {
        id: 0,
        score: 0,
        goals:[],
        penalties: 0,
    },
    day: 0,
    timer: 0,
    result: null
}

// Group array setup
let groups = [];

for(let groupsi = 0; groupsi < 8; groupsi++) {

    groups.push([]);

    for(let i = 0; i < 4; i++) {
        groups[groupsi][i] = {id:0,mp:0,w:0,d:0,l:0,pts:0,gf:0,ga:0,gd:0};
    }
}

let groupMatches = [];

for(let groupMatchesi = 0; groupMatchesi < 8; groupMatchesi++) {

    groupMatches.push([]);

    for(let i = 0; i < 6; i++) {
        groupMatches[groupMatchesi][i] = structuredClone(matchTemplate);
    }
}

function setupGroupMatch(team0,team1,day) {

    let match = structuredClone(matchTemplate);

    match.day = day;
    match[0].id = team0;
    match[1].id = team1;

    return match;
}

let groupDays = [
    1,1,5,5,9,9
];

let groupAdvancements = [
    [0,4],[4,0],[1,5],[5,1],[2,6],[6,2],[3,7],[7,3],
]

// Knockout arrays setup

let top16Matches = [];

for(let top16Matchesi = 0; top16Matchesi < 8; top16Matchesi++) {

    top16Matches[top16Matchesi] = structuredClone(matchTemplate);
}

let quarterMatches = [];

for(let quarterMatchesi = 0; quarterMatchesi < 4; quarterMatchesi++) {

    quarterMatches[quarterMatchesi] = structuredClone(matchTemplate);
}

let semiMatches = [];

for(let semiMatchesi = 0; semiMatchesi < 2; semiMatchesi++) {

    semiMatches[semiMatchesi] = structuredClone(matchTemplate);
}

let finalMatch = structuredClone(matchTemplate);