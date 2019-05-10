 module.exports = [
    {
        type: 'price', //
        label: '价格区间',
        level: 1,
        list: [
            {
                label: '5万以下',
                value: '1',
                on: false
            },
            {
                label: '5-10万',
                value: '2',
                on: false
            },
            {
                label: '11-15万',
                value: '3',
                on: false
            },
            {
                label: '16-20万',
                value: '4',
                on: false
            },
            {
                label: '21-25万',
                value: '5',
                on: false
            }
        ]
    },
    {
        type: 'model', // 车型
        label: '车型',
        level: 1,
        list: [
            {
                label: '全部',
                value: '0',
                on: false
            },
            {
                label: 'SUV',
                value: '1',
                on: false
            },
            {
                label: '轿车',
                value: '2',
                on: false
            },
            {
                label: 'MPV',
                value: '3',
                on: false
            },
            {
                label: '跑车',
                value: '4',
                on: false
            },
            {
                label: '纯电动车',
                value: '5',
                on: false
            }


        ]
    },
    {
        type: 'country', //国别
        label: '国别',
        level: 1,
        list: [
            {
                label: '全部',
                value: '0',
                on: false
            },
            {
                label: '自主',
                value: '1',
                on: false
            },
            {
                label: '德系',
                value: '2',
                on: false
            },
            {
                label: '美系',
                value: '3',
                on: false
            },
            {
                label: '法系',
                value: '4',
                on: false
            },
            {
                label: '日系',
                value: '5',
                on: false
            },
            {
                label: '韩系',
                value: '6',
                on: false
            },
            {
                label: '英意',
                value: '7',
                on: false
            },
            {
                label: '其他',
                value: '8',
                on: false
            }

        ]
    },
    {
        type: 'firm', //生产厂商
        label: '生产厂商',
        level: 2,
        list: [
            {
                label: '全部',
                value: '0',
                on: false
            },
            {
                label: '自主',
                value: '1',
                on: false
            },
            {
                label: '合资',
                value: '2',
                on: false
            },
            {
                label: '进口',
                value: '3',
                on: false
            }
        ]
    },
    {
        type: 'structure', //车身结构
        label: '车身结构',
        level: 2,
        list: [
            {
                label: '全部',
                value: '0',
                on: false
            },
            {
                label: '两厢',
                value: '1',
                on: false
            },
            {
                label: '三厢',
                value: '2',
                on: false
            },
            {
                label: '旅行车',
                value: '3',
                on: false
            },
            {
                label: '跑车',
                value: '4',
                on: false
            }
        ]
    },
    {
        type: 'seat', //座位数
        label: '座位数',
        level: 2,
        list: [
            {
                label: '全部',
                value: '0',
                on: false
            },
            {
                label: '5座以下',
                value: '1',
                on: false
            },
            {
                label: '5座',
                value: '2',
                on: false
            },
            {
                label: '7座',
                value: '3',
                on: false
            },
            {
                label: '其他',
                value: '4',
                on: false
            }
        ]
    },
    {
        type: 'transmission', //变速箱
        label: '变速箱',
        level: 2,
        list: [
            {
                label: '全选',
                value: '0',
                on: false
            },
            {
                label: '自动',
                value: '1',
                on: false
            },
            {
                label: '手动',
                value: '2',
                on: false
            }
        ]
    },
    {
        type: 'displacement', //排量
        label: '排量',
        level: 2,
        list: [
            {
                label: '不限',
                value: '0',
                on: false
            },
            {
                label: '1.0L以下',
                value: '1',
                on: false
            },
            {
                label: '1.0-1.6L',
                value: '2',
                on: false
            },
            {
                label: '1.7-2.0L',
                value: '3',
                on: false
            },
            {
                label: '2.1-2.5L',
                value: '4',
                on: false
            },
            {
                label: '2.6-3.0L',
                value: '5',
                on: false
            },
            {
                label: '3.1-4.0L',
                value: '6',
                on: false
            },
            {
                label: '4.0L以上',
                value: '7',
                on: false
            }
        ]
    },
    {
        type: 'intake', //进气方式
        label: '进气方式',
        level: 2,
        list: [
            {
                label: '全选',
                value: '0',
                on: false
            },
            {
                label: '自然吸气',
                value: '1',
                on: false
            },
            {
                label: '涡轮增压',
                value: '2',
                on: false
            },
            {
                label: '机械增压',
                value: '3',
                on: false
            }
        ]
    },
    {
        type: 'drive', //驱动方式
        label: '驱动方式',
        level: 2,
        list: [
            {
                label: '全选',
                value: '0',
                on: false
            },
            {
                label: '前驱',
                value: '1',
                on: false
            },
            {
                label: '后驱',
                value: '2',
                on: false
            },
            {
                label: '全时四驱',
                value: '3',
                on: false
            },
            {
                label: '实时四驱',
                value: '4',
                on: false
            },
            {
                label: '分时四驱',
                value: '5',
                on: false
            }
        ]
    },
    {
        type: 'other', //其他
        label: '其他',
        level: 2,
        list: [
            {
                label: '全选',
                value: '0',
                on: false
            },
            {
                label: '停车辅助',
                value: '1',
                on: false
            },
            {
                label: '天窗',
                value: '2',
                on: false
            },
            {
                label: '灯源',
                value: '3',
                on: false
            },
            {
                label: '全景天窗',
                value: '4',
                on: false
            },
            {
                label: '座椅加热',
                value: '5',
                on: false
            },
            {
                label: '发动机启停',
                value: '6',
                on: false
            }
        ]
    }
];