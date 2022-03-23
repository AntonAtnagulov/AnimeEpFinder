const router = require('express').Router();
const fs = require('fs');
const fetch = require('node-fetch');
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' })

router.get('/', async (req, res) => {
    res.render('entries/getAnime')
})

router.post('/', upload.single('screen'), async (req, res) => {
    const imgPath = req.file.path
    console.log('==========>', imgPath);
    console.log(req.file);
    const response = await fetch("https://api.trace.moe/search", {
        method: "POST",
        body: fs.readFileSync(imgPath),
        headers: { "Content-type": "image/jpeg" },
    }).then((e) => e.json());

    let query = `
        query ($id: Int) { # Define which variables will be used in the query (id)
          Media (id: $id, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
            id
            format
            episodes
            averageScore
            title {
              romaji
              english
              native
            }
          }
        }`;

    let variables = {
        id: response.result[1].anilist
    };

    let url = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        };
        
    const animeId = await fetch(url, options).then(e => e.json())
    const animeName = animeId.data.Media.title.romaji
    const animeStat = animeId.data.Media
    // console.log(animeId.data.Media)
        
    const result = response.result[1]
    console.log(result)
    fs.unlinkSync(imgPath)
    res.render('entries/episodeResult', { result, animeName, animeStat })
})

module.exports = router;
