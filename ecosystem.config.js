module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    // First application
    {
      name      : 'iso',
      script    : 'src/bin/www',
      env_production : {
        NODE_ENV: 'production'
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : 'ubuntu',
      host : 'xxxxxxxxx',
      ref  : 'origin/master',
      repo : 'https://www.github.com/mosaic101/iso.git',
      path : '/home/ubuntu/data',
      'post-deploy' : 'cnpm install && pm2 reload ecosystem.config.js --env production'
    }
  }
}
