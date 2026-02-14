const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

function bpointRoutes() {
    const bpointRouter = express.Router();

    // get competities van district (momenteel alleen driebanden klein)
    bpointRouter.route('/comps/:district')
        .get((req, res, next) => {
            // GET html
            const ds = req.params.district;
            axios.get(`https://biljartpoint.nl/index.php?district=${ds}`)
            .then((response) => {
                if(response.status === 200) {
                    let result = [];
                    const html = response.data;
                    const $ = cheerio.load(html); 
                    $('span.introspelsoort').each((i, tab) => {
                        let spelsoortFound = false;
                        $(tab).find('th').each((j, cell) => {
                            if ($(cell).text() == 'Driebanden') {
                                spelsoortFound = true;
                            }
                        });
                        if (spelsoortFound) {
                            $(tab).find('tr').each((j, row) => {
                                $(row).find('td.competitienaam').each((k, cell) => {
                                    let comp = {};
                                    comp.klasse = $(cell).text();
                                    $(cell).siblings().each((s, sibl) => {
                                        comp.seizoen = $(sibl).contents().last().text();
                                        $(sibl).find('a').each((a, anch) => {
                                            comp.naam = $(anch).text();
                                            comp.bpUrl = $(anch).attr('href');
                                        });
                                    });
                                    result.push(comp);
                                });
                            });
                        }
                    });
                    res.status(200).json({
                        "status": 200,
                        "statusText": "OK",
                        "message": "All comps retrieved.",
                        "data": result
                    });
                }
                else {
                    console.log(response);
                }
            })
            .catch(err => {
                console.log(err);
                next(err);
            });
        });

    // get competitie
    bpointRouter.route('/comp/:poule/:id/:district')
        .get((req, res, next) => {
            // GET html
            const pl = req.params.poule;
            const id = req.params.id;
            const ds = req.params.district;
            axios.get(`https://biljartpoint.nl/index.php?page=stand&poule=${pl}&compid=${id}&district=${ds}`)
            .then((response) => {
                if(response.status === 200) {
                    let result = {
                        maxBeurten: '0',
                        teams: []
                    };
                    const html = response.data;
                    const $ = cheerio.load(html); 
                    const brtTxt = $('font:contains("Beurtenlimiet")').text();
                    let arr = brtTxt.split(' ');
                    arr.forEach(txt => {
                        if (Number.isInteger(Number(txt))) {
                            result.maxBeurten = txt;
                        }
                    });
                    let cnt = 0;
                    $('table table').each((i, tab) => {
                        if (i == 0) {
                            $(tab).find('tr').each((j, row) => {
                                if (j > 0) {
                                    let team = {
                                        naam: '',
                                        bpUrl: '',
                                    }
                                    $(row).find('td > a').each((k, cell) => {
                                        team.naam = $(cell).text();
                                        team.bpUrl = $(cell).attr('href');
                                    });
                                    result.teams.push(team);
                                }
                            });    
                        }
                    });
                    res.status(200).json({
                        "status": 200,
                        "statusText": "OK",
                        "message": "All comps retrieved.",
                        "data": result
                    });
                }
                else {
                    console.log(response);
                }
            })
            .catch(err => {
                console.log(err);
                next(err);
            });
        });

    // get districten (worden opgehaald van de district 86 pagina - kempenland)
    bpointRouter.route('/distr/:district')
        .get((req, res, next) => {
            // GET html
            const ds = req.params.district;
            axios.get(`https://biljartpoint.nl/index.php?district=${ds}`)
            .then((response) => {
                if(response.status === 200) {
                    let result = [];
                    const html = response.data;
                    const $ = cheerio.load(html); 
                    $('select[name="district"] > option').each((i, opt) => {
                        let entry = {};
                        entry.knbbId = $(opt).attr('value');
                        entry.naam = $(opt).text();
                        result.push(entry);
                    });
                    res.status(200).json({
                        "status": 200,
                        "statusText": "OK",
                        "message": "All districten retrieved.",
                        "data": result
                    });
                }
                else {
                    console.log(response);
                }
            })
            .catch(err => {
                console.log(err);
                next(err);
            });
        });

    // get moyennetabel (alleen voor driebanden klein B1 en B2)
    bpointRouter.route('/moyennes/:klasse')
        .get((req, res, next) => {
            // GET html
            let url = 'https://biljartpoint.nl/index.php?page=moyenne_tabel_zichtbaar&tabel=868&&ms=0&&s=6&&d=knbb&&dp=0&&pl=1&&c=7570&&di=86';
            if (req.params.klasse == 'B2') {
                url = 'https://biljartpoint.nl/index.php?page=moyenne_tabel_zichtbaar&tabel=869&&ms=0&&s=6&&d=knbb&&dp=0&&pl=1&&c=7574&&di=86';
            }
            axios.get(url)
            .then((response) => {
                if(response.status === 200) {
                    let result = {
                        klasse: req.params.klasse,
                        minimum: '0',
                        entries: []
                    };
                    const html = response.data;
                    const $ = cheerio.load(html); 
                    let count = 0;
                    $('table[align="left"] tr').each((i, row) => {
                        if (i > 1) {
                            if (i == 2) {
                                $(row).find('td > font').each((j, cell) => {
                                    if (j == 3) {
                                        result.minimum = $(cell).text().trim();
                                    }
                                });
                            }
                            else {
                                let entry = {};
                                $(row).find('td > font').each((j, cell) => {
                                    if (j == 1) {
                                        entry.vanaf = $(cell).text().trim();
                                    }
                                    if (j == 3) {
                                        entry.cars = $(cell).text().trim();
                                    }
                                });
                                result.entries.push(entry);
                            }
                        }
                    });
                    res.status(200).json({
                        "status": 200,
                        "statusText": "OK",
                        "message": "All districten retrieved.",
                        "data": result
                    });
                }
                else {
                    console.log(response);
                }
            })
            .catch(err => {
                console.log(err);
                next(err);
            });
        });

    // get team data
    bpointRouter.route('/team/:teamId/:compId/:poule/:district')
        .get((req, res, next) => {
            const tm = req.params.teamId;
            const cmp = req.params.compId;
            const pl = req.params.poule;
            const ds = req.params.district;
            axios.get(`https://biljartpoint.nl/index.php?page=teamdetail&team_id=${tm}&compid=${cmp}&poule=${pl}&district=${ds}`)
            .then((response) => {
                if(response.status === 200) {
                    let result = {
                        lokData: '',
                        spelers: []
                    };
                    const html = response.data;
                    const $ = cheerio.load(html); 
                    $('h4:contains("Lokaliteit")').siblings().each((i, sibl) => {
                        if (i == 0) {
                            result.lokData = $(sibl).text().trim();
                        }
                        // $(sibl).find('strong').each((j, str) => {
                        //     result.lokData = $(str).text().trim();
                        // })
                    });
                    $('table').each((t, tab) => {
                        if (t == 1) {
                            $(tab).find('tr').each((i, row) => {
                                if (i > 0) {
                                    const speler = {};
                                    $(row).find('td').each((j, cell) => {
                                        if (j == 0) {
                                            speler.splKnbbId = $(cell).text().trim();
                                        }
                                        if (j == 1) {
                                            speler.splNaam = $(cell).text().trim();
                                        }
                                        if (j == 4) {
                                            speler.splMoyenne = $(cell).text();
                                        }
                                    });
                                    result.spelers.push(speler);
                                }
                            });
                        }
                    });
                    res.status(200).json({
                        "status": 200,
                        "statusText": "OK",
                        "message": "All teams retrieved.",
                        "data": result
                    });
                }
                else {
                    console.log(response);
                }
            })
            .catch(err => {
                console.log(err);
                next(err);
            });
        });

    return bpointRouter;
}

module.exports = bpointRoutes;
