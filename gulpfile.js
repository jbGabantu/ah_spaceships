const {task, src, dest, parallel, watch} = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');
const concat = require('gulp-concat');

//Autoprefix the CSS using gulp-autoprefixer
task('autoprefixer', () => {
  return src('src/css/style.css')
  .pipe(autoprefixer({
    cascade: false
  }))
    .pipe(dest('dist/css'));
});

//Minify the CSS using gulp-clean-css
task('minify-css', () => {
  return src('src/css/style.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(dest('dist/css'));
});

//Optimize the images using gulp-imagemin
task('imagemin', () => {
  return src('src/images/*')
  .pipe(imagemin())
  .pipe(dest('dist/images'))
});

//Concatenate the JS into a single file 'main.js' using gulp-concat
task('scripts', () => {
  return src(['dist/js/resources.js', 'dist/js/app.js', 'dist/js/engine.js'])
    .pipe(concat('main.js'))
    .pipe(dest('dist/js'));
});

//Transpile the JS from ES6 to ES5 using gulp-babel
task('default', () => {
  return src('dist/js/main.js')
  .pipe(babel({
    presets: 
      [['@babel/preset-env', {
        modules: false}]]
    }))
  .pipe(dest('dist/js'))
});