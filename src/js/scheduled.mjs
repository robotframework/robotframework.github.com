// used to update repo stars and milestones via a GH action
// usage: node scheduled.js

import libraries from '../content/resources/libraries.mjs'
import tools from '../content/resources/tools.mjs'
import * as fs from 'fs'
import * as https from 'https'

const ghToken = process.env.GH_API_KEY
const getDir = () => {
  // output must be different if run on page build (push to master) or scheduled daily run
  if (process.argv[2] === 'scheduled') return './livedata-temp'
  if (process.argv[2] === 'build') return './public/livedata'
  return '../../public/livedata' // run without arguments locally to update local dev version
}
const destinationFolder = getDir()

const request = (url) => {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${ghToken}`,
        'user-agent': 'node.js'
      }
    }
    const req = https.get(url, options, (res) => {
      let data = ''
      if (res.statusCode < 200 || res.statusCode > 299) {
        reject(new Error(`${res.statusCode} on ${url}`))
      }
      res.on('data', (chunk) => { data += chunk })
      res.on('end', () => resolve(JSON.parse(data)))
    })
    req.on('error', (err) => reject(err))
  })
}

const getMilestones = async() => {
  //
  // called for every milestone, returns the milestone populated with issues
  const getIssues = async(milestone) => {
    try {
      const issues = await request(`https://api.github.com/search/issues?q=repo:robotframework/robotframework+milestone:${milestone.title}`)
      return {
        ...milestone,
        issues
      }
    } catch (err) {
      throw new Error(err)
    }
  }

  try {
    const milestonesOpen = await request('https://api.github.com/repos/robotframework/robotframework/milestones')
    const milestonesClosed = await request('https://api.github.com/repos/robotframework/robotframework/milestones?state=closed&direction=desc&per_page=3')

    const withIssues = await Promise.all([...milestonesOpen, ...milestonesClosed].map(async(milestone) => await getIssues(milestone)))

    fs.writeFileSync(`${destinationFolder}/milestones.js`, JSON.stringify(withIssues))
    console.log('milestones-file created succesfully!')
  } catch (err) {
    throw new Error(err)
  }
}

const getStars = async() => {
  //
  // called for every repo in libraries and tools
  const getRepo = async(repoName) => await request(`https://api.github.com/repos/${repoName}`)
  const getRepoName = (url) => {
    const cleanUrl = url.split('#')[0]
    const parts = cleanUrl.split('github.com/')[1].split('/')
    return `${parts[0]}/${parts[1]}`
  }
  const repos = [...libraries(), ...tools()]
    .filter((item) => item.href.includes('github.com'))

  try {
    const withStars = await Promise.all(repos.map(async(repo) => await getRepo(getRepoName(repo.href))))

    const stripped = withStars.map((repo) => ({
      name: repo.full_name,
      stars: repo.stargazers_count
    }))

    fs.writeFileSync(`${destinationFolder}/stars.js`, JSON.stringify(stripped))
    console.log('stars-file created succesfully!')
  } catch (err) {
    throw new Error(err)
  }
}

if (!fs.existsSync(destinationFolder)) fs.mkdirSync(destinationFolder, { recursive: true }, (err) => { throw new Error(err) })
getMilestones()
  .then(() => {
    getStars()
      .then(() => {
        process.exit(0)
      })
      .catch((err) => {
        console.error(err)
        process.exit(1)
      })
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
