module.exports = {
  themeConfig: {
    logo: '/unifire-logo.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Github', link: 'https://github.com/unifirejs' }
    ],
    sidebar: [
      {
        title: 'Intro',
        collapsable: false,
        children: [
          [ '/', 'What\'s Unifire?' ],
          [ '/intro/quick/', 'Quick Start' ],
          '/intro/installation/'
        ]
      },
      {
        title: 'Core Concepts',
        collapsable: false,
        children: [
          '/core/state/',
          '/core/derived/',
          '/core/actions/',
          '/core/subscribers/',
          '/core/listeners/',
          '/core/lazy/',
        ]
      },
      {
        title: 'Additional Concepts',
        collapsable: false,
        children: [
          '/additional/composition/',
          '/additional/testing/'
        ]
      },
      // {
      //   title: 'Demos',
      //   collapsable: false,
      //   children: [
      //     '/demos/counter/',
      //     '/demos/todos/'
      //   ]
      // },
      {
        title: 'Integrations',
        collapsable: false,
        children: [
          [ '/integrations/preact/', 'Preact' ],
          [ '/integrations/react/', 'React' ]
        ]
      },
      {
        title: 'Extensions',
        collapsable: false,
        children: [
          [ '/extensions/indexedDB/', 'indexedDB' ],
          [ '/extensions/storage/', 'Browser Storage' ]
        ]
      },
      '/api/'
    ]
  }
}
