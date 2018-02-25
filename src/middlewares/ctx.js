/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ctx.js                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: Jianjin Wu <mosaic101@foxmail.com>         +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/05/15 14:57:04 by JianJin Wu        #+#    #+#             */
/*   Updated: 2018/02/25 15:44:55 by Jianjin Wu       ###   ########.fr       */
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
      message: 'ok',
      data: data || null
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
        code = error.code || status || 403
        message = error.message || httpCode[status] || 'forbidden'
      }
      // error log
      logger.error({
        method: ctx.request.method,
        url: ctx.request.originalUrl,
        message: message,
        stack: error.stack
      })
    }
    ctx.status = status
    ctx.body = {
      url: ctx.request.originalUrl,
      code: code,
      message: message
    }
  }
  await next()
}
