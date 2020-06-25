const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  //const { id } = request.query;

  //const repository = repositories;

  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repository);

  return response.json(repository);

});

app.put('/repositories/:id', (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'repository not found' });
  }
  const likes = repositories[repositoryIndex].likes
  const repository = {
    id,
    url,
    title,
    techs,
    likes
  };

  return response.status(200).json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositorieIndex = repositories.findIndex(repository => repository.id === id);

  if (repositorieIndex < 0) {
    return response.status(400).json({ error: 'repository not found' })
  };
  repositories.splice(repositorieIndex, 1)
  return response.status(204).send({ error: 'repository successfully deleted ' });
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repository = repositories.find(repository => repository.id === id);

  if (!repository) {
    response.status(400).send();
  }

  repository.likes++;

  return response.json(repository);

});

app.listen(3333);

module.exports = app;
