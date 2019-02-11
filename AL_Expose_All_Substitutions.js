
/******************************** E X P O S E    A LL   S U B S T I T U T I O N S ***************************/
/*
Alexandre Cormier 
11/02/2019
www.alarigger.com
*/

function AL_Expose_All_Substitutions(){



	/*Expose all the substitutions (drawing elements) of the selected Drawings node (columns)
	/*You Can loop the exposition or ping pong

	*/



	/***************** V A R I A B L E S */



	var curFrame = frame.current();

	var numSelLayers = Timeline.numLayerSel;

	var Number_of_loops = 1

	var Order = "DESC"

	var exposition = 1;

	var limit = 0;

	var total = 0;

	var increment = 0;

	/**************** E X E C U T I O N */



	scene.beginUndoRedoAccum("AL_Expose_All_Substitutions");

	Expose_selected_columns()

	scene.endUndoRedoAccum();



	/**************** F U N C T I O N S */ 



	function Expose_selected_columns(){

		MessageLog.trace("\n===============Expose_All_Substitutions\n")

			curFrame += 1;


			 for ( var i = 0; i < numSelLayers; i++ ){

		 		if ( Timeline.selIsColumn(i)){
		 			
					var currentColumn = Timeline.selToColumn(i);

					if (column.type(currentColumn) == "DRAWING"){

					var substitution_timing = column.getDrawingTimings(currentColumn);

					var increment = 

					var count = (substitution_timing.length+1)*

					switch ()


					for(var t=0; t<substitution_timing.length+1;t+increment){

						column.setEntry(currentColumn,1,curFrame+t,substitution_timing[t]);

					}

				}

			}

		}


	}

}




