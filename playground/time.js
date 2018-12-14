const moment = require('moment')

// let date = new Date()
// console.log(date.getMonth())

let date = moment();
//date.add(100, 'years').subtract(1, 'months')
console.log(date.format('MMM Do, YYYY'))
console.log(moment().format('LT'))