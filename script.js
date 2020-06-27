const config = {
  initialCoins: 0,
  initialHealth: 100,
  initialEnemyHealth: 100,
  initialIncomeRate: 0.25,
  incomeUpgradePrice: [
    10, 15, 20, 50, 60, 80
  ],
  incomeUpgradeRate: [
    0.5, 0.75, 1, 1.25, 1.5, 2
  ],
  newUnitUpgradePrice: [
    15, 15, 25
  ],
  wallHealthUpgradePrice: [
    20, 60
  ],
  wallHealthUpgradeValue: 10,
  creatures: [
    {
      name: 'peasant',
      price: 5,
      damage: 1,
      health: 3
    },
    {
      name: 'knight',
      price: 10,
      damage: 3,
      health: 5
    },
    {
      name: 'cavalry',
      price: 15,
      damage: 4,
      health: 7
    },
    {
      name: 'spider',
      price: 20,
      damage: 30,
      health: 15
    }
  ]
}

const coins = document.querySelector('.coins-value')
const hp = document.querySelector('.hp-value')
const incomeUpgradePrice = document.querySelector('.income-upgrade-price')
const newUnitUpgradePrice = document.querySelector('.new-unit-upgrade-price')
const wallHealthUpgradePrice = document.querySelector('.wall-health-upgrade-price')
const peasantPrice = document.querySelector('.peasant-price')
const knightPrice = document.querySelector('.knight-price')
const cavalryPrice = document.querySelector('.cavalry-price')
const spiderPrice = document.querySelector('.spider-price')
const bottomPath = document.querySelector('.bottom-path')
const incomeUpgradeButton = document.querySelector('.income')
const wallHealthUpgradeButton = document.querySelector('.wall-health')
const newUnitUpgradeButton = document.querySelector('.new-unit')
const unitShop = document.querySelector('.unit-shop')
const paths = document.querySelector('.paths')
const startStopButton = document.querySelector('.start-stop-button')
const enemyHealth = document.querySelector('.enemy-hp-value')

let incomeRate = null
let incomeLevel = null
let wallHealthLevel = null
let wallHealthPrice = null
let newUnitLevel = null
let selectedUnit = null

let active = false
let timerId = null

const initialLoad = () => {
  coins.innerText = config.initialCoins
  hp.innerText = config.initialHealth
  enemyHealth.innerText = config.initialEnemyHealth
  incomeUpgradePrice.innerText = config.incomeUpgradePrice[0]
  newUnitUpgradePrice.innerText = config.newUnitUpgradePrice[0]
  wallHealthUpgradePrice.innerText = config.wallHealthUpgradePrice[0]
  peasantPrice.innerText = config.creatures[0].price
  knightPrice.innerText = config.creatures[1].price
  cavalryPrice.innerText = config.creatures[2].price
  spiderPrice.innerText = config.creatures[3].price

  incomeRate = config.initialIncomeRate
  incomeLevel = 0
  wallHealthLevel = 0
  wallHealthPrice = config.wallHealthUpgradePrice[0]
  newUnitLevel = 0
  selectedUnit = null

  for (let w = 0; w < unitShop.children.length; w++) {
    unitShop.children[w].classList.remove('selected-unit')
    if (w > 0) {
      unitShop.children[w].classList.add('disabled-unit')
    }
  }

  for (let w = 0; w < paths.children.length; w++) {
      paths.children[w].innerHTML = ''
  }
}

initialLoad()

const incomeHandle = () => {
  return setInterval(()=>{
    coins.innerText = (Number(coins.innerText) + incomeRate).toFixed(2)
  }, 30)
}

startStopButton.addEventListener('click', e => {
  if (active) {
    active = false

    startStopButton.innerText = 'Start'

    initialLoad()

    clearInterval(timerId)
  } else {
    active = true

    startStopButton.innerText = 'Stop'

    timerId = incomeHandle()
  }
})

