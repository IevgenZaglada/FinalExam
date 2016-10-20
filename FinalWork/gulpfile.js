var gulp = require('gulp'),
	sass = require('gulp-sass'),
	watch = require('gulp-watch'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglifyjs'),
	del = require('del'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	cache = require('gulp-cache'),
	sync = require('gulp-sync')(gulp);


	gulp.task('clean', function() {
		return del('dist');
	});


	gulp.task('mySass', function() {
		return gulp.src(['app/styles/main.scss', 'app/styles/styleie8.scss'])
		.pipe(sass())
		.pipe(gulp.dest('dist/css/'))
	});


	gulp.task('concatPlugins', function() {
		return gulp.src('app/plugins/*.js')
		.pipe(concat('libs.min.js'))
		.pipe(gulp.dest('dist/js/plugins/'))
	});


	gulp.task('concatScript', function() {
		return gulp.src('app/js/*.js')
		.pipe(concat('script.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js/script/'))
	});

	gulp.task('img', function() {
		return gulp.src('app/img/**/*')
		.pipe(cache(imagemin({
			interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
		})))
		.pipe(gulp.dest('dist/img/'))
	});


	gulp.task('myWatch', function() {
		gulp.watch('app/styles/*.scss', ['mySass']);
		gulp.watch('app/js/*.js', ['concatScript']);
	});

	gulp.task('default', sync.sync(['clean', 'mySass', 'concatPlugins', 'concatScript', 'img', 'myWatch']));







