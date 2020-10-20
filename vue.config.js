module.exports = {
  publicPath: './',
  configureWebpack: {
    performance: {
      hints: 'warning',
      maxEntrypointSize: 50000000,
      maxAssetSize: 30000000,
      assetFilter: function(assetFilename) {
        return assetFilename.endsWith('.js')
      }
    },
    devServer: {
      open: true,
      // mock 接口编写
      before(app) {
        const userPool = [
          {username: 'admin', password: 'admin'},
          {username: 'joe', password: 'joe'}
        ]
        // 注册接口
        app.get('/api/register', (req, res) => {
          const { username, password } = req.query
          const len = userPool.filter(item => item.username == username).length
          if(len > 0) {
            // 用户名已存在，注册失败
            res.json({
              success: false,
              message: `${username} have been used, please register another username!`
            })
          } else {
            // 注册成功
            res.json({
              success: true,
              message: 'Congratulations! Register success!'
            })
            console.log('Congratulations! Register success!')
          }
        })
        // .then((message) => {
        //   app.confirm(message)
        //   console.log(message)
        // }).catch((message) => {
        //   app.confirm(message)
        //   console.log(message)
        // })

        // 登录接口
        let tokenKey = 'kaffe'
        app.get('/api/login', (req, res) => {
          const { username, password } = req.query
          const userExist = userPool.findIndex(item => item.username == username)
          if(userExist != -1) {
            if(userPool[userExist].password === password) {
              res.json({
                code: 0,
                message: '登陆成功',
                token: tokenKey+'-'+username+'-'+(new Date().getTime()+60*60*1000)
              })
            } else {
              res.json({
                code: 1,
                message: '密码错误'
              })
            }
          } else {
            res.json({
              code: 2,
              message: '用户不存在'
            })
          }
        })

        // 获取轮播图
        app.get('/api/banner', (req, res) => {
          res.json({
            data:[
              {
                url: 'http://www.didichuxing.com/',
                image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide01.png'
              },
              {
                url: 'http://www.didichuxing.com/',
                image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide02.png'
              },
              {
                url: 'http://www.didichuxing.com/',
                image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide03.png'
              }
            ]
          })
        })

        // 获取分类表
        app.get('/api/rollinglist', (req, res) => {
          res.json({
            data: [
              [
                {
                  url: 'https://www.baidu.com',
                  image: 'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/11.jpeg',
                  label: '分类一'
                },
                {
                  url: 'https://www.baidu.com',
                  image: 'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/12.jpeg',
                  label: '分类一'
                },
                {
                  url: 'https://www.baidu.com',
                  image: 'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/13.jpeg',
                  label: '分类一'
                },
                {
                  url: 'https://www.baidu.com',
                  image: 'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/14.jpeg',
                  label: '分类一'
                },
                {
                  url: 'https://www.baidu.com',
                  image: 'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/15.jpeg',
                  label: '分类一'
                },
                {
                  url: 'https://www.baidu.com',
                  image: 'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/11.jpeg',
                  label: '分类一'
                },
                {
                  url: 'https://www.baidu.com',
                  image: 'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/12.jpeg',
                  label: '分类一'
                },
                {
                  url: 'https://www.baidu.com',
                  image: 'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/13.jpeg',
                  label: '分类一'
                },
                {
                  url: 'https://www.baidu.com',
                  image: 'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/14.jpeg',
                  label: '分类一'
                },
                {
                  url: 'https://www.baidu.com',
                  image: 'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/15.jpeg',
                  label: '分类一'
                },
              ],
              [
                {
                  url: 'https://www.baidu.com',
                  image: 'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/15.jpeg',
                  label: '分类一'
                },
                {
                  url: 'https://www.baidu.com',
                  image: 'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/14.jpeg',
                  label: '分类一'
                },
                {
                  url: 'https://www.baidu.com',
                  image: 'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/13.jpeg',
                  label: '分类一'
                },
                {
                  url: 'https://www.baidu.com',
                  image: 'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/12.jpeg',
                  label: '分类一'
                },
                {
                  url: 'https://www.baidu.com',
                  image: 'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/11.jpeg',
                  label: '分类一'
                },
                {
                  url: 'https://www.baidu.com',
                  image: 'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/15.jpeg',
                  label: '分类一'
                },
                {
                  url: 'https://www.baidu.com',
                  image: 'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/14.jpeg',
                  label: '分类一'
                },
                {
                  url: 'https://www.baidu.com',
                  image: 'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/13.jpeg',
                  label: '分类一'
                },
                {
                  url: 'https://www.baidu.com',
                  image: 'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/12.jpeg',
                  label: '分类一'
                },
                {
                  url: 'https://www.baidu.com',
                  image: 'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/11.jpeg',
                  label: '分类一'
                },
              ]
            ]
          })
        })

        // 获取分类页 items
        app.get('/api/classify', (req, res) => {
          switch(req.query.type) {
            case '0':
              res.json({
                data: [
                  {
                    image: 'http://img30.360buyimg.com/focus/s140x140_jfs/t22444/92/965398566/5352/2eac5e79/5b487f2eN6c35068e.jpg',
                    label: '空调扇'
                  },
                  {
                    image: 'http://img13.360buyimg.com/focus/s140x140_jfs/t20488/4/2136681163/24726/415ebfae/5b487fa3Nf5ff458c.png',
                    label: '鱼竿'
                  },
                  {
                    image: 'http://img30.360buyimg.com/focus/s140x140_jfs/t21655/83/2186874549/15932/c273d29b/5b48802aN13fe73de.png',
                    label: '剃须刀'
                  },
                  {
                    image: 'http://img14.360buyimg.com/focus/s140x140_jfs/t24349/253/931832357/8172/6838e266/5b48801aN8e64757f.jpg',
                    label: '男鞋'
                  },
                  {
                    image: 'http://img14.360buyimg.com/focus/s140x140_jfs/t24100/320/927901901/17896/10c549f7/5b487d86Ndb7b3948.png',
                    label: '微波炉'
                  },
                  {
                    image: 'http://img13.360buyimg.com/focus/s140x140_jfs/t20074/108/2532487597/5940/4d67101d/5b48892dNcbde57bd.jpg',
                    label: '瑜伽垫'
                  },
                  {
                    image: 'http://img20.360buyimg.com/focus/s140x140_jfs/t22300/73/231945461/4142/40db87e3/5b055011Nb89b2bda.png',
                    label: '充电宝'
                  },
                  {
                    image: 'http://img20.360buyimg.com/focus/s140x140_jfs/t20128/208/216721929/9242/472993da/5b05522dNa2aae1bb.png',
                    label: '耳机'
                  },
                  {
                    image: 'http://img20.360buyimg.com/focus/s140x140_jfs/t20128/208/216721929/9242/472993da/5b05522dNa2aae1bb.png',
                    label: '耳机'
                  },
                  {
                    image: 'http://img20.360buyimg.com/focus/s140x140_jfs/t20128/208/216721929/9242/472993da/5b05522dNa2aae1bb.png',
                    label: '耳机'
                  },
                  {
                    image: 'http://img20.360buyimg.com/focus/s140x140_jfs/t20128/208/216721929/9242/472993da/5b05522dNa2aae1bb.png',
                    label: '耳机'
                  },
                  {
                    image: 'http://img30.360buyimg.com/focus/s140x140_jfs/t22444/92/965398566/5352/2eac5e79/5b487f2eN6c35068e.jpg',
                    label: '空调扇'
                  },
                  {
                    image: 'http://img13.360buyimg.com/focus/s140x140_jfs/t20488/4/2136681163/24726/415ebfae/5b487fa3Nf5ff458c.png',
                    label: '鱼竿'
                  },
                  {
                    image: 'http://img30.360buyimg.com/focus/s140x140_jfs/t21655/83/2186874549/15932/c273d29b/5b48802aN13fe73de.png',
                    label: '剃须刀'
                  },
                  {
                    image: 'http://img14.360buyimg.com/focus/s140x140_jfs/t24349/253/931832357/8172/6838e266/5b48801aN8e64757f.jpg',
                    label: '男鞋'
                  },
                  {
                    image: 'http://img14.360buyimg.com/focus/s140x140_jfs/t24100/320/927901901/17896/10c549f7/5b487d86Ndb7b3948.png',
                    label: '微波炉'
                  },
                  {
                    image: 'http://img13.360buyimg.com/focus/s140x140_jfs/t20074/108/2532487597/5940/4d67101d/5b48892dNcbde57bd.jpg',
                    label: '瑜伽垫'
                  },
                  {
                    image: 'http://img20.360buyimg.com/focus/s140x140_jfs/t22300/73/231945461/4142/40db87e3/5b055011Nb89b2bda.png',
                    label: '充电宝'
                  },
                  {
                    image: 'http://img20.360buyimg.com/focus/s140x140_jfs/t20128/208/216721929/9242/472993da/5b05522dNa2aae1bb.png',
                    label: '耳机'
                  },
                  {
                    image: 'http://img20.360buyimg.com/focus/s140x140_jfs/t20128/208/216721929/9242/472993da/5b05522dNa2aae1bb.png',
                    label: '耳机'
                  },
                  {
                    image: 'http://img20.360buyimg.com/focus/s140x140_jfs/t20128/208/216721929/9242/472993da/5b05522dNa2aae1bb.png',
                    label: '耳机'
                  },
                  {
                    image: 'http://img20.360buyimg.com/focus/s140x140_jfs/t20128/208/216721929/9242/472993da/5b05522dNa2aae1bb.png',
                    label: '耳机'
                  },
                ]
              })
              break;
            case '1':
              res.json({
                data: [
                  {
                    image: 'http://img30.360buyimg.com/focus/s140x140_jfs/t22444/92/965398566/5352/2eac5e79/5b487f2eN6c35068e.jpg',
                    label: '空调扇'
                  },
                  {
                    image: 'http://img30.360buyimg.com/focus/s140x140_jfs/t21655/83/2186874549/15932/c273d29b/5b48802aN13fe73de.png',
                    label: '剃须刀'
                  },
                  {
                    image: 'http://img14.360buyimg.com/focus/s140x140_jfs/t24100/320/927901901/17896/10c549f7/5b487d86Ndb7b3948.png',
                    label: '微波炉'
                  },
                  {
                    image: 'http://img20.360buyimg.com/focus/s140x140_jfs/t22300/73/231945461/4142/40db87e3/5b055011Nb89b2bda.png',
                    label: '充电宝'
                  },
                  {
                    image: 'http://img20.360buyimg.com/focus/s140x140_jfs/t20128/208/216721929/9242/472993da/5b05522dNa2aae1bb.png',
                    label: '耳机'
                  },
                ]
              })
              break;
            case '2':
              res.json({
                data: [
                  {
                    image: 'http://img30.360buyimg.com/focus/s140x140_jfs/t22444/92/965398566/5352/2eac5e79/5b487f2eN6c35068e.jpg',
                    label: '空调扇'
                  },
                  {
                    image: 'http://img30.360buyimg.com/focus/s140x140_jfs/t21655/83/2186874549/15932/c273d29b/5b48802aN13fe73de.png',
                    label: '剃须刀'
                  },
                  {
                    image: 'http://img14.360buyimg.com/focus/s140x140_jfs/t24100/320/927901901/17896/10c549f7/5b487d86Ndb7b3948.png',
                    label: '微波炉'
                  },
                  {
                    image: 'http://img20.360buyimg.com/focus/s140x140_jfs/t22300/73/231945461/4142/40db87e3/5b055011Nb89b2bda.png',
                    label: '充电宝'
                  },
                  {
                    image: 'http://img20.360buyimg.com/focus/s140x140_jfs/t20128/208/216721929/9242/472993da/5b05522dNa2aae1bb.png',
                    label: '耳机'
                  },
                ]
              })
              break;
            case '3':
              res.json({
                data: [
                  {
                    image: 'http://img30.360buyimg.com/focus/s140x140_jfs/t22444/92/965398566/5352/2eac5e79/5b487f2eN6c35068e.jpg',
                    label: '空调扇'
                  },
                  {
                    image: 'http://img30.360buyimg.com/focus/s140x140_jfs/t21655/83/2186874549/15932/c273d29b/5b48802aN13fe73de.png',
                    label: '剃须刀'
                  },
                  {
                    image: 'http://img14.360buyimg.com/focus/s140x140_jfs/t24100/320/927901901/17896/10c549f7/5b487d86Ndb7b3948.png',
                    label: '微波炉'
                  },
                  {
                    image: 'http://img20.360buyimg.com/focus/s140x140_jfs/t22300/73/231945461/4142/40db87e3/5b055011Nb89b2bda.png',
                    label: '充电宝'
                  },
                  {
                    image: 'http://img20.360buyimg.com/focus/s140x140_jfs/t20128/208/216721929/9242/472993da/5b05522dNa2aae1bb.png',
                    label: '耳机'
                  },
                ]
              })
              break;
            case '4':
              res.json({
                data: [
                  {
                    image: 'http://img30.360buyimg.com/focus/s140x140_jfs/t22444/92/965398566/5352/2eac5e79/5b487f2eN6c35068e.jpg',
                    label: '空调扇'
                  },
                  {
                    image: 'http://img30.360buyimg.com/focus/s140x140_jfs/t21655/83/2186874549/15932/c273d29b/5b48802aN13fe73de.png',
                    label: '剃须刀'
                  },
                  {
                    image: 'http://img14.360buyimg.com/focus/s140x140_jfs/t24100/320/927901901/17896/10c549f7/5b487d86Ndb7b3948.png',
                    label: '微波炉'
                  },
                  {
                    image: 'http://img20.360buyimg.com/focus/s140x140_jfs/t22300/73/231945461/4142/40db87e3/5b055011Nb89b2bda.png',
                    label: '充电宝'
                  },
                  {
                    image: 'http://img20.360buyimg.com/focus/s140x140_jfs/t20128/208/216721929/9242/472993da/5b05522dNa2aae1bb.png',
                    label: '耳机'
                  },
                ]
              })
              break;
            case '5':
              res.json({
                data: [
                  {
                    image: 'http://img30.360buyimg.com/focus/s140x140_jfs/t22444/92/965398566/5352/2eac5e79/5b487f2eN6c35068e.jpg',
                    label: '空调扇'
                  },
                  {
                    image: 'http://img30.360buyimg.com/focus/s140x140_jfs/t21655/83/2186874549/15932/c273d29b/5b48802aN13fe73de.png',
                    label: '剃须刀'
                  },
                  {
                    image: 'http://img14.360buyimg.com/focus/s140x140_jfs/t24100/320/927901901/17896/10c549f7/5b487d86Ndb7b3948.png',
                    label: '微波炉'
                  },
                  {
                    image: 'http://img20.360buyimg.com/focus/s140x140_jfs/t22300/73/231945461/4142/40db87e3/5b055011Nb89b2bda.png',
                    label: '充电宝'
                  },
                  {
                    image: 'http://img20.360buyimg.com/focus/s140x140_jfs/t20128/208/216721929/9242/472993da/5b05522dNa2aae1bb.png',
                    label: '耳机'
                  },
                ]
              })
              break;
            case '6':
              res.json({
                data: [
                  {
                    image: 'http://img30.360buyimg.com/focus/s140x140_jfs/t22444/92/965398566/5352/2eac5e79/5b487f2eN6c35068e.jpg',
                    label: '空调扇'
                  },
                  {
                    image: 'http://img30.360buyimg.com/focus/s140x140_jfs/t21655/83/2186874549/15932/c273d29b/5b48802aN13fe73de.png',
                    label: '剃须刀'
                  },
                  {
                    image: 'http://img14.360buyimg.com/focus/s140x140_jfs/t24100/320/927901901/17896/10c549f7/5b487d86Ndb7b3948.png',
                    label: '微波炉'
                  },
                  {
                    image: 'http://img20.360buyimg.com/focus/s140x140_jfs/t22300/73/231945461/4142/40db87e3/5b055011Nb89b2bda.png',
                    label: '充电宝'
                  },
                  {
                    image: 'http://img20.360buyimg.com/focus/s140x140_jfs/t20128/208/216721929/9242/472993da/5b05522dNa2aae1bb.png',
                    label: '耳机'
                  },
                ]
              })
              break;
            case '7':
              res.json({
                data: [
                  {
                    image: 'http://img30.360buyimg.com/focus/s140x140_jfs/t22444/92/965398566/5352/2eac5e79/5b487f2eN6c35068e.jpg',
                    label: '空调扇'
                  },
                  {
                    image: 'http://img30.360buyimg.com/focus/s140x140_jfs/t21655/83/2186874549/15932/c273d29b/5b48802aN13fe73de.png',
                    label: '剃须刀'
                  },
                  {
                    image: 'http://img14.360buyimg.com/focus/s140x140_jfs/t24100/320/927901901/17896/10c549f7/5b487d86Ndb7b3948.png',
                    label: '微波炉'
                  },
                  {
                    image: 'http://img20.360buyimg.com/focus/s140x140_jfs/t22300/73/231945461/4142/40db87e3/5b055011Nb89b2bda.png',
                    label: '充电宝'
                  },
                  {
                    image: 'http://img20.360buyimg.com/focus/s140x140_jfs/t20128/208/216721929/9242/472993da/5b05522dNa2aae1bb.png',
                    label: '耳机'
                  },
                ]
              })
              break;
          }
        })
      }
    }
  },
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  }
}
