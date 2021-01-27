
export default class StatusRequest {

    constructor(sucesso=true, mensagem=null, data=null) {
        this.sucesso = sucesso;
        this.mensagem = mensagem;
        this.data = data;
    }

}