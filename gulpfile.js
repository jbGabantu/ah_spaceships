const {task, src, dest, parallel, watch} = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

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
//Transpile the JS from ES6 to ES5 using gulp-babel
//Concatenate the JS into a single file (call it main.js) using gulp-concat. These files will need to be concatenated in a specific order so that they are loaded without errors.
//Minify the JS using gulp-uglify
//Copy over the HTML.
//Setup a Gulp watch task that will watch for changes to your CSS, JS, and HTML files and run the necessary Gulp tasks that will generate new files when they change.
//Setup a gulp task called 'all' to run ALL the gulp tasks.