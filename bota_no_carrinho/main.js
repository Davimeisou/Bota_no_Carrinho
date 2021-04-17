

const form = document.getElementById('todoForm');

// não tô conseguindo pegar os itens e eu n sei o pq (provavelmente é um erro bobo)
form.addEventListener('submit', function(event) {
    event.preventDefault();
    const { target } = event;

    const elementos = target.getElementById('elementos');

    const qnt_prod = elementos.item('qnt-prod');
    const podutoId = elementos.item('id');
    const produtoTodo = elementos.item("todo");

    if(produtoTodo && qnt_prod){
        const todo = buysave(qnt_prod.value, produtoTodo.innerText);
        Adicionar(todo.id, todo.text, todo.text2); 
        //Adicionar_qnt(qnt);
        //buysave(qnt);
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

  function geradorid(){
    return 1;
  }

//evento que salva a parada toda
function buysave(text,text2){
    const todo = {

        id = 1,
        text, text2

    };

    const listinha = pegartodos();

    if(listinha.lenght) {

        todo.id = listinha[listinha.lenght - 1].id + 1;

    }
    
    listinha.push(todo);
    const listinhaStr = JSON.stringify(listinha);
    localStorage.setItem('listinha-item', listinhaStr );
    return todo;
    
}

function deletar(id){

    let listinha = pegartodos();
    listinha = listinha.filter(todo => todo.id != id);
    localStorage.setItem('listinha-item', JSON.stringify(listinha) );

}

//função que adiciona o item no carrinho
function Adicionar(id,text,text2){

    const lista_prod = document.getElementsByClassName('itenscarrinho').item(1);
    const lista_prod_qnt = document.getElementsByClassName('itenscarrinho').item(0);

    if(lista_prod && lista_prod_qnt){

        const h4 = document.createElement('h4');
        h4.classList.add('qnt-car');
        h4.dataset.id = id;

        const li = document.createElement('li');
        li.classList.add('produto-car');
        
        const button = document.createElement('button');
        button.name = 'id';
        button.innerText = ":(";
        button.classList.add('deletado')
        button.value = id;
        button.addEventListener("click", function(target) {

            deletar(target.value), Carrega();

        });
         
         h4.append(text);
         li.append(text2);
         li.appendChild(button);
         lista_prod.appendChild(h4,li);
        

    }

}

/*function Adicionar_qnt(text){

    const lista_prod = document.getElementsByClassName('itenscarrinho').item(0);

    if(lista_prod){

        const h4 = document.createElement('h4');
         h4.classList.add('qnt-car');
         h4.append(text);
        lista_prod.appendChild(h4);
        

    }


}*/

function Carrega(){

    const lista_prod_vaz = document.getElementsByClassName('itenscarrinho').item(0);
    lista_prod_vaz.innerHTML = ' ';
    pegartodos().forEach((todo) => {

        // Adicionar_qnt(todos);
         Adicionar(todo.id,todo.text,todo.text2);
         
     });
 
}

//carregando a tela de novo 
window.onload = Carrega();