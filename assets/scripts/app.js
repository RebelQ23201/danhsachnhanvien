const addBtn=document.getElementById("add-btn");
const delBtn=document.getElementById("delete-btn");
const searchBtn=document.getElementById("search-btn");

const employees=[];
let row=null;

function searchById(empID){
    let EmpIndex = 0;
    for (const emp of employees){
        if (emp.id === empID){
            break;
        }
        EmpIndex++;
    }
    return EmpIndex;
}

function editEmp(empID){
    const EmpIndex=searchById(empID);
    const listRoot = document.querySelector('#employee-list tbody');
    

    row=listRoot.children[EmpIndex];
    let cols=row.children;

    cols[1].innerHTML=document.getElementById("name").value;
    employees[EmpIndex].name=document.getElementById("name").value;

    cols[2].innerHTML=document.getElementById("age").value;
    employees[EmpIndex].age=document.getElementById("age").value;

    cols[3].innerHTML=document.getElementById("address").value;
    employees[EmpIndex].address=document.getElementById("address").value;

    cols[4].innerHTML=document.getElementById("experience").value;
    employees[EmpIndex].experience=document.getElementById("experience").value;

    cols[5].innerHTML=document.getElementById("phone").value;
    employees[EmpIndex].phone=document.getElementById("phone").value;
    
    cols[6].innerHTML=document.getElementById("email").value;
    employees[EmpIndex].email=document.getElementById("email").value;
    
    cols[7].innerHTML=document.getElementById("join").value;
    employees[EmpIndex].join=document.getElementById("join").value;
    console.log(employees)
}

function deleteEmp(empID){
    const EmpIndex=searchById(empID);
    employees.splice(EmpIndex, 1);

    const listRoot = document.querySelector('#employee-list tbody');
    listRoot.children[EmpIndex].remove();
}

function addToList(id, name, age, address, experience, phone, email, join) {
    const newEmployeeElement=document.createElement('tr');
    newEmployeeElement.innerHTML= `
    <td><button id="edit-btn">edit</button></td>
    <td>${name}</td>
    <td>${age}</td>
    <td>${address}</td>
    <td>${experience}</td>
    <td>${phone}</td>
    <td>${email}</td>
    <td>${join}</td>
    <td><button id="delete-btn">delete</button></td>
    `;
    newEmployeeElement.firstElementChild.addEventListener('click', editEmp.bind(null, id));
    newEmployeeElement.lastElementChild.addEventListener('click', deleteEmp.bind(null, id));
    const employeeList=document.querySelector('#employee-list tbody');
    employeeList.append(newEmployeeElement);
}

function addEmployee() {
    const nameVal=document.getElementById("name").value;
    const ageVal=document.getElementById("age").value;
    const addressVal=document.getElementById("address").value;
    const experienceVal=document.getElementById("experience").value;
    const phoneVal=document.getElementById("phone").value;
    const emailVal=document.getElementById("email").value;
    const joinVal=document.getElementById("join").value;

    if (
        nameVal.trim() === '' ||
        ageVal.trim() === '' ||
        addressVal.trim() === '' ||
        experienceVal.trim() === '' ||
        +experienceVal<0 ||
        +experienceVal>2 ||
        phoneVal.trim() === '' ||
        emailVal.trim() === '' ||
        joinVal.trim() === ''){
            alert("please enter a valid value")
            return;
        }
    const newEmp={
        id: Math.random().toString(),
        name: nameVal,
        age: ageVal,
        address: addressVal,
        experience: experienceVal,
        phone: phoneVal,
        email: emailVal,
        join: joinVal
    }
    employees.push(newEmp);
    addToList(newEmp.id, newEmp.name, newEmp.age, newEmp.address, newEmp.experience, newEmp.phone, newEmp.email, newEmp.join);
}

const searchEmpHandler = () => {
    const filterTerm = document.getElementById('search-bar').value;
    searchEmp(filterTerm);
}

const searchEmp = (filter='') => {
    const empList = document.querySelector('#search-emp tbody');
    empList.innerHTML="";

    const filteredEmps = !filter ? employees : employees.filter(emp => emp.name.includes(filter));

    filteredEmps.forEach((emp) => {
        const empEl =document.createElement('tr');
        empEl.innerHTML= `
            <td>${emp.name}</td>
            <td>${emp.age}</td>
            <td>${emp.address}</td>
            <td>${emp.experience}</td>
            <td>${emp.phone}</td>
            <td>${emp.email}</td>
            <td>${emp.join}</td>
            `;
        empList.append(empEl);
    });
}

addBtn.addEventListener("click", addEmployee);
searchBtn.addEventListener("click", searchEmpHandler)
