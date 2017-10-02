document.addEventListener('DOMContentLoaded', function(){

var vm1 = new Vue({
  	el: '#battleGround',
  	data: {
      gameLvl: 1,
      gameMsg: {
        playerWonMsg: 'You Won, *must be lucky*',
        monsterWonMsg: 'You Lose, Terrible!'
      },
      displayMsg: '',
  		playerHealth: 100,
  		monsterHealth: 100,
      meterWidth: 1,
      healthFactor: 1,
      damageFactor: 1,
      maxDamage: 50,
      minDamage: 30,
      spellCount : 3,
      castSpell : true,
      gameIsRunning: false,
      turns: []
  	},
    watch : {
      gameIsRunning : function(){
          console.log(this.gameIsRunning != this.gameIsRunning ? 'Game Over' : "let's Start");
      },

      spellCount : function(){
        if(this.spellCount === 0){
          this.castSpell = false;
        }
      },

      playerHealth : function(){
        this.playerHealth > 100 ? this.playerHealth = 100 : '';
      }
    },
    computed: {
      // check if condition are met to end the game
      combatWatch : function(){
        if(this.playerHealth <= 0){
          this.displayMsg = this.gameMsg.monsterWonMsg;
          this.resetGame();
        }else if(this.monsterHealth <= 0) {
          this.displayMsg = this.gameMsg.playerWonMsg;
          this.nextLevel();
        }
      }
    },
  	methods: {

      // game control
      startGame : function(){
        this.gameIsRunning = true;
      },

      resizeMeter : function(event){
        var meter = document.getElementsByClassName('health-wrapper-bar');
        var meterWidth = meter.getBoundingClientRect();
        this.meterWidth = (meterWidth.width / this.monsterHealth) * 100;
        console.log(meterWidth.width);
      },

      removeMsg : function(){
          this.displayMsg = '';
      },

      resetGame : function(){
        this.gameIsRunning = false;
        this.gameLvl = 1;
        this.damageFactor = 1;
        this.playerHealth = this.monsterHealth = 100;
        this.spellCount = 3;
        this.castSpell = true;
        this.turns = [];
          setTimeout(() => { this.removeMsg }, 2000);
      },

      nextLevel : function(){
        this.gameLvl += 1;
        this.damageFactor += 0.2;
        this.playerHealth = this.monsterHealth = 100;
        this.spellCount = 3;
        this.castSpell = true;
        this.turns = [];
        setTimeout(() => { this.removeMsg }, 2000);
      },

      // calculate damage

      calculateDamage : function(){
        return Math.floor(Math.round(Math.random() * (this.maxDamage * this.damageFactor)) + (this.minDamage * this.damageFactor)) ;
      },

      displayLog : function(isUser, actionType, unit){
        var message = {
          Miss : 'MISS',
          HeroAttackMsg: 'Hero Attack Monster - ',
          HeroHealMsg  : 'Hero Heal himself - ',
          HeroSpellMsg : 'Hero Cast Spell - ',
          MonsAttackMsg: 'Monster attack Hero - ',
        };

        if(unit === 0){
          unit = message.Miss;
        }

        if(isUser == true){
          switch (actionType){
            case "attack":
              this.turns.unshift({
                isPlayer: true,
                text: message.HeroAttackMsg + unit
              });
              break;
            case "spell":
              this.turns.unshift({
                isPlayer: true,
                text: message.HeroSpellMsg + unit
              });
              break;
            case "heal":
              this.turns.unshift({
                isPlayer: true,
                text: message.HeroHealMsg + unit
              });
          }
        } else {
          this.turns.unshift({
            isPlayer: false,
            text: message.MonsAttackMsg + unit
          });
        }
      },

      // player control
      monsterAttack : function(){
        var damage = this.calculateDamage();
        this.displayLog(false, 'attack', damage);
        this.playerHealth -= damage;
      },


  		playerAttack : function(){
        var damage = this.calculateDamage();
        this.displayLog(true, 'attack', damage);
        this.monsterHealth -= damage;
  		},

      heal : function(){
        var health = this.calculateDamage();
        this.playerHealth += health;
        this.displayLog(true, 'heal', health);
        this.monsterAttack();
      },

      spell : function(){
        var damage = this.calculateDamage() * 1.5;
        this.monsterHealth -= damage;
        this.monsterAttack();
        this.spellCount--;
        this.displayLog(true, 'spell', damage);
      }

  	}
  });

});
