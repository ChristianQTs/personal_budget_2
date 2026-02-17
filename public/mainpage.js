const inputDiv = document.getElementById('inputDiv')
const outputDiv = document.getElementById('outputDiv')

const clearDivs = () => {
    inputDiv.innerHTML =''
    outputDiv.innerHTML = ''

}

const fetchAllEnvelopes = async () => {
    const URL = `${window.location.origin}/personalBudget/envelopes`

        try {
            const response = await fetch(URL)
            const json = await response.json()

            if (response.ok) {
                clearDivs()
                for (let env of json) {
                    const envelope = document.createElement('div')
                    for (let field in env) {
                        const newLine = document.createElement('h2')
                        newLine.textContent = `${field} : ${env[field]}`
                        envelope.appendChild(newLine)
                    }
                    outputDiv.appendChild(envelope)
                }
            } else {
                window.alert(json.message)
            }
        } catch (err) {
            window.alert(err.message)
        }
}

const createNewEnvForm = () => {
    clearDivs()
    const nameLabel = document.createElement('label')
    const budgetLabel = document.createElement('label')

    nameLabel.setAttribute('for', 'nameInput')
    budgetLabel.setAttribute('for', 'budgetInput')
    nameLabel.textContent = 'Envelope name: '
    budgetLabel.textContent = 'Envelope budget: '

    const nameInput = document.createElement('input')
    const budgetInput = document.createElement('input')

    nameInput.id = 'nameInput'
    budgetInput.id = 'budgetInput'

    nameInput.type = 'text'
    budgetInput.type = 'number'

    inputDiv.appendChild(nameLabel)
    inputDiv.appendChild(nameInput)
    inputDiv.appendChild(document.createElement('br'))
    inputDiv.appendChild(budgetLabel)
    inputDiv.appendChild(budgetInput)

    const createButton = document.createElement('button')
    createButton.textContent = 'Create'
    createButton.id = 'createButton'
    inputDiv.appendChild(createButton)

    createButton.addEventListener('click', async () => {
        const URL = `${window.location.origin}/personalBudget/envelopes/newEnv`
        try {
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                    body: JSON.stringify({
                        name: nameInput.value,
                        budget : Number(budgetInput.value)
                    })     
            })
            const json = await response.json()
            if (response.ok) {
                const newLine = document.createElement('h2')
                newLine.textContent = json.message
                outputDiv.appendChild(newLine)
            } else {
                window.alert(json.message)
            }

        } catch (err) {
            window.alert(err.message)
        }
    })
    

}

const deleteEnvelope = () => {
    clearDivs()

    const envLabel = document.createElement('label')
    envLabel.textContent = 'Envelope to delete: '
    envLabel.setAttribute('for', 'envInput')

    const envInput = document.createElement('input')
    envInput.id = 'envInput'
    envInput.type = 'text'

    inputDiv.appendChild(envLabel)
    inputDiv.appendChild(envInput)

    const confirmDeleteBTN = document.createElement('button')
    confirmDeleteBTN.id = 'confirmDeleteBTN'
    confirmDeleteBTN.textContent = 'Confirm'
    inputDiv.appendChild(confirmDeleteBTN)

    confirmDeleteBTN.addEventListener('click', async () => {

        const URL = `${window.location.origin}/envelopes/${envInput.value}/delete`
        try {
            const response = await fetch(URL)
            const json = await response.json()

            if (response.ok) {
                const newLine = document.createElement('h2')
                newLine.textContent = json.message
                outputDiv.appendChild(newLine)
            } else {
                window.alert(json.message)
            }
        } catch (err) {
            window.alert(err.message)
        }
    })
}
document.addEventListener('DOMContentLoaded', () => {
    const getAllEnvsButton = document.getElementById('allEnvsBTN')
    getAllEnvsButton.addEventListener('click', fetchAllEnvelopes)

    const newEnvButton = document.getElementById('newEnvBtn')
    newEnvButton.addEventListener('click', createNewEnvForm)

    const deleteButton = document.getElementById('deleteEnvBtn')
    deleteButton.addEventListener('click', deleteEnvelope)
})