const projects = {
  helloWorld: {
    name: 'Hello World',
    description: import('./projects/helloWorld/readme.md'),
    files: {
      'test.robot': import('./projects/helloWorld/test.robot'),
      'keywords.resource': import('./projects/helloWorld/keywords.resource'),
      'CustomLibrary.py': import('./projects/helloWorld/CustomLibrary.py')
    }
  },
  example: {
    name: 'Example',
    description: import('./projects/example/readme.md'),
    files: {
      'test.robot': import('./projects/example/test.robot'),
      'page.html': import('./projects/example/page.html'),
      'script.js': import('./projects/example/script.js'),
      'hidden.py': import('./projects/example/hidden.py')
    }
  }
}

const examples = [
  {
    name: 'Basic Example',
    url: 'robotframework.org/live/Example'
  },
  {
    name: 'Example with Classes',
    url: 'robotframework.org/live/Example1'
  },
  {
    name: 'HTML and JS Example',
    url: 'robotframework.org/live/ExampleJS'
  }
]

// const listProjects = () => Object.keys(projects).map((key) => projects[key].name)
const listProjects = () => examples.map((ex) => ex.name)

const getProject = async(projectName) => {
  let projectObj = projects[projectName]
  if (!projectObj) {
    const key = Object.keys(projects).find((key) => projects[key].name === projectName)
    if (key) projectObj = projects[key]
    else throw new Error('no project found')
  }
  const description = await projectObj.description.then((res) => res.default)
  return Promise.all(
    Object.keys(projectObj.files)
      .map((fileName) => projectObj.files[fileName]
        .then((res) => ({
          fileName,
          content: res.default
        }))
      )
  )
    .then((files) => ({
      ...projectObj,
      files,
      description
    }))
}

const loadProjectsByName = async(projectName) => {
  console.log(projectName)
  const example = examples.find((example) => example.name === projectName) || examples[0]
  console.log(example.url)
  return loadProjectsFromURL(example.url)
}

const loadProjectsFromURL = async(projectURL) => {
  const configURL = 'https://' + projectURL + '/'
  const configFileUrl = configURL + 'config.json'
  console.log(`Loading config from ${configFileUrl}`)
  const configFile = await fetch(configFileUrl)
    .then(response => response.json())
  var data = { name: configFile.name }
  if (Object.prototype.hasOwnProperty.call(configFile, 'description')) {
    data.description = await fetch(configURL + configFile.description)
      .then(response => response.text())
  }
  data.files = []
  for (const file of configFile.files) {
    const content = await fetch(configURL + file.fileName)
      .then(response => response.text())
    data.files.push({
      fileName: file.fileName,
      content: content,
      show: (file.show === undefined) ? true : file.show
    })
  }
  return data
}

export {
  listProjects,
  getProject,
  loadProjectsByName
}
