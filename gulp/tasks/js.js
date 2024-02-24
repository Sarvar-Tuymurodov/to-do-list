import minify from 'gulp-minify';
import webpack from 'webpack-stream';

export const js = () => {
    return (
        app.gulp
            .src(app.path.src.js, { soursecamps: app.isDev })

            // .pipe(
            //     webpack({
            //         mode: app.isBuild ? 'production' : 'development',
            //         output: {
            //             filename: 'app.min.js',
            //         },
            //     }),
            // )
            .pipe(minify())
            .pipe(app.gulp.dest(app.path.build.js))
            .pipe(app.plugins.browsersync.stream())
    );
};
