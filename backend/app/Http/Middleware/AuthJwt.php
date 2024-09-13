<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Symfony\Component\HttpFoundation\Response;;

class AuthJwt
{
    
    public function handle(Request $request, Closure $next): Response
    {
        // Verifica se o token está presente no cabeçalho
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json(['error' => 'Token not provided'], 401);
        }

        
        try {
            // Tenta autenticar o usuário com o token
            $user = JWTAuth::setToken($token)->authenticate();
            
        } catch (JWTException $e) {
            // Se ocorrer um erro durante a autenticação
            return response()->json(['error' => 'Invalid token', 'mesage' => $e->getMessage()], 401);
        }

        // Se a autenticação for bem-sucedida, continua com a requisição
        Auth::setUser($user);
        return $next($request);
    }
}
