export const hostName = host ? host+'/api/' : 'http://10.16.78.121:8060/api/';

export const imageUrl = hostName + 'carpic/list/4/0/group_{{picGroupId}}/picId_{{picId}}/recommend_12.json';
export const commentUrl = hostName + 'topic/{{topicId}}/-1/{{pageNum}}/{{size}}.json';
export const topicUrl = hostName + 'topic/{{picGroupId}}.json';
export const recImageUrl = hostName + 'carpicgroup/list/brief/{{id}}/{{count}}.json';
export const loadUserUrl = '//db.auto.sohu.com/api/comment/userinfo/get';
export const  publishCommentUrl = '//db.auto.sohu.com/api/comment/deliver';
export const commentListUrl = '//db.auto.sohu.com/api/comment/list';
export const likeCommentUrl = '//db.auto.sohu.com/api/comment/like';