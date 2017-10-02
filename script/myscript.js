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
      healthFactor: 1,
      damageFactor: 1,
      maxDamage: 10,
      minDamage: 0,
      spellCount : 3,
      castSpell : true,
      gameIsRunning: false,
      turns: [] // for dislay log
  	},

    watch : {
      // limit player's Spell count
      spellCount : function(){
        if(this.spellCount === 0){
          this.castSpell = false;
        }
      },
      // limit player's Hitpoint to 100;
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
      },

      nextLevel : function(){
        this.gameLvl += 1;
        this.damageFactor += 0.2;
        this.playerHealth = this.monsterHealth = 100;
        this.spellCount = 3;
        this.castSpell = true;
        this.turns = [];
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

        unit === 0 ? unit = message.Miss : unit;

        if(isUser == true){
          switch (actionType){
            case "attack":
              this.turns.unshift({isPlayer: true, text: message.HeroAttackMsg + unit});
              break;
            case "spell":
              this.turns.unshift({isPlayer: true, text: message.HeroSpellMsg + unit});
              break;
            case "heal":
              this.turns.unshift({isPlayer: true, text: message.HeroHealMsg + unit});
              break;
          }
        } else {
          this.turns.unshift({isPlayer: false, text: message.MonsAttackMsg + unit});
        }
      },

      // player control
      monsterAttack : function(){
        var damage = this.calculateDamage();
        this.playerHealth -= damage;
        this.displayLog(false, 'attack', damage);
      },

  		playerAttack : function(){
        var damage = this.calculateDamage();
        this.monsterHealth -= damage;
        this.displayLog(true, 'attack', damage);
  		},

      heal : function(){
        var health = this.calculateDamage();
        this.monsterAttack();
        this.playerHealth += health;
        this.displayLog(true, 'heal', health);
      },

      spell : function(){
        var damage = this.calculateDamage() * 1.5;
        this.monsterAttack();
        this.spellCount--;
        this.monsterHealth -= damage;
        this.displayLog(true, 'spell', damage);
      }
  	}
  });
});
