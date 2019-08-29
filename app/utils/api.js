function getErrorMsg(message, username) {
  if (message.toLowerCase() === 'not found') {
    return `${username} doesn't exist.`
  }
}

function getRepos(username) {
  return fetch(`https://api.github.com/users/${username}/repos?&per_page=100`)
    .then(res => res.json())
    .then(repos => {
      if (repos.message) {
        // throw automatically returns no need to specify it here
        throw new Error(getErrorMsg(profile.message, username))
      }

      return repos
    })
}

function getStarCount(repos) {
  let reducedCount =  repos.reduce((count, {stargazers_count}) => (
    stargazers_count + count
  ), 0)

  return reducedCount
}

function calculateScore(followers, repos) {
  if (repos == 0) {
    if (followers > 0) {
      return followers
    }
    return 0
  }

  return (followers * 3) + getStarCount(repos)
}

function getUserData (player) {
  return Promise.all([
    getProfile(player),
    getRepos(player)
  ]).then(([ profile, repos ]) => ({
    profile,
    score: calculateScore(profile.followers, repos)
  }))
}


function getProfile(username) {
  return fetch(`https://api.github.com/users/${username}`)
  .then(res => res.json())
  .then(profile => {
    if (profile.message) {
      // throw automatically returns no need to specify it here
      throw new Error(getErrorMsg(profile.message, username))
    }

    return profile
  })
}

export function fetchPopularRepos (language) {
  const endpoint = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)
  return fetch(endpoint)
    .then(res => res.json())
    .then(data => {
      if (!data.items) {
        throw new Error(data.message)
      }
      return data.items
    })
}

function sortPlayers(players) {
  return players.sort((a,b) => b.score - a.score )
}

export function battle(players) {
  return Promise.all([
    getUserData(players[0]),
    getUserData(players[1])
  ]).then(results => {

    return sortPlayers(results)
  })
}




