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

const listProjects = () => Object.keys(projects).map((key) => projects[key].name)
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

export {
  listProjects,
  getProject
}
