const animeForm = document.getElementById('animeForm')

animeForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    console.log('Hello')
    const response = await fetch('/getAnime', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
      });

    console.log(response)
})