function init() {

    // Generate each Table
    for(let t = 0; t < 8; t++) {
        let divTable = document.getElementById("table_" + t);

        let divTableTop = createDiv(null,"table_row table_top",null,divTable);

        createDiv(null,"table_team_header","Team",divTableTop);
        createDiv(null,null,"MP",divTableTop);
        createDiv(null,null,"W",divTableTop);
        createDiv(null,null,"D",divTableTop);
        createDiv(null,null,"L",divTableTop);
        createDiv(null,null,"GF",divTableTop);
        createDiv(null,null,"GA",divTableTop);
        createDiv(null,null,"GD",divTableTop);
        createDiv(null,"table_pts","Pts",divTableTop);

        for(let r = 0; r < 4; r++) {

            let divRow = createDiv(null,"table_row",null,divTable);

            createDiv("table_" + t + "_flag_" + r,"flag","",divRow);
            createDiv("table_" + t + "_team_" + r,"table_team","-",divRow);
            createDiv("table_" + t + "_mp_" + r,null,"-",divRow);
            createDiv("table_" + t + "_w_" + r,null,"-",divRow);
            createDiv("table_" + t + "_d_" + r,null,"-",divRow);
            createDiv("table_" + t + "_l_" + r,null,"-",divRow);
            createDiv("table_" + t + "_gf_" + r,null,"-",divRow);
            createDiv("table_" + t + "_ga_" + r,null,"-",divRow);
            createDiv("table_" + t + "_gd_" + r,null,"-",divRow);
            createDiv("table_" + t + "_pts_" + r,"table_pts bold_pts","-",divRow);
        }

        for(let m = 0; m < 6; m++) {

            let divMatch = document.getElementById("matchGroup_" + t + "_" + m);
            setUpMatchDivs("matchGroup",divMatch,m,t);
            document.getElementById("matchGroup_" + t + "_" + m + "_day").innerHTML = "DAY " + (groupDays[m] + Math.floor(t / 2));
        }
    }
    console.log("Tables Generated");

    // Generate Knockout matches
    for(let m1 = 0; m1 < 8; m1++) {

        let divMatch = document.getElementById("top16_" + m1);
        setUpMatchDivs("top16",divMatch,m1);
        document.getElementById("top16_" + m1 + "_day").innerHTML = "DAY " + (13 + Math.floor(m1/2));
    }

    for(let m2 = 0; m2 < 4; m2++) {

        let divMatch = document.getElementById("quarters_" + m2);
        setUpMatchDivs("quarters",divMatch,m2);
        document.getElementById("quarters_" + m2 + "_day").innerHTML = "DAY " + (17 + Math.floor(m2/2));
    }

    for(let m3 = 0; m3 < 2; m3++) {
        
        let divMatch = document.getElementById("semis_" + m3);
        setUpMatchDivs("semis",divMatch,m3);
        document.getElementById("semis_" + m3 + "_day").innerHTML = "DAY " + (19 + m3);
    }

    //let divMatchThird = document.getElementById("third");
    //setUpMatchDivs("third",divMatchThird,null);
    //document.getElementById("third_day").innerHTML = "DAY 21"

    let divMatchFinal = document.getElementById("final");
    setUpMatchDivs("final",divMatchFinal,null);
    document.getElementById("final_day").innerHTML = "DAY 21";

    console.log("Knockout Matches Generated");

    let divStats = document.getElementById("stats");

    let divRowTop = createDiv(null,"stat_row stat_top",null,divStats);

    createDiv(null,null,"#",divRowTop);
    createDiv(null,"stat_team_header","Team",divRowTop);
    createDiv(null,null,"Wins",divRowTop);
    createDiv(null,null,"Draws",divRowTop);
    createDiv(null,null,"Losses",divRowTop);
    createDiv(null,null,"GF",divRowTop);
    createDiv(null,null,"GA",divRowTop);
    createDiv(null,null,"GD",divRowTop);

    for(let s = 0; s < 32; s++) {

        let divRow = createDiv(null,"stat_row",null,divStats);

        createDiv("stat_rank_" + s,null,s+1,divRow);
        createDiv("stat_flag_" + s,"flag","",divRow);
        createDiv("stat_team_" + s,"stat_team","-",divRow);
        createDiv("stat_w_" + s,null,"-",divRow);
        createDiv("stat_d_" + s,null,"-",divRow);
        createDiv("stat_l_" + s,null,"-",divRow);
        createDiv("stat_gf_" + s,null,"-",divRow);
        createDiv("stat_ga_" + s,null,"-",divRow);
        createDiv("stat_gd_" + s,null,"-",divRow);
    }

    console.log("Statistic table Generated");
}

function setUpMatchDivs(name,parent,matchNum,groupNum){

    let nameFormat;

    if(name == "matchGroup") {
        nameFormat = name + "_" + groupNum + "_" + matchNum;
    } else if(matchNum !== null) {
        nameFormat = name + "_" + matchNum;
    } else {
        nameFormat = name;
    }

    createDiv(nameFormat + "_day","matchDay","Day #",parent);

    let divTeam0 = createDiv("team_0","matchTeam0","",parent);
    let divTeam1 = createDiv("team_1","matchTeam1","",parent);

    createDiv(nameFormat + "_flag_0","matchFlag","",divTeam0);
    createDiv(nameFormat + "_team_0","matchTeam","-",divTeam0);
    createDiv(nameFormat + "_score_0","matchScore","-",divTeam0);

    if(name !== "matchGroup") {
        createDiv(nameFormat + "_penalty_0","matchPenalty","",divTeam0);
    }
    
    createDiv(nameFormat + "_flag_1","matchFlag","",divTeam1);
    createDiv(nameFormat + "_team_1","matchTeam","-",divTeam1);
    createDiv(nameFormat + "_score_1","matchScore","-",divTeam1);
    
    if(name !== "matchGroup") {
        createDiv(nameFormat + "_penalty_1","matchPenalty","",divTeam1);
    }

    createDiv(nameFormat + "_progress","progressBar","",parent);
}