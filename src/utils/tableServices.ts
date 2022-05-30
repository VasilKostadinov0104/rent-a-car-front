import { RentACarApp } from '@appTypes/app'

export const tableServices = {
  massDelete(
    collection: RentACarApp.StaticTypes.Collection,
    { setSelectedRows, selectedRows, dbManager, setSort, setOrder, refetch }
  ) {
    setSelectedRows([])
    Array.from(selectedRows).forEach((id: number) => {
      dbManager.delete(id, collection).then(() => {
        // refetch()
        setSort('id')
        setOrder('desc')
        refetch(null, 'id', 'desc')
      })
    })
  },
  handleSelect(id, { setSelectedRows }) {
    const mainCheckbox =
      document.querySelector<HTMLInputElement>('#checkboxMain')
    mainCheckbox.checked = false
    const checkbox = document.querySelector<HTMLInputElement>(`#${id}`)

    if (checkbox?.checked) {
      setSelectedRows((ps) => [
        ...ps,
        Number(checkbox?.id?.replace('row-', '')),
      ])
      // setShowMassActions(true)
    } else {
      setSelectedRows((ps) =>
        ps.filter((r) => r == Number(checkbox?.id?.replace('row-', '')))
      )

      // setShowMassActions(false)
    }
  },
  async handleSelectAll({ selectedRows, setSelectedRows }) {
    const mainCheckbox =
      document.querySelector<HTMLInputElement>('#checkboxMain')
    const checkboxes: NodeListOf<HTMLInputElement> =
      document.querySelectorAll('.checkbox')

    setSelectedRows([])
    checkboxes.forEach((checkbox) => {
      if (mainCheckbox.checked) {
        checkbox.checked = true

        setSelectedRows((ps) => [
          ...ps,
          Number(checkbox.id.replace('row-', '')),
        ])
      } else {
        checkbox.checked = false
        setSelectedRows([])
      }
    })
    console.log(selectedRows)
  },
}
