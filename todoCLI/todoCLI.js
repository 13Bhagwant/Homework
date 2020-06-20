const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const cli = console.log;
cli("Welcome to Todo CLI! \n ------------------ \n");
const parse = parseInt;
const error = " Maybe it is the wrong command ";

function todoCLIFunction() {
    let mainList = [];
    function options() {
        rl.question("(v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit \n", input => {
            const cliInput = input.toLowerCase().trim();
            let listOfAllTheItems = mainList[parse(cliInput.slice(1)) - 1];
            if (cliInput === 'v') {
                if (mainList.length === 0) {
                    cli('List is empty...');
                } else {
                    for(let i = 1; i <= mainList.length ; i++) {
                        cli(`${i} ${mainList[i - 1]}`);
                    }
                }
                options();
            } else if (cliInput === 'n') {
                rl.question("What?\n", newInput => {
                    mainList.push('[ ] ' + newInput);
                    options();
                }); 
            } else if (cliInput.startsWith('c')) {
                if (parse(cliInput.slice(1)) > 0 && parse(cliInput.slice(1)) <= mainList.length) {
                    if (listOfAllTheItems.includes(' ✔ ')) {
                        cli(`${listOfAllTheItems.slice(4)} it  has already been marked`);
                        options();
                    } else {
                        mainList[parse(cliInput.slice(1)) - 1]= listOfAllTheItems.replace(' ', ' ✔ ');
                        cli(`Completed ${listOfAllTheItems.slice(4)}`);
                        options();
                    } 
                } else {
                    cli(error);
                }
                options();
            } else if (cliInput.startsWith('d')) {
                if (parse(cliInput.slice(1)) > 0 && parse(cliInput.slice(1)) <= mainList.length) { 
                    mainList.splice(parse(cliInput.slice(1)) - 1, 1);
                    cli(`Deleted ${listOfAllTheItems.slice(4)}`);
                } else {
                    cli(error);    
                }
                options();
            } else if (cliInput === 'q') {
                cli("Have a Good one! See you soon 😄");
                rl.close();
            } else {
                cli(error);
                options();
            }
        });        
    }
    options();
}

todoCLIFunction();