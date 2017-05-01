/*
  Module dependencies
 */

 // Node modules
 const { readFileSync, writeFile } = require('fs');
 const path = require('path');

//Contentful SDK module
const contentful = require('contentful');

//Reshape modules
const reshape = require('reshape');
const expr = require('reshape-expressions');
const md = require('reshape-md');
const minify = require('reshape-minify');

// mkdirp module
const mkdirp = require('mkdirp');

/*
  Configuration
 */

// Load the config file
const config = require('./config');

// Create the Contentful client
const client = contentful.createClient({
  space: config.contentful.space,
  accessToken: config.contentful.accessToken
});

/*
  Methods
 */

/**
 * [getByContentType Get Contentful entries by contentType]
 * @param  {string} contentType Contentful contentType
 * @param  {object} options     Contentful API options like include or sort
 * @return {Promise}             Promise object from the Contentful SDK
 */
function getByContentType(contentType, options) {
  return client.getEntries({
    content_type: contentType,
    include: options.include || 1
  });
}

/**
 * [prepareTemplate Prepare template HTML]
 * @param  {string} html   HTML string
 * @param  {object} locals
 * @return {Promise}
 */
function prepareTemplate(html, locals) {
  const promise = new Promise((resolve, reject) => {
    reshape({
      plugins: [
        expr(),
        minify()
      ]
    })
    .process(html)
    .then((result) => {
      reshape({
        plugins: [
          md()
        ]
      })
      .process(result.output(locals))
      .then((finalResult) => {
        resolve(finalResult.output())
      })
      .catch((error) => {
        reject(error);
      });
    })
    .catch((error) => {
      reject(error);
    });
  });
}

function buildTemplate(html, filePath) {
  
}



/*
contentfulClient.getEntries({
  content_type: config.contentful.baseContentType,
  include: options.include || 1
})
.then((entries) => {
  entries.items.forEach(entry => {
    const rootFileName = entry.fields.slug;
    const rootContent = entry.fields.rootContent.fields;

    // Generate root pages
    reshape({
      plugins: [
        reshapeExpr(),
        reshapeMinify()
      ]
    })
    .process(readFileSync('./src/templates/base.html', 'utf8'))
    .then((result) => {
      const resultHtml = result.output(rootContent);

      reshape({
        plugins: reshapeMd()
      })
      .process(resultHtml)
      .then((result) => {
        const writePath = path.resolve(__dirname, 'dist','pages',`${rootFileName}`);
        const writePathFile = path.resolve(__dirname, 'dist','pages',`${rootFileName}`,'index.html');

        mkdirp(writePath, (err) => {
          if (err) console.error(err);

          writeFile(writePathFile, result.output(), 'utf8', (err) => {
            if (err) console.error(err);
            console.log('File written');
          });
        });
      });
    });
  });
});
*/
