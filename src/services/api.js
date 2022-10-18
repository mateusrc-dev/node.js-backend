//vamos deixar aqui as configurações do axios
import axios from "axios" //importando o axios
export const api = axios.create({//vamos usar o método dentro de axios chamado create - podemos passar um objeto com configurações
  baseURL: "http://localhost:3333", //podemos incluir nessa propriedade baseUrl parte do endereço da api que se repete em todas as requisições para não precisar ficar repetindo ela nas requisições

}) 

//exemplo:
//api.get("/users/:id") //a baseUrl já está incluso na 'api'