const config = {
  initialCoins: 0,
  initialHealth: 100,
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
      damage: 6,
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
const topPath = document.querySelector('.top-path')
const middlePath = document.querySelector('.middle-path')
const bottomPath = document.querySelector('.bottom-path')
const incomeUpgradeButton = document.querySelector('.income')
const wallHealthUpgradeButton = document.querySelector('.wall-health')
const newUnitUpgradeButton = document.querySelector('.new-unit')

let incomeRate = config.initialIncomeRate
let incomeLevel = 0
let wallHealthLevel = 0
let wallHealthPrice = config.wallHealthUpgradePrice[0]
let newUnitLevel = 0

const initialLoad = () => {
  coins.innerText = config.initialCoins
  hp.innerText = config.initialHealth
  incomeUpgradePrice.innerText = config.incomeUpgradePrice[0]
  newUnitUpgradePrice.innerText = config.newUnitUpgradePrice[0]
  wallHealthUpgradePrice.innerText = config.wallHealthUpgradePrice[0]
  peasantPrice.innerText = config.creatures[0].price
  knightPrice.innerText = config.creatures[1].price
  cavalryPrice.innerText = config.creatures[2].price
  spiderPrice.innerText = config.creatures[3].price
}
initialLoad()

const incomeHandle = () => {
  setInterval(()=>{
    coins.innerText = (Number(coins.innerText) + incomeRate).toFixed(2)
  }, 200)
}
incomeHandle()

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

      if (newUnitLevel < config.newUnitUpgradePrice.length) {
        newUnitUpgradePrice.innerText = config.newUnitUpgradePrice[newUnitLevel]
      } else {
        newUnitUpgradePrice.innerText = 'Max level'
      }
    }
  }
})
