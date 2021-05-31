/**
 * 二分查找：是一种搜索某个值的索引的算法。
 * 基本条件：有序的数组。
 * 思路：
 * 1.将数组折半，分成左右两个数组。
 * 2.判断要查找的数和中间位置数值的大小，来判断要查找的数实在哪一半。
 * 3.之后继续折半查找，直至找到这个数。
 * 方法： 
 * 一种是非递归方式，采用while方式，判断是否符合要求。
 * 另一种是采用递归方式，采用if方式，依次递归，找到相应的值。
 * 
 * @param {Array}  arr  已排好的数组
 * @param {Number} num  想要查找的值
 */

export function binary_search1(arr, num) {
  var low = 0
  var high = arr.length
  var i = 1
  console.log('当前数组：', arr)
  console.time('总共耗时')
  while (low <= high) {
    var mid = parseInt((low + high) / 2)
    console.log('第 ' + (i++) + ' 次查找, 本次索引为 ' + mid)
    if (num === arr[mid]) {
      console.log('找到了：索引值为 ' + mid)
      console.timeEnd('总共耗时')
      return mid
    } else if (num > arr[mid]) {
      low = mid
    } else if (num < arr[mid]) {
      high = mid
    }
    console.log(arr.slice(low, high))
    if(!arr.slice(low, high).length) {
      console.log(num + ' 不在数组里')
      break
    }
  }
  console.timeEnd('总共耗时')
}

export function binary_search2(arr, low, high, key) {
  if (low > high) {
    return -1;
  }
  var mid = parseInt((high + low) / 2);
  if (arr[mid] == key) {
    return mid;
  } else if (arr[mid] > key) {
    high = mid - 1;
    return binary_search2(arr, low, high, key);
  } else if (arr[mid] < key) {
    low = mid + 1;
    return binary_search2(arr, low, high, key);
  }
}
