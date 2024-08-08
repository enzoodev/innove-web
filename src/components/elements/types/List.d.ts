type ListRenderItem<T> = (params: {
  item: T
  index: number
  array: Array<T>
}) => JSX.Element

type ListRenderItemLoading = (params: {
  index: number
  array: Array<{ id: number }>
}) => JSX.Element

type ListRenderHeader = () => JSX.Element

interface ListProps {
  items: T[]
  itemSize: number
  renderItem: ListRenderItem<T>
  isLoading?: boolean
  loadingDataLength?: number
  renderItemLoading?: ListRenderItemLoading
  EmptyIcon?: JSX.Element
}
