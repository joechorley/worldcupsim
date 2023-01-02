let currentPage = 0;
let teamsGenerated = false;
let day = 0;
let matchTime = 2000;
let simInProgress = false;
let simAllProgress = false;
let groupLetter = "ABCDEFGH";

let nextMatches = [];

function reset() {
    location.reload();
}

function changePage(page) {
    document.getElementById("page_" + currentPage).style.display = "none";
    document.getElementById("navSelect_" + currentPage).style.display = "none";
    document.getElementById("navButton_" + currentPage).style.color = "#999999";
    currentPage = page;
    document.getElementById("page_" + page).style.display = "block";
    document.getElementById("navSelect_" + page).style.display = "block";
    document.getElementById("navButton_" + page).style.color = "#3EAEFE";
}

function confirmGroups() {
    if(teamsGenerated) {
        document.getElementById("controls_group").style.display = "none";
        document.getElementById("controls_sim").style.display = "block";
    }
    
}

function addDay() {

    let controlDay = document.getElementById("controlDay");
    let controlStage = document.getElementById("controlStage");
    let controlButton = document.getElementById("buttonDay");

    controlDay.innerHTML = "DAY " + (day+1);

    day += 1;
    controlButton.innerHTML = day+1;

    if(day >= 1 && day <= 12) {
        controlStage.innerHTML = "GROUP STAGE";
    } else if(day >= 13 && day <= 16) {
        controlStage.innerHTML = "TOP 16";
    } else if(day >= 17 && day <= 18) {
        controlStage.innerHTML = "QUARTER FINALS";
    }  else if(day >= 19 && day <= 20) {
        controlStage.innerHTML = "SEMI FINALS";
    } else if(day >= 21) {
        controlStage.innerHTML = "GRAND FINALS";
    }
}


function setTeams(isRandom) {

    changePage(1)

    teamsGenerated = true;

    let teamsTemp = teams.slice(0);

    for(let t = 0; t < 8; t++) {
        for(let r = 0; r < 4; r++) {

            let num = 0;

            if(isRandom) {
                num = randomInt(0,teamsTemp.length);
            }
            
            groups[t][r].id = teamsTemp[num].id;

            teams.find(x => x.id === teamsTemp[num].id).group = t;
            teams.find(x => x.id === teamsTemp[num].id).row = r;

            teamsTemp.splice(num,1);
        }
        
        groupMatches[t][0] = setupGroupMatch(groups[t][0].id,groups[t][1].id,Math.floor(t / 2) + 1);
        groupMatches[t][1] = setupGroupMatch(groups[t][2].id,groups[t][3].id,Math.floor(t / 2) + 1);
        groupMatches[t][2] = setupGroupMatch(groups[t][0].id,groups[t][2].id,Math.floor(t / 2) + 5);
        groupMatches[t][3] = setupGroupMatch(groups[t][1].id,groups[t][3].id,Math.floor(t / 2) + 5);
        groupMatches[t][4] = setupGroupMatch(groups[t][0].id,groups[t][3].id,Math.floor(t / 2) + 9);
        groupMatches[t][5] = setupGroupMatch(groups[t][1].id,groups[t][2].id,Math.floor(t / 2) + 9);


        for(let i = 0; i < 6; i++) {
            document.getElementById("matchGroup_" + t + "_" + i + "_flag_0").style.backgroundImage = "url(assets/img/flags/" + groupMatches[t][i][0].id + ".png)";
            document.getElementById("matchGroup_" + t + "_" + i + "_team_0").innerHTML = teams[groupMatches[t][i][0].id].name;
            document.getElementById("matchGroup_" + t + "_" + i + "_flag_1").style.backgroundImage = "url(assets/img/flags/" + groupMatches[t][i][1].id + ".png)";
            document.getElementById("matchGroup_" + t + "_" + i + "_team_1").innerHTML = teams[groupMatches[t][i][1].id].name;
        }

    }

    document.getElementById("confirmButton").classList = "";

    setNextMatches();

    updateTable();

    updateStats();

    console.log("Teams Generated");
}




