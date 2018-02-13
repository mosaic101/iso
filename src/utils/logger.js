/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   logger.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: Jianjin Wu <mosaic101@foxmail.com>         +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/02/12 12:53:36 by Jianjin Wu        #+#    #+#             */
/*   Updated: 2018/02/14 02:49:55 by Jianjin Wu       ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */


const log4js = require('log4js') // upgrad to 2.X

log4js.configure({
  appenders: {
    out: { type: 'stdout' },
    prod: {
      'type': 'dateFile',
      'filename': './logs/error.log',
      'pattern': '-yyyy-MM-dd.log',
      'alwaysIncludePattern': true
    }
  },
  categories: {
    default: { appenders: [ 'out', 'prod' ], level: 'error' }
  }
})

module.exports = name => log4js.getLogger(name)

