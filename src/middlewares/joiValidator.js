/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   joiValidator.js                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: Jianjin Wu <mosaic101@foxmail.com>         +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/02/12 14:21:37 by Jianjin Wu        #+#    #+#             */
/*   Updated: 2018/02/14 02:22:46 by Jianjin Wu       ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */


const Joi = require('joi')

module.exports = (schema, options) => {

  options = options || {
    abortEarly: false
  }

  return async (ctx, next) => {
    let toValidate = {}
    if (!schema) {
      return next()
    }
    // params body query
    ['params', 'body', 'query'].forEach(function (key) {
      if (schema[key]) {
        toValidate[key] = ctx[key]
      }
    })

    return Joi.validate(toValidate, schema, options, async err => {
      if (err) {
        let details = err && err.details || []
        let failures = []
        for (let detail of details) {
          failures.push(detail.message)
        }
        return ctx.error(failures, 400)
      }
      await next()
    })
  }
}
