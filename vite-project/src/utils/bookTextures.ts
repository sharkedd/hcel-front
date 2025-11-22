// Array de 10 portadas reales p1.jpg → p10.jpg ubicadas en /public/covers/

export const BOOK_TEXTURES = [
  "/covers/p1.jpg",
  "/covers/p2.jpg",
  "/covers/p4.jpg",
  "/covers/p5.jpg",
  "/covers/p6.jpg",
  "/covers/p7.jpg",
  "/covers/p8.jpg",
  "/covers/p9.jpg",
  "/covers/p10.jpg",
];

// Hash determinístico para asignar una portada a cada libro
export function getCoverTexture(bookId: string) {
  let sum = 0;
  for (let i = 0; i < bookId.length; i++) {
    sum += bookId.charCodeAt(i);
  }

  // Siempre devolver la misma portada para el mismo ID
  return BOOK_TEXTURES[sum % BOOK_TEXTURES.length];
}
