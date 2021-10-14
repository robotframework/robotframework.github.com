// this will get the starcount for every GitHub repository
// that is listed in the resources-tab. Don't commit api-key!

import { libraries, tools } from '../content'

const ghToken = ''

const query = (repoName) => {
  return new Promise((resolve, reject) => {
    fetch(`https://api.github.com/repos/${repoName}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${ghToken}`
      }
    })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => reject(err))
  })
}

const getRepoName = (url) => {
  const parts = url.split('github.com/')[1].split('/')
  return `${parts[0]}/${parts[1]}`
}

const functionize = (list) => `/* eslint-disable */ export default () => (${list})`

export const getStars = () => {
  const repos = [...libraries(), ...tools()]
    .filter((item) => item.href.includes('github.com'))

  Promise.all(repos.map((repo) => query(getRepoName(repo.href))))
    .then((responses) => Promise.all(responses.map((response) => response.json())))
    .then((values) => {
      const list = values
        .map((repo) => ({
          name: repo.full_name,
          stars: repo.stargazers_count
        }))
      const a = document.createElement('a')
      const file = new Blob([functionize(JSON.stringify(list))], { type: 'text/plain' })
      a.href = URL.createObjectURL(file)
      a.download = 'stars.js'
      a.click()
    })
}
