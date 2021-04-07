import Vue from 'vue';

export default (signer) => {
  const format = Vue.web3.formatter.formats;
  Object.assign(signer.provider.formatter, { format });
  return signer;
};
