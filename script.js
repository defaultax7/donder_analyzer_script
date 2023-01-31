// ==UserScript==
// @name     Don anal filter
// @version  1
// @grant    none
// @include https://ibubara.mydns.jp/don-anal/don-anal.cgi?*
// ==/UserScript==

// create a form for filtering
let form = document.createElement('from');
let starFilterLabel = document.createElement('label');
starFilterLabel.innerText = 'Star : ';
let starFilter = document.createElement('select');
starFilter.setAttribute("id", "starFilter");
const noOfStars = 10;
// include 0 as 'any'
for (let i = 0; i <= noOfStars; i++) {
	let option = document.createElement('option');
	option.value = i;
	if (i === 0) {
		option.text = 'any';
	}
	else {
		option.text = i;
	}
	starFilter.appendChild(option);
};
// add listener to the select element
starFilter.addEventListener("change", function () {
	filter();
});
form.appendChild(starFilterLabel);
form.appendChild(starFilter);

let scoreTable = document.getElementsByTagName("table")[5];

scoreTable.prepend(form)


function filter() {
	// TODO : find a better way to get the score table
	let rows = scoreTable.getElementsByTagName("tr");
	let selectedStart = getSelectedStar();
	let startingIndex = getStartingIndex();
	console.log(startingIndex);
	// the first 2 rows are header info
	for (i = startingIndex; i < rows.length; i++) {
		// extract every columns for readbility
		let currentRow = rows[i].getElementsByTagName('td');
		let songName = currentRow[0].innerText;
		let difficulty = currentRow[1].innerText;
		let star = parseInt(currentRow[2].innerText);
		let lowestBpm = currentRow[3].innerText;
		let songGenreAndPos = currentRow[4].innerText;
		// an empty columns in index 5
		let crown = currentRow[6].innerText;
		let scoreRank = currentRow[7].innerText;
		let score = currentRow[8].innerText;
		let goods = currentRow[9].innerText;
		let oks = currentRow[10].innerText;
		let bads = currentRow[11].innerText;
		let combo = currentRow[12].innerText;
		let linda = currentRow[13].innerText;
		let rank = currentRow[14].innerText;
		if (selectedStart != 0) {
			if (star == selectedStart) {
				rows[i].style.display = ""
			} else {
				rows[i].style.display = "none"
			}
		} else {
			rows[i].style.display = ""
		}
	}
}

function getStartingIndex() {
	// if the first row has less than 14 columns, it is not a part of the score table
	return scoreTable.getElementsByTagName("tr")[0].getElementsByTagName("td").length < 14 ? 2 : 1;
}

function getSelectedStar() {
	let starFilter = document.getElementById("starFilter");
	return starFilter.value;
}