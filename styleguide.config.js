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
      description: '<hr/><h3>Visual components</h3><hr/>',
      components: 'src/components/**/index.js',
      usageMode: 'expanded'
    },
    {
      name: 'Containers',
      description: '<hr/><h3>Components, connected to store</h3><hr/>',
      components: 'src/containers/**/index.js',
      usageMode: 'expanded'
    }
  ],
  theme: {
    sidebarWidth: 260,
  },
  styles: {
    Heading: {
      heading1: {
        display: 'none'
      }
    }
  }
};
