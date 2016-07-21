require 'rubocop/rake_task'

task :jshint_custom do
  puts 'Running JS lints...'
  Rake::Task['jshint:lint'].invoke('.jshint.yml')
end
task default: :jshint_custom

RuboCop::RakeTask.new
task default: :rubocop

task :scss_lint do
  puts 'Running SCSS lints...'
  if system('bundle exec scss-lint')
    puts "\e[32mAll good!\e[0m"
  else
    exit 1
  end
end
task default: :scss_lint
