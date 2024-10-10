function createEmployeeRecord (employeeArray) {
    return {
        firstName : employeeArray[0],
        familyName : employeeArray[1],
        title : employeeArray[2],
        payPerHour : employeeArray[3],
        timeInEvents: [],
        timeOutEvents : []
    }
}

console.log(createEmployeeRecord(["Gray", "Worm", "Security", 1]))

function createEmployeeRecords(employeeArrays) {
    return employeeArrays.map(employeeeArray=> createEmployeeRecord(employeeeArray))
}

function createTimeInEvent (employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(' ')

    const timeInEvent = {
        type: 'TimeIn',
        hour: parseInt(hour, 10),
        date: date
    };
    employeeRecord.timeInEvents.push(timeInEvent)
    return employeeRecord
}

function createTimeOutEvent (employeeRecord, dateStamp) {
    const[date, hour] = dateStamp.split(' ');

    const timeOutEvent = {
        type: 'TimeOut',
        hour: parseInt(hour, 10),
        date: date
    }
    employeeRecord.timeOutEvents.push(timeOutEvent);
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event=> event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event=> event.date === date);

    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour)/100;

    return hoursWorked;
}

function wagesEarnedOnDate (employeeRecord, date) {
   const hoursWorked = hoursWorkedOnDate(employeeRecord, date);

   const payOwned = hoursWorked * employeeRecord.payPerHour;
   return payOwned;
}

function allWagesFor(employeeRecord) {
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date);

    const totalWages = datesWorked.reduce((total, date) => {
        return total + wagesEarnedOnDate(employeeRecord,date)
    }, 0)

    return totalWages
}

function calculatePayroll(employeeRecords) {
    
    const totalPayroll = employeeRecords.reduce((total, employee) => {
      return total + allWagesFor(employee);
    }, 0);
  
    return totalPayroll;
  }