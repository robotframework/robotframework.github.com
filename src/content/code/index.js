const baseURL = 'https://robotframework.org/live/Examples'

const getProjectsList = () => new Promise((resolve) => {
  fetch(`${baseURL}/index.json`)
    .then((res) => res.json())
    .then((json) => resolve(json))
})

const getProject = async(projectDir) => {
  const projectUrl = `${baseURL}/${projectDir}`
  console.log(`Loading data from ${projectUrl}`)
  const configFile = await fetch(projectUrl + '/config.json')
    .then(response => response.json())
  var project = { name: configFile.name, files: [], description: '' }
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
  getProject
}
