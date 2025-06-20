import z from 'zod';

const userSchema = z.object({
  id: z.number().positive(),
  name: z
    .string()
    .min(6, 'Nome deve conter pelo menos 6 caracteres')
    .max(12, 'Nome deve conter no máximo 12 caracteres')
    .trim(),
  email: z.string().email('Endereço de e-mail inválido').trim().toLowerCase(),
  password: z
    .string()
    .min(8, 'Senha deve conter pelo menos 8 caracteres')
    .max(20, 'Senha deve conter no máximo 20 caracteres')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          'Senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial',
      },
    )
    .trim(),
  avatar: z
    .string()
    .url('Foto de perfil inválida')
    .optional()
    .default('https://example.com/avatar.png'),
  role: z.enum(['admin', 'user']).default('user'),
  likedMusics: z.object({
    count: z.number().min(0).default(0),
    musics: z.array(z.number().positive()).default([]),
  }),
  musicsMostPlayed: z.array(z.number().positive()).default([]),
  musicsMostPlayedByGenre: z
    .array(
      z.object({
        genre: z.string().trim().toLowerCase(),
        musicId: z.array(z.number().positive()),
      }),
    )
    .default([]),
  countPlayedMusics: z.number().min(0).default(0),
  totalTimePlayed: z.number().min(0).default(0),
  genresMostPlayed: z.array(z.string().trim().toLowerCase()).default([]),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
});

export const createUserSchema = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateUserSchema = createUserSchema.partial();

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
