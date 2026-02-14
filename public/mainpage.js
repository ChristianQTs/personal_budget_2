const fetchAllEnvelopes = async () => {
    const URL = `${window.location.origin}/personalBudget/envelopes`

        const resDiv = document.createElement('div')
        document.body.appendChild(resDiv)
        try {
            const response = await fetch(URL)
            const json = await response.json()

            if (response.ok) {
                for (let env of json) {
                    const envelope = document.createElement('div')
                    for (let field in env) {
                        const newLine = document.createElement('h2')
                        newLine.textContent = `${field} : ${env.field}`
                        envelope.appendChild(newLine)
                    }
                    resDiv.appendChild(envelope)
                }
            } else {
                window.alert(json.message)
            }
        } catch (err) {
            window.alert(err.message)
        }
    }


document.addEventListener('DOMContentLoaded', () => {
    const getAllEnvsButton = document.getElementById('allEnvsBTN')
    getAllEnvsButton.addEventListener('click', fetchAllEnvelopes)
})