function setNextMatches() {

    if(day == 0) {
        nextMatches = [[0,0],[0,1],[1,0],[1,1]];
    } else if(day > 0 && day <= 4) {
        nextMatches = [[(day-1)*2,0],[(day-1)*2,1],[(day-1)*2+1,0],[(day-1)*2+1,1]];
    } else if(day > 4 && day <= 8) {
        nextMatches = [[(day-5)*2,2],[(day-5)*2,3],[(day-5)*2+1,2],[(day-5)*2+1,3]];
    } else if(day > 8 && day <= 12) {
        nextMatches = [[(day-9)*2,4],[(day-9)*2,5],[(day-9)*2+1,4],[(day-9)*2+1,5]];
    }
    else if(day > 12 && day <= 16) {
        nextMatches = [(day-13)*2,(day-13)*2 + 1];
    }
    else if(day > 16 && day <= 18) {
        nextMatches = [(day-17)*2,(day-17)*2 + 1];
    }
    else if(day === 19) {
        nextMatches = [0];
    }
    else if(day === 20) {
        nextMatches = [1];
    }
    else if(day === 21) {
        nextMatches = [0];
    }
}

function updateTable() {

    for(let t = 0; t < 8; t++) {

        let groupsTemp = groups[t].slice(0);

        groupsTemp.sort(function(a, b){return b.pts - a.pts || b.gd - a.gd || b.gf - a.gf});
        
        for(let r = 0; r < 4; r++) {
            document.getElementById("table_" + t + "_flag_" + r).style.backgroundImage = "url(assets/img/flags/" + groupsTemp[r].id + ".png)";
            document.getElementById("table_" + t + "_team_" + r).innerHTML = teams[groupsTemp[r].id].name;
            document.getElementById("table_" + t + "_mp_" + r).innerHTML = groupsTemp[r].mp;
            document.getElementById("table_" + t + "_w_" + r).innerHTML = groupsTemp[r].w;
            document.getElementById("table_" + t + "_d_" + r).innerHTML = groupsTemp[r].d;
            document.getElementById("table_" + t + "_l_" + r).innerHTML = groupsTemp[r].l;
            document.getElementById("table_" + t + "_gf_" + r).innerHTML = groupsTemp[r].gf;
            document.getElementById("table_" + t + "_ga_" + r).innerHTML = groupsTemp[r].ga;
            document.getElementById("table_" + t + "_gd_" + r).innerHTML = groupsTemp[r].gd;
            document.getElementById("table_" + t + "_pts_" + r).innerHTML = groupsTemp[r].pts;
        }
        
    }
}

function updateStats() {
    let statsTemp = teams.slice(0);

    statsTemp.sort(function(a, b){return b.totalWins - a.totalWins || b.totalDraws - a.totalDraws || b.totalLosses - a.totalLosses || b.totalGoalDiff - a.totalGoalDiff || b.totalGoalsFor - a.totalGoalsFor});
        
        for(let i = 0; i < 32; i++) {

            document.getElementById("stat_flag_" + i).style.backgroundImage = "url(assets/img/flags/" + statsTemp[i].id + ".png)";
            document.getElementById("stat_team_" + i).innerHTML = statsTemp[i].name;
            document.getElementById("stat_w_" + i).innerHTML = statsTemp[i].totalWins;
            document.getElementById("stat_d_" + i).innerHTML = statsTemp[i].totalDraws;
            document.getElementById("stat_l_" + i).innerHTML = statsTemp[i].totalLosses;
            document.getElementById("stat_gf_" + i).innerHTML = statsTemp[i].totalGoalsFor;
            document.getElementById("stat_ga_" + i).innerHTML = statsTemp[i].totalGoalsAgainst;
            document.getElementById("stat_gd_" + i).innerHTML = statsTemp[i].totalGoalDiff;
        }
}

