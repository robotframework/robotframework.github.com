# robotframework.github.com

This repository hosts Robot Framework's public website available at [robotframework.github.com](http://robotframework.github.com). It uses [Ruby](http://www.ruby-lang.org/) programming language and it's tools [Jekyll](https://github.com/mojombo/jekyll) (a static website generator) and [jekyll-rst](https://github.com/xdissent/jekyll-rst) (a [reStructuredText](https://github.com/xdissent/jekyll-rst)-plugin), among others.

<b>Important to note:</b> As this site is hosted in Github Pages, the <tt>master</tt> branch hosts the files. The <tt>source</tt> branch is where the development happens and from where site is deployed to <tt>master</tt> branch. You should not therefore change any files in <tt>master</tt> branch -- rather, do your work in <tt>source</tt> branch and deploy to <tt>master</tt>.

# Table of Contents

- [Setting up the development environment](#setting-up)
- [Working with the site](#working-with-the-site)
- [Build and deploy](#building-and-deploying)

# Setting up

The preferable way to install Ruby is via [RVM](https://rvm.io/rvm/install/). Follow install instructions on the linked page to get RVM, then make sure you have Ruby 1.9.3 and Rubygems installed correctly: 

    $ rvm list
    
    rvm rubies
    
    =* ruby-1.9.3-p362 [ x86_64 ]
    
    # => - current
    # =* - current & default
    #  * - default

The above means RVM installed correct Ruby version 1.9.3

    $ ruby -v 
    ruby 1.9.3 p362
    $ gem -v
    1.8.24

The above means the correct Ruby- and Rubygems-commands work.

If you need to install Ruby 1.9.3 separately, do:

    $ rvm install ruby 1.9.3

Next, you need to install [Bundler](http://gembundler.com/) and check it works:

    $ gem install bundler
    $ bundle --version

On Linux, you might get the following exception:

    $ gem install bundler
    ERROR: Loading command: install (LoadError)
        cannot load such file -- zlib
    ERROR: While executing gem ... (NameError)
        uninitialized constant Gem::Commands::InstallCommand
        
This means you are missing zlib or zlib-Ruby -bindings. Install them from aptitude and reinstall Ruby with RVM. (The following works on Linux Mint -- see [Stackoverflow thread](http://stackoverflow.com/questions/9727908/cannot-load-such-file-zlib-even-after-using-rvm-pkg-install-zlib) for more details)

    $ sudo aptitude install zlib1g-dev
    $ rvm reinstall ruby 1.9.3
    $ gem install bundler

Next, clone the repository, switch to <tt>source</tt> branch, and install Ruby dependencies with bundler:

    $ git clone https://github.com/robotframework/robotframework.github.com.git
    $ cd robotframework.github.com
    $ git checkout -b source origin/source 
    $ bundle install
    
Next, install Docutils:

    $ sudo pip install docutils

After Docutils, install Pygments:

    $ sudo pip install pygments
    
Robot Framework lexer is part of the official release of Pygments since version 1.6. If pip gives you an earlier version, you need to install the lexer yourself: 

    $ sudo pip install robotframeworklexer

You should now be able to start working with the site. Run the following command and then open browser and go to http://localhost:4000 to see the site. You can quit the server with <tt>Ctrl-c</tt>

    $ jekyll --server
    
# Working with the site

<b>!IMPORTANT!</b>
The site that is available in the web is in the <tt>master</tt> branch. <b>Do not</b> modify the master branch! Rather, do your changes in <tt>source</tt> branch and deploy with rake (see below).

The site uses [Jekyll](https://github.com/mojombo/jekyll) to build the site. Jekyll should be installed with bundler as part of Ruby dependencies (described in the last section). 

To run the site with local development server, run:

    $ jekyll --server
    
This will run in port 4000 by default. If you want different port, give it as command line arguments. For example:

    $ jekyll --server 3000

Now the site is available in port 3000.

The preferable way to run the site during development is however:

    $ jekyll --server --auto
    
This will automatically update the files when you save them after editing, so you just need to hit refresh in your browser to see updated site.

Do commit early and often. To push your changes to remote <tt>source</tt> branch, use:

    $ git push origin source
    
# Building and deploying

<b>Important to note:</b> quit all <tt>jekyll</tt>s that are running as server before deploying!

The website uses [Rake](http://rake.rubyforge.org/) to build and deploy the website. This should have been installed as part of Ruby dependencies (see Installation). To see available rake tasks, run:

    /path/to/robotframework.github.com $ rake -T

To build the site, run: 

    /path/to/robotframework.github.com $ rake build
    
To deploy the site online, you need to first commit all your changes. After committing, run:

    /path/to/robotframework.github.com $ rake deploy
    
The deployment process does the following things:
- Builds the project using the build rake task
- Checks that you have committed everything. If you have not, <tt>git commit -am</tt> is run
- Copies the builded files to your OS's temp folder
- Switches to master branch, copies files over from temp folder
- Commits the changes and pushes to remote <tt>master</tt>. 
- Switches back to <tt>source</tt> branch
- Notice that you still need to push the <tt>source</tt> branch yourself to remote with:
    $ git push origin source
