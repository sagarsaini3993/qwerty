document.getElementById("saveButton").addEventListener("click",saveData);
document.getElementById("showButton").addEventListener("click",showData);
document.addEventListener("deviceReady",createDatabase);

var db = "";

function createDatabase(){
  db = window.openDatabase("myDatabase", "1.0", "My WebSQL test database", 5*1024*1024);
  	if(!db) {
  		// Test your DB was created
  		alert('Your DB was not created this time');
  		return false
  	}


    db.transaction(
    		function(tx){
    			// Execute the SQL via a usually anonymous function
    			// tx.executeSql( SQL string, arrary of arguments, success callback function, failure callback function)
    			// To keep it simple I've added to functions below called onSuccessExecuteSql() and onFailureExecuteSql()
    			// to be used in the callbacks
    			tx.executeSql(
    				"CREATE TABLE IF NOT EXISTS user (name TEXT, dept TEXT)",
    				[],
    				onSuccessExecuteSql,
    				onError
    			)
    		},
    		onError,
    		onReadyTransaction
    	)

}


function saveData(){
  alert("save button pressed");

  var n = document.getElementById("nameBox").value;
  var d = document.getElementById("deptBox").value;

  console.log(n);

  db.transaction(
  		function(tx){
  			tx.executeSql( "INSERT INTO user(name,dept) VALUES(?,?)",
  			[n,d],
  			onSuccessExecuteSql,
  			onError )
  		},
  		onError,
  		onReadyTransaction
  	)


}

function showData(){
  alert("show button pressed");
document.getElementById("showResults").innerHTML = "";
  db.transaction(
		function(tx){
			tx.executeSql( "SELECT * FROM user",
			[],
			displayResults,
			onError )
		},
		onError,
		onReadyTransaction
	)
}

function displayResults( tx, results ){

		if(results.rows.length == 0) {
			alert("No records found");
			return false;
		}

		var row = "";
		for(var i=0; i<results.rows.length; i++) {
			document.getElementById("showResults").innerHTML +=
       "<p>name: "
        +results.rows.item(i).name
        +"<br>"
        +"dept: "
        +results.rows.item(i).dept;
		}
  s	}







function onReadyTransaction( ){
		console.log( 'Transaction completed' )
	}
	function onSuccessExecuteSql( tx, results ){
		console.log( 'Execute SQL completed' )
	}
	function onError( err ){
		console.log( err )
	}
