module.exports = {
    status: 0,
    totalPage: 1,
    conditions: [ //场景条件
        {
            label: '5-10万',
            value: '1',
            conditionType: 'price'
        },
        {
            label: '轿车',
            value: '2',
            conditionType: 'model'
        }
    ],
    list:[
        {
            modelId: 1071, // 车型id
            imageUrl: "http://m3.auto.itc.cn/c_pad,w_150,h_100,red_255,green_255,blue_255/logo/model/1639.jpg", // 图片地址
            minPrice: "10", // 价格最小值
            maxPrice: "20", // 价格最大值
            modelName: "日产轩逸", //车型名称
            scoreLabel: '总分',
            scoreValue: "65", //总分
            tags: [ //自定义参数
                {
                    label: '性能',
                    value: '51.2'
                },
                {
                    label: '车辆性能',
                    value: '51.5'
                },
                {
                    label: '车辆性能',
                    value: '57.9'
                }
            ]
        },
        {
            modelId: 1071, // 车型id
            imageUrl: "http:////m3.auto.itc.cn/c_pad,w_150,h_100,red_255,green_255,blue_255/logo/model/1639.jpg", // 图片地址
            minPrice: "10", // 价格最小值
            maxPrice: "20", // 价格最大值
            modelName: "日产轩逸", //车型名称
            scoreLabel: '总分',
            scoreValue: "65", //总分
            tags: [ //自定义参数
                {
                    label: '车辆性能',
                    value: '51.2'
                },
                {
                    label: '车辆性能',
                    value: '51.5'
                },
                {
                    label: '车辆性能',
                    value: '57.9'
                }
            ]
        }
    ]
};