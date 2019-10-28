export default  {
    setComments(state, payload){
        let comments = state.comments;
        comments = comments.concat(payload);
        state.comments = comments;
    },
    setLikeComment(state, commentId) {
         for(let i = 0, len = state.comments.length; i< len; i++){
             if(state.comments[i].id === commentId) {
                 state.comments[i].like = true;

                 state.comments[i].likeCount +=1;
             }
         }
    },
    addComment(state, payload) {
        state.comments.unshift(payload);
    },
    addCommentNum(state) {
        state.commentNum+=1;
    },
    setCommentNum(state, payload) {
        state.commentNum = payload;
    },
    setNoComments (state, payload) {
        state.noComments = payload;
    },
    setNoMoreBtn (state, payload) {
        state.noMoreBtn = payload;
    }

};