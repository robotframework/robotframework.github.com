# Robot Framework ecosystem front page

This repository hosts Robot Framework's public website source code. The site
itself is available at https://robotframework.org.

## Adding or updating resources

To get new links added or old information updated, please `submit an issue`__
to this project. If you want a new link to be added, include at least the
following information:

- Name of the library, tool, or other resource.
- Short description. Should not be longer than 200 characters.
- Link to the resource.
- When adding a new user, also include company/organization logo.

Alternatively you can `submit a pull request`__ with the above information and
make it even easier for us to add the link. For pull requests, only submit source file changes. Built files will be updated and commited by maintainer.

__ https://github.com/robotframework/robotframework.github.com/issues
__ https://github.com/robotframework/robotframework.github.com/pulls

## License

Robot Framework website is open source software provided under the `Apache License
2.0`__.

__ http://apache.org/licenses/LICENSE-2.0


## Robotframework sources

> Robot Framework ecosystem front page sources

## Build Setup

``` bash

# clone repo
git clone https://github.com/robotframework/robotframework.github.com.git

# go to sources folder
cd sources

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# and when you are ready to publish your changes, build for production with minification
npm run build

This will generate build files to top-level of project. If you want to contribute and open a pull request, only commit source file changes. The build will be done by maintainer.
```

For a detailed explanation on how things work, check out the [vue-webpack template](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

We also use [bootstrap-vue](https://bootstrap-vue.js.org/docs) for implementing bootstrap-v4.
