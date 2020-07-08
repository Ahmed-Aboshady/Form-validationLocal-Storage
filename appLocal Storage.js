class Student {
  constructor(name, dob, desc) {
    this.name = name;
    this.dob = dob;
    this.desc = desc;
  }
}

class UI {
  addStudentToList(student) {
    const list = document.getElementById('student-list');
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.dob}</td>
      <td>${student.desc}</td>
      <td><a href="#" class="delete">X<a></td>
    `;
  
    list.appendChild(row);
  }

  showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
   
    const form = document.querySelector('#student-form');
  
    container.insertBefore(div, form);

    
    setTimeout(function(){
      document.querySelector('.alert').remove();
    }, 3000);
  }

  deleteStudent(target) {
    if(target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById('name').value = '';
    document.getElementById('dob').value = '';
    document.getElementById('desc').value = '';
  }
}

// Local Storage Class
class Store {
  static getStudents() {
    let students;
    if(localStorage.getItem('students') === null) {
      students = [];
    } else {
      students = JSON.parse(localStorage.getItem('students'));
    }

    return students;
  }

  static displayStudents() {
    const students = Store.getStudents();

    students.forEach(function(student){
      const ui  = new UI;
      ui.addStudentToList(student);
    });
  }

  static addStudent(student) {
    const students = Store.getStudents();

    students.push(student);

    localStorage.setItem('students', JSON.stringify(students));
  }

  static removeStudent(matriculation) {
    const students = Store.getStudents();

    students.forEach(function(student, index){
     if(student.desc === desc) {
      students.splice(index, 1);
     }
    });

    localStorage.setItem('students', JSON.stringify(students));
  }
}

// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayStudents);

// Event Listener for add student
document.getElementById('student-form').addEventListener('submit', function(e){
 
  const name = document.getElementById('name').value,
        dob = document.getElementById('dob').value,
        desc = document.getElementById('desc').value
  const student = new Student(name, dob, desc);

  const ui = new UI();

  console.log(ui);

  // Validate
  if(name === '' || dob === '' || desc === '') {
    // Error alert
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    ui.addStudentToList(student);
    Store.addStudent(student);
    ui.showAlert('Student Added!', 'success');
  

    ui.clearFields();
  }

  e.preventDefault();
});

// Event Listener for delete
document.getElementById('student-list').addEventListener('click', function(e){

  
  const ui = new UI();
  ui.deleteStudent(e.target);

  Store.removeStudent(e.target.parentElement.previousElementSibling.textContent);

  ui.showAlert('Student Removed!', 'success');

  e.preventDefault();
});