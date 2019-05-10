const _ = require('lodash');
const fs = require('fs');
const path = require('path');

/**
 * 映射 d 文件夹下的文件为模块
 */

const mapDir = d => {
    const tree = {};
    // 获得当前文件夹下的所有的文件夹和文件
    /**
     * readdirSync
     * fs.readdirSync(path[, options])#

     中英对照提交修改

     版本历史
     path <string> | <Buffer> | <URL>
     options <string> | <Object>

     encoding <string> 默认值: 'utf8'。
     withFileTypes <boolean> 默认值: false。
     返回: <string[]> | <Buffer[]> | <fs.Dirent[]>
     同步的 readdir(3)。

     可选的 options 参数可以是指定编码的字符串，也可以是具有 encoding 属性的对象，
     该属性指定用于传给回调的文件名的字符编码。 如果 encoding 设置为 'buffer'，则返回的文件名是 Buffer 对象。

     如果 options.withFileTypes 设置为 true，则返回的结果将包含 fs.Dirent 对象。


     lodash partition
     _.partition(collection, [predicate=_.identity])
     创建一个分成两组的元素数组，第一组包含predicate（断言函数）返回为 truth（真值）的元素，
     第二组包含predicate（断言函数）返回为 false（假值）的元素。
     predicate 调用1个参数：(value)。

     :fs.statSync

     fs.Stats 对象提供有关文件的信息

     fs.Stats.isDirectory  如果 fs.Stats 对象描述文件系统目录，则返回 true。

     : path.join

     path.join() 方法使用平台特定的分隔符作为定界符将所有给定的 path 片段连接在一起，然后规范化生成的路径。
     *
     * */
    const [dirs, files] = _(fs.readdirSync(d)).partition( p => fs.statSync(path.join(d, p)).isDirectory());
     //console.log(dirs);
    // console.log(files);
    // 映射文件夹
    dirs.forEach(dir => {
        tree[dir] = mapDir(path.join(d, dir))
    });

    // 映射文件
    /**
     * path.extname
     * path.extname() 方法返回 path 的扩展名，从最后一次出现 .（句点）字符到 path 最后一部分的字符串结束。
     * 如果在 path 的最后一部分中没有 . ，
     * 或者如果 path 的基本名称（参阅 path.basename()）的第一个字符是 .，则返回空字符串。

        path.basename
     path <string>
     ext <string> 可选的文件扩展名。
     返回: <string>
     path.basename() 方法返回 path 的最后一部分，类似于 Unix 的 basename 命令。
     尾部的目录分隔符将被忽略，参阅 path.sep。

     path.basename('/foo/bar/baz/asdf/quux.html');
     // 返回: 'quux.html'

     path.basename('/foo/bar/baz/asdf/quux.html', '.html');
     // 返回: 'quux'
     *
     *
     * require:
     * 用于引入模块、 JSON、或本地文件。 可以从 node_modules 引入模块。
     * 可以使用相对路径（例如 ./、 ./foo、 ./bar/baz、 ../foo）引入本地模块或 JSON 文件，
     * 路径会根据 __dirname 定义的目录名或当前工作目录进行处理。
     * */
    files.forEach(file => {
        if (path.extname(file) === '.js') {
            tree[path.basename(file, '.js')] = require(path.join(d, file))
        }
    });
    return tree
}
module.exports = mapDir(path.join(__dirname));