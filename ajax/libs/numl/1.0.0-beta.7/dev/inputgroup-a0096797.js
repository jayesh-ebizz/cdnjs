import { B as Behavior } from './index-3caafb06.js';

class InputGroupBehavior extends Behavior {
  init() {
    this.on('focusin', () => {
      this.setMod('focus', true);
    });
    this.on('focusout', () => {
      this.setMod('focus', false);
    });
    this.on('click', () => {
      const input = this.host.querySelector('input, [tabindex]:not([tabindex="-1"])');

      if (input) {
        input.focus();
      }
    });
  }

  connected() {
    this.setContext('inputgroup', this);
  }
}

export default InputGroupBehavior;
