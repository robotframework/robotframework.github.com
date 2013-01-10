require "tmpdir"

desc "Builds the project, expects the command `jekyll` to be available."
task :build do
  system "jekyll"
end

desc "Helper task to check if everything is committed."
task :commited? do
  output = `git status`
  unless /nothing to commit/. =~ output
#    fail "COMMIT YOUR CHANGES FIRST!"
  end
end

desc "Deploys the project to master branch, expects the command `git` to be available."
task :deploy => [:commited?, :build] do
  Dir.mktmpdir do |tempdir|
    FileUtils.cp_r "_site/.", tempdir
    system "git checkout master"
    FileUtils.cp_r "#{tempdir}/.", "/Users/tkairi/delme/"
    system "git commit -a"
    
  end
end

desc "Shows help text."
task :default do
  print "Run `rake --tasks` or `rake -T` to see available commands"
end