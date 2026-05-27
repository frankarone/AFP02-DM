// Modelo de datos tal como llega del backend (snake_case) y su
// conversión a la entidad de dominio User (camelCase).

/**
 * @typedef {Object} UserModel
 * @property {string} id
 * @property {string} email
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} [avatar_url]
 * @property {string} created_at
 */

export const toUserEntity = (model) => ({
  id: model.id,
  email: model.email,
  name: model.first_name,
  lastName: model.last_name,
  avatarUrl: model.avatar_url,
  createdAt: model.created_at,
});
