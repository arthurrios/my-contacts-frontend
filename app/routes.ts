import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/new", "routes/new-contact.tsx"),
  route("/edit/:id", "routes/edit-contact.tsx"),

] satisfies RouteConfig;
