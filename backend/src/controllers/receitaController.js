import { Receita } from '../database/models';

export default {

  store: async (req, res, next) => {
    try {            
      await Receita.create(req.body).then(response => {
        res.status(201).json({ receita: response });
      }).catch(error => {
        res.status(400).json({ error });
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  update: async (req, res, next) => {  
    try {
      await Receita.findOne({ where: { id: req.params.id }}).then(response => {
        response.update(req.body).then(response => {
          res.status(200).json({ receita: response });
        }).catch(error => {
          res.status(400).json({ error });
        });
      }).catch(error => {
        res.status(400).json({ error });
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  index: async (req, res, next) => {
    const { limit = 10, offset = 0 } = req.query;

    try {
      await Receita.findAndCountAll({
        limit: parseInt(limit),
        offset: parseInt(offset),
      }).then(response => {
        res.status(200).json({ count: response.count, receitas: response.rows });
      }).catch(error => {
        res.status(400).json({ error });
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  show: async (req, res, next) => {
    try {
      await Receita.findOne({ where: { id: req.params.id }}).then(response => {
        res.status(200).json({ receita: response });
      }).catch(error => {
        res.status(400).json({ error });
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}