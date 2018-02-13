/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: Jianjin Wu <mosaic101@foxmail.com>         +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/02/12 14:23:27 by Jianjin Wu        #+#    #+#             */
/*   Updated: 2018/02/14 02:15:21 by Jianjin Wu       ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */


const router = require('koa-router')()

const users = require('./users')

router.use('/users', users.routes(), users.allowedMethods())

module.exports = router
