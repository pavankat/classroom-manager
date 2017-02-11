//scenario 1 similar group strategy 3 or more

//scenario 2 like to like pairs 

//scenario 3 strong to weak groups 3 or more 
var students = [1, 1, 1, 2, 2];


//scenario 4 strong to weak pairs 

//DONE -> scenario 5 random groups
//DONE -> scenario 6 random pairs

//I could take tieredStuds and group them into the maxGroupSize by default and go to the next one and do that if I can and if I can't do what I can and then keep going - the last group must have the min, if it doesn't then borrow 1 from the CLOSEST group 

function restructureGroups(tieredStuds){
	return 'sup';
}

function groupLikes(studs, maxGroupSize){
	var tiers = [[], [], [], [], [], []];

	//group students by tier
	for (var i=0; i<studs.length; i++){
		if (studs[i] == 1) tiers[i+1].push(studs[i]);
		else if (studs[i] == 2) tiers[i+1].push(studs[i]);
		else if (studs[i] == 3) tiers[i+1].push(studs[i]);
		else if (studs[i] == 4) tiers[i+1].push(studs[i]);
		else if (studs[i] == 5) tiers[i+1].push(studs[i]);
		else if (studs[i] == 6) tiers[i+1].push(studs[i]);
	}

	//tiers can't be 0, 1 or above maxGroupSize
	for (var i=0; i<tiers.length; i++){
		if (tiers[i].length == 0) tiers.splice(i, 1); //delete the tier group
		else if (tiers[i].length == 1) restructureGroups(tiers); //group can't be 1
		else if (tiers[i].length > maxGroupSize) restructureGroups(tiers);
	}

	return tiers;
}

console.log(groupLikes(students, 3));
