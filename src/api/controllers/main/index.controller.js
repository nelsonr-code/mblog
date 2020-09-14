

async function myFunction(req, res, next) {
    console.log('Estoy en myFunction');
    res.send('<h1>Principal 2</h1>');
}

const actions = {
    myFunction,
}

export default actions;