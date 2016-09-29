/**
 * Created by chuck on 2016/9/29.
 */
var queue = {};

var PubSub = {
  on: function (event, callback) {
    if(event){
      queue[event] = queue[event] || [];
      queue[event].push(callback);
      console.log(queue);
    }
    return this
  },

  off: function (event) {
    if(queue[event]){
      if(!arguments[1]){
        delete queue[event];
      } else {
        console.log(arguments)
        Array.prototype.forEach.call(arguments, function (value,index) {
          if (index>0){
            console.log(value)
            console.log(index)
            console.log(Array.isArray(queue[event]))
            queue[event].splice(index, 1);
            console.log(queue[event])
          }
        })
      }
    }
    console.log(queue);
    return this
  },

  emit: function (event) {
    var cbList = queue[event];
    if(cbList) {
      for(var i = 0; cbList[i];){
        cbList[i++]();
      }
    }
    return this
  }
};

// 订阅
var callbackA = function () {
  console.log('event a happened')
};
// PubSub.on('a', callbackA);
// PubSub.on('b', function() {
//   console.log('event b happened')
// });

// 退订 , 第二个参赛传入回调函数的引用
// PubSub.off('a', callbackA);

// 发布
// PubSub.emit('a');
// PubSub.emit('b');


/**
 * 生成区间内的随机数
 * @param n1
 * @param n2
 * @return {number}
 */
var random = function(n1,n2){
  var temp = Math.random() * (Math.max(n1,n2)-Math.min(n1,n2) + 1);
  return Math.round(temp);
};
/**
 * 生成子母表
 * @return {Array}
 */
var azAZ = function () {
  var arr = [];
  for(var i=65;i<91;i++)
  {
    arr.push(String.fromCharCode(i));
  }
  for(var j=97;j<123;j++)
  {
    arr.push(String.fromCharCode(j));
  }
  return arr
};
/**
 * 生成数字数组
 * @param start
 * @param end
 * @return {Array}
 */
var mathArr = function (start, end) {
  var arr = [];
  for(var i = start; i<= end; i++){
    arr.push(i);
  }
  return arr;
};

/**
 * 生成随机字符串
 * @param arr 字符字典数组
 * @param count 生成的字符串位数
 * @param randomFn
 * @return {string}
 */
var hashStr = function (arr, count, randomFn) {
  var arrTest = [];
  for (var z = 0; z<count;z++){
    arrTest.push(arr[randomFn(0, arr.length)]);
  }
  return arrTest.join('');
};

// var hash = function (count, random) {
//   var str = '';
//   for(var i=0;i<count;i++){
//     random()
//   }
//   return str
// };
var arrTest = azAZ().concat(mathArr(0, 9));
var hash = hashStr(arrTest, 20000, random);
// console.log(hash);
/**
 * 数组去重1
 * @param arr
 * @return {Array}
 */
function unique1(arr) {
  var result = [], hash = {};
  for (var i = 0, elem; (elem = arr[i]) != null; i++) {
    var prefix = (typeof elem == 'string')
               ? 'str_'
               : '';
    if (!hash[prefix + elem]) {
      result.push(elem);
      hash[prefix + elem] = true;
    }
  }
  // console.log(result);
  return result;
}
var start1 = new Date().getTime(), end1;
console.log(unique1(hash.split('')).join(''));
end1 = new Date().getTime();
console.log(end1-start1);
/**
 * 数组去重1
 * @param arr
 * @return {Array}
 */
function unique2(arr) {
  var result = [];
  for(var i=0;i<arr.length;i++){
    var flag = true;
    for (var j=0;j<result.length;j++){
      if(arr[i] === result[j]){
        flag = false;
      }
    }
    if (flag){
      result.push(arr[i]);
    }

  }

  // console.log(result);
  return result;
}

var start = new Date().getTime(), end;

console.log(unique2(hash.split('')).join(''));

end = new Date().getTime();
console.log(end-start);
console.log((end1-start1)-(end-start));
