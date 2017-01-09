import Inputmask from 'jquery.inputmask';

export default {
  bind(el, binding) {
    const options = binding.value || {};
    const im = Inputmask(options);
    im.mask(el);
  },

  unbind(el) {
    Inputmask.remove(el);
  },
};
