// Objeto main para controlar nossa aplicação

const Main = {
    // Vamos 3 partes principais
    // Init -> recebe uma função que terá a missão de inicialiar as outras funções
    init: function(){
        // Inicializando as funções
        this.cacheSelectors()
        this.bindEvents()
        
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
        button.onclick = self.Events.removeButton_click
       })
       
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
            this.$list.innerHTML += `
                <li>
                    <div class="check"></div>

                    <label class="task">
                        ${value}
                    </label>

                    <button class="remove"></button>
                </li>
            `
            // limpando o campo do input
            e.target.value = ''

            // Chamando as funções novamente para não dar problema no check done
            this.cacheSelectors()
            this.bindEvents()
          }
        },

        // Evento para remover task
        removeButton_click: function(e){
            // Pegando a LI pelo parentElement
            let li = e.target.parentElement

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