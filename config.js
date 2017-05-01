const config = {
  directories: {
    templates: 'templates',
    output: 'src/pages'
  },
  contentful: {
    space: '5fmm6hrl5kyf',
    accessToken: '41a9801935b61098c3cc28890e8ce9b643c84663e355858de8ca24ea464fe001',
    baseContentType: 'container',
    template: {
      base: 'base.html',
      exclusions: [
        {
          contentId: '2E5CiePCXeKsISYIK8akG8',
          template: 'home.html'
        }
      ]
    }
  },
  bundler: {
    command: 'webpack'
  }
};

module.exports = config;
