const {src, dest, parallel, watch} = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

//Copy the HTML from src to dist
function copyHtml() {
  return src('src/*.html')
      .pipe(dest('dist'));
}

//Function to autoprefix and minify the CSS
function css() {
  return src('src/css/style.css')
    .pipe(autoprefixer({
    cascade: false
  }))
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(dest('dist/css'));
}

//Function to optimize the images
function images() {
  return src('src/images/*')
  .pipe(imagemin())
  .pipe(dest('dist/images'));
}

//Function to concatenate the JS into a single file 'main.js', transpile it from ES5 to ES6 and minify it`
function js() {
  return src(['src/js/resources.js', 'src/js/app.js', 'src/js/engine.js'])
    .pipe(concat('main.js'))
    .pipe(babel({
      presets: [
        ['@babel/preset-env', {
          modules: false}]
    ]}))
    .pipe(uglify())
    .pipe(dest('dist/js'));
}

//Gulp watch task to watch for changes
function watcher() {
  watch('src/*.html');
  watch('src/css/style.css');
  watch('src/images/*');
  watch(['src/js/resources.js', 'src/js/app.js', 'src/js/engine.js']);
};

//Gulp task to run all the gulp taks
exports.all = parallel(copyHtml, css, js, images, watcher);
