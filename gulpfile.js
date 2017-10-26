const gulp = require('gulp'),
	rename = require('gulp-rename'),
	to5 = require('gulp-6to5'),
	uglify = require('gulp-uglify');
	
gulp.task('js', () => {
	return gulp.src('src/*.js')
		.pipe(to5())
		.pipe(gulp.dest('dist/'))
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('dist/'))
});

gulp.task('watch', () => {
	const watcher = gulp.watch('src/*.js', ['js']);
});

gulp.task('default', ['js']);