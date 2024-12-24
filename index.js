const bill = document.querySelector('#bill');
const people = document.querySelector('#people');
const billError = document.querySelector('#bill-error');
const peopleError = document.querySelector('#people-error');
const tipButtons = document.querySelectorAll('.tip-button')
const tipError = document.querySelector('#tip-error');
const custom = document.querySelector('#custom');
const customTip = parseFloat(custom.value);
const reset = document.querySelector('#reset');
const tipSpan = document.querySelector('#amount-span');
const totalSpan = document.querySelector('#total-span');


    let tip = null; // Store the selected tip percentage

    // Function to reset outputs to "-.--" when there is an error
    function resetOutputs() {
        tipSpan.textContent = '-.--';
        totalSpan.textContent = '-.--';
}

    // Function to restrict input to numbers and decimals
    function allowOnlyNumbersAndDecimals(inputElement) {
    inputElement.addEventListener('input', () => {
        const validValue = inputElement.value.replace(/[^0-9.]/g, ''); // Allow only digits and '.'
        const parts = validValue.split('.');

        // Ensure only one decimal point is allowed
        if (parts.length > 2) {
            inputElement.value = parts[0] + '.' + parts[1]; // Keep the first two parts
        } else {
            inputElement.value = validValue; // Valid input
        }
    });
}

// Apply the restriction to bill and custom inputs
allowOnlyNumbersAndDecimals(bill);
allowOnlyNumbersAndDecimals(custom);
allowOnlyNumbersAndDecimals(people);



    // Calculate

    function calculate() {
    tipButtons.forEach((tipButton) => {
    const billAmount = parseFloat(bill.value) || 0;
    const numberOfPeople = parseInt(people.value) || 1; // Avoid division by zero

    // Check for errors
    if (bill.value === "" || people.value === "" || numberOfPeople <= 0 || tip === null) {
        resetOutputs();
        return;
    }
    
    // Calculate tip and total
    const tipTotal = (billAmount * tip) / 100;
    const tipPerPerson = (tipTotal / numberOfPeople);
    const total = (billAmount + tipTotal);
    const totalPerPerson = (total / numberOfPeople);
    
  tipSpan.textContent = tipPerPerson.toFixed(2);
  totalSpan.textContent = totalPerPerson.toFixed(2);
    

    
})
            }


// Bill Error

bill.addEventListener('input', () => {

    reset.classList.add('active');

    if(bill.value === "") {
        billError.style.display='inline-block';
        bill.classList.add('error');
        resetOutputs();
    }else{
        billError.style.display='none';
        bill.classList.remove('error');
        calculate();
    }
})


// Tip Error

tipButtons.forEach((tipButton) => {
    tipButton.addEventListener('click', (event) => {
        event.preventDefault();

        // Remove 'active' class from all buttons
        tipButtons.forEach((otherTipButtons) => {

            otherTipButtons.classList.remove('active');
        })

        // Reset custom tip input
        custom.classList.remove('active');
        custom.value='';

        //Select Tip Button
        tipButton.classList.add('active');
        tipError.style.display='none';
        reset.classList.add('active');
        
        // Update the current tip percentage
        const tipAmountSpan = tipButton.querySelector('.tip-amount');
        if (tipAmountSpan) {
            tip = parseFloat(tipAmountSpan.textContent);
            if (!isNaN(tip)) {
                calculate();
            }
        }
    })



    custom.addEventListener('input', () => {

        custom.classList.add('active');
        reset.classList.add('active');

        if(custom.value !== '') {
            tip = parseFloat(custom.value);

            if(!isNaN(tip)) {
            tipButton.classList.remove('active');
            tipError.style.display='none';
            custom.classList.add('active');
            calculate();
            }else{
                tipError.style.display=('inline-block');
            }
        }else {
            resetOutputs();
            tipError.style.display=('inline-block');
        }
    })


})



// People Error

people.addEventListener('input', () => {

    reset.classList.add('active');

    if(people.value === "" || parseInt(people.value) <= 0) {
        peopleError.style.display='inline-block';
        people.classList.add('error');
        resetOutputs();
    }else{
        peopleError.style.display='none';
        people.classList.remove('error');
        calculate();
    }
})


// Reset Form

reset.addEventListener('click', () => {
    location.reload();
})

