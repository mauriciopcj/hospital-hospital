import { Prontuario } from '../database/models';

export default {

  store: async (req, res, next) => {
    try {            
      await Prontuario.create(req.body).then(response => {
        res.status(201).json({ prontuario: response });
      }).catch(error => {
        res.status(400).json({ error });
      });
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  index: async (req, res, next) => {
    const { limit = 10, offset = 0 } = req.query;

    try {
      await Prontuario.findAndCountAll({
        limit: parseInt(limit),
        offset: parseInt(offset),
      }).then(response => {
        res.status(200).json({ count: response.count, prontuarios: response.rows });
      }).catch(error => {
        res.status(400).json({ error });
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  show: async (req, res, next) => {
    try {
      await Prontuario.findOne({ 
        where: { id: req.params.id }
      }).then(response => {
        res.status(200).json({ prontuario: response });
      }).catch(error => {
        res.status(400).json({ error });
      })
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  update: async (req, res, next) => {
    try {
      await Prontuario.findOne({ where: { id: req.params.id }}).then(response => {
        response.update(req.body).then(response => {
          res.status(200).json({ prontuario: response });
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