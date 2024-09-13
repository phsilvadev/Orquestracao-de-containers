import withAuth from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    return null;
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Adicione outras rotas aqui que não precisam de token
        const routesWithoutToken: String[] = [
          "/",
          "/morena",
          "/morena/evento/meu/detalhes",
          "/morena/details/**",
        ];

        // Regex para rota dinâmica "/morena/details/**"
        const isPublicRoute =
          routesWithoutToken.includes(req.nextUrl.pathname) ||
          /^\/morena\/details\/.*$/.test(req.nextUrl.pathname); // Regex para rota dinâmica

        if (isPublicRoute) {
          return true;
        }

        if (token) {
          return true;
        }

        return false;
      },
    },
  }
);