function simDay() {

    if(!simInProgress) {

        addDay();

        if(day != 1) {
            setNextMatches();
        }

        checkNextMatch();

        simInProgress = true;
        document.getElementById("buttonSimDay").classList = "buttonDisable";

        if(!simAllProgress) {
            document.getElementById("buttonSimAll").classList = "buttonDisable";
        }
    }
}

function simAll() {
    if(!simInProgress) {
        simAllProgress = true;
        document.getElementById("buttonSimAll").innerHTML = "Pause Simulation";
        simDay();
    } else {
        simAllProgress = false;
        document.getElementById("buttonSimAll").innerHTML = "Pausing...";
        document.getElementById("buttonSimAll").classList = "buttonDisable";
    }
}

function checkNextMatch() {

    if(nextMatches.length > 0) {
        // Sim next match on list
        if(day <= 12) {
            simMatch(0,nextMatches[0][1],groupMatches[nextMatches[0][0]][nextMatches[0][1]],false,"matchGroup_" + nextMatches[0][0] + "_" + nextMatches[0][1], nextMatches[0][0]);
        } else if(day > 12 && day <= 16) {
            simMatch(1,nextMatches[0],top16Matches[nextMatches[0]],true,"top16_" + nextMatches[0]);
        } else if(day > 16 && day <= 18) {
            simMatch(2,nextMatches[0],quarterMatches[nextMatches[0]],true,"quarters_" + nextMatches[0]);
        } else if(day === 19) {
            simMatch(3,nextMatches[0],semiMatches[nextMatches[0]],true,"semis_" + nextMatches[0]);
        } else if(day === 20) {
            simMatch(3,nextMatches[0],semiMatches[nextMatches[0]],true,"semis_" + nextMatches[0]);
        } else if(day === 21) {
            simMatch(4,nextMatches[0],finalMatch,true,"final");
            document.getElementById("controls_sim").style.display = "none";
        }
    } else {
        // All matches simmed for that day

        simInProgress = false;

        if(simAllProgress) {
            simDay();
        } else {
            document.getElementById("buttonSimDay").classList = "";
            document.getElementById("buttonSimAll").classList = "";
            document.getElementById("buttonSimAll").innerHTML = "Simulate All";
        }
    }
}


