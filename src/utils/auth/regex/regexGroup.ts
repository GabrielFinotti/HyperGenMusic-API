const regexGroup = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  uppercase: /[A-Z]/,
  number: /[0-9]/,
  specialChar: /[!@#$%^&*(),.?":{}|<>]/,
  url: /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
};

export default regexGroup;
