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
            datas.push({
                text: todoInput,
                completed: false
            });
            saveData(); // Ditambahkan: simpan ke localStorage
        }
        this.reset();
        render();
    });

    // Fungsi untuk toggle status complete
    function toggleComplete(index) {
        datas[index].completed = !datas[index].completed;
        saveData();
        render();
    }

    //Fungsi untuk mengedit tugas
    function editTodo(index) {
        const newText = prompt('Edit tugas:', datas[index].text);
        if (newText !== null && newText.trim() !== "") {
            datas[index].text = newText.trim();
            saveData();
            render();
        }
    }
        
    //fungsi untuk menghapus tugas
    function deleteTodo(index) {
        if (confirm('Apakah Anda yakin ingin menghapus tugas ini?')) {
            datas.splice(index, 1);
            saveData();
            render();
        }
    }

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
            doneBtn.addEventListener('click', () => toggleComplete(index));

            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete-btn');
            deleteBtn.textContent = '✖';
            deleteBtn.addEventListener('click', () => deleteTodo(index));
                
            const editBtn = document.createElement('button');
            editBtn.classList.add('edit-btn');
            editBtn.textContent = '✎';
            editBtn.addEventListener('click', () => editTodo(index));
                
            newLi.appendChild(newSpan);
            newLi.appendChild(doneBtn);
            newLi.appendChild(deleteBtn);
            newLi.appendChild(editBtn);
            todoItems.appendChild(newLi);
        });
    }
    
    render();
});
