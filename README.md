# Athenahealth Careers

Athenahealth Careers is a graphical user interface for Athenahealth, a modern, extensible
web-based platform.

# Athenahealth Careers: Development #

Athenahealth Careers is a static webapp, built from a Angular.js project.

## Prerequisites ##

### Required skills/expertise ###

* Experience of webapplication development
* Understanding of JavaScript, CSS, HTML
* Familiarity with Node.js & npm
* Familiarity with angularjs

### Setting up workstation ###

Make sure you have `git`, `nodejs`, `npm` installed in your system, along with
your favorite code-editor & browser with devtools (latest Mozilla Firefox or
Google Chrome recommended).


## Contributing ##

### Building from source ###

Within the git cloned source directory, run the following commands to build the
app. You should be able to build from the source successfully before making any
changes to the source.


```sh
$ sudo npm install -g gulp
$ npm install
$ gulp
```

Upon success of all the steps, you should have the build artifacts in `./dist/`
subdirectory.

You can also run gulp dev command. It will add watchers to all files and 
accordingly dist folder will be updated continuosly.

### Running a dev-server ###

To run and test the build locally, you can use various static file server over
HTTP. We recommend using `http-server` module, however, httpd/nginx etc can as
well be used.


```sh
$ npm install -g http-server
$ cd dist
$ http-server # starts the web-server with doc-root as `pwd`
```

The advantage of using `http-server` module is that, it's easy to use it with
another existing server which can handle the request, which the test server is
incapable of serving.


```sh
$ http-server -P http://production.server/
```

You should be able to browse the app, running on test server by visiting
http://127.0.0.1:8080 from your browser.

