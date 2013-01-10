require "tmpdir"

desc "Builds the project, expects the command `jekyll` to be available."
task :build do
  system "jekyll"
end

desc "Helper task to check if everything is committed."
task :commited? do
  output = `git status`
  unless /nothing to commit/. =~ output
    fail "COMMIT YOUR CHANGES FIRST!"
  end
end

desc "Deploys the project to master branch, expects the command `git` to be available."
task :deploy => [:commited?, :build] do
  Dir.mktmpdir do |tempdir|
    print "Copying generated site: _site/* -> #{tempdir}"
    FileUtils.cp_r "_site/.", tempdir
    system "git checkout master"
    print "Copying generated site: #{tempdir}/* -> ./"
    FileUtils.cp_r "#{tempdir}/.", "./"
    system "git add ."
    unless system "git commit"
      fail
    end
    system "git push"
    system "git checkout source"
    print "DONE!"
  end
end

desc "Shows help text."
task :default do
  print "Run `rake --tasks` or `rake -T` to see available commands\n"
end