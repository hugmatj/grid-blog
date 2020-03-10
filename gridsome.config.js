// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Yanuar Aditia',
  siteDescription: 'I’m from Kebumen, Indonesia and I have been working as a junior front-end programmer for more than 3 years and still love to do it every day. I’ve worked for Indonesian company called Tries and also my own Paparkir as a full-stack developer since 2018. I’ve been freelancing for the last 4 years, and right now I am looking forward to working with you!',
  icon: {
    favicon: './src/favicon.png',
    touchicon: './src/favicon.png'
  },
  templates: {
    Post: '/:title',
    Tag: '/tag/:id'
  },

  plugins: [
    {
      // Create posts from markdown files
      use: '@gridsome/source-filesystem',
      options: 
        {
        typeName: 'Post',
        path: 'content/posts/*.md',
        refs: {
          // Creates a GraphQL collection from 'tags' in front-matter and adds a reference.
          tags: {
            typeName: 'Tag',
            create: true
          }
        }
      }
    },
    {
      use: 'gridsome-plugin-pwa',
      options: {
          title: 'Yanuar Aditia',
          startUrl: '/',
          display: 'standalone',
          statusBarStyle: 'default',
          manifestPath: 'manifest.json',
          disableServiceWorker: true,
          serviceWorkerPath: 'service-worker.js',
          cachedFileTypes: 'js,json,css,html,png,jpg,jpeg,svg',
          shortName: 'Yanuar Aditia',
          themeColor: '#43a047',
          backgroundColor: '#ffffff',
          icon: './src/assets/images/author.png', // must be provided like 'src/favicon.png'
          msTileImage: '',
          msTileColor: '#43a047'
      }
    },
    {
      use: "gridsome-plugin-service-worker",
      options: {
        networkFirst: {
          cacheName: "nf-v1",
          routes: ["/", /\.(js|css|png)/],
        },
      },
    },
    {
      use: "gridsome-plugin-manifest",
      options: {
          background_color: "#fff",
          icon_path: "./src/assets/images/author.png",
          name: "Yanuar Aditia",
          short_name: "Yanuar Aditia",
          theme_color: "#43a047",
          lang: "en",
      },
    },
    {
      use: "gridsome-plugin-htaccess",
      options: {
        textCompression: [
          "text/html",
          "application/javascript",
          "text/css",
          "image/png",
        ],
        pingable: true,
        fileExpirations: {
          fileTypes: {
            "text/html": "access plus 1 day",
            "image/png": "access plus 1 week",
          },
          default: "access plus 1 month",
        },
        featurePolicy: {
          geolocation: ["none"],
          battery: ["self"],
          "ambient-light-sensor": ["self", "amazon.com"],
        },
        customHeaders: {
          "X-Powered-By": "Gridsome 0.7.13",
        },
        forceHttps: true,
        preventDdosAttacks: {
          downloadedFilesSizeLimit: 102400, // in bytes
        }
      },
    },
  ],

  transformers: {
    //Add markdown support to all file-system sources
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      anchorClassName: 'icon icon-link',
      plugins: [
        '@gridsome/remark-prismjs'
      ]
    }
  }
}
