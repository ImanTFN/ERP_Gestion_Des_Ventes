const protocol = location.protocol;
const slashes = protocol.concat('//');
const host = slashes.concat(window.location.host);
const hostAPI = host + '/api';


/************************
 * 
 *************************/

function deleteItemTrigger(path) {
    const deleteForm = document.querySelector('.delete-form');
    const deleteButtons = document.querySelectorAll(
        '[data-target="#deleteModal"]'
    );
    if (deleteButtons) {
        deleteButtons.forEach((btn) => {
            btn.addEventListener('click', () => {
                const ItemID = btn.parentElement.getAttribute('data-item-id');
                deleteForm.setAttribute(
                    'action',
                    `${host}/${path}/${ItemID}?_method=delete`
                );
            });
        });
    }
}

//DeleteItems
const dataItemTypes = document.querySelector('[data-item-types]');
let path;
if (dataItemTypes) path = dataItemTypes.getAttribute('data-item-types');
deleteItemTrigger(path);

/**************************
 * => Editer  customer
 * ***********************/
const customerForm = document.querySelector('.customerForm');
const customerFormTitle = document.querySelector('.customerForm-title');
const customerFormcustomer_id = document.querySelector('.customerForm-customer_id');
const customerFormcustomer_name = document.querySelector('.customerForm-customer_name');
const customerFormcustomer_mobile = document.querySelector('.customerForm-customer_mobile');
const customerFormcustomer_address = document.querySelector('.customerForm-customer_address');
const customerFormcustomer_email = document.querySelector('.customerForm-customer_email');
const customerFormstatus = document.querySelector('.customerForm-status');


const userEditButtons = document.querySelectorAll('.customerEditButton');
if (userEditButtons) {
    userEditButtons.forEach((btn) => {
        btn.addEventListener('click', async() => {
            const ItemID = btn.parentElement.getAttribute('data-item-id');
            const res = await fetch(`${hostAPI}/customers/${ItemID}`);
            const data = await res.json();
            customerForm.setAttribute('action', `/customers/${ItemID}?_method=patch`);
            customerFormTitle.innerText = 'Editer un customer';
            customerFormcustomer_id.value = data.customer_id;
            customerFormcustomer_name.value = data.customer_name;
            customerFormcustomer_mobile.value = data.customer_mobile;
            customerFormcustomer_address.value = data.customer_address;
            customerFormcustomer_email.value = data.customer_email;
            customerFormstatus.value = data.status;


            $('[data-dismiss="modal"]').on('click', function() {
                userForm.reset();
                userFormTitle.innerText = 'Nouveau Customer';
                userFormEmail.removeAttribute('disabled');
                userForm.setAttribute('action', '/customers');
            });
        });
    });
}