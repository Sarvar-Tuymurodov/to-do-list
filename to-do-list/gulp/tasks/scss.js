import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

import cleanCss from 'gulp-clean-css';
import webpcss from 'gulp-webpcss';
import autoprefixer from 'gulp-autoprefixer';
import groupCssMediaQueries from 'gulp-group-css-media-queries';
import webpHtmlNosvg from 'gulp-webp-html-nosvg';
import gulpCssMinify from 'gulp-css-minify';
import sourcemaps from "gulp-sourcemaps"

const sass = gulpSass(dartSass);

export const scss = () => {
    return (
        app.gulp
            .src(app.path.src.scss, { soursecamps: app.isDev })
            .pipe(
                app.plugins.plumber(
                    app.plugins.notify.onError({
                        title: 'HTML',
                        message: 'Error: <%= error.message %>',
                    }),
                ),
            )
            .pipe(sourcemaps.init())
            .pipe(sass({ outputStyle: 'expanded' }))
            .pipe(app.plugins.if(app.isBuild, groupCssMediaQueries()))
            .pipe(
                app.plugins.if(
                    app.isBuild,
                    autoprefixer({
                        grid: true,
                        overrideBrowserslist: ['last 3 version'],
                        cascade: true,
                    }),
                ),
            )
            .pipe(
                app.plugins.if(
                    app.isBuild,
                    webpcss({
                        webpClass: '.webp',
                        noWebpClass: '.no-webp',
                    }),
                ),
            )
            .pipe(
                app.plugins.if(
                    app.isBuild,
                    webpcss({
                        webpClass: '.webp',
                        noWebpClass: '.no-webp',
                    }),
                ),
            )
            // .pipe( gulpCssMinify())

            //Without compress version
            // .pipe(app.gulp.dest(app.path.build.css))
            .pipe(cleanCss())
            // .pipe(
            //     rename({
            //         extname: '.min.css',
            //     }),
            // )
            .pipe(sourcemaps.write())
            .pipe(app.gulp.dest(app.path.build.css))
            .pipe(app.plugins.browsersync.stream())
    );
};
