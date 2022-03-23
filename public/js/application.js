const form = document.getElementById('catForm')
const catImg = document.getElementById('catImg')

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const response = await fetch('http://aws.random.cat/meow')
    const result = await response.json();
    console.log(result)
    const cat = `<img src="${result.file}" style="height: 500px;"/>`
    catImg.innerHTML = cat
})