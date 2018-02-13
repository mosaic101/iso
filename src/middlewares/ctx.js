/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ctx.js                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: Jianjin Wu <mosaic101@foxmail.com>         +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/05/15 14:57:04 by JianJin Wu        #+#    #+#             */
/*   Updated: 2018/02/14 02:51:09 by Jianjin Wu       ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */


const logger = Logger('app:ctx')

const DEFAULT_SUCCESS_STATUS = 200
const DEFAULT_ERROR_STATUS = 403

//http code 
const httpCode = {
  200: 'ok',
  400: 'invalid parameters',
  401: 'authentication failed',
  403: 'forbidden',
  404: 'not found'
}

module.exports = async (ctx, next) => {
  /**
  * success response
  * @param {object} data 
  * @param {number} status - default 200
  */
  ctx.success = (data, status) => {
    ctx.status = status || DEFAULT_SUCCESS_STATUS
    ctx.body = {
      url: ctx.request.originalUrl,
      code: 1,
      msg: 'ok',
      data: data
    }
  }
  /**
	* error response
  * @param {any} error 
  * @param {number} status - default 403
  */
  ctx.error = (error, status) => {
    let code, message
    status = status || DEFAULT_ERROR_STATUS
    if (error) {
      if (error instanceof Error) {
        code = error.code || status
        message = error.message
      }
      // 400
      else if (error instanceof Array) {
        code = 400
        message = httpCode[status]
      }
      // others
      else {
        code = status
        message = httpCode[status] || 'forbidden'
      }
      // make a record in error.log when status === 403
      if (status === 403) {
        logger.error({
          method: ctx.request.method,
          url: ctx.request.originalUrl,
          msg: message,
          stack: error.stack
        })
      }
    }
    ctx.status = status
    ctx.body = {
      url: ctx.request.originalUrl,
      code: code,
      msg: message,
      error: error
    }
  }
  await next()
}
