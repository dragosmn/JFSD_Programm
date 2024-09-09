let contacts= [];

function displayContact(){
    let data='';
    for (let contact of contacts){
        data +=`<tr>
                    <td>${contact.id}</td>
                    <td>${contact.name}</td>
                    <td>${contact.phone}</td>
                    <td>
                        <button class='btn btn-danger' onClick='deleteContact(${contact.id})'>X</button>
                        <button class='btn btn-success' onClick='editContact(${contact.id})'>Edit</button>
                    </td>
                </tr>`
    }
    document.getElementById('contacts').innerHTML = data;
}

function addContact(){
    let name=document.getElementById('name').value;
    let phone=document.getElementById('phone').value;

    if(name.trim() == '' || phone.trim() == ''){
        alert('Name and Phone fields are Mandatory');
    }else{
        if(contacts.length == 0){
            max = 0;
        }else{
                const ids = contacts.map(object => {
                return object.id;
                });
                max = Math.max(...ids);

            }
        const obj={id:max+1, name:name, phone:phone};
        contacts.push(obj);
        document.getElementById('name').value='';
        document.getElementById('phone').value='';        
    }
    displayContact();
}

function deleteContact(id){
    var index = contacts.findIndex(contact => contact.id == id);
    contacts.splice(index,1);
    displayContact();
}

function editContact(id){
    displayContactEdit(id);


}

function displayContactEdit(id){
    let data='';
    for (let contact of contacts){
        switch (contact.id) {
            case id:
                console.log('aici');
            data +=`<tr>
            <td>${contact.id}</td>
            <td>${contact.name}<input type="text" placeholder="Edit Name" id="ename" class="form-control mt-3">
            <button class='btn btn-success' onClick='updateName(${contact.id})'>Edit</button></td>
            <td>${contact.phone}<input type="text" placeholder="Edit Phone" id="ephone" class="form-control mt-3">
            <button class='btn btn-success' onClick='updatePhone(${contact.id})'>Edit</button></td></td>
            <td>
                <button class='btn btn-danger' onClick='deleteContact(${contact.id})'>X</button>
                <button class='btn btn-success' onClick='editContact(${contact.id})'>Edit</button>
            </td>
        </tr>`;
                break;     
            default: 
            console.log('acolo');
            data +=`<tr>
            <td>${contact.id}</td>
            <td>${contact.name}</td>
            <td>${contact.phone}</td>
            <td>
                <button class='btn btn-danger' onClick='deleteContact(${contact.id})'>X</button>
                <button class='btn btn-success' onClick='editContact(${contact.id})'>Edit</button>
            </td>
        </tr>`;
                break;
          }
        
    }
    document.getElementById('contacts').innerHTML = data;
}

function updateName(id){
    let ename=document.getElementById('ename').value;
    if(ename.trim() == ''){
        alert('Edit Name field is Mandatory');
    }else{
        var index = contacts.findIndex(contact => contact.id == id);
        contacts[index].name = ename;
    }
    displayContact();

}

function updatePhone(id){
    let ephone=document.getElementById('ephone').value;
    if(ephone.trim() == ''){
        alert('Edit Phone field is Mandatory');
    }else{
        var index = contacts.findIndex(contact => contact.id == id);
        contacts[index].phone = ephone;
    }
    displayContact();

}