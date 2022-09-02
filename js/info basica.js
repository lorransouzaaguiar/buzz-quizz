function validarDadosQuizz(){
    const todosInputsValidos = []


    let botao = document.querySelector('.prosseguir')
    botao.onclick = () => {
        let inputs = document.querySelector('.criar-quizz')

        let  titulo = inputs.children[0].value
        
        if(titulo.length >= 20 && titulo.length <= 65 ){
            

            todosInputsValidos.push(true)
            
        }else{
            todosInputsValidos.push(false)
        }
        let urlImagem = inputs.children[1].value
        
        
        if(urlImagem.match('https?:\/\/.*\.(?:png|jpg)')){

            todosInputsValidos.push(true)
        }else{
            
            todosInputsValidos.push(false)
            
        }

        let numeroPerguntas = inputs.children[2].value

        if(parseInt(numeroPerguntas) >= 3 ){

            todosInputsValidos.push(true)

        }else{
            todosInputsValidos.push(false)

        }

        let numeroNiveis = inputs.children[3].value

        if(parseInt(numeroNiveis) >= 2){

            todosInputsValidos.push(true)

        }else{
            todosInputsValidos.push(false)

        }

        let respostaValidas = todosInputsValidos.every((resposta)=> resposta)
    
        

        if(respostaValidas){
            console.log('validado')
            
        }else{
            alert('Preencha os dados corretamente!')
        }
        console.log(todosInputsValidos)
        todosInputsValidos.length = 0
        
    }

    }
validarDadosQuizz()