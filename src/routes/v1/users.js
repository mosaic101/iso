/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   users.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: Jianjin Wu <mosaic101@foxmail.com>         +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/02/14 02:15:00 by Jianjin Wu        #+#    #+#             */
/*   Updated: 2018/02/14 02:17:36 by Jianjin Wu       ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */


const router = require('koa-router')()


router.get('/', function (ctx, next) {
  ctx.error('this is a users response!')
})

router.get('/bar', function (ctx, next) {
  ctx.success('this is a users/bar response!')
})


module.exports = router
