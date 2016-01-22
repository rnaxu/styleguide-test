/* ----------------------------------------------------------------------
 * Grunt
 *
 * 開発開始手順
 * $ npm install
 * $ grunt
 *
 * 開発watch,connectコマンド
 * $ grunt w
 *
 ---------------------------------------------------------------------- */

module.exports = function (grunt) {

  // manage
  require('time-grunt')(grunt);
  require('jit-grunt')(grunt, {
    // sprite
    sprite: 'grunt-spritesmith'
  });


  // process
  grunt.initConfig({

    path: {
      src: 'src/',
      dist: 'dist/',
      hbs_src: 'src/hbs/',
      scss_src: 'src/scss/',
      js_src: 'src/js/',
      img_src: 'src/img/',
      sprite_src: 'src/sprite/'
    },

    pkg: grunt.file.readJSON('package.json'),

    clean: ['<%= path.dist %>'],


    /* html */
    assemble: {
      options: {
        layoutdir: '<%= path.hbs_src %>layouts/',
        partials: ['<%= path.hbs_src %>partials/**/*.hbs'],
        //data: ['<%= path.hbs_src %>data/**/*.{json,yml}'],
        helpers: ['handlebars-helper-prettify'],
        prettify: {
          indent: 4
        }
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= path.hbs_src %>pages/',
          src: ['**/*.hbs'],
          dest: '<%= path.dist %>'
        }]
      }
    },


    /* css */
    // spriteファイルの数だけタスクを記述
    sprite: {
      all: {
        src: ['<%= path.sprite_src %>*.png'],
        dest: '<%= path.dist %>img/sprite.png',
        imgPath: '../img/sprite.png',
        destCss: '<%= path.scss_src %>module/_sprite.scss',
        padding: 5
      }
    },

    sass: {
      options: {
        style: 'compact',
        sourcemap: 'none',
        noCache: true
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= path.scss_src %>',
          src: ['**/*.scss'],
          dest: '<%= path.dist %>css/',
          ext: '.css'
        }]
      },
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 version']
      },
      all: {
        src: '<%= path.dist %>css/**/*.css'
      }
    },

    csscomb: {
      all: {
        expand: true,
        cwd: '<%= path.dist %>css/',
        src: ['**/*.css'],
        dest: '<%= path.dist %>css/',
      }
    },

    csso: {
      all: {
        expand: true,
        cwd: '<%= path.dist %>css/',
        src: ['**/*.css'],
        dest: '<%= path.dist %>css/',
        options: {
          restructure: false
        }
      }
    },


    /* js */
    // 生成したいファイルの数だけタスクを記述
    concat: {
      options : {
        sourceMap :true
      },
      all: {
        src: ['<%= path.js_src %>*.js'],
        dest: '<%= path.dist %>js/all.js'
      }
    },

    // 生成したいファイルの数だけタスクを記述
    uglify: {
      options: {
        sourceMap : true,
        sourceMapIncludeSources : true
      },
      all: {
        options: {
          sourceMapIn : ['<%= path.dist %>js/all.js.map']
        },
        files: {
          '<%= path.dist %>js/all.js': ['<%= path.dist %>js/all.js']
        }
      }
    },


    /* img */
    copy: {
      img: {
        expand: true,
        cwd: '<%= path.img_src %>',
        src: ['**/*.{png,jpg}'],
        dest: '<%= path.dist %>img/'
      }
    },

    /* styleguide */
    styledocco: {
        dist: {
            options: {
                name: 'styleguide-test',
                'preprocessor': 'scss',
                'include': ['<%= path.dist %>css/all.css']
            },
            files: {
                'styledocco/': ['<%= path.scss_src %>']
            }
        }
    },

    styledown: {
      base: {
        files: {
          'styledown/base.html': ['styledown/base/*.md']
        },
        options: {
          title: 'styleguide-test - base',
          css: '../dist/css/all.css',/*,
          config: 'styleguide/module/config.md',*/
        }
      },
      module: {
        files: {
          'styledown/module.html': ['styledown/module/*.md']
        },
        options: {
          title: 'styleguide-test - module',
          config: 'styledown/module/config.md'
        }
      }
    },

    hologram: {
      generate: {
        options: {
          config: 'hologram/config.yml'
        }
      }
    },

    kss: {
      options: {
        includeType: 'css',
        includePath: '<%= path.dist %>css/all.css'/*,
        template: '/path/to/template_directory'*/
      },
      dist: {
        files: {
          'kss/': ['<%= path.scss_src %>']
        }
      }
    },


    watch: {
      html: {
        files: ['src/**/*.hbs'],
        tasks: ['build:html']
      },
      css: {
        files: ['src/**/*.scss'],
        tasks: ['build:css'],
      },
      js: {
        files: ['src/**/*.js'],
        tasks: ['build:js']
      },
      img: {
        files: ['src/**/*.{png,jpg}'],
        tasks: ['build:img']
      },
      styledocco: {
          files: ['src/scss/**/*.{scss,md}'],
          tasks: ['styledocco']
      },
      styledown: {
        files: ['styledown/**/*.{css,md}'],
        tasks: ['styledown']
      },
      hologram: {
        files: ['src/scss/**/*.{scss,md}', 'hologram/**/*.{css,rb,erb}'],
        tasks: ['hologram']
      },
      options: {
        livereload: true
      }
    },

    connect: {
      server: {
        options: {
          port: 1108/*,
          base: 'dist/'*/
        }
      }
    }

  });


  grunt.registerTask('build:html', ['assemble']);
  grunt.registerTask('build:css', [/*'sprite' ,*/'sass', 'autoprefixer', 'csscomb', 'csso']);
  grunt.registerTask('build:js', ['concat', 'uglify']);
  grunt.registerTask('build:img', ['copy']);
  grunt.registerTask('build:style', ['styledown', 'styledocco', 'hologram']);
  grunt.registerTask('build', ['clean', 'build:html', 'build:css', 'build:js', 'build:img', 'build:style']);
  grunt.registerTask('default', ['build']);
  grunt.registerTask('w', ['connect', 'watch']);
};
