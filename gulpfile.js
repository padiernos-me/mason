const { src, dest, series, task, watch } = require('gulp')

const autoprefix    = require('autoprefixer'),
      // colorblind    = require('postcss-colorblind'),
      cssnano       = require('cssnano'),
      maps          = require('gulp-sourcemaps'),
      postcss       = require('gulp-postcss'),
      rename        = require('gulp-rename'),
      stylus        = require('gulp-stylus'),
      uglify        = require('gulp-uglify')

const path = {
  styles: {
    src: './sources/mason.source.styl',
    dest: './assets/css/'
  },
  scripts: {
    src: './sources/mason.source.js',
    dest: './assets/js/'
  }
}

function styles() {
  const processors = [
    autoprefix,
    // colorblind,
    cssnano
  ]
  return src(path.styles.src)
    .pipe(maps.init())
    .pipe(stylus({
      use: []
    }))
    .pipe(postcss(processors))
    .pipe(rename('mason.theme.css'))
    .pipe(maps.write('./'))
    .pipe(dest(path.styles.dest));
}

function scripts() {
  return src(path.scripts.src)
    .pipe(uglify({
      mangle: {
        toplevel: true
      }
    }))
    .pipe(rename('mason.theme.js'))
    .pipe(dest(path.scripts.dest));
}

task('watch', () => {
  watch('**/mason.source.styl', styles)
  watch('**/mason.source.js', scripts)
});

task('default', series(styles, scripts, ['watch']));
