//require('dotenv').config();
const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const withFonts = require('next-fonts');

module.exports = withFonts(
  withCSS(
    withSass({
      // Both server and client config
      publicRuntimeConfig: {
        mailerApi: process.env.MAILER_API,
        botApi: process.env.BOT_API,
      },
    })
  )
);
