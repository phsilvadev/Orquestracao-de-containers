import withAuth from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    return null;
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Adicione outras rotas aqui que não precisam de token
        const routesWithoutToken: String[] = ["/", "/morena"];

        // Regex para rotas dinâmicas "/morena/event/detalhes/**" e "/morena/event/editar/**"
        const isPublicRoute =
          routesWithoutToken.includes(req.nextUrl.pathname) ||
          /^\/morena\/event(o)?\/(detalhes|editar)\/.*$/.test(
            req.nextUrl.pathname
          );

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
