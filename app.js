let bank = 100
let mostMoneyOwned = 100
let currentWinStreak = 0

//players: name, teamNumber, emoji, skill
const players = [
    {
        name: "D'Marcus Williums",
        teamNumber: 0,
        emoji: '🏃‍♂️',
        skill: 10
    },
    {
        name: "Tyroil Smoochie-Wallace",
        teamNumber: 0,
        emoji: '🤾‍♂️',
        skill: 30
    },
    {
        name: "Jackmerius Tacktheratrix",
        teamNumber: 0,
        emoji: '🏇',
        skill: 88
    },
    {
        name: "Javaris Jamar Javarison-Lamar",
        teamNumber: 0,
        emoji: '🏌️‍♀️',
        skill: 15
    },
    {
        name: "D'Pez Poopsie",
        teamNumber: 0,
        emoji: '🏋️‍♂️',
        skill: 77
    },
    {
        name: "D'Jasper Probincrux III",
        teamNumber: 0,
        emoji: '🏌️‍♂️',
        skill: 21
    },
    {
        name: "Leoz Maxwell Jilliumz",
        teamNumber: 0,
        emoji: '🤾',
        skill: 5
    },
    {
        name: "Hingle McCringleberry",
        teamNumber: 0,
        emoji: '🏂',
        skill: 99
    },
    {
        name: "L'Carpetron Dookmarriot",
        teamNumber: 0,
        emoji: '🧘‍♀️',
        skill: 50
    },
    {
        name: "Xmus Jaxon Flaxon-Waxon",
        teamNumber: 0,
        emoji: '🚶‍♀️',
        skill: 1
    },
    {
        name: "Saggitariutt Jefferspin",
        teamNumber: 0,
        emoji: '🏋️‍♀️',
        skill: 61
    },
    {
        name: "Quatro Quatro",
        teamNumber: 0,
        emoji: '🤺',
        skill: 34
    },
    {
        name: "X-Wing @Aliciousness",
        teamNumber: 0,
        emoji: '🏄',
        skill: 71
    },
    {
        name: "Bisquiteen Trisket",
        teamNumber: 0,
        emoji: '🧜‍♂️',
        skill: 76
    },
    {
        name: "Scoish Velociraptor Maloish",
        teamNumber: 0,
        emoji: '🤸',
        skill: 47
    },
    {
        name: "Donkey Teeth",
        teamNumber: 0,
        emoji: '⛹️‍♀️',
        skill: 23
    },
    {
        name: "T.J. A.J. R.J. Backslashinfourth V",
        teamNumber: 0,
        emoji: '🕴️',
        skill: 58
    },
    {
        name: "Firstname Lastname",
        teamNumber: 0,
        emoji: '💃',
        skill: 99
    },
    {
        name: "Dan Smith",
        teamNumber: 0,
        emoji: '🧍‍♂️',
        skill: 3
    },
    {
        name: "Tiger",
        teamNumber: 0,
        emoji: '🐅',
        skill: 100
    },
]

let teamOnePlayers = []
let teamTwoPlayers = []

function AssignTeams() {
    teamOnePlayers = []
    teamTwoPlayers = []
    let teamOneMemberIcons = ''
    let teamTwoMemberIcons = ''

    players.forEach(player => {
        player.teamNumber = Math.ceil(Math.random() * 2)
        if (player.teamNumber == 1) {
            teamOnePlayers.push(player)
            teamOneMemberIcons += player.emoji
        }
        else {
            teamTwoPlayers.push(player)
            teamTwoMemberIcons += player.emoji
        }
    })

    let teamOneText = document.getElementById('team-1')
    let teamTwoText = document.getElementById('team-2')
    teamOneText.innerText = teamOneMemberIcons
    teamTwoText.innerText = teamTwoMemberIcons
}

function BetAmount(team, betAmount) {
    let winner = CheckStrongerTeam()
    let result = ''
    if (team == winner) {
        bank += betAmount
        FadeText(betAmount)
        currentWinStreak++
        result = "You Won the Bet"
    }
    else if (winner == 0) {
        currentWinStreak = 0
        result = "It was a tie, no money change"
    }
    else {
        bank -= betAmount
        FadeText(-betAmount)
        currentWinStreak = 0
        result = "You Lost the Bet"
    }

    PostResults(result)
}

function AllIn(team) {
    let winner = CheckStrongerTeam()
    let result = ''
    if (team == winner) {
        bank += bank
        FadeText(bank)
        currentWinStreak++
        result = "You Won the Bet"
    }
    else if (winner == 0) {
        currentWinStreak = 0
        result = "It was a tie, no money change"
    }
    else {
        currentWinStreak = 0
        FadeText(-bank)
        bank = 0
        result = "You Lost the Bet"
    }

    PostResults(result)
}

function PostResults(resultText) {
    if (bank > mostMoneyOwned) mostMoneyOwned = bank
    BankBustCheck()

    window.localStorage.setItem("high-bank", JSON.stringify(mostMoneyOwned))

    let result = document.getElementById("result")
    let playerMoney = document.getElementById("bank")
    let winStreak = document.getElementById("win-streak")

    result.innerText = resultText
    playerMoney.innerText = '$' + bank.toString()
    winStreak.innerText = currentWinStreak.toString()

    LoadHighBank()
    AssignTeams()
}

function BankBustCheck() {
    if (bank < 0) {
        bank = 100
        window.alert("You went negative, lets go again 🤑")
    }
}

function CheckStrongerTeam() {
    let teamOnePower = 0
    let teamTwoPower = 0
    teamOnePlayers.forEach(player => teamOnePower += player.skill)
    teamTwoPlayers.forEach(player => teamTwoPower += player.skill)

    if (teamOnePower > teamTwoPower) {
        return 1
    }
    else if (teamTwoPower > teamOnePower) {
        return 2
    }
    else {
        return 0
    }
}

function LoadHighBank() {
    mostMoneyOwned = JSON.parse(window.localStorage.getItem("high-bank"))

    let highestBank = document.getElementById("highest-bank")
    highestBank.innerText = '$' + mostMoneyOwned.toString()
}

function FadeText(moneyChange) {
    let text = document.getElementById("money-fade")
    text.innerText = "$" + moneyChange

    text.classList.remove("opaque-text")

    if (moneyChange > 0) {
        text.classList.add("invis-text-gain")
        setTimeout(() => {
            text.classList.add("opaque-text")
            text.classList.remove("invis-text-gain")
        }, 500)
    }
    else {
        text.classList.add("invis-text-loss")
        setTimeout(() => {
            text.classList.add("opaque-text")
            text.classList.remove("invis-text-loss")
        }, 500)
    }
}

LoadHighBank()
AssignTeams()