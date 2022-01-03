const files = {
  helloWorld: {
    'test.robot': import('./helloWorld/test.robot'),
    'keywords.resource': import('./helloWorld/keywords.resource'),
    'CustomLibrary.py': import('./helloWorld/CustomLibrary.py')
  }
}

const listProjects = () => Object.keys(files)
const getProject = (projectName) => {
  if (!files[projectName]) throw new Error('no project found')
  return Promise.all(
    Object.keys(files[projectName])
      .map((fileName) => files[projectName][fileName]
        .then((res) => ({
          fileName,
          content: res.default
        }))
      )
  )
}

export {
  listProjects,
  getProject
}
