
export default class Util {

    static getServiceErrorReturn = error => {
        var mensagem = null;
        console.log("Erro no serviço", error.graphQLErrors);
        if(error.graphQLErrors && error.graphQLErrors.length > 0){
            var rootError = error.graphQLErrors[0];
            mensagem = rootError.message;
        } else {
            mensagem = error;
        }
        
        return mensagem;
    }
} 