function simMatch(stage,matchNum,matchDetails,penaltiesAllowed,matchName,group) {

    // Set page
    if(stage === 0) {
        changePage(1);
    } else {
        changePage(0);
    }

    // Assign teams
    let match = structuredClone(matchTemplate);

    match[0].id = matchDetails[0].id;
    match[1].id = matchDetails[1].id;

    let progressBar = document.getElementById(matchName + "_progress");
    progressBar.style.display = "block";

    let timer = 0;

    let timerInterval;
    
    timerInterval = setInterval(function() {
        
        timer += 1
        progressBar.style.width = (100/200) * timer + "%";
        if(timer == 200) {
            clearInterval(timerInterval);
            progressBar.style.display = "none";
            progressBar.style.width = "0%";
        }
    
    }, matchTime / 200);

    // Roll for potential goals
    let potentialGoals = randomInt(6,12);

    let eventCount = 0;

    let eventInterval;
    
    eventInterval = setInterval(function() {

        let attackRoll0 = randomInt(0,100);
        let attackRoll1 = randomInt(0,100);

        let defenceRoll0 = randomInt(0,100);
        let defenceRoll1 = randomInt(0,100);

        // Check roll against rating and add to score
        if(attackRoll0 <= teams[match[0].id].attack && defenceRoll1 > teams[match[1].id].defence) {
            match[0].score += 1;
            match[0].goals.push(Math.floor((90/potentialGoals)* eventCount + randomInt(1, 90/potentialGoals)));
            teams[match[0].id].totalGoalsFor += 1;
            teams[match[1].id].totalGoalsAgainst += 1;
        }

        if(defenceRoll0 > teams[match[0].id].defence && attackRoll1 <= teams[match[1].id].attack) {
            match[1].score += 1;
            match[1].goals.push(Math.floor((90/potentialGoals)* eventCount + randomInt(1, 90/potentialGoals)));
            teams[match[1].id].totalGoalsFor += 1;
            teams[match[0].id].totalGoalsAgainst += 1;
        }

        document.getElementById(matchName + "_score_0").innerHTML = match[0].score;
        document.getElementById(matchName + "_score_1").innerHTML = match[1].score;
        

        eventCount += 1;
        
        if(eventCount == potentialGoals) {
            clearInterval(eventInterval);
            
            // Check who wins match
            if(match[0].score > match[1].score) {
                match.result = 0;
                teams[match[0].id].totalWins += 1;
                teams[match[1].id].totalLosses += 1;
            } else if(match[0].score < match[1].score) {
                match.result = 1;
                teams[match[1].id].totalWins += 1;
                teams[match[0].id].totalLosses += 1;
            } else {
                match.result = "Draw";

                if(!penaltiesAllowed) {
                    teams[match[0].id].totalDraws += 1;
                    teams[match[1].id].totalDraws += 1;
                }
            }

            // Pentalities if a draw in knockouts
            if(penaltiesAllowed) {
                if(match[0].score == match[1].score) {

                    // Roll for penalties
                    for(let p = 0; p < 5; p++){
                        let roll0 = randomInt(0,100);
                        let roll1 = randomInt(0,100);

                        if(roll0 <= teams[match[0].id].rating) {
                            match[0].penalties += 1;
                        }
                
                        if(roll1 <= teams[match[1].id].rating) {
                            match[1].penalties += 1;
                        }
                    }

                    // Check penalty results
                    if(match[0].penalties > match[1].penalties) {
                        match.result = 0;
                        teams[match[0].id].totalWins += 1;
                        teams[match[1].id].totalLosses += 1;
                    } else if(match[0].penalties < match[1].penalties) {
                        match.result = 1;
                        teams[match[1].id].totalWins += 1;
                        teams[match[0].id].totalLosses += 1;
                    } else {
                        // This is temporary if both teams score 5 out of 5 penalties
                        match[0].penalties += 1;
                        match.result = 0;
                        teams[match[0].id].totalWins += 1;
                        teams[match[1].id].totalLosses += 1;
                    }
                }
            }

            teams[match[0].id].totalGoalDiff += match[0].score - match[1].score;
            teams[match[1].id].totalGoalDiff += match[1].score - match[0].score;

            updateStats();

            if(stage === 0) {

                match.day = (groupDays[matchNum] + Math.floor(group / 2));

                let team0 = groups[teams[match[0].id].group][teams[match[0].id].row];
                let team1 = groups[teams[match[1].id].group][teams[match[1].id].row];

                if(match.result === 0) {
                    team0.w += 1;
                    team0.pts += 3;

                    team1.l += 1;
                } else if(match.result === 1) {
                    team0.l += 1;

                    team1.w += 1;
                    team1.pts += 3;
                } else {
                    team0.d += 1;
                    team0.pts += 1;

                    team1.d += 1;
                    team1.pts += 1;
                }

                team0.mp += 1;
                team0.gf += match[0].score;
                team0.ga += match[1].score;
                team0.gd += match[0].score - match[1].score;
                team1.mp += 1;
                team1.gf += match[1].score;
                team1.ga += match[0].score;
                team1.gd += match[1].score - match[0].score;

                document.getElementById(matchName + "_score_0").innerHTML = match[0].score;
                document.getElementById(matchName + "_score_1").innerHTML = match[1].score;

                updateTable();

                if(matchNum === 5) {
                    // After all 6 group matches, advance 1st and 2nd placed in group

                    let currentGroup = teams[match[0].id].group;

                    let groupsTemp = groups[currentGroup].slice(0);
                    groupsTemp.sort(function(a, b){return b.pts - a.pts || b.gd - a.gd || b.gf - a.gf});

                    let first = groupAdvancements[currentGroup][0];
                    let second = groupAdvancements[currentGroup][1];

                    top16Matches[first][0].id = groupsTemp[0].id;
                    top16Matches[second][1].id = groupsTemp[1].id;

                    document.getElementById("top16_" + first + "_flag_0").style.backgroundImage = "url(assets/img/flags/" + groupsTemp[0].id + ".png)";
                    document.getElementById("top16_" + first + "_team_0").innerHTML = teams[groupsTemp[0].id].name;
                    document.getElementById("top16_" + second + "_flag_1").style.backgroundImage = "url(assets/img/flags/" + groupsTemp[1].id + ".png)";
                    document.getElementById("top16_" + second + "_team_1").innerHTML = teams[groupsTemp[1].id].name;
                }

                groupMatches[group][matchNum] = match;

            } else if(stage == 1) {

                match.day = (13 + Math.floor(matchNum/2));

                document.getElementById("top16_" + matchNum + "_score_0").innerHTML = match[0].score;
                document.getElementById("top16_" + matchNum + "_score_1").innerHTML = match[1].score;

                if(match[0].penalties > 0 || match[1].penalties > 0) {
                    document.getElementById("top16_" + matchNum + "_penalty_0").innerHTML = match[0].penalties;
                    document.getElementById("top16_" + matchNum + "_penalty_1").innerHTML = match[1].penalties;
                }

                if(match.result === 0) {
                    quarterMatches[Math.floor(matchNum/2)][matchNum % 2].id = match[0].id;
                } else {
                    quarterMatches[Math.floor(matchNum/2)][matchNum % 2].id = match[1].id;
                }

                document.getElementById("quarters_" + Math.floor(matchNum/2) + "_flag_" + matchNum % 2).style.backgroundImage = "url(assets/img/flags/" + quarterMatches[Math.floor(matchNum/2)][matchNum % 2].id + ".png)";
                document.getElementById("quarters_" + Math.floor(matchNum/2) + "_team_" + matchNum % 2).innerHTML = teams[quarterMatches[Math.floor(matchNum/2)][matchNum % 2].id].name;

                top16Matches[matchNum] = match;

            } else if(stage == 2) {

                match.day = (17 + Math.floor(matchNum/2));

                document.getElementById("quarters_" + matchNum + "_score_0").innerHTML = match[0].score;
                document.getElementById("quarters_" + matchNum + "_score_1").innerHTML = match[1].score;

                if(match[0].penalties > 0 || match[1].penalties > 0) {
                    document.getElementById("quarters_" + matchNum + "_penalty_0").innerHTML = match[0].penalties;
                    document.getElementById("quarters_" + matchNum + "_penalty_1").innerHTML = match[1].penalties;
                }

                if(match.result === 0) {
                    semiMatches[Math.floor(matchNum/2)][matchNum % 2].id = match[0].id;
                } else {
                    semiMatches[Math.floor(matchNum/2)][matchNum % 2].id = match[1].id;
                }

                document.getElementById("semis_" + Math.floor(matchNum/2) + "_flag_" + matchNum % 2).style.backgroundImage = "url(assets/img/flags/" + semiMatches[Math.floor(matchNum/2)][matchNum % 2].id + ".png)";
                document.getElementById("semis_" + Math.floor(matchNum/2) + "_team_" + matchNum % 2).innerHTML = teams[semiMatches[Math.floor(matchNum/2)][matchNum % 2].id].name;

                quarterMatches[matchNum] = match;

            } else if(stage == 3) {

                match.day = (19 + matchNum);

                document.getElementById("semis_" + matchNum + "_score_0").innerHTML = match[0].score;
                document.getElementById("semis_" + matchNum + "_score_1").innerHTML = match[1].score;

                if(match[0].penalties > 0 || match[1].penalties > 0) {
                    document.getElementById("semis_" + matchNum + "_penalty_0").innerHTML = match[0].penalties;
                    document.getElementById("semis_" + matchNum + "_penalty_1").innerHTML = match[1].penalties;
                }

                if(match.result === 0) {
                    finalMatch[matchNum % 2].id = match[0].id;
                } else {
                    finalMatch[matchNum % 2].id = match[1].id;
                }

                document.getElementById("final_flag_" + matchNum % 2).style.backgroundImage = "url(assets/img/flags/" + finalMatch[matchNum % 2].id + ".png)";
                document.getElementById("final_team_" + matchNum % 2).innerHTML = teams[finalMatch[matchNum % 2].id].name;

                semiMatches[matchNum] = match;

            } else if(stage == 4) {

                match.day = 21;

                if(match[0].penalties > 0 || match[1].penalties > 0) {
                    document.getElementById("final_penalty_0").innerHTML = match[0].penalties;
                    document.getElementById("final_penalty_1").innerHTML = match[1].penalties;
                }

                document.getElementById("final_score_0").innerHTML = match[0].score;
                document.getElementById("final_score_1").innerHTML = match[1].score;

                console.log("All Matches Simluated. " + teams[match[match.result].id].name + " wins!");

                if(simAllProgress) {
                    simAllProgress = false;
                }

                document.getElementById("controls_end").style.display = "block";

                finalMatch = match;
            }

            document.getElementById(matchName).classList.add("clickable");
            document.getElementById(matchName).onclick = function() {openMatchDetails(stage,matchNum,group)};
            
            nextMatches.splice(0, 1);
            checkNextMatch();

            return match;
        }
    
    }, matchTime/potentialGoals);
}

