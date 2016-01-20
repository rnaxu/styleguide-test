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
                'preprocessor': 'scss'
            },
            files: {
                '<%= path.dist %>styleguide/': ['<%= path.scss_src %>module/*.scss']
            }
        }
    },

    styledown: {
      base: {
        files: {
          'styleguide/base.html': ['styleguide/base/*.md']
        },
        options: {
          title: 'styleguide-test - base',
          css: '../dist/css/all.css',/*,
          config: 'styleguide/module/config.md',*/
        }
      },
      module: {
        files: {
          'styleguide/module.html': ['styleguide/module/*.md']
        },
        options: {
          title: 'styleguide-test - module',
          config: 'styleguide/module/config.md'
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
      styleguide: {
        files: ['styleguide/**/*.{css,md}'],
        tasks: ['styledown']
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
  grunt.registerTask('build', ['clean', 'build:html', 'build:css', 'build:js', 'build:img', 'styledown']);
  grunt.registerTask('default', ['build']);
  grunt.registerTask('style', ['styledown']);
  grunt.registerTask('w', ['connect', 'watch']);
};
