const prew = document.querySelector('.prew')
const next = document.querySelector('.next')
const go = document.querySelector('.go')
const input = document.querySelector('.input')

let count = window.location.pathname.slice(6)
console.log(count);

next.addEventListener('click', (e) => {
    count++
    window.location.assign(`/main/${count}`)
})

prew.addEventListener('click', (e) => {
    count--
    window.location.assign(`/main/${count}`)
})

go.addEventListener('click', (e) => {
    const num = input.value
    count = num
    console.log(count)
    window.location.assign(`/main/${count}`)
})