<h1 align="center">Academia .NET - Estacionamento de Motos - Frontend</h1>

<p align="center">
  <a href="https://angular.io/"><img alt="Angular" src="https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white" /></a>
</p>

## :computer: Projeto

Esse projeto tem como proposta fazer a simulação de um sistema de gerenciamento para um estacionamento de motos, se trata do desafio final da Academia .NET ministrada pela `Universidade Franciscana - UFN`.

Este repositório esta relacionando ao [Projeto Final Backend](https://github.com/PauloAlves8039/academia-dotnet-projeto-final-backend)

## :blue_book: Regra de Negócio

- `Cadastro do Cliente`: na primeira visita o cliente recebe um atendimento para a realização do cadastro fornecendo dados pessoais. 

- `Entrada no Estacionamento`: para guardar a moto no estacionamneto é emitido um `ticket` com dados da `permanância` da moto informando a `data de entrada`, `placa da moto` e `referência` ao cliente.

-  `Ticket Entregue ao Cliente`: a maioria dos campos são preenchidos na abertura da permanência, os campos para `data de saída` e `valor total` ficam em aberto, já o campo `estado da permanência` recebe o valor `estacionado` indicando que a moto esta no estacionamento. 

-  `Retirada da Moto`: o cliente apresenta o `ticket` entregue na abertura da permanência para o procedimento de `conclusão`, nessa etapa os campos `data de saída` e `valor total` são registrados com seus valores informando a `data e hora` e o `valor total` da estadia da moto no estacionamento.  

## :hammer: Funcionalidades

- ``Operações``: para todas as entidades da aplicação é possível realizar as operações básicas como `consultar listas`, `pesquisar registros individuais`, `cadastrar`, `atualizar` e `excluir`. 
- ``Segurança``: é permitido o cadastro de novos `usuários` e os processos para `Autenticação` e `Autorização` desses mesmos usuários. 

### :eyes: Observação

No backend desse projeto foi configurada na parte de segurança a permissão de exclusão de registros apenas para o usuário com perfil administrativo chamado `admin@localhost`, os demais usuário vão poder fazer das outras funcionalidades da aplicação.  

## :movie_camera: Vídeos de Demonstrações
- Apresentação Durante o Desenvolvimento [Projeto Estacionamento de Moto](https://www.youtube.com/watch?v=H34bsYdyjhU&t=281s)
- Apresentação Após o Desenvolvimento [Projeto Estacionamento de Moto](https://www.youtube.com/watch?v=6eEUoA9NbTg&t=489s)

## ✔️ Recursos Utilizados

- `Angular CLI v17.0.7`
- `Bootstrap v5.0.2`
- `Bootstrap Icons v1.11.1`
- `JWT`
- `Axios`
- `Chart.js`
- `jsPDF`
- `API ViaCEP`
- `Imagens Pexels`
  
## :white_check_mark: Decisões Técnicas

1. Decidi criar uma interface amigável para a `esperiência do usuário`, criando elementos com tamanhos, cores e ajustes para facilitar a utilização da aplicação.

2. Optei em usar a [API ViaCEP](https://viacep.com.br/) onde o usuário através de um campo de pesquisa e o valor do CEP permite trazer boa parte do dados para conclusão do cadastro do endereço, a intenção foi aplicar uma forma prática para auxiliar esses cadastros.

3. A criação de alguns Pipes, tentei usar algumas bibliotecas externas para tentar configurar alguns recursos em alguns campos dos formulários, mas acabei me deparando com dificuldades para usar essas bibliotecas e decidi fazer o uso desses Pipes para:

- Formatação de campos para o `CPF`, `CEP` e `Telefone`.
- Formatação das `Datas` nas tabelas.
- Formatação de valores `Monetários` para o `Real Brasileiro`.

4. O uso de `classes` para representar as models:

- Optei em usar classes na representação das entidades de modelos, o motivo foi para trabalhar melhor o comportamento de suas propriedades, outra opção seria o uso de `interfaces` para atender a representação das models.    

4. A utilização do `Axios` para requisições `HTTP`:

- Apliquei o uso do `Axios` por estar mais familiarizado com sua forma de trabalho e por ter usado em outras tecnologias, no qual utilizo em meus projetos pessoais, poderia também ter usado o HttpClient do próprio módulo do Angular para atender essa necessidade.

5. A adição de um `Mini Dashboard`:

- Meu projeto não se trata de uma aplicação financeira mas possui um pequeno cálculo para informar o valor total da estadia do veículo no estacionamento, exibir o faturamento total das permanências me pareceu uma boa ideia para a criação de futuros requisitos e por ter uma noção básica dos ganhos destes serviços, por esses motivos crei um componente simples com um gráfico de barras utilizando o `Chart.js` para a exibição desses dados.   

6. A criação da entidade `Veiculo` e não `Moto`:

- Para representar as models de meu projeto fiz a criação das classes `Cliente`, `Endereco`, `Veiculo`, `ClienteVeiculo` e `Permanencia`, a ideia foi criar uma classe um pouco mais genérica para representar o veículo já pensando em futuras melhorias, um tipo de cenário pensado foi, se o proprietário do estacionamento decidir trabalhar com carros, essa classe pode ser reaproveitada e adaptada para ser usada como referência em classes do tipo `Moto` e `Carro`.    

7. A exibição de alertas sobre as `exclusões` de registros:

- Decidi exibir alertas sobre as exclusões de registros como uma forma de orientar o usuário na hora de remover registros, a motivação para isso foi o fato de eu ter removido a exclusão de registros em `cascata` visando a `integridade dos dados`, `evitar exclusões acidentais` e `preservar o histórico dos registros`.

## :wrench: Utilização do Projeto

- Certifique-se que a [WebAPI](https://github.com/PauloAlves8039/academia-dotnet-projeto-final-backend) esteja pronta e executada.

- Na pasta principal do projeto basta abrir o prompt de comando e executar `npm install` para instalar as todas dependências, após isso execute `npm start` para executar a aplicação ou `ng s -o` que além de executar a aplicação abre o projeto no navegador de forma automatizada.

- Conforme foi instruído no [Backend](https://github.com/PauloAlves8039/academia-dotnet-projeto-final-backend) é interessante a utilização do usuário `admin@localhost` para testar todas as funcionalidades, caso ainda não tenha sido criado recomendo realziar esse processo pois este usuário foi configurado para ser um usuário administrativo, outros usuários também podem ser criados no componente de cadastro, mas para realizar a exclusão de registros por exemplo apenas o usuário `admin@localhost` terá essa permissão. Para a criação deste usuário caso ainda não tenha sido feita basta adicionar o perfil `admin@localhost` e a senha pode ser a de sua preferência, um exemplo, `SuaSenha@2014`.

- Com o usuário configurado basta entrar no sistema usado as suas credencias e navegar pelas opções da aplicação fazendo uso de seus serviços.        

## :muscle: Pontos de melhorias

- Aplicar uma melhor validação nos campos dos formulários, cheguei a aplicar validações mais detalhadas porém acabaram não tendo o resultado esperado, pretendo aplicar essa melhoria mais adiante.

- A exibição dos dados da permanência no `PDF`, outro ponto de melhoria que tentei fazer é na exibição dos dados do `ticket` do veículo, não tive muito sucesso por falta de experiência com essa biblioteca, de uma forma básica ela entrega o que se propõe mas algumas melhorias na utilização dos textos é outro detalhe que pretendo cumprir.  

- Nos serviços tentei aplicar códigos os mais simples que pude fazer, em alguns serviços os códigos acabaram ficando um pouco robustos e podem ser pensados em futuras melhorias.

- O uso de alertas personalizados, eu cheguei a adicionar uma biblioteca chamada `Sweetalert2` mas acabei removendo porque não consegui fazer uso da forma que eu gostaria, deixei alguns alertas com seu uso padrão, já outros alertas informativos consegui fazer uso dos alertas do `Bootstrap`, é outro ponto que pode ser melhorado.

- Os botões para `excluir` registros nos formulários, pretendo aplicar alguma validação para deixar esses botões indisponíveis para quase todos os usuários exceto o usuário `admin@localhost`, como informativo deixei uma mensagem em um alerta informando aos usuários comuns que eles não tem permissão para excluir registros.

- Os elementos do `Bootstrap` que adicionei em meu projeto eles entregam os resultados esperados, para futuras melhorias nesse requisito a adição de novos elemento pode ser uma boa ideia.

## Algumas Imagens de Meu Projeto

### Login

<p align="center"> <img src="https://github.com/PauloAlves8039/academia-dotnet-projeto-final-frontend/blob/master/src/assets/images/screenshot1.PNG" /></p>

### Home Page

<p align="center"> <img src="https://github.com/PauloAlves8039/academia-dotnet-projeto-final-frontend/blob/master/src/assets/images/screenshot3.png" /></p>

### Endereços

<p align="center"> <img src="https://github.com/PauloAlves8039/academia-dotnet-projeto-final-frontend/blob/master/src/assets/images/screenshot4.PNG" /></p>

### Clientes

<p align="center"> <img src="https://github.com/PauloAlves8039/academia-dotnet-projeto-final-frontend/blob/master/src/assets/images/screenshot5.PNG" /></p>

### Veículos

<p align="center"> <img src="https://github.com/PauloAlves8039/academia-dotnet-projeto-final-frontend/blob/master/src/assets/images/screenshot6.PNG" /></p>

### Associação Cleintes e Veículos

<p align="center"> <img src="https://github.com/PauloAlves8039/academia-dotnet-projeto-final-frontend/blob/master/src/assets/images/screenshot7.PNG" /></p>

### Permanências dos Veículos

<p align="center"> <img src="https://github.com/PauloAlves8039/academia-dotnet-projeto-final-frontend/blob/master/src/assets/images/screenshot8.PNG" /></p>

### Mini Dashboard

<p align="center"> <img src="https://github.com/PauloAlves8039/academia-dotnet-projeto-final-frontend/blob/master/src/assets/images/screenshot9.png" /></p>

## :floppy_disk: Clonar Repositório

```bash
git clone https://github.com/PauloAlves8039/academia-dotnet-projeto-final-frontend.git
```
## Conclusão

Essa aplicação tem como objetivo oferecer melhorias para o uso de um sistema voltado para uma empresa fictícia que atua com o gerenciamento de um estacionamento de motos, a ideia surgiu por conta de uma necessidade que ocorre em localidades que tenham dificuldades para achar um estacionamento organizado, seguro e que ofereça um serviço com qualidade.

## :boy: Author

<a href="https://github.com/PauloAlves8039"><img src="https://avatars.githubusercontent.com/u/57012714?v=4" width=70></a>
[Paulo Alves](https://github.com/PauloAlves8039)
