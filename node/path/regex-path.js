let strict = true;
let pathRegexp = function (path) {
    path = path.concat(strict ? '' : '/?')
        .replace('/\/\(/g', '(?:/')
        .replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?(\*)?/g, function(_,slash, format, key, capture, optional, star){
            console.log(slash, format, key, capture, optional, star);
            slash = slash || '';
            return ''
            +(optional ? '' : slash)
            +'(?:'
            +(optional ? slash : '')
            +(format || '')+(capture || (format && '([^/.]+?)' || '([^/]+?)')) + ')'
            +(optional || '')
            +(star ? '(/*)?' : '');
        }).replace(/([\/.])/g, '\\$1')
        .replace(/\*/g, '(.*)');
    return new RegExp('^' +path+'$');
};

console.log(pathRegexp('/test/:username/:id'));
console.log(pathRegexp('/test/.:ext?dd=cc'));

var aar = '/test/.json?dd=cc\''.match(/^\/test(?:\/\.([^\/\.]+?))?dd=cc$/);
console.log(aar);