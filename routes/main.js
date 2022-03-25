const router = require('express').Router();
const fetch = require('node-fetch');

router.get('/', async (req, res) => {
    const query = `
        query ($page: Int, $perPage: Int, $search: String) {
            Page(page: $page, perPage: $perPage) {
                pageInfo {
                    total
                    perPage
                    }
                media(search: $search, type: ANIME, sort: FAVOURITES_DESC) {
                id
                format
                status
                episodes
                averageScore
                title {
                    romaji
                    english
                    native
                }
                genres
                coverImage {
                    large
                  }
                }
            }
        }`;

        let variables = {
            page: 2,
            perPage: 7,
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
    const animeStat = animeId.data.Page.media        

    if (req.session.userId) {
        const user = req.session.user
        res.render('entries/mainPage', { user, animeStat})
    } else {
        res.render('entries/mainPage', { animeStat})
    }
})


router.get('/getCat', async (req, res) => {
    res.render('entries/getCat',)
})

module.exports = router;