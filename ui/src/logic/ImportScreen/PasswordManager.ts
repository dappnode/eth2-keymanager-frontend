export const passwordEntered = (
  event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  index: number,
  passwords: string[],
  setPasswords: (passwords: string[]) => void
) => {
  const pass = event.target.value;
  const newList = Array.from(passwords);
  newList[index] = pass;
  setPasswords(newList);
};

export const setUniquePassword = (
  event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  passwords: string[],
  setPasswords: (passwords: string[]) => void
) => {
  const pass = event.target.value;
  const newList = Array.from(passwords);
  newList.fill(pass);
  setPasswords(newList);
};
