[![Build Status][ci-img]][ci-url]
[![Code Climate][clim-img]][clim-url]
[![Greenkeeper badge][gk-img]][gk-url]
[![NPM][npm-img]][npm-url]
<!-- requires URL update [![Windows Build Status][ci-win-img]][ci-win-url] -->
<!-- doesn't work in haraka plugins... yet. [![Code Coverage][cov-img]][cov-url]-->

# haraka-plugin-milter

Clone me, to create a new plugin!

# Template Instructions

These instructions will not self-destruct after use. Use and destroy.

See also, [How to Write a Plugin](https://github.com/haraka/Haraka/wiki/Write-a-Plugin) and [Plugins.md](https://github.com/haraka/Haraka/blob/master/docs/Plugins.md) for additional plugin writing information.


## Enable Travis-CI testing

- [ ] visit your [Travis-CI profile page](https://travis-ci.org/profile) and enable Continuous Integration testing on the repo
- [ ] enable Code Climate. Click the _code climate_ badge and import your repo.


# Add your content here

## INSTALL

```sh
cd /path/to/local/haraka
npm install haraka-plugin-milter
echo "milter" >> config/plugins
service haraka restart
```

### Configuration

If the default configuration is not sufficient, copy the config file from the distribution into your haraka config dir and then modify it:

```sh
cp node_modules/haraka-plugin-milter/config/milter.ini config/milter.ini
$EDITOR config/milter.ini
```

## USAGE


<!-- leave these buried at the bottom of the document -->
[ci-img]: https://travis-ci.org/haraka/haraka-plugin-milter.svg
[ci-url]: https://travis-ci.org/haraka/haraka-plugin-milter
[ci-win-img]: https://ci.appveyor.com/api/projects/status/CHANGETHIS?svg=true
[ci-win-url]: https://ci.appveyor.com/project/haraka/haraka-CHANGETHIS
[cov-img]: https://codecov.io/github/haraka/haraka-plugin-milter/coverage.svg
[cov-url]: https://codecov.io/github/haraka/haraka-plugin-milter
[clim-img]: https://codeclimate.com/github/haraka/haraka-plugin-milter/badges/gpa.svg
[clim-url]: https://codeclimate.com/github/haraka/haraka-plugin-milter
[gk-img]: https://badges.greenkeeper.io/haraka/haraka-plugin-milter.svg
[gk-url]: https://greenkeeper.io/
[npm-img]: https://nodei.co/npm/haraka-plugin-milter.png
[npm-url]: https://www.npmjs.com/package/haraka-plugin-milter
