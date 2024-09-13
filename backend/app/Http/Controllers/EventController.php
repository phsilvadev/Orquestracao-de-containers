<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Events;
use Illuminate\Http\Response;
use App\Models\EventGuest;
use DateTime;
use Carbon\Carbon;
class EventController extends Controller
{
    
    public function Find(){

        try {
            
            $events = Events::orderBy("created_at","desc")->get();

            return response()->json($events);

        } catch (\Throwable $th) {
           return response()->json(['success'=>false, 'error'=>$th->getMessage()]);
        }
    }

    public function Register(Request $request){
        try {

            $EventGuestExistsUser = EventGuest::where('user_id',auth()->user()->id)->exists();
            
            if($EventGuestExistsUser){

                return response()->json([
                    'message' => 'Event guest already exists.'
                ], 409); // 409 Conflict
            }

            $newSingUpEvent = new EventGuest();
            $newSingUpEvent->event_id = $request->event_id;
            $newSingUpEvent->user_id = auth()->user()->id;
            $newSingUpEvent->save();

            return response()->json(['success'=>true,'data'=> $newSingUpEvent],200);

        } catch (\Throwable $th) {
            return response()->json(['success'=>false,  'error'=> $th->getMessage()], 500);
        }
    }

    public function Created(Request $request){
        
        try {

            $starts_at = new DateTime($request->starts_at);
            $ends_at = new DateTime($request->ends_at);

            $event = new Events();
            $event->name = $request->name;
            $event->description = $request->description;
            $event->address = $request->address;
            $event->complement  = $request->complement;
            $event->zipcode = $request->zipcode;
            $event->number= $request->number;
            $event->city = $request->city;
            $event->state = $request->state;
            $event->starts_at = $starts_at;
            $event->ends_at = $ends_at;
            $event->max_subscription = $request->max_subscription;
            $event->is_active = $request->is_active;
            $event->owner_id = auth()->user()->id;
            $event->save();

        } catch (\Throwable $th) {
            return response()->json(['success'=>false,'error'=>$th->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

    }


    public function Details($uuid_code){

        try {
            
            $vent = Events::where('uuid_code', $uuid_code)->get();

            if(count($vent) > 0 && count($vent) <= 1){

                $count_event = EventGuest::where('event_id', $vent[0]->id)->count();
              
                return response()->json([
                    'event' => $vent[0],
                    'writings' => $count_event,
                   
                ], Response::HTTP_OK);
            }

           return response()->json([]);
            
        } catch (\Throwable $th) {
            return response()->json(['success'=>false,'error'=>$th->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

    }

    public function CheckedRegister(Request $request){

        try {
            
            $match = EventGuest::where('user_id', auth()->user()->id)
                ->where('event_id', $request->event_id)
                ->exists();

            return response()->json(['exists' => $match],Response::HTTP_OK);
            
        } catch (\Throwable $th) {
            return response()->json(['success'=>false,'error'=>$th->getMessage()], Response::HTTP_BAD_REQUEST);
        }

    }

    public function Remove(Request $request){
        try {
            
            $updated = EventGuest::where('user_id', auth()->user()->id)
            ->where('event_id', $request->event_id)
            ->delete();

            if($updated){
                return response()->json([
                    'message' => 'Event guest successfully marked as deleted.',
                ], Response::HTTP_OK);
            }else {
                return response()->json([
                    'message' => 'Event guest not found or update failed.',
                ], Response::HTTP_NOT_FOUND);
            }
            

        } catch (\Throwable $th) {
            return response()->json(['success'=>false,'error'=>$th->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }

    public function Me(Request $request){

        try {
            $event = Events::where('owner_id', auth()->user()->id)->get();

            return response()->json($event,Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json(['success'=>false,'error'=>$th->getMessage()], Response::HTTP_BAD_REQUEST);
        }

    }

    public function Edit(Request $request){

        try {
            $editEvent = Events::where('owner_id', auth()->user()->id)
                ->where('uuid_code', $request->event_id)
                ->get();

            return response()->json($editEvent,Response::HTTP_OK);

        } catch (\Throwable $th) {
            return response()->json(['success'=>false,'error'=>$th->getMessage()], Response::HTTP_BAD_REQUEST);
        }


    }

    public function Update(Request $request, $uuid_code){
        
        try {
            
            $event = Events::where('uuid_code', $uuid_code);

            $event->update($request->all());

            return response()->json($event,Response::HTTP_OK);

        } catch (\Throwable $th) {
            //throw $th;
        }
    }

    public function Delete($uuid_code){
        try {
           
            $event = Events::where('uuid_code', $uuid_code)
            ->where('owner_id', auth()->user()->id)
            ->first();

            
            if (!$event) {
                return response()->json(['success' => false, 'message' => 'Evento não encontrado.'], Response::HTTP_NOT_FOUND);
            }

            
            $event->delete();

            return response()->json(null, Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json(['success' => false, 'error' => $th->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }

}
