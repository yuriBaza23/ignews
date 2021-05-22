<br/>

<p align="center"><a href="#"><img src="https://github.com/yuriBaza23/ignews/blob/main/public/images/logo.svg?raw=true" height="70"></a></p>

<br/>

<p align="center">
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=next-dot-js&logoColor=white" alt="Next" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="Typescript" />
    <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white" alt="SASS"/>
    <img src="https://img.shields.io/badge/Prismic-5163BA?style=for-the-badge&logo=Prismic&logoColor=white" alt="Prismic" />
    <img src="https://img.shields.io/badge/Stripe-008CDD?style=for-the-badge&logo=Stripe&logoColor=white" alt="Stripe" />
    <img src="https://img.shields.io/badge/FaunaDB-813EEF?style=for-the-badge&logo=%7B%7D&logoColor=white" alt="FaunaDB" />
</p>

## Sobre
O Ignews é uma aplicação onde os usuários podem se interar de assuntos próprios do mundo React e aprimorar seus conhecimentos. Esse site foi usado como método de estudo no módulo III da trilha ReactJS do curos Ignite da Rocketseat.  
Foram usados nesse site diversos conceitos como SSR (Server-side Rendering), JAMstack, Serverless e CMS.  

### Single-page Application
O Single-page Application (SPA) é um modelo bastante usado e, de certa forma, o que é mais comum encontrarmos. O Browser __lado do cliente__ faz uma comunicação com o código React __bundle.js__ que se comunica, por sua vez, com o Back-end __servidor__ mandando dados (Nesse exemplo, mandam dados relacionados ao usuário) e retornando dados em formato JSON. Após o término dessa comunicação é renderizado o código HTML.
  
![image spainfo](./spa.png)  
  
### Server-side Rendering
O Server-side Rendering (SSR) tem uma abordagem diferente. O browser __lado do cliente__ faz uma comunicação com o NextJS __um servidor NodeJS__ que se comunica com o código React __bundle.js__. O bundle manda dados para o Back-end __servidor__ e obtem um retorno em JSON. Após isso os dados são renderizados em Html, que retornam ao NextJS e após isso é retornado, ainda, ao Browser. Dessa forma todas as requisições que podem dar aquela renderização repentina na sua aplicação, são feitas no servidor Next e só após isso são realmente mandadas ao Browser, evitando-as.  
  
![image ssrinfo](./ssr.png)

## Rodando a aplicação
Há alguns pontos que devem ser atentados antes de rodar o ignews.  

### .ENV
Você precisará criar um arquivo .env que terá como exemplo o arquivo .env.example. Observe que há algumas API's externas que vão precisar de chaves, então vou tentar explicar como fazer essa configuração.  

#### Stripe
Para configurar o Stripe, é necessário que crie sua conta no site [Stripe](https://www.stripe.com) e que siga os passos abaixo:
- [ ] Crie um produto com o valor 9.90 dólares em forma recorrente de pagamento
- [ ] Acesse, na sessão para desenvolvedores, as suas chaves de API
- [ ] Crie a variável `NEXT_PUBLIC_STRIPE_PUB_KEY` no seu .env e coloque como valor a sua *chave publicável*
- [ ] Crie a variável `STRIPE_API_KEY` no seu .env e coloque como valor a sua *chave secreta*  
  
O Ignews utiliza Webhooks para ouvir atualizações no stripe devido a alguma alteração automática ou influenciada por alguma ação. Para isso, acesse o site [Stripe Webhooks](https://stripe.com/docs/stripe-cli) e instale o Stripe CLI na sua máquina. Siga os passos abaixo:
- [x] Instalar o Stripe CLI
- [ ] Realizar o login através do comando `stripe login` no seu terminal
- [ ] Crie a variável `STRIPE_WEBHOOK_SECRET` no seu .env e troque pela sua *chave* que aparecerá após o comando `stripe listen --forward-to localhost:3000/api/webhooks` no seu terminal
- [ ] Replique as variáveis `STRIPE_SUC_URL` e `STRIPE_CAN_URL` no seu .env  
  
> Ao adicionar as palavras **NEXT_PUBLIC_** antes de uma variável, a torna pública. __Tome cuidado ao adicionar essas palavras__. O Stripe CLI é necessério ao desenvolver a aplicação. Para informações sobre o modo produção, acesse: [Stripe Webhooks Production](https://dashboard.stripe.com/test/webhooks).  
  
#### Github
Para configurar o Github, é necessário acessar a opção _Developer settings_ nas settings do Github e seguir os passos abaixo:
- [ ] Acesse o OAuth Apps
- [ ] Crie um novo OAuth App com o valor `http://localhost:3000/api/auth/callback` no campo _Authorization callback URL_
- [ ] Crie a variável `GITHUB_CLIENT_ID` no seu .env e coloque como valor seu *Client ID*
- [ ] Cria a variável `GITHUB_SECRET_ID` no seu .env e coloque como valor seu *Client Secrets*
- [ ] No campo _Homepage URL_ coloque como valor `http://localhost:3000`  
  
#### FaunaDB
Para configurar o Fauna, é necessário que crie sua conta no site [Fauna](https://fauna.com) e que siga os passos abaixo:
- [ ] Criar um database chamado _ignews_
- [ ] Criar a collection _subscriptions_ e a collection _users_
- [ ] Criar o index *user_by_email* com o valor `data.email`, sendo unico, no campo _terms_ e _source collection_ sendo `users`
- [ ] Criar o index *user_by_stripe_customer_id* com o valor `data.stripe_customer_id` no campo _terms_ e _source collection_ sendo `users`
- [ ] Criar o index *subscription_by_id* com o valor `data.id` no campo _terms_ e _source collection_ sendo `subscriptions`
- [ ] Criar o index *subscription_by_status* com o valor `data.status`, no campo _terms_ e _source collection_ sendo `subscriptions`
- [ ] Criar o index *subscription_by_user_ref* com o valor `data.userId` no campo _terms_ e _source collection_ sendo `subscriptions`
- [ ] Na sessão Security crie uma nova chave com o nome `ignews-next-app` e coloque a *chave secreta* na variável `FAUNADB_KEY` do seu .env  
  
> Cuidado! Só é possível visualizar uma vez a sua chave secreta.  
  
#### Prismic CMS
Para configurar o Primic, acesse o site [Prismic CMS](https://prismic.io), crie uma conta e siga os passos abaixo:
- [ ] Crie um repositório para a aplicação
- [ ] Acesse a sessão _Custom Types_ e crie um novo tipo no estilo _Repeatable Type_ e de o nome de `post`
- [ ] Na criação do tipo, coloque os campos: UID tendo um field name como UID
- [ ] Na criação do tipo, coloque os campos: Title Field tendo um field name como title e configuração h1
- [ ] Na criação do tipo, coloque os campos: Rich Text tendo um field name como content todas as configurações possíveis
- [ ] Salve o tipo e adicione alguns posts
- [ ] Na sessão settings entre em _API & Security_ e escolha `Private API – Require an access token for any request` no campo API access em _Repository security_ e clique em _Change the API visibility_
- [ ] Adicione um access token, crie no seu .env a variável `PRISMIC_ACCESS_TOKEN` e coloque como valor seu _Permanent access token_
- [ ] Crie a variável `PRISMIC_ENTRYPOINT_URL` e coloque como valor o link disponivel em _API Endpoint_