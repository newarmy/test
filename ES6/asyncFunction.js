function resolveAfter2Seconds() {
    return new Promise((resolve, reject) => {
      let r = Math.random();
      setTimeout(() => {
        if(r > 0.5) {
             resolve('resolved');
        } else {
             reject('reject');
        }
       
      }, 1000);
    });
  }
  
  async function asyncCall() {
    console.log('calling');
    try{
        const result = await resolveAfter2Seconds();
    console.log(result);
    }catch(e) {
      console.log(e);
    }
    
    // expected output: 'resolved'
  }
  
  asyncCall();