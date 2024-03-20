let bank = 100

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
    let result = document.getElementById("result")
    if (team == winner) {
        bank += betAmount
        result.innerText = "You Won the Bet"
    }
    else if (winner == 0) {
        result.innerText = "It was a tie, no money change"
    }
    else {
        bank -= betAmount
        result.innerText = "You Lost the Bet"
    }

    let playerMoney = document.getElementById("bank")
    playerMoney.innerText = bank.toString()

    AssignTeams()
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

AssignTeams()