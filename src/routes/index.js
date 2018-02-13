/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: Jianjin Wu <mosaic101@foxmail.com>         +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/02/12 14:23:27 by Jianjin Wu        #+#    #+#             */
/*   Updated: 2018/02/14 02:12:32 by Jianjin Wu       ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */


const router = require('koa-router')()

router.prefix('/api')

const v1 = require('./v1')

router.use('/v1', v1.routes(), v1.allowedMethods())

module.exports = router
