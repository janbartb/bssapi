// Bring in the express server and create application
const express = require('express');
const app = express();
const path = require('path');
const accountRouter = require('./routes/accountRouter')();
const bpointRouter = require('./routes/bpointRouter')();
const teamRouter = require('./routes/teamRouter')();
const verenigingRouter = require('./routes/verenigingRouter')();
const lokaliteitRouter = require('./routes/lokaliteitRouter')();
const seizoenRouter = require('./routes/seizoenRouter')();
const competitiesRouter = require('./routes/competitiesRouter')();
const competitieRouter = require('./routes/competitieRouter')();
const spelerRouter = require('./routes/spelerRouter')();
const spelsoortRouter = require('./routes/spelsoortRouter')();
const districtRouter = require('./routes/districtRouter')();
const spreeknamenRouter = require('./routes/spreeknamenRouter')();
const moyenneRouter = require('./routes/moyenneRouter')();
const knbbCompetitieRouter = require('./routes/knbbCompetitieRouter')();
const wedstrijdRouter = require('./routes/wedstrijdRouter')();
const annonRouter = require('./routes/annonRouter')();
const matchRouter = require('./routes/matchRouter')();
const eigenmatchRouter = require('./routes/eigenmatchRouter')();
const teammatchRouter = require('./routes/teammatchRouter')();
const configRouter = require('./routes/configRouter')();
const statsRouter = require('./routes/statsRouter')();
let errorHelpers = require('./helpers/errorHelpers');
let cors = require('cors');

console.log('dirName = ' + __dirname);

// Use the Router object
const router = express.Router();

// Configure middleware to support JSON data parsing in request object
app.use(express.json());

// Configure CORS
app.use(cors());

app.use(express.static('./biljartscore'));
//app.use('/driebanden', express.static('driebanden'));
app.set('view engine', 'pug');

// Configure router so all routes are prefixed with /bssapi
app.use('/bssapi', router);

// Configure accountRouter : /accounts
router.use('/accounts', accountRouter);
// Configure bpointRouter : /bpoint
router.use('/bpoint', bpointRouter);
// Configure statsRouter : /stats
router.use('/stats', statsRouter);
// Configure configRouter : /config
router.use('/config', configRouter);
// Configure matchRouter : /match
router.use('/match', matchRouter);
// Configure matchRouter : /teammatch
router.use('/teammatch', teammatchRouter);
// Configure wedstrijdRouter : /wedstrijd
router.use('/wedstrijd', wedstrijdRouter);
// Configure annonRouter : /annon
router.use('/annon', annonRouter);
// Configure eigenmatchRouter : /eigenmatch
router.use('/eigenmatch', eigenmatchRouter);
// Configure seizoenRouter : /seizoenen
router.use('/seizoenen', seizoenRouter);
// Configure competitiesRouter : /comps
router.use('/comps', competitiesRouter);
// Configure competitieRouter : /comp
router.use('/comp', competitieRouter);
// Configure spelerRouter : /spelers
router.use('/spelers', spelerRouter);
// Configure spelsoortRouter : /spelsoorten
router.use('/spelsoorten', spelsoortRouter);
// Configure districtRouter : /districten
router.use('/districten', districtRouter);
// Configure spreeknamenRouter : /spreeknamen
router.use('/spreeknamen', spreeknamenRouter);
// Configure teamRouter : /teams
router.use('/teams', teamRouter);
// Configure verenigingRouter : /verenigingen
router.use('/verenigingen', verenigingRouter);
// Configure lokaliteitRouter : /lokaliteiten
router.use('/lokaliteiten', lokaliteitRouter);
// Configure moyenneRouter : /moyennes
router.use('/moyennes', moyenneRouter);
// Configure knbbCompetitieRouter : /knbb
router.use('/knbb', knbbCompetitieRouter);

// Configure exception logger to console
app.use(errorHelpers.logErrorsToConsole);
// Configure exception logger to file
app.use(errorHelpers.logErrorsToFile);
// Configure client error handler
app.use(errorHelpers.clientErrorHandler);
// Configure catch-all exception middleware last
app.use(errorHelpers.errorHandler);

router.get('/', (req, res) => {
    res.status(200).json({
        "status": 200,
        "statusText": "OK",
        "message": "Welcome! The BSS API is up and running.",
        "data": {}
    });
});

app.get('/', (req, res) => {
    res.sendFile('index.html',{root: __dirname})
});

// make sure all unknown routes are redirected to the index.html page
app.use((req, res, next) => {
    res.status(404).sendFile('index.html',{root: __dirname + '\\biljartscore'})
})

// Create server and listen on port 8080
var server = app.listen(8080, () => {
    console.log('Node server is running on http://localhost:8080...');
});
