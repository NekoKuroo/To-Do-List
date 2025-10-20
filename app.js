document.addEventListener('DOMContentLoaded', function() {
    let datas = JSON.parse(localStorage.getItem('todos')) || [];

    const todoForm = document.getElementById('todo-form');
    const todoItems = document.getElementById('todo-items');

    function saveData(){
        localStorage.setItem('todos', JSON.stringify(datas));
    }

    // function tombol form (tombol utama)
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const todoInput = document.getElementById('todo-input').value.trim();
        if(todoInput !== ''){
            datas.push({
                task: todoInput,
                toggle: false,
            })
            render();
            saveData();
            todoForm.reset(); //reset menjadi kosong
        }
    })

    function toggleDoneBtn(index){
        datas[index].toggle = !datas[index].toggle;
        saveData();
        render();
    }

    function todoDelete(index){
        datas.splice(index,1);
        saveData();
        render();
    }
    
    function todoEdit(index){
        let modal = document.getElementById('edit-modal');
        if(!modal){
            modal = document.createElement('div');
            modal.id = 'edit-modal';
            modal.className = 'modal';
            modal.innerHTML = `
            <div class="modal-content">
                <h3>Edit Tugas</h3>
                <input type="text" id="edit-input">
                <div class="modal-buttons">
                <button id="save-edit">Simpan</button>
                <button id="cancel-edit">Batal</button>
                </div>
            </div>`;
            document.body.appendChild(modal);
        
            // CSS dasar + animasi fade
            const style = document.createElement('style');
            style.textContent = `
            .modal {
                display: flex;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.3s ease;
                position: fixed;
                z-index: 999;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,0.5);
                justify-content: center;
                align-items: center;
            }

            .modal.show {
                opacity: 1;
                pointer-events: auto;
            }

            .modal-content {
                background: white;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0,0,0,0.3);
                text-align: center;
                min-width: 300px;
                transform: scale(0.9);
                transition: transform 0.3s ease;
            }

            .modal.show .modal-content {
                transform: scale(1);
            }

            .modal-buttons {
                margin-top: 15px;
            }
            .modal-buttons button {
                margin: 0 5px;
            }
            `;
            document.head.appendChild(style);
        }
        
        // tampilkan modal (fade-in)
        modal.classList.add('show');
        
        // isi inputan teks lama nya
        const editInput = modal.querySelector('#edit-input');
        editInput.value = datas[index].task;
        editInput.focus();

        // simpan perubahan
        modal.querySelector('#save-edit').onclick = () => {
            const newText = editInput.value.trim();
            if(newText !== ''){
                datas[index].task = newText;
                saveData();

                // fade-out sebelum disembunyikan
                modal.classList.remove('show');
                setTimeout(() => {
                    modal.style.display = 'none';
                    render();
                }, 300);
            }
        }
        
        // batal edit
        modal.querySelector('#cancel-edit').onclick = () => {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
                render();
            }, 300);
        }
        
        // tutup modal jika diKLIK diluar box
        modal.onclick = (e) => {
            if(e.target === modal){
                modal.classList.remove('show');
                setTimeout(() => {
                    modal.style.display = 'none';
                    render();
                }, 300);
            }
        }
        // pastikan modal visible sebelum animasi jalan
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('show'), 10);
    }

    // function menampilkan halaman
    function render(){
            todoItems.innerHTML = '';

            datas.forEach((task,index) => {
                const li = document.createElement('li');

                const span = document.createElement('span');
                span.className = 'task'
                span.textContent = task.task;    
                if(task.toggle){
                    span.style.color = 'maroon';
                    span.style.textDecoration = 'line-through';       
                    span.style.backgroundColor = 'lightblue'; 
                }

                const doneBtn = document.createElement('button');
                doneBtn.classList.add('done-btn');
                doneBtn.textContent = 'done ✔';
                doneBtn.addEventListener('click', () => toggleDoneBtn(index));

                const editBtn = document.createElement('button');
                editBtn.classList.add('edit-btn');
                editBtn.textContent = 'edit✎';
                editBtn.addEventListener('click', () => todoEdit(index));

                const deleteBtn = document.createElement('button');
                deleteBtn.classList.add('delete-btn');
                deleteBtn.textContent = 'delete✖';
                deleteBtn.addEventListener('click', () => todoDelete(index));

                li.appendChild(span);
                li.appendChild(doneBtn);
                li.appendChild(editBtn);
                li.appendChild(deleteBtn);
                todoItems.appendChild(li);
        })
    }
    render();
})
