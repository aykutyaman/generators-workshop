// async request call simulation
exports.request = function request(url) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve("hello world");
    }, 500);
  });
}
