export function filterData<T>(search: string, array?: T[]): Array<T> {
  if (!array) return []

  const searchWords = search.toLowerCase().split(/\s+/)

  return array.filter((v: any) => {
    const key = v.name ?? v.nome
    return searchWords.every((word) => key.toLowerCase().includes(word))
  })
}
