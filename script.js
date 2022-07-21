let currentTimeFrame = 'Weekly'
// this is the state that allows us to change our UI based off of

paintUI(currentTimeFrame) 
// render UI with 'Weekly as the initial timeframe

document.addEventListener('click', (event) => {
  el = event.target
  if(el.classList.contains('profile__time')){
   removeOtherActiveStates()
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

function removeOtherActiveStates(){
 document.querySelectorAll('.profile__time').forEach(el => {
  el.classList.remove('profile__time--active')
 })
}

function paintUI(timeFrame){
// so the timeFrame params allows us to filter data returned from our fetch
 getData().then(data => {
  const content = document.querySelector('.content')
  const cardMarkupArray = data.map(item => {
   const cardClass = `card--${item.title.toLowerCase().split(' ').join('-')}`
   const currentTime = item.timeframes[timeFrame.toLowerCase()].current
   const previousTime = item.timeframes[timeFrame.toLowerCase()].previous
   const timeLable = timeFrame.split('').slice(0, -2).join('')
   const time = timeLable === 'Dai' ? 'Day' : timeLable

   return(
    `
    <article class="card ${cardClass}">
    <header class="card__hero">
    </header>
    <footer class="card__footer">
      <h2 class="card__title">
       ${item.title}
       <small class="card__title--accent">${currentTime} ${currentTime === 1 ? "hr" : "hrs"}</small>
      </h2>
      <aside class="card__extra-detail">
        <img src="images/icon-ellipsis.svg" alt="ellipsis" class="card__icon">
        <p class="card__time">Last ${time} - ${previousTime} ${previousTime === 1 ? "hr" : "hrs"}</p>
      </aside>
    </footer>
   </article>
    `
   )
  })
 
  content.innerHTML = cardMarkupArray.join('')
 
 })

}