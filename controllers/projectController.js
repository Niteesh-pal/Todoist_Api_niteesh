const project = require('../Model/Poject.js');

const getAllProject = (req, res) => {
  project
    .findAll()
    .then((data) => res.status(200).json(data))
    .catch((err) =>
      res.status(500).json({ message: err.message || 'Unable to get request' })
    );
};

const createProject = (req, res) => {
  try {
    if (req.body.name) {
      project
        .create(req.body)
        .then((data) => res.send(data))
        .catch((err) => {
          res.status(500).send({
            message: err.message || 'some error occured',
          });
        });
    } else {
      return res.status(400).json({ msg: 'name is required' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getProjectById = (req, res) => {
  const id = req.params.id;
  project
    .findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(500).json({ message: 'unable to get data' });
      }
    })
    .catch((err) => res.status(500).json({ message: `error: ${err.message}` }));
};

const updateProjectById = (req, res) => {
  const id = req.params.id;

  project
    .findByPk(id)
    .then((project) => {
      return project.update(req.body);
    })
    .then((project) => {
      res.send(project);
    })
    .catch((err) => res.status(500));
};

const deleteAProject = (req, res) => {
  const id = req.params.id;
  project
    .destroy({ where: { id: id } })
    .then((num) => {
      if (num === 1) {
        res.status(200).json({ message: `Project deleted successfully` });
      } else {
        res.status(500).send({ message: `Project not found` });
      }
    })
    .catch((err) =>
      res.status(500).json({ message: err.message || 'Internal server error' })
    );
};

const deleteAllProject = (req, res) => {
  project
    .destroy({ where: {} })
    .then((num) =>
      res.status(200).json({ message: `${num} Todo deleted successfully` })
    )
    .catch((err) =>
      res.status(500).json({
        message: err.message || 'Some Error occurred while deleting todos',
      })
    );
};
module.exports = {
  getAllProject,
  createProject,
  getProjectById,
  updateProjectById,
  deleteAProject,
  deleteAllProject,
};
