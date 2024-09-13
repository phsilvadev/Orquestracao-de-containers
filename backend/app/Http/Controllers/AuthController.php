<?php

namespace App\Http\Controllers;

use App\Models\User;
use Hash;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\Response;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
class AuthController extends Controller
{

    public function singIn(Request $request)
    {
        
        if(!$request->password || !$request->email){
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $user = User::where('email', $request->email)->first();
        if(!$user){
            return response()->json(['error'=> 'Unauthorized'],401);
        }

        $match = Hash::check($request->password, $user->password);

        if(!$match){
            return response()->json(['error'=> 'Unauthorized'],401);
        }

        // Aqui, geramos o token para o usuário autenticado

        $token = auth()->login($user);

        return $this->respondWithToken($token);
    
    }


    public function singUp(Request $request){

        $data = $request->validate([
            'email' => 'required|email|unique:users,email',
            'password' => 'required',
            'username' => 'required',
        ]);


        try {

            $user = new User();
            $user->email = $data['email'];
            $user->password = Hash::make($data['password']);
            $user->username = $data['username'];
            $user->save();            

            return response()->json(['success'=> true],200);
        } catch (\Throwable $th) {
            return response()->json(['error'=> $th->getMessage()],500);
        }

    }

    public function me()
    {
        return auth()->user()->makeHidden(['password'], Response::HTTP_OK);
    }

   
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

   
    public function refreshToken(Request $request)
    {
        $refreshToken = $request->input('refresh_token');

       // Define o token de refresh para verificar a validade
       auth()->setToken($refreshToken);

       // Tenta verificar se o token é válido
       if (auth()->check()) {
            $user = auth()->user();
            $token = auth()->login($user);
            return $this->respondWithToken($token);
       } else {
           return response()->json(['status' => 'invalid'], 401);
       }
    }
    
   

    public function validateRefreshToken(Request $request){
        
        $refreshToken = $request->input('refresh_token');

        try {
            // Define o token de refresh para verificar a validade
            auth()->setToken($refreshToken);

            // Tenta verificar se o token é válido
            if (auth()->check()) {
                return response()->json(['status' => 'valid'], 200);
            } else {
                return response()->json(['status' => 'invalid'], 401);
            }
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json(['error' => 'Token expired'], 401);
        } catch (\Tymon\JWTAuth\Exceptions\TokenBlacklistedException $e) {
            return response()->json(['error' => 'Token has been blacklisted'], 401);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Could not validate token'], 500);
        }
    }

   
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'refresh_token' => auth()->setTTL(1440)->claims([])->refresh(),  // Refresh token com TTL maior
        ],200);
    }
}
