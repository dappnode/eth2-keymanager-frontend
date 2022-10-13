export const isValidatorPK = (validatorPK: string): boolean => {
  const reg = new RegExp("^0x[a-fA-F0-9]{96}$");
  return reg.test(validatorPK);
};

export const isEthAddress = (address: string): boolean => {
  const reg = new RegExp("^0x[a-fA-F0-9]{40}$");
  return reg.test(address);
};
