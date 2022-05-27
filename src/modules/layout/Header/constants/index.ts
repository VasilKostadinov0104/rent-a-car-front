import {
  faCarSide,
  faHandshake,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'
export const HeaderConstants = {
  links: [
    { name: 'Vehicles', link: '/vehicles', index: 1, icon: faCarSide },
    { name: 'Customers', link: '/customers', index: 2, icon: faUsers },
    { name: 'Rents', link: '/rents', index: 3, icon: faHandshake },
  ],
}
