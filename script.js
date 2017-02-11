students = [
	{name: "Clark Kent", tier: 1, clas: 1024 },
	{name: "Trent Richardson", tier: 1, clas: 1024 },
	{name: "Naruto", tier: 2, clas: 1024 },
	{name: "Meeses", tier: 2, clas: 1024 },
	{name: "Bobbi", tier: 3, clas: 1024 },
	{name: "Franky Cleaners", tier: 4, clas: 1024 },
	{name: "Rocky", tier: 4, clas: 1024 },
	{name: "Supra", tier: 5, clas: 1024 },
	{name: "YoYo Bro", tier: 6, clas: 1024 },
	{name: "Linky", tier: 6, clas: 1024 },
	{name: "Albert", tier: 1, clas: 1025 },
	{name: "Peleke", tier: 2, clas: 1025 },
	{name: "Lisa", tier: 3, clas: 1025 },
	{name: "Kaly", tier: 3, clas: 1025 },
	{name: "Zack Morris", tier: 4, clas: 1025 },
	{name: "AC Slater", tier: 6, clas: 1025 }
] 

for (var i=0; i<students.length; i++){
	students[i].present = true;
}

var classRoomModel = function(stds) {
	var self = this;
	self.students = ko.observableArray(ko.utils.arrayMap(stds, function(st) {
	    return { name: st.name, tier: ko.observable(st.tier), clas: st.clas, present: ko.observable(st.present) };
	}));

	self.radioClass = ko.observable("both");

	self.studentsToShow = ko.pureComputed(function() {
	    // Represents a filtered list of students
	    // i.e., only those matching the "typeToShow" condition
	    var clas = this.radioClass();
	    if (clas == "both") return this.students();
	    return ko.utils.arrayFilter(this.students(), function(stud) {
	        return stud.clas == clas;
	    });
	}, this);

	self.sortFunction = function(a, b) {
	    return a.tier() > b.tier() ? 1 : -1;  
	};

	//filter students based on class and tier
	self.sortStudents = ko.computed(function() {
		var clasFil = this.radioClass();

	    if (clasFil == "both") {
	    	return this.students.slice().sort(this.sortFunction);
	    }

    	var studs = ko.utils.arrayFilter(this.students(), function(st) {
            return st.clas == clasFil;
        });

        return studs.slice().sort(this.sortFunction);
	    
	}, self);

	//filter students based on presence and radioClass filter
	self.studentLength = ko.computed(function(){
		debugger;
		var clasFil = this.radioClass();
		var counter = 0;

		if (clasFil == "both") {

			this.students().forEach(function(stud, i){
				if (stud.present()) counter++;
			});
		}else {
			this.students().forEach(function(stud, i){
				if (stud.present() && stud.clas == clasFil) counter++;
			});
		}

		debugger;
		return counter;
	}, self);
	                     
	self.rows = ko.observableArray();

	self.addRow = function() {
	    self.rows.push({
	        tables: ko.observableArray()
	    });
	};

	self.addTable = function(row) {
	    row.tables.push({
	        seats: 4,
	        sittingStudents: ko.observableArray()
	    });
	};

	self.removeRow = function(row){
		self.rows.remove(row);
	}

	self.removeTable = function(table){
		$.each(self.rows(), function() { this.tables.remove(table) })
	}

	self.togglePresence = function(student){
		student.present(!student.present())
	}

	//this is where we will place students to tables
	self.placeStudents = function(){
		var self = this;
		var students = [];

		//visually clear the tables
		$('.left .table').children('ul').children('li').remove();
		var clas = this.radioClass();

		self.rows().forEach(function(row,i){
			//console.log(row, i, 'row')
			if (row.tables().length > 0){
				row.tables().forEach(function(table, j){
					debugger;
					if (students.length != self.studentLength()){
						//console.log(table, j, 'table')
						//place the max amount of students at this table
						var seatCount = 1;

						while(seatCount <= table.seats){
							//get any random student - very inefficient - especially as we get closer to the end
							var ranStud = self.students()[Math.floor(Math.random()*self.students().length)];

							var tier = ranStud.tier();

							//if student present and the student hasn't been placed somewhere
							//account for class filter
							if ((ranStud.present() == true) && (students.indexOf(ranStud.name) == -1) && (ranStud.clas == clas)){
								debugger;
								console.log('in here')
								table.sittingStudents.push(ranStud);
								students.push(ranStud.name);
								seatCount++;
							}
						}						
					}
				});
			}
		});

		//debugger; 
		//shows students at the tables:
		//this.rows()[0].tables()[0].sittingStudents()
	}

	self.cleanView = function(){
		$('.clear').toggle();
	}

};

ko.applyBindings(new classRoomModel(students), document.querySelector('#classRoom'));
