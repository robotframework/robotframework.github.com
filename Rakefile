require "tmpdir"

desc "Builds the project, expects the command `jekyll` to be available."
task :build do
  system "jekyll"
end

desc "Helper task to check if everything is committed."
task :commited? do
  output = `git status`
  unless /nothing to commit/. =~ output
    system "git commit -a"
  end
end

desc "Deploys the project to master branch, expects the command `git` to be available."
task :deploy => [:build, :commited?] do
  Dir.mktmpdir do |tempdir|
    puts "Copying generated site: _site/* -> #{tempdir}"
    FileUtils.cp_r "_site/.", tempdir
    unless system "git checkout master"
      fail
    end
    puts "Copying generated site: #{tempdir}/* -> ./"
    puts Dir.entries tempdir
#    FileUtils.cp_r "#{tempdir}/.", "./"
#    system "git add ."
#    unless system "git commit"
#      fail
#    end
#    system "git push"
#    system "git checkout source"
    puts "DONE!"
  end
end

desc "Shows help text."
task :default do
  puts "Run `rake --tasks` or `rake -T` to see available commands\n"
end