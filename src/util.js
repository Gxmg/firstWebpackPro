// module.exports = function Say() {
//   console.log('hello world  i am is change');
// }
const Actions = {
  Say() {
    console.log('hello world  i am is change');
  },
  getData() {
    return new Promise((resolve, reject) => {
        resolve('ok');
    })
  }
};


export default Actions;