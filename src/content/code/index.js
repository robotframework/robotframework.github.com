const files = {
  helloWorld: {
    'test.robot': import('./helloWorld/test.robot'),
    'keywords.resource': import('./helloWorld/keywords.resource')
  }
}
const languages = {
  robotframework: {
    tm: import('./languages/robotframework-tm.json'),
    config: import('./languages/robotframework-config.json')
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
const getLanguage = async (langName) => {
  return languages[langName].tm
}
const getLanguageConfig = async (langName) => {
  return languages[langName].config
}

export {
  listProjects,
  getProject,
  getLanguage,
  getLanguageConfig
}
