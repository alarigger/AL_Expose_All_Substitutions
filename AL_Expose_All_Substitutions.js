
/******************************** E X P O S E    A LL   S U B S T I T U T I O N S ***************************/
/*
Alexandre Cormier 
11/02/2019
www.alarigger.com
*/

function AL_Expose_All_Substitutions(){



	/*Expose all the substitutions (drawing elements) of the selected Drawings node (columns)
	/*You Can loop the expositions

	*/



	/***************** V A R I A B L E S */



	var curFrame = frame.current();

	var numSelLayers = Timeline.numLayerSel;


	var NUMBER_OF_LOOPS = 1

	var EXPOSITION = 1

	var ORDER = "DESC"

	/**************** E X E C U T I O N */



	scene.beginUndoRedoAccum("AL_Expose_All_Substitutions");

	inputDialog()

	//

	scene.endUndoRedoAccum();



	/**************** F U N C T I O N S */ 


	/*I N P U T   D I A L O G*/

	function inputDialog() {

		MessageLog.trace("inputDialog")

	    var d = new Dialog
	    d.title = "Expose_All_Substitutions";
	    d.width = 100;

		var LoopsInput = new SpinBox();
		LoopsInput.label = "Number of loops : ";
		LoopsInput.maximum = 1000;
		LoopsInput.minimum = 1;
		d.add( LoopsInput );


		var ExpoInput = new SpinBox();
		 ExpoInput.label = "Expose at : ";
		 ExpoInput.maximum = 1000;
		 ExpoInput.minimum = 1;
		d.add(  ExpoInput);

		var OrderInput = new ComboBox();
		 OrderInput.label = "Order"
		 OrderInput.editable = true;
		 OrderInput.itemList = ["ASC", "DESC"];
		d.add( OrderInput );


		if ( d.exec() ){

		  NUMBER_OF_LOOPS = LoopsInput.value

		  EXPOSITION = ExpoInput.value

		  ORDER = OrderInput.currentItem

		  Expose_selected_columns()

		}


	}


	function Expose_selected_columns(){

		MessageLog.trace("\n===============Expose_All_Substitutions\n")

			curFrame += 1;


			 for ( var i = 0; i < numSelLayers; i++ ){

		 		if ( Timeline.selIsColumn(i)){
		 			
					var currentColumn = Timeline.selToColumn(i);

					if (column.type(currentColumn) == "DRAWING"){

						var sub_timing = column.getDrawingTimings(currentColumn);

						var number_of_subs = sub_timing.length;

						var total = (number_of_subs*NUMBER_OF_LOOPS*EXPOSITION)

						var increment = 1

						var start_sub = 0

						var loop_end = number_of_subs

						switch(ORDER){

							case "DESC" : 
								increment = -1
								start_sub = number_of_subs-1;
								loop_end = -1

							break; 
							case "ASC" : 
								increment = 1
								start_sub = 0
								loop_end = number_of_subs

							break;

						}

						var sub_number = start_sub;



						MessageLog.trace("order:"+ORDER)
						MessageLog.trace("total:"+total)
						MessageLog.trace("start_sub:"+start_sub)
						MessageLog.trace("number_of_subs:"+number_of_subs)
						MessageLog.trace("increment:"+increment )

						var startFrame = curFrame-2;

						for(var t=1; t<total+1 ;t++){

							MessageLog.trace("t="+t);
							MessageLog.trace("sub :"+sub_timing[sub_number]);

							column.setEntry(currentColumn,1,startFrame+t,sub_timing[sub_number]);

							if(t % EXPOSITION == 0 ){

								sub_number+=increment;
							}

							MessageLog.trace("sub_number:"+sub_number);

							if((sub_number == loop_end) && NUMBER_OF_LOOPS > 1){
								
								sub_number = start_sub;

							}

						}

						//column.setEntry(currentColumn,1,curFrame,sub_timing[0]);

				}

			}

		}

	}





}




