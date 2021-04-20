
const produtos = [

    {

        quantidade = 0,
        nome = " almofada de Pedro ",
        id = 0

    },

    {

        quantidade = 0,
        nome = " Trufa ",
        id = 0

    },

    {

        quantidade = 0,
        nome = " Pochete amarela do ben 10 paraquai ",
        id = 0

    },

    {

        quantidade = 0,
        nome = " doidera ",
        id = 0

    }


];

const form = document.getElementById('todoForm');

// aqui eu crio os itens, para cada item do array "produtos" eu crio um item no html 
const itensdaloja = produtos.forEach((produto) => {

    const lista = document.getElementsByClassName('itenslista').item(0);

    if(lista){

        const h4 = document.createElement('h4');
        h4.classList.add('qnt-car');
        h4.id = elementos;
        h4.setAttribute("qnt-prod","qnt-prod");

        const li = document.createElement('li');
        li.classList.add('produto-car');
        li.id = elementos;
        h4.setAttribute("todo","todo");

        h4.append(produto.quantidade);
        li.append(produto.nome);

        lista.appendChild(h4,li);

    }

    document.querySelector('coisas_box').appendChild(...itensdaloja);

});

// !!!!!!não tô conseguindo pegar os itens e eu n sei o pq (provavelmente é um erro bobo)

form.addEventListener('submit', function(event) {

    event.preventDefault();
    const { target } = event;

    const elementos = target.getElementById('elementos');

    const qnt_prod = elementos.qnt-prod;
    const produtoId = elementos.id;
    const produtoTodo = elementos.todo;

    if(produtoTodo && qnt_prod && produtoId){

        const todo = buysave(qnt_prod.value, produtoTodo.innerText);
        Adicionar(todo.id, todo.text, todo.text2); 

    } else{

        troca(produtoId.value, qnt_prod.value);

    }
    
    target.reset();

});

//função que coleta todos os itens 
function pegartodos(){
    let todos = [];
    const todosStr = localStorage.getItem('listinha-item');

    if(todosStr)
        
        todos = JSON.parse(todosStr);
        return todos;

  }

  // função que pega o objeto pelo id
  function pegarid(id){

    const listinha = pegartodos();
    const todo = listinha.find((item) => item.id == id);
    if(todo){

        return todo;

    }

  }

  // o bloco de comentário abaixo é uma função aparentemente inutil, porém ainda tá no "aparentemente"
  /*
  function geradorid(){
    return 1;
  }*/


//função que salva a parada toda
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

// função que deleta a parada toda
function deletar(id){

    let listinha = pegartodos();
    listinha = listinha.filter(todo => todo.id != id);
    localStorage.setItem('listinha-item', JSON.stringify(listinha) );

}

// função que troca um objeto pelo novo
function troca(id,text) {

    const listinha = pegartodos();
    const index = listinha.findIndex((todo) => todo.id == id);

    if(index != -1) {

        listinha[index] = {id,text};

    }

    localStorage.setItem('listinha-item', JSON.stringify(listinha) );

}

// função que chama a função deletar e carrega a página
function açao_del(event) {

    deletar(event.target.value);
     Carrega();

}

//função que colocar um valor, que será decisivo para a troca de objetos
function açao_troca(event){

    const todo = pegarid(event.target.value);

    const formmud = document.getElementById('mudar');
    const qnt_mud = formmud.getElementById('mudança');

    qnt_mud.qnt_car.value = todo.text;


}

//função que adiciona o item no carrinho
function Adicionar(id,text,text2){

    const lista_prod = document.getElementsByClassName('itenscarrinho').item(0);

    if(lista_prod){

        const h4 = document.createElement('h4');
        h4.classList.add('qnt-car');
        h4.dataset.id = id;

        const li = document.createElement('li');
        li.classList.add('produto-car');
        
        const buttonDel = document.createElement('button');
        buttonDel.name = 'id';
        buttonDel.innerText = ":(";
        buttonDel.classList.add('deletado')
        buttonDel.value = id;
        buttonDel.addEventListener("click", açao_del);

        const buttonTroc = document.createElement('button');
        buttonTroc.name = 'id';
        buttonTroc.innerText = ":)";
        buttonTroc.classList.add('trocado')
        buttonTroc.value = id;
        buttonTroc.addEventListener("click", açao_troca);
         
         
         h4.append(text);
         li.append(text2);
         li.appendChild(buttonDel);
         li.appendChild(buttonTroc);


         lista_prod.appendChild(h4,li);
        

    }

}


// o bloco de comentário abaixo é uma função aparentemente inutil, porém ainda tá no "aparentemente"
/*function Adicionar_qnt(text){

    const lista_prod = document.getElementsByClassName('itenscarrinho').item(0);

    if(lista_prod){

        const h4 = document.createElement('h4');
         h4.classList.add('qnt-car');
         h4.append(text);
        lista_prod.appendChild(h4);
        

    }


}*/

//função que carrega a página
function Carrega(){

    

    const lista_prod_vaz = document.getElementsByClassName('itenscarrinho').item(0);
    lista_prod_vaz.innerHTML = ' ';
    pegartodos().forEach((todo) => {

        // Adicionar_qnt(todos);
         Adicionar(todo.id,todo.text,todo.text2);
         
     });


 
}

//chamando a função de carregara a página quando o usuário ligar a página 
window.onload = Carrega();