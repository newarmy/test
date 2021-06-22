module.exports = function (time) {
    return {
        status: 200,
        data:[{
            startTime: time - 5000,
            endTime: time + 5000,
            pcUrl: 'http://db.m.auto.sohu.com/model_1992/?param=214&from=list',
            wapUrl: 'http://db.m.auto.sohu.com/model_1992/?param=214&from=list',
            imgUrl: 'http://auto-pic.bjcnc.scs.sohucs.com/liveEnter/tg11.gif'
        },
            {
                startTime: time + 15000,
                endTime: time + 25000,
                pcUrl: 'http://db.m.auto.sohu.com/model_1992/?param=214&from=list',
                wapUrl: 'http://db.m.auto.sohu.com/model_1992/?param=214&from=list',
                imgUrl: 'http://auto-pic.bjcnc.scs.sohucs.com/liveEnter/ms11.gif'
            }
        ]
    };
}