import { Cirurgia } from '../database/models';

export default {

  store: async (req, res, next) => {
    try {            
      await Cirurgia.create(req.body).then(response => {
        res.status(201).json({ cirurgia: response });
      }).catch(error => {
        res.status(400).json({ error });
      });
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  index: async (req, res, next) => {
    try {
      await Cirurgia.findAll().then(response => {
        res.status(200).json({ cirurgias: response });
      }).catch(error => {
        res.status(400).json({ error });
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  show: async (req, res, next) => {
    try {
      await Cirurgia.findOne({ where: { id: req.params.id } }).then(response => {
        res.status(200).json({ cirurgia: response });
      }).catch(error => {
        res.status(400).json({ error });
      })
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  update: async (req, res, next) => {
    try {
      await Cirurgia.findOne({ where: { id: req.params.id }}).then(response => {
        response.update(req.body).then(response => {
          res.status(200).json({ cirurgia: response });
        }).catch(error => {
          res.status(400).json({ error });
        });
      }).catch(error => {
        res.status(400).json({ error });
      });
    } catch (error)  {
      res.status(500).json({ error });
    }
  }
}