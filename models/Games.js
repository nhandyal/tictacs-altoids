/**
 *
 * Author: Nikhil Handyal
 * Date: Sunday September 14, 2014 : 21:54 PST
 * Project: TicTacs & Altoids
 * Description: Model definition for the game state
 */

/**
 * {...} index bounds for an array
 *
 * games : {
 *      _id : @Type:String
 *      outter_board : {
 *          0 : {
 *               inner_board : [...] @Type:Char {0-8},
 *               won : <-,X,O> @Type:Char
 *           }
 *           .
 *           .
 *           .
 *           8 : {...}
 *       },
 *       game_moves : ["05X", "53O", ...] @Type:String {0-N},
 *       current_turn : <X/O> @Type:Char,
 *       available_inner_spaces : [...] @Type:Int {0-8},
 * }
 */

Games = new Mongo.Collection("games");