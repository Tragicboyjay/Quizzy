const questionsArray = [
    {
        question: 'Which NBA team has won the most championships?',
        answer: 'Boston Celtics',
        multipleChoice: {
            A: 'Los Angeles Lakers',
            B: 'Boston Celtics',
            C: 'Chicago Bulls',
            D: 'Miami Heat'
        }
    },
    {
        question: 'Who holds the record for the most points scored in a single NBA game?',
        answer: 'Wilt Chamberlain',
        multipleChoice: {
            A: 'Wilt Chamberlain',
            B: 'Kobe Bryant',
            C: 'LeBron James',
            D: 'Michael Jordan'
        }
    },
    {
        question: 'Which player is known as "The Answer"?',
        answer: 'Allen Iverson',
        multipleChoice: {
            A: "Shaquille O'Neal",
            B: 'Tim Duncan',
            C: 'Kevin Garnett',
            D: 'Allen Iverson'
        }
    },
    {
        question: 'Who was the first overall pick in the 2003 NBA Draft?',
        answer: 'LeBron James',
        multipleChoice: {
            A: 'LeBron James',
            B: 'Dwyane Wade',
            C: 'Chris Bosh',
            D: 'Carmelo Anthony' 
        }
    },
    {
        question: 'Which NBA team drafted Dirk Nowitzki before trading him to the Dallas Mavericks?',
        answer: 'Milwaukee Bucks',
        multipleChoice: {
            A: 'Los Angeles Clippers',
            B: 'Boston Celtics',
            C: 'San Antonio Spurs',
            D: 'Milwaukee Bucks'
        }
    },
    {
        question: 'Who holds the record for the most three-pointers made in NBA history?',
        answer: 'Stephen Curry',
        multipleChoice: {
            A: 'Stephen Curry',
            B: 'Reggie Miller',
            C: 'Ray Allen',
            D: 'Steve Nash'
        }
    },
    {
        question: 'Which NBA team is known for their "Showtime" era during the 1980s?',
        answer: 'Los Angeles Lakers',
        multipleChoice: {
            A: 'Chicago Bulls',
            B: 'Detroit Pistons',
            C: 'Los Angeles Lakers',
            D: 'Houston Rockets'
        }
    },
    {
        question: 'Who was the first Chinese-born player to be selected in the NBA Draft?',
        answer: 'Yao Ming',
        multipleChoice: {
            A: 'Jeremy Lin',
            B: 'Zhou Qi',
            C: 'Yao Ming',
            D: 'Wang Zhizhi'
        }
    },
    {
        question: 'Which player is known as "The Greek Freak"?',
        answer: 'Giannis Antetokounmpo',
        multipleChoice: {
            A: 'Nikola Jokić',
            B: 'Luka Dončić',
            C: 'Kristaps Porziņģis',
            D: 'Giannis Antetokounmpo'
        }
    },
    {
        question: 'Who is the all-time leading scorer in NCAA men\'s basketball history?',
        answer: 'Pete Maravich',
        multipleChoice: {
            A: 'Christian Laettner',
            B: 'Pete Maravich',
            C: 'Tyler Hansbrough',
            D: 'Jimmer Fredette'
        }
    }
];


// keep track of score

let corectAnswerCount = 0;
const numberOfQuestions = 10
let questionCount = 0;


// game states 

const startScreen = document.getElementById('startScreen');
const questionScreen = document.getElementById('questionContainer');
const answerCheckScreen = document.getElementById('answerCheckScreen');

// buttons

const startButton = document.getElementById('startButton');

const nextQuestionButton = document.getElementById('nextQuestion');

const playAgain = document.getElementById('playAgain');

// game functions

function startGame() {
    startScreen.style.display = 'none';
    questionScreen.style.display = 'flex';
    getQuestion(questionsArray)

}

function getQuestion(array) {
    // set what question youre on

    // clear screen

    answerCheckScreen.style.display = 'none';
    questionScreen.style.display = 'flex';

    // end game when there are no questions left

    if(array.length != 0){
        // udate score

        const scoreCount = document.getElementById('scoreCount');
        scoreCount.innerText = ('Corect Answers: ' + corectAnswerCount);

        const whichQuestion = document.getElementById('questionNumber');
        whichQuestion.innerText = 'Question ' + (questionCount += 1) + '/' + numberOfQuestions;
    

        // generate random question

       const randomIndex = Math.floor(Math.random() * array.length);
        
        const randomQuestion = array[randomIndex];

        // load random question

        const questionText = document.getElementById('question');
        questionText.innerText = randomQuestion.question;

        // load answer buttons
        
        const answersContainer = document.getElementById('answersContainer');
        answersContainer.innerHTML = ''

        for (const option in randomQuestion.multipleChoice) {
            if (randomQuestion.multipleChoice.hasOwnProperty(option)) {

            const answerButton = document.createElement('button');
            answerButton.classList.add('btn');
            
            answerButton.textContent = option + ': ' + randomQuestion.multipleChoice[option];
            answerButton.value =  randomQuestion.multipleChoice[option];
            answersContainer.appendChild(answerButton)
            }
        }


        // remove question from list

        array.splice(randomIndex, 1);

        // register which answer is clicked
    
        answersContainer.addEventListener('click', (event) => {
            if (event.target.tagName === 'BUTTON') {
                const selectedAnswer = event.target.value; 
                verifyAnswer(selectedAnswer, randomQuestion.answer);
            }
        });


    }else{
        endGame(array);
    }

}


function verifyAnswer(answer, questionAnswer, questionsArray) {
    // update screen

    questionScreen.style.display = 'none';
    answerCheckScreen.style.display = 'flex';

    const answerCheckScreenTitle = document.getElementById('answerCheckScreenTitle');
    const answerCheckScreenImg = document.getElementById('answerCheckScreenImg');
    const correctAnswer = document.getElementById('correctAnswer');
    correctAnswer.innerText = ''

    // change button text if game is ending

    if (questionsArray === 0){
        nextQuestionButton.textContent('End game');
    }

    // update screen according to the answer

    if(answer === questionAnswer ) {
        correctAnswer.style.display = 'none';
        answerCheckScreenTitle.innerText = 'Your answer is correct!'
        answerCheckScreenImg.style.color = '#50AA6B'
        answerCheckScreenImg.classList.remove("fa-circle-xmark");
        answerCheckScreenImg.classList.add("fa-circle-check");
        corectAnswerCount += 1;     
    }else {
        answerCheckScreenTitle.innerText = 'Your answer is in-correct :(';
        correctAnswer.innerText = 'The correct answer is: ' + questionAnswer;
        correctAnswer.style.display = 'block';
        answerCheckScreenImg.style.color = 'red'
        answerCheckScreenImg.classList.remove("fa-circle-check");
        answerCheckScreenImg.classList.add("fa-circle-xmark");
    }
    
};

// end game screen

function endGame() {
    const endGameScreen = document.getElementById('endGameScreen');
    const finalScore = document.getElementById('finalScore');

    questionScreen.style.display = 'none';
    endGameScreen.style.display = 'flex';
    // array.length is 0 at the game so i need a way to figure that out.
    finalScore.innerText = 'You got ' + corectAnswerCount + ' out of ' + numberOfQuestions + '.';
}

// button maps

startButton.addEventListener('click', startGame);
nextQuestionButton.addEventListener('click', () => getQuestion(questionsArray));
playAgain.addEventListener('click', () => location.reload());
