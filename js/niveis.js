function validarNiveisQuizz(){

    const todosInputsNivelValidos = []
    
    let botaoNivel = document.querySelector('.finalizar')

    botaoNivel.onclick = () => {

        let inputsNivel = document.querySelector('.criar-nivel')
        
        let tituloNivel = inputsNivel.children[1].value

        if(tituloNivel.length >= 10){

            todosInputsNivelValidos.push(true)

        }else{
            todosInputsNivelValidos.push(false)
        }

        let acertoMinimo = inputsNivel.children[2].value

        if(parseInt(acertoMinimo) >= 0 && parseInt(acertoMinimo) <= 100 ){

            todosInputsNivelValidos.push(true)

        }else{

            todosInputsNivelValidos.push(false)

        }

        let urlImagemNivel = inputsNivel.children[3].value

        if(urlImagemNivel.match('https?:\/\/.*\.(?:png|jpg)')){

            todosInputsNivelValidos.push(true)
        }else{
            
            todosInputsNivelValidos.push(false)
            
        }

        let descriçaoNivel = inputsNivel.children[4].value

        if(descriçaoNivel.length >= 30){

            todosInputsNivelValidos.push(true)

        }else{

            todosInputsNivelValidos.push(false)

        }

        let verificarPorcentagem = Object.values(document.querySelectorAll('#acerto-minimo'))

        const acerto =verificarPorcentagem.filter( (input) => input.value == 0)

        if(acerto.length !== 0){

            console.log('VALIDADO')

        }else{

            console.log('deu ruim')
        }

        let respostaValidas = todosInputsNivelValidos.every((resposta)=> resposta)

        if(respostaValidas){
            console.log('validado')
            
        }else{
            alert('Preencha os dados corretamente!')
        }
        
        todosInputsNivelValidos.length = 0




    }
    
}
validarNiveisQuizz()

/* /* function abrirNovoNivel(){

    let botaoNovoNivel = document.querySelector('.novo-nivel img')

    botaoNovoNivel.onclick = () => {
        
        let novoNivel = document.querySelector('.novo-nivel')
        console.log(novoNivel)
        /* let imgNovoNivel = document.querySelector('.novo-nivel img') */
       /*  let criarNivel = document.querySelector('.criar-nivel')
        console.log(criarNivel) */
        /* const element = document.getElementById("criar-nivel") */
        /* const element2 = document.getElementById("novo-nivel") */
 

         /* novoNivel.classList.toggle('criar-nivel')  */
         /* imgNovoNivel.classList.toggle('esconder-img') */

        /* document.getElementById('criar-nivel').addEventListener() */

       /*  document.getElementById('novo-nivel').remove() */
        
       /* element2.replaceChild(element, element2); */


/*     }
}
 */