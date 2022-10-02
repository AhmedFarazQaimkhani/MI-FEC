import type { Author } from '../../common/interfaces';

/**
 * Getting Authors
 * @returns {Array<Author>[]}
 */
export const getAuthors = async (): Promise<Author[]> => {
  const response = await fetch(`${process.env.REACT_APP_API}/authors`);

  return response.json() as unknown as Author[];
};

/**
 * Updating Author
 * @param {number} id
 * @param {object} data
 * @returns {Array<Author>[]}
 */
export const updateAuthor = async (id: number, data: Author): Promise<Author[]> => {
  const response = await fetch(`${process.env.REACT_APP_API}/authors/${id}`, {
    method: 'PUT',
    mode: 'cors',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json() as unknown as Author[];
};

/**
 * Getting Author By Id
 * @param {number} id
 * @returns {Array<Author>[]}
 */
export const getAuthorById = async (id: number): Promise<Author[]> => {
  const response = await fetch(`${process.env.REACT_APP_API}/authors/${id}`);

  return response.json() as unknown as Author[];
};
