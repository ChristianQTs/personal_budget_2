const allEnvButton = document.getElementById('allEnvsBTN')

const fetchAllEnvs = async () => {
    const URL = window.location.origin + '/personalBudget/envelopes'
    const resDiv = document.createElement('div')
    document.appendChild(resDiv)
    try {
        const response = await fetch(URL)
        const json = await response.json()
        if (response.ok) {
            for (let env = 0; env < json.length; env++) {
                const envelope = document.createElement('div')
                for (field in json[env]) {
                    const newLine = createElement('h2')
                    newLine.textContent = `${field} : ${json[env][field]}`
                    envelope.appendChild(newLine)
                }
                resDiv.appendChild(envelope)
            }
        } else {
            window.alert(json.message)
        }
    } catch (err) {
        window.alert(err)
    }
}
allEnvButton.addEventListener('click', fetchAllEnvs)