function openMatchDetails(stage,matchNum,group) {

    let match;

    let headerString = "";

    if(stage === 0) {
        match = groupMatches[group][matchNum];
        headerString = "Group " + groupLetter[group] + " Match - Day " + match.day;
    } else if(stage === 1) {
        match = top16Matches[matchNum];
        headerString = "Top 16 Match - Day " + match.day;
    } else if(stage === 2) {
        match = quarterMatches[matchNum];
        headerString = "Quarter Finals Match - Day " + match.day;
    } else if(stage === 3) {
        match = semiMatches[matchNum];
        headerString = "Semi Finals Match - Day " + match.day;
    } else if(stage === 4) {
        match = finalMatch;
        headerString = "Grand Finals Match - Day " + match.day;
    }

    document.getElementById("matchDetailsName").innerHTML = headerString;

    document.getElementById("detailsTeam_0").innerHTML = teams[match[0].id].name;
    document.getElementById("detailsFlag_0").style.backgroundImage = "url(assets/img/flags/" + match[0].id + ".png)";
    document.getElementById("detailsTeam_1").innerHTML = teams[match[1].id].name;
    document.getElementById("detailsFlag_1").style.backgroundImage = "url(assets/img/flags/" + match[1].id + ".png)";

    document.getElementById("detailsScore_0").innerHTML = match[0].score;
    document.getElementById("detailsScore_1").innerHTML = match[1].score;

    if(match[0].penalties > 0 || match[1].penalties > 0) {
        document.getElementById("detailsPenalties_0").innerHTML = match[0].penalties;
        document.getElementById("detailsPenalties_1").innerHTML = match[1].penalties;

        document.getElementById("detailsPenalties").style.display = "block";
    } else {
        document.getElementById("detailsPenalties").style.display = "none";
    }

    let eventTable0 = document.getElementById("detailsEvents_0");

    for(let a = 0; a < match[0].score; a++) {
        createDiv("detailGoal_0_"+ a,"detailGoal","GOAL - " + match[0].goals[a] + "'",eventTable0);
    }

    let eventTable1 = document.getElementById("detailsEvents_1");

    for(let b = 0; b < match[1].score; b++) {
        createDiv("detailGoal_1_"+ b,"detailGoal","GOAL - " + match[1].goals[b] + "'",eventTable1);
    }

    toggleMatchDetails(true);
}

function toggleMatchDetails(toggle) {

    if(toggle) {
        document.getElementById("matchDetails").style.display = "block";
        document.getElementById("matchDetailsBG").style.display = "block";
    } else {
        document.getElementById("matchDetails").style.display = "none";
        document.getElementById("matchDetailsBG").style.display = "none";

        document.getElementById("detailsEvents_0").innerHTML = "";
        document.getElementById("detailsEvents_1").innerHTML = "";
    }
    
}

window.onload = function() {
    
    init();
}