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