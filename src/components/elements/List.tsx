import { FixedSizeList } from 'react-window'

type RowProps = {
  index: number
  style: React.CSSProperties
}

export function List({
  items,
  renderItem,
  isLoading = false,
  loadingDataLength = 10,
  renderItemLoading,
  itemSize,
  EmptyIcon,
}: Readonly<ListProps>) {
  const loadingData = Array.from({ length: loadingDataLength }, (_, index) => ({
    id: index,
  }))

  function Row({ index, style }: Readonly<RowProps>) {
    if (isLoading && renderItemLoading) {
      return (
        <div style={style}>
          {renderItemLoading({
            index,
            array: loadingData,
          })}
        </div>
      )
    }

    return (
      <div style={style}>
        {renderItem({
          item: items[index],
          index,
          array: items,
        })}
      </div>
    )
  }

  if (!isLoading && EmptyIcon) {
    return EmptyIcon
  }

  return (
    <FixedSizeList
      height={'100%'}
      width={'100%'}
      itemSize={itemSize}
      itemCount={items.length}
    >
      {Row}
    </FixedSizeList>
  )
}
