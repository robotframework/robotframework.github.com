# robotframework.github.com
## Installation

The preferable way to install Ruby is via [RVM](https://rvm.io/rvm/install/). Follow install instructions on the linked page to get RVM, then install ruby 1.9.3 with 

    $ rvm install ruby 1.9.3 

Then you need to install bundler:

    $ gem install bundler
    
Next, install ruby dependencies:

    /path/to/robotframework.github.com $ bundle install
    
Next, install Docutils:

    $ pip install docutils

Last but not least, install Pygments. As of now (Jan 2013), Robot Framework lexer is still not part of the official release of Pygments. Therefore, you need to install Pygments from sources: 

    $ pip install hg+http://bitbucket.org/birkenfeld/pygments-main

## Working with the site

<b>!IMPORTANT!</b>
The site that is available in the web is in the master branch. <b>Do not</b> change the master branch! Instead, do most of the work source branch.

The site uses [Jekyll](https://github.com/mojombo/jekyll) to build the site. Jekyll should be installed with bundler as part of ruby dependencies (described in the last section). 

To run the site with local development server, run:

    $ jekyll --server
    
This will run in port 4000 by default. If you want different port, give it as command line arguments. For example:

    $ jekyll --server 3000

Now the site is available in port 3000.

The preferable way to run the site during development is however:

    $ jekyll --server --auto
    
This will automatically update the files when you save them, so you just need to hit refresh in your browser to see results.

## Building and deploying

The website uses [Rake](http://rake.rubyforge.org/) to build and deploy the website. Too see available commands, run:

    /path/to/robotframework.github.com $ rake -T

To build the site, run: 

    /path/to/robotframework.github.com $ rake build
    
To deploy the site online, you need to first commit all your changes. After committing, run:

    /path/to/robotframework.github.com $ rake deploy
    
The deployment process does the following things:
- Checks that you have committed everything; the working tree needs to be clean
- Builds the project using the build rake task
- Copies the builded files to your OS's temp folder
- Switches to master branch, copies files over from temp folder
- Commits the changes and pushes to master. Notice that you still need to push the source branch to remote.
- Switches back to source branch
