import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function NoEntries() {
  return (
    <tr className={``}>
      <td className="text-center py-[100px] text-secondary" colSpan={99}>
        <FontAwesomeIcon
          icon={faFolderOpen}
          className="text-[120px] mb-[30px] opacity-60"
        />{' '}
        <br />
        No entries found with the given citeria
      </td>
    </tr>
  )
}
