const baseURL = 'https://robotframework.org/live/Examples/'
const examples = [
  {
    name: 'Basic Example',
    url: baseURL + 'Example1'
  },
  {
    name: 'Example with Classes',
    url: baseURL + 'Example2'
  },
  {
    name: 'Behaviour-Driven Development (BDD)',
    url: baseURL + 'Example-BDD'
  },
  {
    name: 'HTML and JS Example',
    url: baseURL + 'ExampleJS'
  }
]
const listProjects = () => examples.map((ex) => ex.name)

const loadProjectsByName = async(projectName) => {
  const example = examples.find((example) => example.name === projectName) || examples[0]
  return loadProjectsFromURL(example.url + '/')
}

const loadProjectsFromURL = async(projectURL) => {
  const configFileUrl = projectURL + 'config.json'
  console.log(`Loading config from ${configFileUrl}`)
  const configFile = await fetch(configFileUrl)
    .then(response => response.json())
  var data = { name: configFile.name }
  if (Object.prototype.hasOwnProperty.call(configFile, 'description')) {
    data.description = await fetch(projectURL + configFile.description)
      .then(response => response.text())
  }
  data.files = []
  for (const file of configFile.files) {
    const content = await fetch(projectURL + file.fileName)
      .then(response => response.text())
    data.files.push({
      fileName: file.fileName,
      content: content,
      show: (file.show === undefined) ? true : file.show
    })
  }
  console.log(data)
  return data
}

export {
  listProjects,
  loadProjectsByName
}
