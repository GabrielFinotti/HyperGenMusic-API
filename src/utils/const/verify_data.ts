export const minChar = {
  MIN_CHARS_USERNAME: 6,
  MAX_CHARS_USERNAME: 12,
  MIN_CHARS_PASSWORD: 8,
  MAX_CHARS_PASSWORD: 20,
};

export const regex = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~])[a-zA-Z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]+$/,
  phone: /^\d{11}$/,
};
