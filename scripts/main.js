let player = {
    funds: 0,
    winnings: 0,
};

// set up number arrays
const numbers = ['0','00','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36'];
const firstTwelve = numbers.slice(2,14);
const secondTwelve = numbers.slice(14,26);
const thirdTwelve = numbers.slice(26,38);
const firstHalf = numbers.slice(2,20);
const secondHalf = numbers.slice(20,38);
const blackNum = ['2','4','6','8','10','11','13','15','17','20','22','24','26','28','29','31','33','35'];
const redNum = ['1','3','5','7','9','12','14','16','18','19','21','23','25','27','30','32','34','36'];
const firstRow = ['3','6','9','12','15','18','21','24','27','30','33','36'];
const secondRow = ['2','5','8','11','14','17','20','23','26','29','32','35'];
const thirdRow = ['1','4','7','10','13','16','19','22','25','28','31','34']

let even = [];
let odd = [];
let i=2;
while (i<numbers.length){
    if (i%2 == 0){
        odd.push(numbers[i]);
    } else {
        even.push(numbers[i]);
    }
    i++;
}

// get DOM elements

const placeBet = document.querySelector("#place-bet");
const rolledNum = document.querySelector("#rolled-num");
const wager = document.querySelector("#bet-amount");
const funds = document.querySelector("#funds");
const depositBtn = document.querySelector("#deposit");
const deposit = document.querySelector("#deposit-amount");
const table = document.querySelector("table");
const choiceShow = document.querySelector("#bet-selected");
const cellEl = document.querySelector("td");
const currentResult = document.querySelector("#result");


function rollRoulette(numbers){
    return numbers[Math.floor(Math.random()*numbers.length)];
}


// deposit funds
depositBtn.addEventListener('click',function(evt){
    
    if (deposit.value != false){
        if (deposit.value >0){
        player.funds = player.funds + parseFloat(deposit.value);
        funds.innerHTML = "Funds: " + parseFloat(player.funds).toFixed(2) + "$";
        deposit.value = '';
        } else{

        }
    }
})

// choose bet 
let choice=[];

table.addEventListener("click",function(evt){
    choice = [];
    if (evt.target.tagName == 'TD'){
        choice = 0;    
        choiceShow.innerHTML = "Your current choice is: " + evt.target.textContent

        // assign to choice array of chosen bet

        if (evt.target.matches(".number")){
            choice = evt.target.textContent

        } else if (evt.target.matches(".main-black")){
                choice = blackNum;
        } else if (evt.target.matches(".main-red")){
            choice = redNum;
        }
        else if (evt.target.matches(".main-even")){
            choice = even;
        }
        else if (evt.target.matches(".main-odd")){
            choice = odd;
        }
        else if (evt.target.matches(".first-half")){
            choice = firstHalf;
        }
        else if (evt.target.matches(".second-half")){
            choice = secondHalf;
        }
        else if (evt.target.matches(".first-twelve")){
            choice = firstTwelve;
        }
        else if (evt.target.matches(".second-twelve")){
            choice = secondTwelve;
        }
        else if (evt.target.matches(".third-twelve")){
            choice = thirdTwelve;
        }
        else if (evt.target.matches(".row-1-bet")){
            choice = firstRow;
        }
        else if (evt.target.matches(".row-2-bet")){
            choice = secondRow;
        }
        else if (evt.target.matches(".row-3-bet")){
            choice = thirdRow;
        }
    }
})

// place bet
placeBet.addEventListener('click',function(evt){
    wagerValue = parseFloat(wager.value).toFixed(2)
    if(player.funds < wagerValue) {
        funds.innerHTML = "Funds: " + player.funds + "$" + "  Deposit more funds!"
    }
    
    if (wager.value != false && choice != 0 && player.funds >= wagerValue ){
    num = rollRoulette(numbers);
    rolledNum.innerHTML = "Rolled Number: " + num;
    
    if (choice.includes(num)){
        if(choice == redNum || choice == blackNum || choice == odd || choice == even || choice == firstHalf || choice == secondHalf){
            player.funds = player.funds + parseFloat(wagerValue);
            currentResult.innerHTML = "Congratulations, You Win! " + wagerValue + "$ have been added to your funds."
        } else if (choice == firstRow || choice == secondRow || choice == thirdRow || choice == firstTwelve || choice == secondTwelve || choice == thirdTwelve){
            player.funds = player.funds + 2*parseFloat(wagerValue);
            currentResult.innerHTML = "Congratulations, You Win! " + 2*wagerValue + "$ have been added to your funds."
        } else if (choice == num){
            player.funds = player.funds + 35*parseFloat(wagerValue);
            currentResult.innerHTML = "Congratulations, You Win! " + 35*wagerValue + "$ have been added to your funds."
        } 
    } else {
        player.funds = player.funds - parseFloat(wagerValue);
        currentResult.innerHTML = "You Lose!"
    }
    funds.innerHTML = "Funds: " + parseFloat(player.funds).toFixed(2) + "$";
    }
    choice = [];
    choiceShow.innerHTML = "Please make a choice in the table above."
})

