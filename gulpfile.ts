/// <reference path="typings/tsd.d.ts"/>
import del = require("del");
import dts = require("dts-bundle");
import ghPages = require("gulp-gh-pages");
import gulp = require("gulp");
import istanbul = require("gulp-istanbul");
import mocha = require("gulp-mocha");
import path = require("path");
import replace = require("gulp-replace");
import tslint = require("gulp-tslint");
import typescript = require("gulp-typescript");
import typedoc = require("gulp-typedoc");

/**
 * The Gulp Tasks
 */
enum Task {
    bundle,
    clean,
    copy,
    doc,
    lint,
    pages,
    scripts,
    spec,
    test,
    typedoc
}

/**
 * High Level Tasks
 */
register(Task.doc, [Task.pages]);
register(Task.test, [Task.lint, Task.spec]);

/**
 * Config
 */
var pkg = "typed-react";

var dirs = {
    build: "_build",
    cwd: process.cwd(),
    doc: "doc",
    src: "src",
    test: "test",
    typings: "typings"
};

var globs = {
    definition: "index.d.ts",
    gulp: "gulpfile.ts"
};

/**
 * Bundles the TypeScript Definitions
 */
register(Task.bundle, [Task.copy], (callback) => {
    dts.bundle({
        main: globs.definition,
        name: pkg,
        prefix: ""
    });
    del([match(".d.ts", false), not(`${pkg}.d.ts`)], callback);
});

/**
 * Cleans the build directory
 */
register(Task.clean, [], (callback) => {
    del(dirs.build, callback);
});

/**
 * Copy the source files into the root directory
 */
register(Task.copy, [Task.scripts], () => {
    return gulp.src(path.join(dirs.build, dirs.src, match(set(".d.ts", ".js"))))
        .pipe(replace("<reference path=\"../", "<reference path=\"./"))
        .pipe(gulp.dest(dirs.cwd));
});

/**
 * Lints the TypeScript
 */
register(Task.lint, [], () => {
    return gulp.src([
        globs.gulp,
        path.join(set(dirs.src, dirs.test), match(".ts"))
    ]).pipe(tslint())
        .pipe(tslint.report("verbose", {
        emitError: is(Task.test)
    }));
});

/**
 * Pushes the documentation to Github Pages
 */
register(Task.pages, [Task.typedoc], () => {
    return gulp.src(path.join(dirs.doc, match("")))
        .pipe(ghPages({
            remoteUrl: process.env.PAGES_URL
        }));
});

/**
 * Compiles the TypeScript
 */
register(Task.scripts, [Task.clean], (callback) => {
    var error: Error = null;
    var completed = 0;
    var compiler = gulp.src(path.join(set(dirs.src, dirs.test, dirs.typings), match(".ts")))
        .pipe(typescript({
          declarationFiles: true,
          module: "commonjs",
          noExternalResolve: true,
          noImplicitAny: true,
          noLib: false,
          removeComments: true,
          sortOutput: false,
          target: "ES5"
      }));

    drain(compiler.js);
    drain(compiler.dts);
    function drain(stream: NodeJS.ReadWriteStream): void {
        stream.pipe(gulp.dest(dirs.build))
            .on("finish", () => {
                completed++;
                if (completed === 2) {
                    callback(error);
                }
            });
    }
});

register(Task.typedoc, [Task.clean], () => {
    return gulp.src(path.join(dirs.src, match(".ts")))
        .pipe(typedoc({
            module: "commonjs",
            name: pkg,
            out: dirs.doc,
            target: "ES5",
            theme: "minimal"
        }));
});

/**
 * Run the tests
 */
register(Task.spec, [Task.scripts], (callback) => {
    gulp.src(path.join(dirs.build, dirs.src, match(".js")))
        .pipe(replace(/^(var __extends =)/, "/* istanbul ignore next */\n$1"))
        .pipe(istanbul({
            includeUntested: true
        }))
        .pipe(istanbul.hookRequire())
        .on("finish", () => {
            gulp.src(path.join(dirs.build, dirs.test, match(".js")))
                .pipe(mocha({}))
                .pipe(istanbul.writeReports())
                .on("finish", () => {
                    var err: Error = null;
                    var coverage = istanbul.summarizeCoverage();
                    var incomplete = Object.keys(coverage).filter((key) => {
                        return coverage[key].pct !== 100;
                    });
                    if (incomplete.length > 0 && is(Task.test)) {
                        err = new Error("Incomplete coverage for " + incomplete.join(", "));
                    }
                    callback(err);
                });
        });
});

function name(task: Task): string {
    return Task[task];
}

function register(task: Task, deps: Task[], callback?: gulp.ITaskCallback): void {
    gulp.task(name(task), deps.map(name), callback);
}

function is(task: Task): boolean {
    if (process.argv.length < 3) {
        return false;
    }
    return process.argv[2] === name(task);
}

function set(...parts: string[]): string {
    return "{" + parts.join(",") + "}";
}

function not(pattern: string): string {
    return "!" + pattern;
}

function match(suffix: string, recursive: boolean = true): string {
    var pattern = "*" + suffix;
    if (recursive) {
        pattern = path.join("**", pattern);
    }
    return pattern;
}
