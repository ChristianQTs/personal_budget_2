const inputDiv = document.getElementById('inputDiv')
const outputDiv = document.getElementById('outputDiv')

const clearDivs = () => {
    inputDiv.innerHTML =''
    outputDiv.innerHTML = ''

}

const createConfirmationButton = (buttonText) => {
    const newButton = document.createElement('button')
    newButton.textContent = buttonText
    newButton.id = `${buttonText.toLowerCase()}Button`
    inputDiv.appendChild(newButton)

    return newButton
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

    confirmCreateButton = createConfirmationButton('Create')

    confirmCreateButton.addEventListener('click', async () => {
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

    const confirmDeleteBTN = createConfirmationButton('Delete')

    confirmDeleteBTN.addEventListener('click', async () => {

        const URL = `${window.location.origin}/personalBudget/envelopes/${envInput.value}/delete`
        try {

            const response = await fetch(URL, {
                method : 'DELETE'
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

const withdraw = () => {

    clearDivs()

    const envelopeLabel = document.createElement('label')
    envelopeLabel.textContent = 'Withdraw from: '
    envelopeLabel.setAttribute('for', 'envelopeInput')

    const envelopeInput = document.createElement('input')
    envelopeInput.id = 'envelopeInput'
    envelopeInput.type = 'text'

    const amountLabel = document.createElement('label')
    amountLabel.textContent = 'Amount: '
    amountLabel.setAttribute('for', 'amountInput')

    const amountInput = document.createElement('input')
    amountInput.id = 'amountInput'
    amountInput.type = 'number'

    const recipientLabel = document.createElement('label')
    recipientLabel.textContent = 'Recipient: '
    recipientLabel.setAttribute('for', 'recipientInput')

    const recipientInput = document.createElement('input')
    recipientInput.id = 'recipientInput'
    recipientInput.type = 'text'

    inputDiv.appendChild(envelopeLabel)
    inputDiv.appendChild(envelopeInput)
    inputDiv.appendChild(document.createElement('br'))
    inputDiv.appendChild(amountLabel)
    inputDiv.appendChild(amountInput)
    inputDiv.appendChild(document.createElement('br'))
    inputDiv.appendChild(recipientLabel)
    inputDiv.appendChild(recipientInput)

    const confirmWithdrawBTN = createConfirmationButton('Withdraw')
    
    confirmWithdrawBTN.addEventListener('click', async  () => {

        const URL = `${window.location.origin}/personalBudget/envelopes/${envelopeInput.value}/withdraw`

        try {
            response = await fetch(URL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    amount: amountInput.value,
                    recipient: recipientInput.value
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
document.addEventListener('DOMContentLoaded', () => {
    const getAllEnvsButton = document.getElementById('allEnvsBTN')
    getAllEnvsButton.addEventListener('click', fetchAllEnvelopes)

    const newEnvButton = document.getElementById('newEnvBtn')
    newEnvButton.addEventListener('click', createNewEnvForm)

    const deleteButton = document.getElementById('deleteEnvBtn')
    deleteButton.addEventListener('click', deleteEnvelope)

    const withdrawButton = document.getElementById('withdrawBtn')
    withdrawButton.addEventListener('click', withdraw)
})