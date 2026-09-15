const express = require("express");
const cors = require("cors");
const pacientes = require("../dados.json");

const app = express();

app.use(cors()); 
app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 

const porta = 3000;

const mostrarPacientes = (req, res) => {
    pacientes.forEach(p => {
        if (p.peso && p.altura) {
            p.imc = p.peso / (p.altura * p.altura);
        }
    });
    res.send(pacientes);
};

const novoPaciente = (req, res) => {
    if (req.body && Object.keys(req.body).length > 0) {
        const pacienteFormatado = {
            id: Number(req.body.id),
            data: req.body.data,
            paciente: req.body.paciente,
            peso: Number(req.body.peso),
            altura: Number(req.body.altura)
        };

        pacientes.push(pacienteFormatado);
        res.redirect('http://localhost:5500/index.html'); 
    } else {
        res.send("Erro ao Cadastrar com Sucesso!");
    }
};

app.get("/", mostrarPacientes);
app.post("/", novoPaciente);

app.listen(porta, () => { console.log(`Servidor: http://127.0.0.1:${porta}`); });