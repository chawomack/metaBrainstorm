export var componentFunctions = {

  continue: function() {
    this.skill = `You entered: ${this.inputValue}`;
  },

  toggle: function() {
    this.selectedSkill = !this.selectedSkill;
  },

  onChange: function(value) {
    this.inputValue = value;
  }
};
