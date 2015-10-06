# Creating Ruby Gems bespoke for DVELP

## Prerequisites

1. Configure bundler:

   `bundle config gem.test rspec`
    * Other popular config options include:

    `bundle config build.nokogiri --use-system-libraries`
    
    `bundle config gem.coc true` (adds Code of Conduct.md)
    
    `bundle config gem.mit true` (adds MIT License to License.txt)

## Setup

1. Create the gem scaffold:

    `bundle gem ${gem_name}`

1. Gitignore `Gemfile.lock` if it hasn't already been ignored. [2]

2. Update `${gem_name}.gemspec`

3. Add CLI if needed (with install command): [5]

  * Add `spec.add_dependency 'thor'` to `${gem_name}.gemspec` & `bundle install`

```
cd ${gem_name}
mkdir -p lib/${gem_name}/cli/install_files
mkdir exe
module_name=`echo ${gem_name:0:1} | tr '[a-z]' '[A-Z]'`${gem_name:1}

cat <<EOT > lib/${gem_name}/cli/install.rb
require "thor/group"

module ${module_name}
  class CLI < Thor
    class Install < Thor::Group
      include Thor::Actions

      def self.start
        source_root = File.expand_path("../install_files", __FILE__)
        FileUtils.cp_r "#{source_root}/.", Dir.pwd
      end
    end
  end
end
EOT

cat <<EOT > lib/${gem_name}/cli.rb
require "thor"

module ${module_name}
  class CLI < Thor
    # ${gem_name} install

    desc "install", "Install ${module_name}"
    def install
      # make require here to hide it from Thor CLI actions
      require "${gem_name}/cli/install"
      Install.start
    end
  end
end
EOT

cat <<EOT > exe/${gem_name}
#!/usr/bin/env ruby

require "${gem_name}/cli"

${module_name}::CLI.start
EOT

chmod +x exe/${gem_name}

```

  * Add any files you want copied on install action to `lib/${gem_name}/cli/install_files`
  * Keep in mind that when you install gem with `rake install`, you need to reload shell to be able to execute the CLI commands

## Usefull commands

* `bundle install` - install dependency gems
* `rake install` - install the gem; requires changes to be committed!
* `bundle console` - similar to rails console
* `bundle exec ${file_name}` - runs the script with the current gem environment

## Remarks

All gem specific code should go in `lib/${gem_name}` and be nested inside `module ${module_name}`. This prevents name collisions as module acts as namespace.

## Sources

1. [$ bundle help](http://bundler.io/v1.10/man/bundle.1.html)
* [Why gitignore Gemfile.lock](http://yehudakatz.com/2010/12/16/clarifying-the-roles-of-the-gemspec-and-gemfile/)
* [Gem development](https://github.com/radar/guides/blob/master/gem-development.md)
* [Figaro gem example](https://github.com/laserlemon/figaro)
* [Thor](http://whatisthor.com/)

*****

*
###### Note that you can set shell variables like this `gem_name="nelly"`, and run most of the commands without having to change anything. Here's the list of variables needed:

```
gem_name=""
```
