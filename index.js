function createEmployeeRecord(employeeArray) {
    return {
      firstName: employeeArray[0],
      familyName: employeeArray[1],
      title: employeeArray[2],
      payPerHour: employeeArray[3],
      timeInEvents: [],
      timeOutEvents: []
    }
  }
  
  function createEmployeeRecords(arr) {
    return arr.map(record => createEmployeeRecord(record))
  }
  
  function createTimeInEvent(empRecord, date) {
    const newTimeInEvent = {
      type: "TimeIn",
      hour: parseInt(date.slice(-4)),
      date: date.slice(0, 10)
    }
    empRecord.timeInEvents.push(newTimeInEvent)
    return empRecord
  }
  
  function createTimeOutEvent(empRecord, date) {
    const newTimeOutEvent = {
      type: "TimeOut",
      hour: parseInt(date.slice(-4)),
      date: date.slice(0, 10)
    }
    empRecord.timeOutEvents.push(newTimeOutEvent)
    return empRecord
  }
  
  function hoursWorkedOnDate(empRecord, date) {
    const timeIn = empRecord.timeInEvents.find(event => event.date === date);
    const timeOut = empRecord.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour)/100;
  }
  
  function wagesEarnedOnDate(empRecord, date) {
    return hoursWorkedOnDate(empRecord, date) * empRecord.payPerHour;
  }
  
  function allWagesFor(empRecord) {
    const allWages = empRecord.timeInEvents.map(event => wagesEarnedOnDate(empRecord, event.date));
    return allWages.reduce((total, wage) => total + wage);
  }
  
  function calculatePayroll(empRecords) {
    const totalForEachEmployee = empRecords.map(record => allWagesFor(record))
    return totalForEachEmployee.reduce((total, empTotal) => total + empTotal)
  }
  
  function findEmployeeByFirstName(src, name) {
    return src.find(record => record.firstName === name);
  }