    // debugger;
let button = document.getElementById('button');
button.onclick = function(){

    //access to inputs by dom
    let team1_score = document.getElementsByTagName('INPUT')[0];
    let team2_score = document.getElementsByTagName('INPUT')[1];

    //access to spans for showing information by dom
    let winnerTeam = document.getElementById('winnerTeam');
    let errorMessage = document.getElementById('errorMessage');
    let combinationsList1 = document.getElementById('combinationsList1');
    let combinationsList2 = document.getElementById('combinationsList2');

    //calculating all goals for detecting, is there more than 7 goals in total
    let allGoals = +team1_score.value + +team2_score.value;

    //access to textareas by dom
    let team1_players = document.getElementsByTagName('textarea')[0].value.split('\n');
    let team2_players = document.getElementsByTagName('textarea')[1].value.split('\n');

    //arrow function for comparing goals of both team
    const compareGoals = (allGoals) => {
        if (allGoals > 7){
            errorMessage.innerHTML = "the combined number of goals cant be greater than 7";
        } else {
            winnerTeam.innerHTML = team1_score.value > team2_score.value ? "Team1" : "Team2";
        }
    }

    //arrow function to get all possible combination
    const possibleCombinations = (goalsAmount) => {
        const result = [];

        for (let i = goalsAmount; i > 0; i -= 1) {
            let goals = [];
            let temp = goalsAmount;
            while (temp > 0 && temp - i >= 0) {
                goals.push(i);
                temp -= i;
            }
            while (temp > 0) {
                goals.push(temp);
                temp -= 1;
            }
            result.push("[" + goals + "]")
        }
        return result;
    }


    if((+team1_score.value && !isNaN(+team1_score.value) && +team2_score.value && !isNaN(+team2_score.value))
    || (+team1_score.value === 0 || +team2_score.value === 0)){
        if (+team1_score.value > 5){
            errorMessage.innerHTML = "Team1 has more than 5 goals. Typically teams can score no greater than 5 goals. Change it to the less number and press to button again."
        } else if (+team2_score.value > 5){
            errorMessage.innerHTML = "Team2 has more than 5 goals. Typically teams can score no greater than 5 goals. Change it to the less number and press to button again.";
        } else {
            compareGoals(allGoals)
        }
    } else {
        console.log("Check")
    }


    //publishing all possible combinations of goals
    combinationsList1.innerHTML = possibleCombinations(team1_score.value);
    combinationsList2.innerHTML = possibleCombinations(team2_score.value);

    //publishing list of players to console log
    if (+team1_players.length === 11) {
        console.log("Team1 Players' list");
        team1_players.forEach(item => console.log(item));
    } else if (team1_players.length < 11) {
        errorMessage.innerHTML = "Team1 hasn't enough players. Please, write " + (11 - team1_players.length) + " more missing players";
    } else {
        errorMessage.innerHTML = "Team1 has too many players. Please, remove " + (team1_players.length - 11) + " players";
    }

    if (team2_players.length === 11) {
        console.log("Team2 Players' list");
        team2_players.forEach(item => console.log(item));
    } else if (team1_players.length < 11) {
        errorMessage.innerHTML = "Team2 hasn't enough players. Please, write " + (11 - team2_players.length) + " more missing players";
    } else {
        errorMessage.innerHTML = "Team2 hasn't enough players. Please, write " + (11 - team2_players.length) + " more missing players";
    }
    document.getElementById("resultsBlock").style.display = "block";

}
