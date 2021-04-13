

const form = document.getElementById('todoForm');

//evento que dispara a ação de coletar o li (atualmente com erro afinal não tem como dar submit em lista)
form.addEventListener('submit', function(event) {
    event.preventDefault();
    const { target } = event;
    const produto = target.getElementsByClassName('produto').item(0);

    if(produto){
        const produtos = produto.value;
        Adicionar(produtos);
        buysave(produtos);
    }
    
    target.reset();

})

//evento que coleta todos os itens de volta
function pegartodos(){
    let todos = [];
    const todosStr = localStorage.getItem('listinha-item');

    if(todosStr)
        
        todos = JSON.parse(todosStr);
        return todos;

}

//evento que salva a parada toda
function buysave(text){

    const listinha = pegartodos();
    listinha.push(text)
    localStorage.setItem('listinha-item', JSON.stringify(listinha));

}

//função que adiciona o item no carrinho
function Adicionar(text){

    const lista = document.getElementsByClassName('itenscarrinho').item(0);

    if(lista){

        const li = document.createElement('li');
         li.classList.add('produto-car');
         li.append(text);
        lista.appendChild(li);
        

    }

}

//carregando a tela de novo 
window.onload = () =>{
    pegartodos().forEach((todo) => {

        render(todos);
    });


};