{
    "builds": [
      { "src": "**/*.js", "use": "@vercel/node" },
      { "src": "frontend/package.json", "use": "@vercel/static-build" }
    ],
    "routes": [
      { "src": "(.*)", "dest": "/$1" },
      { "src": "/(.*)", "dest": "/frontend/$1" }
    ]
  }
  