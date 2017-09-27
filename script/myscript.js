document.addEventListener('DOMContentLoaded', function(){
  new Vue({
  	el: '#battleGround',
  	data: {
  		playerHealth: 100,
  		monsterHealth: 100,
      spellCount : 2,
      castSpell : true,
      gameIsRunning: false,
      missChance:'',
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
          alert('Monster Win!');
          this.resetGame();
        }else if(this.monsterHealth <= 0) {
          alert('Player Win!');
          this.resetGame();
        }
      }
    },
  	methods: {

      // game control
      startGame : function(){
        this.gameIsRunning = true;
      },

      resetGame : function(){
        this.gameIsRunning = false;
        this.playerHealth = this.monsterHealth = 100;
        this.spellCount = 2;
        this.castSpell = true;
        this.turns = [];
      },

      // calculate damage

      calculateDamage : function(){
        return Math.round(Math.random() * 10);
      },

      displayLog : function(isUser, actionType, unit){
        if(isUser == true){
          switch (actionType){
            case "attack":
              this.turns.unshift({
                isPlayer: true,
                text: 'Hero Attack Monster -' + unit
              });
              break;
            case "spell":
              this.turns.unshift({
                isPlayer: true,
                text: 'Hero Attack Monster with "Fire Ball" - ' + unit
              });
              break;
            case "heal":
              this.turns.unshift({
                isPlayer: true,
                text: 'Hero heal himself - ' + unit
              });
          }
        } else {
          this.turns.unshift({
            isPlayer: false,
            text: 'Monster attack Hero - ' + unit
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
        console.log('%c Player Health: ' + health, 'color: cyan');
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
