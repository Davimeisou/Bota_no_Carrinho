

const form = document.getElementById('todoForm');

//evento que dispara a ação de coletar o li (atualmente com erro, afinal não tem como dar submit em lista)
form.addEventListener('submit', function(event) {
    event.preventDefault();
    const { target } = event;

    const elementos = target.getElementsById('elementos')

    const qnt_prod = elementos.item('qnt-prod');
    const podutoId = elementos.item('id');
    const produtoTodo = elementos.item("todo");

    if(produtoTodo && qnt_prod){
        const produtos = produtoTodo.innerText;
        const qnt = qnt_prod.value;
        Adicionar(produtos);
        buysave(produtos);
        Adicionar_qnt(qnt);
        buysave(qnt);
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
function buysave(text, satate = false){

    const listinha = pegartodos();
    listinha.push(text, state)
    const listinhaStr = JSON.stringify(listinha);
    localStorage.setItem('listinha-item', listinhaStr );

    
}

//função que adiciona o item no carrinho
function Adicionar(text){

    const lista_prod = document.getElementsByClassName('itenscarrinho').item(0);

    if(lista_prod){

        const li = document.createElement('li');
         li.classList.add('produto-car');
         li.append(text);
        lista_prod.appendChild(li);

    }

}

function Adicionar_qnt(text){

    const lista_prod = document.getElementsByClassName('itenscarrinho').item(0);

    if(lista_prod){

        const h4 = document.createElement('h4');
         h4.classList.add('qnt-car');
         h4.append(text);
        lista_prod.appendChild(h4);
        

    }


}

//carregando a tela de novo 
window.onload = () =>{
    pegartodos().forEach((todos) => {

        Adicionar(todos);
    });


};