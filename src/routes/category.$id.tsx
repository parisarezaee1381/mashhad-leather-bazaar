import { createFileRoute, redirect } from "@tanstack/react-router";

/** /category/bags → /catalog?cat=bags (keeps shareable category URLs working). */
export const Route = createFileRoute("/category/$id")({
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/catalog", search: { cat: params.id }, statusCode: 301 });
  },
});
