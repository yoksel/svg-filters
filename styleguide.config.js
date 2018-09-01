module.exports = {
  // components: 'src/components/**/index.js',
  ignore: [
    '**/Data/docs/*',
    '**/Data/presets/*',
    '**/Data/primitives/*',
    '**/Data/primitivesAttrs/*'],
  sections: [
    {
      name: 'Components',
      description: 'Visual components',
      components: 'src/components/**/index.js',
      usageMode: 'expanded'
    },
    {
      name: 'Containers',
      description: 'Components, connected to store',
      components: 'src/containers/**/index.js',
      usageMode: 'expanded'
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
