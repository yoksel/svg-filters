module.exports = {
  // components: 'src/components/**/index.js',
  sections: [
    {
      name: 'Components',
      description: 'Visual components',
      components: 'src/components/**/index.js'
    },
    {
      name: 'Containers',
      description: 'Components, connected to store',
      components: 'src/containers/**/index.js'
    }
  ],
  styles: {
    Heading: {
      heading1: {
        display: 'none'
      }
    }
  }
};
