 //padronizando o tipo de mensagem que vai aparecer quando tiver uma exceção
 class AppError {
  message; //toda a classe vai tomar conhecimento dessas variáveis e elas vão ser acessíveis as outras funcionalidades
  statusCode;
  constructor(message, statusCode = 400) {//método construtor é carregado quando a classe é instanciada - quando alguém for instanciar essa class pode passar o message e o statusCode - caso o statusCode não seja informado o padrão dele vai ser 400
    this.message = message; //this é pra repassar a mensagem  do 'message' que chega do parâmetro para o 'message' global da class
    this.statusCode = statusCode;
  } 
 }

 module.exports = AppError