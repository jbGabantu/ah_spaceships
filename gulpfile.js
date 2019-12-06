const {task, src, dest, parallel, watch} = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');

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

//Transpile the JS from ES6 to ES5 using gulp-babel
task('default', () => {
  return src('src/js/*')
  .pipe(babel({
    presets: ['@babel/env']
    }))
  .pipe(dest('dist/js'))
});

  