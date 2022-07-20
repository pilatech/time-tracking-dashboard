

let currentTimeFrame = 'Weekly'

function removeOtherActive(){
 document.querySelectorAll('.profile__time').forEach(el => {
  el.classList.remove('profile__time--active')
 })
}

document.addEventListener('click', (event) => {
  el = event.target
  if(el.classList.contains('profile__time')){
   removeOtherActive()
   currentTimeFrame = el.textContent
   el.classList.add('profile__time--active')
   paintUI(currentTimeFrame)
  }
})


async function getData(){
 const res = await fetch('./data.json')
 const data = await res.json()
 return data

}

paintUI(currentTimeFrame)

// getData().then(data => {

//  const container = document.querySelector('.container')

//  const cardMarkupArr = data.map(item => {

//   const cardClass = `card--${item.title.toLowerCase().split(' ').join('-')}`

//   return(
//    `
//    <article class="card ${cardClass}">
//    <header class="card__hero">
//    </header>
//    <footer class="card__footer">
//      <h2 class="card__title">
//       ${item.title}
//       <small class="card__title--accent">${item.timeframes.weekly.current}hrs</small>
//      </h2>
//      <aside class="card__extra-detail">
//        <img src="images/icon-ellipsis.svg" alt="ellipsis" class="card__icon">
//        <p class="card__time">Last Week - ${item.timeframes.weekly.previous}hrs</p>
//      </aside>
//    </footer>
//   </article>
//    `
//   )
//  })

//  container.innerHTML += cardMarkupArr.join()

// })


function paintUI(timeFrame){

 getData().then(data => {

  const content = document.querySelector('.content')
 
  const cardMarkupArr = data.map(item => {
 
   const cardClass = `card--${item.title.toLowerCase().split(' ').join('-')}`
 
   return(
    `
    <article class="card ${cardClass}">
    <header class="card__hero">
    </header>
    <footer class="card__footer">
      <h2 class="card__title">
       ${item.title}
       <small class="card__title--accent">${item.timeframes[timeFrame.toLowerCase()].current}hrs</small>
      </h2>
      <aside class="card__extra-detail">
        <img src="images/icon-ellipsis.svg" alt="ellipsis" class="card__icon">
        <p class="card__time">Last ${timeFrame.split('').slice(0, -2).join('')} - ${item.timeframes[timeFrame.toLowerCase()].previous}hrs</p>
      </aside>
    </footer>
   </article>
    `
   )
  })
 
  content.innerHTML = cardMarkupArr.join()
 
 })

}