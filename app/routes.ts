import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('routes/home/index.tsx'),
  route('/new-contact', 'routes/new-contact/index.tsx'),
  route('/edit-contact/:id', 'routes/edit-contact/index.tsx'),
] satisfies RouteConfig
