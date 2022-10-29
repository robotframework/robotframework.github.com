const baseURL = 'https://robotframework.org/live/Examples'

const getProjectsList = () => new Promise((resolve) => {
  fetch(`${baseURL}/index.json`)
    .then((res) => res.json())
    .then((json) => resolve(json))
})

const getRobotFrameworkVersions = () => new Promise((resolve) => {
  fetch('https://pypi.org/pypi/robotframework/json')
    .then((res) => res.json())
    .then((json) => resolve(Object.keys(json.releases).reverse()))
})

const getProjectFromGitHub = async(ghURL) => {
  const [url, user, repo, branch, path] = ghURL.match(/^(?:https:\/\/github\.com\/(.+?)\/(.+?)(?:\/tree\/(.+?)(?:\/(.+?))?)?)?\/?$/)
  console.log(`Fetching example from GitHub project: ${url}`)
  const downloadURL = `https://raw.githubusercontent.com/${user}/${repo}/${branch || 'main'}${(path) ? '/' + path : ''}`
  console.log(downloadURL)
  var project = await getProject(downloadURL)
  // project.description = `## ⚠️ Caution: User Created Content\n\nBe aware that this code is created by a user of that page and not by Robot Framework Foundation. Therefore we are not liable for the content. The code is loaded from the following GitHub Repo.\n<a href="${url}" target="_blank">${url}</a>\n\nIf you run this code it will be executed in your browser.\n\n---\n${project.description}`
  return project
}

const getProjectFromLiveDir = async(projectDir) => {
  const projectUrl = `${baseURL}/${projectDir}`
  return getProject(projectUrl)
}

const getProject = async(projectUrl) => {
  console.log(`Loading data from ${projectUrl}`)
  const configFile = await fetch(projectUrl + '/config.json')
    .then(response => response.json())
  var project = { name: configFile.name, files: [], description: '' }
  if (configFile.robotVersion) {
    project.robotVersion = configFile.robotVersion
  }
  const descriptionFileName = configFile.description
  if (descriptionFileName) {
    project.description = await fetch(projectUrl + '/' + descriptionFileName)
      .then(response => response.text())
  }
  for (const file of configFile.files) {
    const { fileName, hidden } = file
    const content = await fetch(projectUrl + '/' + fileName)
      .then(response => response.text())
    project.files.push({
      fileName,
      hidden,
      content
    })
  }
  return project
}

export {
  getProjectsList,
  getProjectFromLiveDir,
  getProjectFromGitHub,
  getProject,
  getRobotFrameworkVersions
}
