// Objeto main para controlar nossa aplicação

const Main = {

    tasks: [],

    // Vamos 3 partes principais
    // Init -> recebe uma função que terá a missão de inicialiar as outras funções
    init: function(){


        // Inicializando as funções
        this.cacheSelectors()
        this.bindEvents()
        this.getStorage()
        this.buildTasks()
                         
        
    },


    // cacheSelectors -> responsável por selecionar os elementos de html e armazenar em uma variável´
    cacheSelectors: function(){
        //selecionando os elementos em html
        this.$checkButtons = document.querySelectorAll('.check')
        this.$inputTask = document.querySelector('#inputTask')
        this.$list = document.querySelector('#list')
        this.$removeButtons = document.querySelectorAll('.remove')
    },


    // bindEvents -> Responsável por chamar nossos eventos
    bindEvents: function(){
        //Hack para pegar o this
        const self = this
        //Como vamos ter vários buttons, precisamos percorrer eles no array com forEach
       this.$checkButtons.forEach(function(button){
            button.onclick = self.Events.checkButtons_click
       })

       //Chamando o evento de pressionar uma tecla
       this.$inputTask.onkeypress = self.Events.inputTask_keypress.bind(this)

       // Chamando o evento para remover com click a task
       this.$removeButtons.forEach(function(button){
        button.onclick = self.Events.removeButton_click.bind(self)
       })
       
    },

    // Função responsável por pegar o armazenamento do item task e 
    // armazenar em um array
    getStorage: function() {
        const tasks = localStorage.getItem('tasks')
        
        if(tasks) {
            this.tasks = JSON.parse(tasks)
        } else {
            localStorage.setItem('tasks', JSON.stringify([]))
        }
    },

    getTaskHtml: function(task){
        return `
            <li>
                <div class="check"></div>

                <label class="task">
                    ${task}
                </label>

                <button class="remove" data-task="${task}"></button>
            </li>
        `
    },

    // Responsável por pegar nossas tarefas e montar na tela
    buildTasks: function(){
        let html = ''
        this.tasks.forEach(item => {
            html += this.getTaskHtml(item.task)
        })

        this.$list.innerHTML = html

        //Precisamos chamar o cacheSelectors e o bindEvents novamente para resolver o problema de selecionar a tarefa
        this.cacheSelectors()
        this.bindEvents()
    }, 


    // Vamos deixar separado as funções dos eventos aqui
    Events: {
        checkButtons_click: function(e){
            // Chegando no elemento LI
            const li = e.target.parentElement
            const isDone = li.classList.contains('done')

            // Usando as boas práticas
           if(!isDone){
            return li.classList.add('done')
           }

           li.classList.remove('done')
        },

        // Evento do Key press
        inputTask_keypress: function(e){
            const key = e.key
            const value = e.target.value

            // Verificando se foi Enter pressionado no teclado
          if(key === 'Enter'){
            //adicionando html com valor digitado no input
            this.$list.innerHTML += this.getTaskHtml(value)

            // limpando o campo do input
            e.target.value = ''

            // Chamando as funções novamente para não dar problema no check done
            this.cacheSelectors()
            this.bindEvents()

            // Pegando as tarefas que já estão salvas no localStorage
            const savedTasks = localStorage.getItem('tasks')
            // Convertando para o JSON para objeto
            const savedTasksObj = JSON.parse(savedTasks)
            


            const obj = [
                // incluindo nova tarefa
                { task: value, done: false },
                // usando o seletor para acrescentar as tarefas salvas após nova tarefa
                ...savedTasksObj,
            ]

            const jsonTasks = JSON.stringify(obj)
            this.tasks = obj

            localStorage.setItem('tasks', jsonTasks)
            
          }
        },

        // Evento para remover task
        removeButton_click: function(e){
            // Pegando a LI pelo parentElement
            const li = e.target.parentElement

            // Vamos procurar uma tarefa no tasks para poder excluir direto no localStorage
            const value = e.target.dataset['task']
            
            
            const newTasksState = this.tasks.filter(item => item.task !== value)
            
            localStorage.setItem('tasks', JSON.stringify(newTasksState))
            this.tasks = newTasksState

            // Adicionando a classe removed
            li.classList.add('removed')

            // usando o Timeout para adicionar a class hidden
            setTimeout(function(){
                li.classList.add('hidden')
            },300)
        },
    },
}

Main.init()