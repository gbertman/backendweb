const data = {};
data.states = require('../model/statesData.json');
const statesFunFacts = require('../model/statesFunFacts');


const getStateObj = (paramInfo) => {
    return data.states.find(sta => sta.code === paramInfo.toUpperCase());
}

const fixNum = (population) => { return population.toLocaleString('US-en'); }

const getStates = (req, res) => {
    if (req.query.contig === 'false') {
        res.json(data.states.filter((state) => state.code === "AK" || state.code === "HI"));
    }
    else if (req.query.contig === 'true') {
        res.json(data.states.filter((state) => state.code != "AK" && state.code != "HI"));
    }
    else {
        res.json(data.states);
    }
}

const getState = async (req, res) => {
    const stateInfo = getStateObj(req.params.stateId);
    if (!stateInfo) {
        return res.status(400).json({ "message": `Invalid state abbreviation parameter` });
    }
    const dataFacts = await statesFunFacts.findOne({ stateCode: req.params.stateId }).exec();
    if (dataFacts) stateInfo.funfacts = dataFacts.funfacts;
    res.json(stateInfo);
}

const getFunFact = async (req, res) => {
    const dataFacts = await statesFunFacts.findOne({ stateCode: req.params.stateId }).exec();
    if (!dataFacts) {
        const stateInfo = getStateObj(req.params.stateId);
        if (!stateInfo)
            return res.status(400).json({ "message": `Invalid state abbreviation parameter` });
        else
            return res.json({ "message": `No Fun Facts found for ${stateInfo.state}` });
    }
    const factNum = Math.floor(Math.random() * dataFacts.funfacts.length);
    res.json({ "funfact": dataFacts.funfacts[factNum] });
}

const createFunFact = async (req, res) => {
    const dataFacts = await statesFunFacts.findOne({ stateCode: req.params.stateId }).exec();
    if (!dataFacts) {
        const stateInfo = getStateObj(req.params.stateId);
        if (!stateInfo)
            return res.status(400).json({ "message": `Invalid state abbreviation parameter` });
        else {
            try {
                const result = await statesFunFacts.create({ stateCode: req.params.stateId, funfacts: req.body.funfacts });
                res.status(201).json(result);
            } catch (err) {
                console.log(err);
            }
        }
    } else {
        try {
            dataFacts.funfacts.push(...req.body.funfacts);
            const results = await dataFacts.save();
            res.status(201).json(results);
        } catch (err) {
            console.log(err);
        }
    }
}

const updateFunFact = async (req, res) => {
    const dataFacts = await statesFunFacts.findOne({ stateCode: req.params.stateId }).exec();
    if (!dataFacts) {
        return res.status(400).json({ "message": `Invalid state abbreviation parameter` });
    }
    if (req.body.index > 0 && req.body.index < dataFacts.funfacts.length) {
        try {
            dataFacts.funfacts[req.body.index - 1] = req.body.funfact;
            const results = await dataFacts.save();
            res.json(results);
        } catch (err) {
            console.log(err);
        }
    }
}

const deleteFunFact = async (req, res) => {
    const dataFacts = await statesFunFacts.findOne({ stateCode: req.params.stateId }).exec();
    if (!dataFacts) {
        return res.status(400).json({ "message": `Invalid state abbreviation parameter` });
    }
    if (req.body.index > 0 && req.body.index < dataFacts.funfacts.length) {
        try {
            dataFacts.funfacts.splice(req.body.index - 1, 1);
            const results = await dataFacts.save();
            res.json(results);
        } catch (err) {
            console.log(err);
        }
    }
}

const getCapital = (req, res) => {
    const stateInfo = getStateObj(req.params.stateId);
    if (!stateInfo) {
        return res.status(400).json({ "message": `Invalid state abbreviation parameter` });
    }
    res.json({ "state": stateInfo.state, "capital": stateInfo.capital_city });
}

const getNickname = (req, res) => {
    const stateInfo = getStateObj(req.params.stateId);
    if (!stateInfo) {
        return res.status(400).json({ "message": `Invalid state abbreviation parameter` });
    }
    res.json({ "state": stateInfo.state, "nickname": stateInfo.nickname });
}

const getPopulation = (req, res) => {
    const stateInfo = getStateObj(req.params.stateId);
    if (!stateInfo) {
        return res.status(400).json({ "message": `Invalid state abbreviation parameter` });
    }
    res.json({ "state": stateInfo.state, "population": fixNum(stateInfo.population) });
}

const getAdmission = (req, res) => {
    const stateInfo = getStateObj(req.params.stateId);
    if (!stateInfo) {
        return res.status(400).json({ "message": `Invalid state abbreviation parameter` });
    }
    res.json({ "state": stateInfo.state, "admitted": stateInfo.admission_date });
}

module.exports = {
    getStates,
    getState,
    getFunFact,
    createFunFact,
    updateFunFact,
    deleteFunFact,
    getCapital,
    getNickname,
    getPopulation,
    getAdmission
}