incomeUpgradeButton.addEventListener('click', (e)=>{
  if(incomeLevel < config.incomeUpgradeRate.length) {
    if(Number(coins.innerText) >= config.incomeUpgradePrice[incomeLevel]){
      incomeLevel = incomeLevel + 1
      incomeRate = config.incomeUpgradeRate[incomeLevel - 1]
      coins.innerText = Number(coins.innerText) - config.incomeUpgradePrice[incomeLevel - 1]

      if (incomeLevel < config.incomeUpgradeRate.length) {
        incomeUpgradePrice.innerText = config.incomeUpgradePrice[incomeLevel]
      } else {
        incomeUpgradePrice.innerText = 'Max level'
      }
    }
  }
})


wallHealthUpgradeButton.addEventListener('click', (e)=>{
    if(Number(coins.innerText) >= wallHealthPrice){
      wallHealthLevel = wallHealthLevel + 1
      coins.innerText = Number(coins.innerText) - wallHealthPrice
      if(wallHealthLevel < config.wallHealthUpgradePrice.length) {
        wallHealthPrice = config.wallHealthUpgradePrice[wallHealthLevel]
      }
      hp.innerText = Number(hp.innerText) + config.wallHealthUpgradeValue
      wallHealthUpgradePrice.innerText = wallHealthPrice
    }
})


newUnitUpgradeButton.addEventListener('click', (e)=>{
  if(newUnitLevel < config.newUnitUpgradePrice.length) {
    if(Number(coins.innerText) >= config.newUnitUpgradePrice[newUnitLevel]){
      newUnitLevel = newUnitLevel + 1
      coins.innerText = Number(coins.innerText) - config.newUnitUpgradePrice[newUnitLevel - 1]

      unitShop.children[newUnitLevel].classList.remove('disabled-unit')

      if (newUnitLevel < config.newUnitUpgradePrice.length) {
        newUnitUpgradePrice.innerText = config.newUnitUpgradePrice[newUnitLevel]
      } else {
        newUnitUpgradePrice.innerText = 'Max level'
      }
    }
  }
})


for (let q = 0; q < unitShop.children.length; q++) {
  unitShop.children[q].addEventListener('click', e => {
    if (active) {
      if (newUnitLevel >= q) {
        if ([...unitShop.children[q].classList].includes('selected-unit')) {
          selectedUnit = null

          unitShop.children[q].classList.remove('selected-unit')
        } else {
          selectedUnit = unitShop.children[q].classList[0]

          unitShop.children[q].classList.add('selected-unit')
        }
      }
    }
  })
}

for (let q = 0; q < paths.children.length; q++) {
  if (paths.children[q].classList[0] !== 'empty-path') {
    paths.children[q].addEventListener('click', e => {
      if (selectedUnit) {
        const selected = selectedUnit

        const unit = document.createElement('img')

        unit.src = 'imgs/' + selectedUnit + '.png'

        unit.style.left = '0px'

        unit.classList.add('unit')

        const travelTime = 5

        const step = (paths.children[q].clientWidth - 50) / (travelTime)

        paths.children[q].appendChild(unit)

        for (let w = 0; w < travelTime + 1; w++) {
          setTimeout(()=>{
            unit.style.left =  step * w + 'px'
            if(w === travelTime) {
              setTimeout(() => {
                config.creatures.forEach(item => {
                  if(selected === item.name) {
                    if (Number(enemyHealth.innerText) - item.damage < 0) {
                      enemyHealth.innerText = 0

                      if (active) {
                        alert("You won!")

                        startStopButton.disabled = true

                        active = false

                        startStopButton.innerText = 'Start'

                        setTimeout(()=>{
                          initialLoad()

                          startStopButton.disabled = false
                        }, travelTime * 1000)


                        clearInterval(timerId)
                    }

                    unit.remove()
                    } else {
                      enemyHealth.innerText = Number(enemyHealth.innerText) - item.damage

                      unit.remove()
                    }

                  }
                })
              }, 500)
            }
          }, w * 1000 )
        }

        selectedUnit = null

        for (let w = 0; w < unitShop.children.length; w++) {
          unitShop.children[w].classList.remove('selected-unit')
        }

      }
    })
  }
}
