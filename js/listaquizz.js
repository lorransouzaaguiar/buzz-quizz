 function pegarQuizzes(){

    const promise = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes')
    console.log(promise)
    promise.then(processaResposta)
    
    }
    pegarQuizzes()
    
    const quizz = document.querySelector('.caixa-quizzes') 
    
    
    function processaResposta(resposta){
      
        for(let i = 0; i < resposta.data.length; i++){

            quizz.innerHTML = quizz.innerHTML + `
                <div class="quizz">
                    <h2>${resposta.data[i].title}</h2>
                    <img src=${resposta.data[i].image}>
                </div>`
      
        }
    }     

function IrTelaCriaçãoDeQuizzes(){
    
}