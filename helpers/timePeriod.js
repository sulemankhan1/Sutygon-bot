const moment = require('moment')

const weekly = () => {
  console.log(moment().startOf('isoWeek').add(1, 'week'))

  return moment().startOf('isoWeek').add(1, 'week')
}

exports.biWeekly = () => {
  let nextMonday = weekly()

  // create new instance
  let secondMonday = nextMonday.clone()
  secondMonday.startOf('isoWeek').add(1, 'week')

  // create new instance
  let thirdMonday = secondMonday.clone()
  thirdMonday.startOf('isoWeek').add(1, 'week')

  console.log([nextMonday, thirdMonday])

  //   return [nextMonday, thirdMonday]
}

exports.monthly = () => {
  //   return moment().endOf('month').startOf('isoweek')
  console.log(moment().endOf('month').startOf('isoweek'))
}
