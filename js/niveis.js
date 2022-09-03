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

 function abrirNovoNivel(){

 
     let botaoNovoNivel = Object.values(document.querySelectorAll('.novo-nivel img'))
    console.log(botaoNovoNivel)
    
    botaoNovoNivel.forEach( (botao,index) => {

        botao.onclick = () => {
        console.log(index)
            let removerEscondido = Object.values(document.querySelectorAll('.escondido'))[index]
            console.log(removerEscondido)

            
    
            removerEscondido.classList.remove('escondido')
    
            let removerNovoNivel = Object.values(document.querySelectorAll('.novo-nivel'))[index]
            
            removerNovoNivel.classList.add('escondido')
    
        } 

    })

   /*  botaoNovoNivel.onclick = () => {
        
        let removerEscondido = document.querySelector('.escondido')
        

        removerEscondido.classList.remove('escondido')

        let removerNovoNivel = document.querySelector('.novo-nivel')
        
        removerNovoNivel.classList.add('escondido')

    } 
     */
}
abrirNovoNivel()
 