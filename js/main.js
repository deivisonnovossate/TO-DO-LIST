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
        this.checkButtons = document.querySelectorAll('.check')
    },
    // bindEvents -> Responsável por chamar nossos eventos
    bindEvents: function(){
        //Hack para pegar o this
        const self = this
        //Como vamos ter vários buttons, precisamos percorrer eles no array com forEach
       this.checkButtons.forEach(function(button){
            button.onclick = self.Events.checkButtons_click
       })
    },


    // Vamos deixar separado as funções dos eventos aqui
    Events: {
        checkButtons_click: function(){
            //Adicionado class no html
        }
    },
}

Main.init()