const teamUrl = "https://raw.githubusercontent.com/jokecamp/FootballData/master/UEFA_European_Championship/Euro%202016/players_json/teams.json"
const playerUrl = 'https://raw.githubusercontent.com/jokecamp/FootballData/master/UEFA_European_Championship/Euro%202016/players_json/hungary-players.json'

const loadData = async () => {
  const options = { method: 'GET', mode: 'cors' }
  const teams = fetch(teamUrl, options).catch(displayError)
  const players = fetch(playerUrl, options).catch(displayError)
  const [ teamsResponse, playerResponse ] = await Promise.all([teams, players])
  if (!teamsResponse || !playerResponse) return

  const [ teamsData, playersData ] = await Promise.all([ teamsResponse.json(), playerResponse.json() ])
  displayTeamsData(teamsData.sheets.Teams)
  displayPlayers(playersData.sheets.Players)
}

const displayTeamsData = (teams) => {
  const hunTeam = teams.find(team => team.Team === 'Hungary')

  const ranking = `<b>FIFA ranking: </b>${hunTeam['FIFA ranking']}`
  const group = `<b>Group: </b>${hunTeam.Group}`
  const strength = `<h2>Strengths:</h2><p>${hunTeam.strengths}</p>`
  const weaknesses = `<h2>Weaknesses:</h2><p>${hunTeam.weaknesses}</p>`

  document.querySelector('.ranking').insertAdjacentHTML('afterbegin', ranking)
  document.querySelector('.group').insertAdjacentHTML('afterbegin', group)
  document.querySelector('.sw').insertAdjacentHTML('afterbegin', strength + weaknesses)
}

const displayPlayers = (players) => {
  let table = `
  <h2>Players info:</h2>
  <table>
  <tr>
  <th>Player</th>
  <th>Position</th>
  <th>Club</th>
  </tr>`
  players.forEach(player => {
    table += `<tr>
    <td>${player.name}</td>
    <td>${player.position}</td>
    <td>${player.club}</td>
    </tr>`
  })
  table += '</table>'
  document.querySelector('.players').insertAdjacentHTML('beforeend', table)
}

const displayError = (err) => {
  const message = `There was an error in recieving data. <br> Error message: ${err.message}`
  document.querySelector('.container').insertAdjacentHTML('beforeend', message)
}

window.onload = loadData