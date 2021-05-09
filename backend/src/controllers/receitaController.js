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
    try {
      await Receita.findAll().then(response => {
        res.status(200).json({ receitas: response });
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