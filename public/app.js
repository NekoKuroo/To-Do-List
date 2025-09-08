// document.addEventListener('DOMContentLoaded', function() {
//     let datas = JSON.parse(localStorage.getItem('todos')) || []; //tambah localstorage

//     const btnForm = document.getElementById('todo-form');

//     btnForm.addEventListener('submit', function(e) {
//         e.preventDefault();
//         const todoInput = document.getElementById('todo-input').value.trim();
        
//         if (todoInput !== "") {
//             datas.push({
//                 text: todoInput,
//                 completed: false
//             });
//             saveData();
//             document.getElementById('todo-input').value = '';
//             render();
//         }
//     });

//     function render() {
//         const todoItems = document.getElementById('todo-items');
//         todoItems.innerHTML = '';

//         datas.forEach((task, index) => {
//             const newLi = document.createElement('li');

//             const newSpan = document.createElement('span');
//             newSpan.setAttribute('class', 'task');
//             newSpan.textContent = task.text;
            
//             if (task.completed) {
//                 newSpan.style.textDecoration = "line-through";
//                 newSpan.style.color = 'salmon';
//             }
//             // Tombol Done (toggle)
//             const doneBtn = document.createElement('button');
//             doneBtn.textContent = '✔';
//             doneBtn.classList.add('done-btn');
//             doneBtn.addEventListener('click', () => {
//                 datas[index].completed = !datas[index].completed;
//                 saveData();
//                 render();
//             });

//             // Tombol Hapus
//             const deleteBtn = document.createElement('button');
//             deleteBtn.textContent = '✖';
//             deleteBtn.classList.add('delete-btn');
//             deleteBtn.addEventListener('click', () => {
//                 datas.splice(index, 1); // hapus dari array
//                 saveData();
//                 render(); // render ulang
//             });

//             //Tombol Edit
//             const editBtn = document.createElement('button');
//             editBtn.textContent = '✎';
//             editBtn.classList.add('edit-btn');
//             editBtn.addEventListener('click', () => {
//                 const newText = prompt('Edit task:', task.text);
//                 if (newText !== null && newText.trim() !== ""){
//                     datas[index].text = newText.trim();
//                     saveData();
//                     render();
//                 }
//             });

//             newLi.appendChild(newSpan);
//             newLi.appendChild(doneBtn);
//             newLi.appendChild(deleteBtn);
//             newLi.appendChild(editBtn);
//             todoItems.appendChild(newLi);
//         });
//     }

//     function saveData(){
//         localStorage.setItem('todos', JSON.stringify(datas));
//     }
//     render();
// });


document.addEventListener('DOMContentLoaded', function() {
    
    let datas = JSON.parse(localStorage.getItem('todos')) || [];
    const todoItems = document.getElementById('todo-items');

    // function simpan data ke localstorage
    function saveData(){
        localStorage.setItem('todos', JSON.stringify(datas));
    }

    // function tombol form
    document.getElementById('todo-form').addEventListener('submit', function(e) {
        e.preventDefault();

        const todoInput = document.getElementById('todo-input').value.trim();
        if (todoInput !== ""){
            datas.push ({
                text: todoInput,
                completed: false
            });
        }
        this.reset();
        render();
    });


    // function render
    function render(){
        todoItems.innerHTML = '';

        datas.forEach((task, index) => {  

            const newLi = document.createElement('li');

            const newSpan = document.createElement('span');
            newSpan.setAttribute('class', 'task');
            newSpan.textContent = task.text;
            
            if(task.completed){
                newSpan.style.textDecoration = "line-through";
                newSpan.style.color = 'salmon';
                newSpan.classList.add('completed');
            }

            const doneBtn = document.createElement('button');
            doneBtn.classList.add('done-btn');
            doneBtn.textContent = '✔';
            doneBtn.addEventListener('click',() => {
                datas[index].completed = !datas[index].completed;
                saveData();
                render();
            }) // doneBtn.addEventListener('click', () => toggleComplete(index));

            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete-btn');
            deleteBtn.textContent = '✖';
            deleteBtn.addEventListener('click', function() {
                datas.splice(index,1);
                saveData();
                render();
            })//deleteBtn.addEventListener('click', () => deleteTodo(index));

            const editBtn = document.createElement('button');
            editBtn.classList.add('edit-btn');
            editBtn.textContent = '✎';
            editBtn.addEventListener('click', function() {
                const newText = prompt('edit tugas:', task.text);
                if (newText !== null && newText.trim() !== "") {
                    datas[index].text = newText.trim();
                }
                saveData();
                render();
            })//editBtn.addEventListener('click', () => editTodo(index));

            newLi.appendChild(newSpan);
            newLi.appendChild(doneBtn);
            newLi.appendChild(deleteBtn);
            newLi.appendChild(editBtn);
            todoItems.appendChild(newLi);
        });
    }
    render();
});
/*Fungsi untuk menambah tugas
            function addTodo(e) {
                e.preventDefault();
                const todoText = todoInput.value.trim();
                
                if (todoText !== "") {
                    datas.push({
                        text: todoText,
                        completed: false
                    });
                    saveData();
                    todoInput.value = '';
                    render();
                }
            }

Fungsi untuk mengedit tugas
            function editTodo(index) {
                const newText = prompt('Edit tugas:', datas[index].text);
                if (newText !== null && newText.trim() !== "") {
                    datas[index].text = newText.trim();
                    saveData();
                    render();
                }
            }
                
Fungsi untuk menghapus tugas
            function deleteTodo(index) {
                if (confirm('Apakah Anda yakin ingin menghapus tugas ini?')) {
                    datas.splice(index, 1);
                    saveData();
                    render();
                }
            }
*/