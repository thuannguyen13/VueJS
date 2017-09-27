document.addEventListener('DOMContentLoaded', function(){
  new Vue({
  	el: '#battleGround',
  	data: {
  		playerHealth: 100,
  		monsterHealth: 100,
      spellCount : 2,
      castSpell : true,
      gameIsRunning: false,
      missChance:''
  	},
    watch : {
      gameIsRunning : function(){
          console.log(this.gameIsRunning != this.gameIsRunning ? 'Game Over' : "let's Start");
      },

      spellCount : function(){
        if(this.spellCount === 0){
          this.castSpell = false;
        }
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
      },

      // calculate damage

      calculateDamage : function(){
        return Math.round(Math.random() * 10);
      },

      // player control
      monsterAttack : function(){
        var damage = this.calculateDamage();
        this.playerHealth -= damage;
        if(damage === 0){
          console.log('%c Monster Attack: MISS', 'color: red');
        }else{
          console.log('%c Monster Attack: ' + damage, 'color: red');
        }
      },

  		playerAttack : function(){
        var damage = this.calculateDamage();
        this.monsterHealth -= damage;
        if(damage === 0){
          console.log('%c Player Attack: MISS ', 'color: lightgreen');
        }else{
          console.log('%c Player Attack: ' + damage, 'color: lightgreen');
        }

  		},

      heal : function(){
        var health = this.calculateDamage();
        this.playerHealth += health;
        console.log('%c Player Health: ' + health, 'color: cyan');
        this.monsterAttack();
      },

      spell : function(){
        var spellDamage = this.calculateDamage() * 1.5;
        this.monsterHealth -= spellDamage;
        console.log('%c Play casted Spell: ' + spellDamage, 'color: orange');
        this.monsterAttack();
        this.spellCount--;
      }

  	}
  });
});
