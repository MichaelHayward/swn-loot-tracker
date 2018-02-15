let techArray = [ // Duplicates mean 2x or 3x as likely to come up
	/* TL1 */['Shield', 'Leather Armour', 'Half-plate Armour', 'Full-plate Armour'],
	/* TL2 */[],
	/* TL3 */['Woven Body Armour'],
	/* TL4 */['Warpaint', 'Armoured Undersuit', 'Secure Clothing', 'Armoured Vacc Suit',
				'Security Armour', 'Combat Field Uniform', 'Icarus Harness', 'Assault Suit'],
	/* TL5 */['Deflector Array', 'Force Pavis', 'Vestimentum', 'Storm Armour', 'Field Emitter Panoply']
]

function generateArmour () {
	let quantity = document.getElementById("qty").value;
	let techLevel = parseInt(document.getElementById("tech").value);
	
	console.log("Generating items: " + quantity);
	console.log("Items generated will be from Tech Level: " + (techLevel + 1));

	let equipmentLog = [];  /* The  array, which we will count instances from */
	let equipmentLogFinal = [];/* The finalised array which will be a list of item quantities */

	for (i = 0; i < quantity; i++) {
		let randomNum = Math.floor(Math.random() * techArray[techLevel].length); 
		// Create a random number to index the currently selected array
		equipmentLog.push(techArray[techLevel][randomNum]);
	}
	
	equipmentLog.sort();
	equipmentLog.push('end'); // Adds additional item so that summariseItems knows where the end is
	console.log(equipmentLog);
	
	function summariseItems (list, targetList) {
		let savedItem; // keeps in memory the previous array item
		let currentItem = list[0]; 	// current array item to compare to
		let currentItemCount = 0; 	// track how many times an item value is repeated
		let savedNewEntry = ''; 	// the new array item that we push to the new array for totals
		
		for (i = 0; i < list.length + 1; i++) {
		
			if (i > 0) {
				
				savedItem = list[i-1];
				currentItem = list [i];
				
				if (savedItem === currentItem) {
					console.log('Match! Increasing currentItemCount');
					currentItemCount++;
				}
				
				if (savedItem !== currentItem) {
					console.log('Chain broken, cancelling count and exporting quantity');
					savedNewEntry = `${savedItem}: ${currentItemCount + 1}`;
					targetList.push(savedNewEntry);
					currentItemCount = 0; // Reset the count after exporting
				}
			}
			
		}
	}
	summariseItems(equipmentLog, equipmentLogFinal);
	equipmentLogFinal.pop(); // Removes our 'end' workaround mentioned above
	console.log(equipmentLogFinal);
	
	function createElements (list) {
		document.getElementById('outputPlaceholder').style = "display: none";
		
		for (i = 0; i < equipmentLogFinal.length; i++) {
			let para = document.createElement("p");
			let node = document.createTextNode(`${list[i]}`);
			
			para.appendChild(node);
			
			let element = document.getElementById('outputContainer');
			element.appendChild(para);
		}
	}
	createElements(equipmentLogFinal);
}