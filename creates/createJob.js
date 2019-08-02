const apiConst = require('../apiConst');

const makeRequest = (z, url, body) => z.request({
    url: url,
    method: 'POST',
    body:z.JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
  .then((response) => {
    if (response.status !== 200) {
      z.console.log(`Error ${response.status}: response.content`)
      return null;
    }
    let content = z.JSON.parse(response.content)
    if (typeof content === 'string') {
      content = {"id": content}
    }
    return content
  });

const searchTeam = (z, bundle)=>{

  const model = {
    "skip": 0,
    "limit": 100,
    "rateRangeCurrency": bundle.inputData.currency,
  }

  const url = `https://${apiConst.servers[bundle.authData.api_server]}${apiConst.routes.accountSearchTeam}`

  const findPerson = (model) => {

    return makeRequest(z, url, model).then((team)=>{
      if (team === null) {
        return null;
      }
      const skip = team.length === 100 ? model.skip + 100 : 0
      const person = team.filter((person)=>{
        return person.email === bundle.inputData.email
      })

      if (person.length === 0 && skip===0) {
        return null
      }

      if (person.length === 0) {
        model.skip = skip
        return findPerson(model)
      }

      return person
    })
  }

  return findPerson(model)
}

const createPersonTeam = (z, bundle)=>{
  const model = {
    "email": bundle.inputData.email,
    "firstName": bundle.inputData.firstName,
    "lastName": bundle.inputData.lastName,
  }

  const url =`https://${apiConst.servers[bundle.authData.api_server]}${apiConst.routes.accountTeam}`
  
  return makeRequest(z, url, model);
}

const createJob = (z, bundle, id) => {
  const model = {
    "freelancerId": id,
    "serviceType": bundle.inputData.serviceType,
    "jobDescription": bundle.inputData.jobDescription,
    "unitsType":  bundle.inputData.unitsType,
    "unitsAmount": bundle.inputData.unitsAmount,
    "pricePerUnit": bundle.inputData.pricePerUnit,
    "currency": bundle.inputData.currency,
    "externalNumber": bundle.inputData.externalNumber,
  }

  const url =`https://${apiConst.servers[bundle.authData.api_server]}${apiConst.routes.invoiceJob}`
  
  return makeRequest(z, url, model);
}
// We recommend writing your creates separate like this and rolling them
// into the App definition at the end.
module.exports = {
  key: 'create_job',

  // You'll want to provide some helpful display labels and descriptions
  // for users. Zapier will put them into the UX.
  noun: 'Job',
  display: {
    label: 'Create Job',
    description: 'Creates a new Job.'
  },

  // `operation` is where the business logic goes.
  operation: {
    inputFields: [
      {key: 'email', required: true, type: 'string', label: 'Email'},
      {key: 'firstName', required: true, type: 'string', label: 'First Name'},
      {key: 'lastName', required: true, type: 'string', label: 'Last Name'},
      {key: 'serviceType', required: true, type: 'string', label: 'Service Type'},
      {key: 'jobDescription', required: true, type: 'string', label: 'Job Description'},
      {key: 'unitsType', required: true, type: 'string', label: 'Units Type'},
      {key: 'unitsAmount', required: true, type: 'number', label: 'Units Amount'},
      {key: 'pricePerUnit', required: true, type: 'number', label: 'Price Per Unit'},
      {key: 'currency', choices: apiConst.currency, required: true, type: 'string', label: 'Currency'},
      {key: 'externalNumber', required: true, type: 'string', label: 'External Number'},
    ],
    perform: (z, bundle) => {
      return searchTeam(z, bundle).then((freelancers)=>{
        if (freelancers === null) {
          return createPersonTeam(z, bundle).then((freelancer)=>{
            return createJob(z, bundle, freelancer.id);
          })
        }
        return createJob(z, bundle, freelancers[0].id);
      })
    },

    // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
    // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
    // returned records, and have obviously dummy values that we can show to any user.
    sample: {
      id: 1,
      createdAt: 1472069465,
      name: 'Best Spagetti Ever',
    },

    // If the resource can have fields that are custom on a per-user basis, define a function to fetch the custom
    // field definitions. The result will be used to augment the sample.
    // outputFields: () => { return []; }
    // Alternatively, a static field definition should be provided, to specify labels for the fields
    outputFields: [
      {key: 'id', label: 'ID'},
      {key: 'createdAt', label: 'Created At'},
      {key: 'name', label: 'Name'},
    ]
  }
};
