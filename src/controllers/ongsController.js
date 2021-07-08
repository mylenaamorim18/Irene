const mongoose = require('mongoose')
const Ong = require('../models/ongs')

const criaOng = async(req, res) => {
    const ong = new Ong({
        _id: new mongoose.Types.ObjectId(),
        nome: req.body.nome,
        email: req.body.email,
        telefone: req.body.telefone,
        instagram: req.body.instagram,
        descricao: req.body.descricao
    })

    const OngExistente = await Ong.findOne({email: req.body.email})

    if (OngExistente) {
        return res.status(409).json({error: "ONG já cadastrada!"})
    }

    try {
        const novaOng = await ong.save()
        return res.status(201).json(novaOng)
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

const mostraOngs = async (req, res) => {
    const ongs = await Ong.find().populate('endereco') //??tipo doações
    return res.status(200).json(ongs)
} 

// const mostraOng = async (req, res) => {
//     const 
// }

const alteraOng = async (req, res) => {
    const encontraOng = await Ong.findById(req.params.id)

    if (encontraOng == null) {
        return res.status(404).json({message: "ONG não encontrada!"})
    }

    if (req.body.nome != null) {
        encontraOng.nome = req.body.nome,
        encontraOng.email = req.body.email,
        encontraOng.telefone = req.body.telefone,
        encontraOng.instagram = req.body.instagram,
        encontraOng.descricao = req.body.descricao
    }

    try {
        const ongAtualizada = await encontraOng.save()
        res.status(200).json(ongAtualizada)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const deletaOng = async (req, res) => {
    const encontraOng = await Ong.findById(req.params.id)

    if (encontraOng == null) {
        return res.status(404).json({message: "ONG não encontrada!"})
    }

    try {
        await encontraOng.remove()
        res.status(200).json({message: "ONG deletada com sucesso!"})
    } catch (erro) {
        res.status(500).json({message: erro.message})
    }
}

module.exports = {
    criaOng,
    mostraOngs,
    // mostraOng,
    alteraOng,
    deletaOng
}