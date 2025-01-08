# Sistema de rastreamento de veículos
Sistema desenvolvido durante a imersão 20 da Fullcycle.

# Sobre
Esta aplicação está desenvolvida em:
1. Next JS v15.1.0 - Front-end
2. Nest JS v10.4.9 - Back-end
3. Google Maps API - Serviço de mapa
4. MongoDB v3.6.8- Banco de dados
5. Kafka - Streaming de dados
6. Golang v1.23.2- Serviço de frete

## Arquitetura do projeto

![alt text](./imgs/arquitetura_projeto.png)

## 💻 Pré-requisitos

### Docker

Dependendo do seu sistema operacional, você tem 2 opções para instalar o Docker:

- [Docker Desktop] - Interface gráfica para gerenciar e usar o Docker.
- [Docker Engine] - Apenas a engine do Docker, sem interface gráfica, chamado de Docker Nativo.

Particularmente, usei o Docker sem interface gráfica, na versão 27.3.1.

### Node

Versão utilizada do Node foi a v20.17.0

### Google Maps API

Criar conta no Google Cloud, criar um projeto e ativar os serviços de: Places API, Directions API e Maps JavaScript API.
Após isso, criar um template de mapa e usar a key do projeto em /back/.env/ na key: GOOGLE_MAPS_API_KEY, enquanto que a key do template do mapa, iremos usar em /front/.env na Key:  NEXT_PUBLIC_MAP_ID e em NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, usaremos a key do projeto também em /front/.env.


## 🚀 Rodando o projeto

### Clone o repositório:

```
  git clone https://github.com/Guilherme99/sistema-rastreio-ponto.git
```

### Kafka, Mongo, Golang, NestJS e Next JS

Esses serviços serão criados a partir do docker-compose-homol.yaml, em .docker/docker-compose-homol.yaml. Para rodá-los, basta executar:

```
  docker-compose -f docker-compose-homol.yaml up -d --build
```

Executar o seguinte comando abaixo para ver se os serviços foram criados:
```
  docker ps
```
Acessar os container de: 

* Simulator: rode o comando abaixo para acessar o container
        ```
          docker exec -it simulator sh
        ```
        e executar o comando abaixo para rodar o serviço desenvolvido em Go para cobertura de frete e emissão de           eventos para o kafka: 
        ```
          go run cmd/simulator/main.go
        ```

* Nest: rode o comando abaixo para acessar o container
      ```
        docker exec -it nest bash
      ```
      e execute o comando abaixo para rodar o servidor do nest em modo de desenvolvimento
      ```
        npm run start:dev
      ```
* Kafka server: rode o comando abaixo para acessar o mesmo container do servidor nest
      ```
        docker exec -it nest bash
      ```
      e execute o comando abaixo para rodar a instância do kafka para consumir os eventos da mensageria
      ```
       npm run start:dev -- --entryFile=cmd/kafka.cmd
      ```
* Next: rode o comando abaixo para acessar o container do front-end
      ```
        docker exec -it next bash
      ```
      e execute o comando abaixo para rodar o front-end
      ```
       npm run dev
      ```
### ☕ Acessar a aplicação

Para isso, será necessário acessar pelo navegador em:

* Criar rota:
```
  http://localhost:3001/new-route
```
* Iniciar entrega
```
  http://localhost:3001/driver
```
* Visualizar rotas (admin)
```
  http://localhost:3001/admin
```

## 📫 Contribuindo para o projeto
<!---Se o seu README for longo ou se você tiver algum processo ou etapas específicas que deseja que os contribuidores sigam, considere a criação de um arquivo CONTRIBUTING.md separado--->
Para contribuir, siga estas etapas:

1. Bifurque este repositório.
2. Crie um branch: `git checkout -b <nome_branch>`.
3. Faça suas alterações e confirme-as: `git commit -m '<mensagem_commit>'`
4. Envie para o branch original: `git push origin <nome_do_projeto> / <local>`
5. Crie a solicitação de pull.

Como alternativa, consulte a documentação do GitHub em [como criar uma solicitação pull](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

## 📝 Licença

Esse projeto está sob licença.

[⬆ Voltar ao topo](#nome-do-projeto)<br>
