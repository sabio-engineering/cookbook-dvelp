require 'rubocop/rake_task'
require 'slim_lint/rake_task'

task :jshint_custom do
  puts 'Running JS lints...'
  if system("bundle exec rake jshint:lint['.jshint.yml']")
    puts "\e[32mAll good!\e[0m"
  else
    exit 1
  end
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

SlimLint::RakeTask.new do |t|
  t.config = '.slim-lint.yml'
end
task default: :slim_lint
