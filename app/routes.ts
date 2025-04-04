import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/new-contact", "routes/new-contact.tsx"),
  route("/edit-contact/:id", "routes/edit-contact.tsx"),

] satisfies RouteConfig;
