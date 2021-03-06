const teamsController = require('./teamsController')
const workspace = require('../utils/workspace')

const getNotifiableEmployees = async () => {
  let employeeArray = []
  let teams = await teamsController.getWhiteListedTeamsAndUsers()
  let employees = await workspace.getEmployees()
  employees.forEach(employee => {
    let employeeTeams = teams.filter(team => team.users.includes(employee.id))
    if (employeeTeams.length > 0) {
      employee.channels = teamsController.extractChannelsFromTeamArray(employeeTeams)
      employeeArray.push(employee)
    }
  })
  return employeeArray
}


module.exports = {
  getNotifiableEmployees
}
