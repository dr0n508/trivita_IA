var gulp          = require('gulp'),
	gutil         = require('gulp-util' ),
	sass          = require('gulp-sass'),
	sourcemaps 	  = require('gulp-sourcemaps'),
	imagemin      = require('gulp-imagemin'),
	browserSync   = require('browser-sync'),
	concat        = require('gulp-concat'),
	uglify        = require('gulp-uglify'),
	cleancss      = require('gulp-clean-css'),
	rename        = require('gulp-rename'),
	autoprefixer  = require('gulp-autoprefixer'),
	notify        = require("gulp-notify"),
	rsync         = require('gulp-rsync'),
	fileinclude   = require('gulp-file-include'),
	pngquant 	  = require('imagemin-pngquant'),
	cache 		  = require('gulp-cache'),
	imageminJpegRecompress = require('imagemin-jpeg-recompress');



gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
		// open: false,
		// online: false, // Work Offline Without Internet Connection
		// tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
	});
});

gulp.task('styles', function() {
	return gulp.src('app/scss/**/*.scss')
	.pipe(sourcemaps.init())
	.pipe(sass({ outputStyle: 'expand' }).on("error", notify.onError()))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(autoprefixer(['last 15 versions']))
	// .pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
	.pipe(sourcemaps.write('css'))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream());
});

gulp.task('js', function() {
	return gulp.src([
		// 'app/libs/jquery/dist/jquery.min.js',
		// 'app/js/common.js', // Always at the end
		])
	.pipe(concat('scripts.min.js'))
	// .pipe(uglify()) // Mifify js (opt.)
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({ stream: true }));
});

// Compress images
gulp.task('imagemin', function() {
    gulp.src('app/img/**')
		.pipe(imagemin([
		    imagemin.gifsicle({interlaced: true}),
		    imagemin.jpegtran({progressive: true}),
		    imageminJpegRecompress({
				loops: 5,
				min: 65,
				max: 70,
				quality: 'medium'
		    }),
		    imagemin.optipng({optimizationLevel: 3}),
		    pngquant({quality: [0.65, 0.7], speed: 5}),
		    imagemin.svgo({
		        plugins: [
		            {removeViewBox: true},
		            {cleanupIDs: false}
		        ]
		    })
		],
		{
			verbose: true
		}))
        .pipe(gulp.dest('app/img_compressed'));
});

// Clearing the cache
gulp.task('clear', function (done) {
  return cache.clearAll(done);
});

// Compress images
gulp.task('images', ['imagemin', 'clear']);

gulp.task('rsync', function() {
	return gulp.src('app/**')
	.pipe(rsync({
		root: 'app/',
		hostname: 'username@yousite.com',
		destination: 'yousite/public_html/',
		// include: ['*.htaccess'], // Includes files to deploy
		exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excludes files from deploy
		recursive: true,
		archive: true,
		silent: false,
		compress: true
	}));
});

// Compile html
gulp.task('fileinclude', function() {
	gulp.src('app/__*.html')
		.pipe(fileinclude({
			prefix: '@@'
		// ,basepath: '@file'
	}))
	// .pipe(rename({ prefix: '11' }))
	.pipe(rename(function(opt) {
      opt.basename = opt.basename.replace(/^__+/, '');
      return opt;
    }))
	.pipe(gulp.dest('app'));
});


gulp.task('watch', ['styles', 'js', 'fileinclude', 'browser-sync'], function() {
	gulp.watch('app/scss/**/*.scss', ['styles']);
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
	gulp.watch('app/*.html', ['fileinclude']);
	gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('default', ['watch']);
